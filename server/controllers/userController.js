const ApiError = require("../error/ApiError");
const { User, Basket, BasketDevice } = require("../models/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const generateJwt = (email, id, role) => {
    return jwt.sign(
        {email, role, id},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role='ADMIN'} = req.body;
            
            if (!email && !password) {
                return next(ApiError.badRequest('Введите правильный email и пароль'));
            }
            if (!isEmail(email)) {
                return next(ApiError.badRequest('Некорректный email'));
            }
            if (password.length <= 4) {
                return next(ApiError.badRequest('Слишком короткий пароль'));
            }

            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Такой пользователь уже зарегистрирован'));
            }

            const hashedPasword = bcrypt.hashSync(password, 5);
            const user = await User.create({email, role, password: hashedPasword});
            await Basket.create({userId: user.id});

            const token = generateJwt(user.email, user.id, user.role);

            return res.json({token});
        } catch (err) {
            console.log('User registration', err);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            if (!email && !password) {
                return next(ApiError.badRequest('Введите правильный email и пароль'));
            }
            if (!isEmail(email)) {
                return next(ApiError.badRequest('Некорректный email'));
            }

            const user = await User.findOne({where: {email}});
            if (!user) {
                return next(ApiError.badRequest('Такой пользователь не зарегистрирован'));
            }
            
            const comparedPassword = bcrypt.compareSync(password, user.password);
            if (!comparedPassword) {
                return next(ApiError.badRequest('Неверный пароль'));
            }

            const token = generateJwt(user.email, user.id, user.role);
            return res.json({token});
        } catch (err) {
            console.log('User login', err);
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.email, req.user.id, req.user.role);
            return res.json({token});
        } catch (err) {
            console.log('User check', err);
        }
    }
}

module.exports = new UserController();
const ApiError = require("../error/ApiError");
const {Type} = require('../models/models');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) {
                return next(ApiError.badRequest('Название типа не может быть пустым'));
            }

            const checkType = await Type.findOne({where: {name}});
            if (checkType) {
                return next(ApiError.badRequest('Такой тип уже существует'));
            }

            const type = await Type.create({name});

            return res.json(type);
        } catch (err) {
            console.log('Type create', err);
        }
    }

    async getAll(req, res) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (err) {
            console.log('Type getAll', err);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Type.destroy({where: {id}});
            return res.json('deleted');
        } catch (err) {
            console.log('Type delete', err);
        }
    }
}

module.exports = new TypeController();
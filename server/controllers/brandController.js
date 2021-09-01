const ApiError = require("../error/ApiError");
const {Brand} = require('../models/models');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) {
                return next(ApiError.badRequest('Название бренда не может быть пустым'));
            }

            const checkBrand = await Brand.findOne({where: {name}});
            if (checkBrand) {
                return next(ApiError.badRequest('Такой бренд уже существует'));
            }

            const brand = await Brand.create({name});

            return res.json(brand);
        } catch (err) {
            console.log('Brand create', err);
        }
    }

    async getAll(req, res) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch (err) {
            console.log('Brand getAll', err);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Brand.destroy({where: {id}});
            return res.json('deleted');
        } catch (err) {
            console.log('Brand delete', err);
        }
    }
}

module.exports = new BrandController();
const { BasketDevice, Device } = require("../models/models");

class BasketController {
    async create(req, res) {
        try {
            const {deviceId} = req.body;
            const device = await BasketDevice.create({basketId: req.user.id, deviceId});
            return res.json(device);
        } catch (err) {
            console.log('Basket create', err);
        }
    }

    async getAll(req, res) {
        try {
            const devices = await BasketDevice.findAll(
                {where: {basketId: req.user.id},
                include: {model: Device}
            });

            return res.json(devices);
        } catch (err) {
            console.log('Basket getAll', err);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await BasketDevice.destroy({where: {id}});
            return res.json('deleted');
        } catch (err) {
            console.log('Basket delete', err);
        }
    }
}

module.exports = new BasketController();
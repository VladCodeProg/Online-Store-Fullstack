const {v4} = require('uuid');
const path = require('path');
const fs = require('fs');
const ApiError = require('../error/ApiError');
const { Device, DeviceInfo, BasketDevice, Rating } = require('../models/models');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;

            if (!name || !price || !brandId || !typeId) {
                return next(ApiError.badRequest('Заполните все поля'));
            }

            const checkDevice = await Device.findOne({where: {name}});
            if (checkDevice) {
                return next(ApiError.badRequest('Устройство с таким названием уже существует'));
            }

            if (!img) {
                return next(ApiError.badRequest('Нет изображения'));
            }

            const fileName = `${v4()}.jpg`;

            fs.stat(path.resolve(__dirname, '..', 'static'), err => {
                if (err) {
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static'));
                }

                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            });

            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title.value,
                        description: i.description.value,
                        deviceId: device.id
                    });
                });
                
            }
            
            return res.json(device);
        } catch (err) {
            console.log('Device create', err);
        }
    }

    async getAll(req, res) {
        try {
            const {brandId, typeId, page, limit} = req.query;
            let devices;
            const offset = limit * page - limit

            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({offset, limit});
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, offset, limit});
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, offset, limit});
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {brandId, typeId}, offset, limit});
            }

            return res.json(devices);
        } catch (err) {
            console.log('Device getAll', err);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id},
                include: [{
                    model: DeviceInfo,
                    as: 'info'
                }]
            });
            return res.json(device);
        } catch (err) {
            console.log('Device getOne', err);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await BasketDevice.destroy({where: {deviceId: id}});
            await Rating.destroy({where: {deviceId: id}});
            await DeviceInfo.destroy({where: {deviceId: id}});
            const device = await Device.findOne({where: {id}});
            fs.unlinkSync(path.resolve(__dirname, '..' ,'static', device.img));
            device.destroy();
            return res.json('deleted');
        } catch (err) {
            console.log('Device delete', err);
        }
    }
}

module.exports = new DeviceController();
const ApiError = require("../error/ApiError");
const { Rating, Device } = require("../models/models");

class RatingController {
    async create(req, res) {
        try {
            const {deviceId, rate} = req.body;

            const newRate = await Rating.create({rate, deviceId, userId: req.user.id});
            const device = await Device.findOne({where: {id: deviceId}});
            const rates = await Rating.findAll({where: {deviceId}});
            const parsedRates = JSON.parse(JSON.stringify(rates));
            
            const ratesSum = parsedRates.reduce((total, r) => total + r.rate, 0)     
            const rating = ratesSum / parsedRates.length

            device.rating = rating.toFixed(1);
            await device.save();

            return res.json(newRate);
        } catch (err) {
            console.log('Rating create', err);
        }
    }

    async check(req, res, next) {
        try {
            const {id} = req.params;
            const rate = await Rating.findOne({where: {deviceId: id, userId: req.user.id}});

            return res.json(rate);
        } catch (err) {
            console.log('Rating check', err);
        }
    }
}

module.exports = new RatingController();
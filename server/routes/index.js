const Router = require('express');
const router = new Router();
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter);

module.exports = router;
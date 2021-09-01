const Router = require('express');
const ratingController = require('../controllers/ratingController');
const authCheckMiddleware = require('../middlewares/authCheckMiddleware');
const router = new Router();

router.post('/', authCheckMiddleware, ratingController.create);
router.get('/:id', authCheckMiddleware, ratingController.check);

module.exports = router;
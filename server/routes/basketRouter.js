const Router = require('express');
const basketController = require('../controllers/basketController');
const authCheckMiddleware = require('../middlewares/authCheckMiddleware');
const router = new Router();

router.post('/', authCheckMiddleware, basketController.create);
router.get('/', authCheckMiddleware, basketController.getAll);
router.delete('/:id', authCheckMiddleware, basketController.delete);

module.exports = router;
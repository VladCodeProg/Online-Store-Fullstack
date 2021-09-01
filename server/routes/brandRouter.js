const Router = require('express');
const brandController = require('../controllers/brandController');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');
const router = new Router();

router.post('/', roleCheckMiddleware('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', roleCheckMiddleware('ADMIN'), brandController.delete);

module.exports = router;
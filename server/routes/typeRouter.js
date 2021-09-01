const Router = require('express');
const typeController = require('../controllers/typeController');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');
const router = new Router();

router.post('/', roleCheckMiddleware('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', roleCheckMiddleware('ADMIN'), typeController.delete);

module.exports = router;
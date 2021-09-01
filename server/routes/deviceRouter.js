const Router = require('express');
const deviceController = require('../controllers/deviceController');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');
const router = new Router();

router.post('/', roleCheckMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id', roleCheckMiddleware('ADMIN'), deviceController.delete);

module.exports = router;
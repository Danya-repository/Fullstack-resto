const Router = require('express');
const router = new Router();
const vacancyController = require('../controllers/vacancyController')
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/', vacancyController.add)
router.get('/', vacancyController.getAll)
// router.get('/auth', vacancyMiddleware, userController.check)

module.exports = router
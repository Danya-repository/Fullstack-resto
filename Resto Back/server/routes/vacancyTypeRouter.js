const Router = require('express');
const router = new Router();
const vacancyTypeController = require('../controllers/vacancyTypeController')
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/', vacancyTypeController.add)
router.get('/', vacancyTypeController.getAll)

module.exports = router
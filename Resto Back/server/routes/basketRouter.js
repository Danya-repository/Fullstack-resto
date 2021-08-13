const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.add)
// router.delete('/', authMiddleware, basketController.remove)
router.get('/', authMiddleware, basketController.get)

module.exports = router


const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, reviewController.create)
router.post('/photos', authMiddleware, reviewController.photos)
router.get('/', reviewController.get)

module.exports = router


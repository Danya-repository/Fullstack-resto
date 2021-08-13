const Router = require('express');
const router = new Router();
const cuisineController = require('../controllers/сuisineController')

router.post('/', cuisineController.create)
router.get('/', cuisineController.getAll)

module.exports = router


const Router = require('express');
const router = new Router();
const proteinRouter = require('../controllers/proteinController')

router.post('/', proteinRouter.create)
router.get('/', proteinRouter.getAll)

module.exports = router
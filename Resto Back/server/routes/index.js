const Router = require('express');
const router = new Router();
const cuisineRouter = require('./сuisineRouter');
const proteinRouter = require('./proteinRouter');
const typeRouter = require('./typeRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const reviewRouter = require('./reviewRouter')
const vacancyRouter = require('./vacancyRouter')
const vacancyTypeRouter = require('./vacancyTypeRouter')

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/cuisine', cuisineRouter);
router.use('/protein', proteinRouter);
router.use('/product', productRouter);
router.use('/basket', basketRouter);
router.use('/review', reviewRouter)
router.use('/vacancies', vacancyRouter)
router.use('/vacancies_type', vacancyTypeRouter)

module.exports = router

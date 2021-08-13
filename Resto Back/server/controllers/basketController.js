const { Basket, Product } = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async add(req, res, next) {

        const productsFromReq = req.body.products
        const user_id = req.user.id

        const productsFromDB = await Basket.findAll({
            where: {
                user_id
            },
            raw: true,
            nest: true,
        })
        productsFromReq.length = +Array.from(Object.keys(productsFromReq)).length

        if (productsFromDB.length == 0 && productsFromReq.length != 0) {

            for (const id in productsFromReq) {

                if (id === "length") { continue }

                const product_id = id;
                const count = id.count;

                await Basket.create({
                    user_id,
                    product_id,
                    count
                })
            }

            return res.json({ "message": "Товары добавлены" })
        }

        if (productsFromDB.length != 0 && productsFromReq.length == 0) {

            await Basket.destroy({
                where: {
                    user_id,
                }
            })

            return res.json({ "message": "Товары удалены" })
            

            
        }


        for (const product in productsFromDB) {

            let { product_id } = productsFromDB[product];
            let include = product_id in productsFromReq ? true : false;

            if (include) {
                let count = productsFromReq[product_id].count

                await Basket.update({ count }, { where: { user_id, product_id } })

            }
            else {
                await Basket.destroy({
                    where: {
                        user_id,
                        product_id
                    }
                })
            }

        }
        outloop:
        for (let productInReq in productsFromReq) {

            if (productInReq === "length") { continue }

            let product_id = productInReq;
            let counter = 0; //technical var
            let count = productsFromReq[productInReq].count

            for (let productInDb of productsFromDB) {
                if (product_id == productInDb.product_id) {
                    continue outloop;
                }
                counter += 1;
            }

            if (counter === productsFromDB.length) {
                await Basket.create({
                    user_id,
                    product_id,
                    count
                })
            }

        }
        const productsAfterAdded = await Basket.findAll({
            where: { user_id },
            include: { 
                model: Product,
                attributes: ['name', 'price', 'type_id', 'img']
            } 
        })

        return res.json(productsAfterAdded)
        }

        async remove(req, res) {
            const products = req.body.products;
            const user_id = req.body.user_id
            console.log(products, user_id)
            for (let product of products) {
                const product_id = product.id;
                await Basket.destroy({ where: { user_id, product_id } })
            }

            return res.json({ "message": "Товары удалены" })
        }

        async get(req, res) {
            const user_id = req.user.id
            const productsInBasket = await Basket.findAll({
                where: { user_id },
                include: { 
                    model: Product,
                    attributes: ['name', 'price', 'type_id', 'img']
                } 
            })



            return await res.json(productsInBasket)
        }
    }

module.exports = new BasketController();
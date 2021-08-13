const uuid = require('uuid');
const path = require('path');
const Sequelize = require('sequelize')
const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        const productsFromRequest = req.body.products;
        const productsInValiable = [];
        const productsNotInvaliable = [];
        try {
            for (let product of productsFromRequest) {
                const { name, price, type, weight, cuisine, protein, img } = product
                const productsInDataBase = await Product.findAll({ where: { name } })

                if (Object.keys(productsInDataBase).length) {
                    productsInValiable.push(name)
                }
                else {
                    productsNotInvaliable.push(name)
                    await Product.create({ name, price, weight, cuisine_id: cuisine, type_id: type, protein_id: protein, img })
                }
            }
            return res.json({ "message": `Количество новых записей: ${productsNotInvaliable.length}. Новые записи: [${productsNotInvaliable}]` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getAll(req, res) {
        let { type, cuisine, protein, limit, page, min_price, max_price, name } = req.query

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const Op = Sequelize.Op;

        let products;

        if (name) {
            
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    name: {[Op.iLike]: `%${name}%`}
                },
                limit,
                offset
            })
            return res.json(products)
        }

        if(cuisine) {
            cuisine = cuisine.split(',')
        }

        

        // -----

        if (
            !type &&
            !cuisine &&
            !protein
        ) {
            products = await Product.findAndCountAll(
                {
                    attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                    where: {
                        [Op.and]: [
                            { price: { [Op.gte]: min_price } },
                            { price: { [Op.lte]: max_price } }
                        ]
                    },
                    limit,
                    offset
                });
        }

        // -----


        if (
            type &&
            !cuisine &&
            !protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    type_id: type,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }

        // -----


        if (
            !type &&
            cuisine &&
            !protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    cuisine_id: cuisine,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }
        // -----

        if (
            !type &&
            !cuisined &&
            protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    protein_id: protein,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }


        // -----


        if (
            type &&
            cuisine &&
            protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    type_id: type,
                    cuisine_id: cuisine,
                    protein_id: protein,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit, offset
            })
        }
        // -----

        if (
            type &&
            cuisine &&
            !protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    type_id: type,
                    cuisine_id: cuisine,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }

        // -----

        if (
            type &&
            !cuisine &&
            protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    type_id: type,
                    protein_id: protein,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }

        // -----

        if (
            !type &&
            cuisine &&
            protein
        ) {
            products = await Product.findAndCountAll({
                attributes: ['id', 'name', 'price', 'type_id', 'protein_id', 'cuisine_id', 'img'],
                where: {
                    cuisine_id: cuisine,
                    protein_id: protein,
                    [Op.and]: [
                        { price: { [Op.gte]: min_price } },
                        { price: { [Op.lte]: max_price } }
                    ]
                },
                limit,
                offset
            })
        }

        return res.json(products)
    }
}

module.exports = new ProductController();
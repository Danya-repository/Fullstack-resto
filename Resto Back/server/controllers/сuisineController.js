const {Сuisine} = require('../models/models')
const ApiError = require('../error/ApiError')

class СuisineController {
    async create(req, res, next) {
        const cuisines = req.body.cuisines
        const namesInValiable = [];
        const namesNotInValiable = [];

        for (let cuisine of cuisines) {
            const cuisineName = cuisine.name;
            const cuisinesInDataBase = await Сuisine.findAll({where: {name: cuisineName}});

            if (Object.keys(cuisinesInDataBase).length) {
                namesInValiable.push(cuisineName)
            }
            else {
                namesNotInValiable.push(cuisineName)
                await Сuisine.create({name: cuisineName})
            }
        }
        return res.json({"message": `Количество новых записей: ${namesNotInValiable.length}. Новые записи: [${namesNotInValiable}]`})
    }

    async getAll(req, res) {
        const types = await Сuisine.findAll();
        return res.json(types)
    }
}

module.exports = new СuisineController();
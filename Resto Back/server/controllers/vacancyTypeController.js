const { VacancyType } = require('../models/models')
const ApiError = require('../error/ApiError')

class VacancyTypeController {
    async add(req, res, next) {
        const types = req.body.types
        const namesInValiable = [];
        const namesNotInValiable = [];

        for (let type of types) {
            const typeName = type.name;
            const typesInDataBase = await VacancyType.findAll({ where: { name: typeName } });

            if (Object.keys(typesInDataBase).length) {
                namesInValiable.push(typeName)
            }
            else {
                namesNotInValiable.push(typeName)
                await VacancyType.create({ name: typeName })
            }
        }
        return res.json({ "message": `Количество новых записей: ${namesNotInValiable.length}. Новые записи: [${namesNotInValiable}]` })
    }

    async getAll(req, res) {
        const vacancyTypes = await VacancyType.findAll();
        return res.json(vacancyTypes)
    }
}

module.exports = new VacancyTypeController();
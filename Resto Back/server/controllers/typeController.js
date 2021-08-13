const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {

    async create(req, res) {
        const types = req.body.types
        const namesInValiable = [];
        const namesNotInValiable = [];

        for (let type of types) {
            const typeName = type.name;
            const typesInDataBase = await Type.findAll({ where: { name: typeName } });

            if (Object.keys(typesInDataBase).length) {
                namesInValiable.push(typeName)
            }
            else {
                namesNotInValiable.push(typeName)
                await Type.create({ name: typeName })
            }
        }
        return res.json({ "message": `Количество новых записей: ${namesNotInValiable.length}. Новые записи: [${namesNotInValiable}]` })

    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types)
    }
}

module.exports = new TypeController();
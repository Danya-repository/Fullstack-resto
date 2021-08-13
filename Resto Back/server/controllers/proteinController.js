const {Protein} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProteinController {
    async create(req, res, next) {
        const proteins = req.body.proteins 
        const namesInValiable = [];
        const namesNotInValiable = [];

        for (let protein of proteins) {
            const proteinName = protein.name;
            const proteinsInDataBase = await Protein.findAll({where: {name: proteinName}});

            if (Object.keys(proteinsInDataBase).length) {
                namesInValiable.push(proteinName)
            }
            else {
                namesNotInValiable.push(proteinName)
                await Protein.create({name: proteinName})
            }
        }
        return res.json({"message": `Количество новых записей: ${namesNotInValiable.length}. Новые записи: [${namesNotInValiable}]`})
    }

    async getAll(req, res) {
        const types = await Protein.findAll();
        return res.json(types)
    }
}

module.exports = new ProteinController();
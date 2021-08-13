const { Vacancy, VacancyType } = require('../models/models')
const ApiError = require('../error/ApiError')

class VacancyController {
    async add(req, res, next) {
        const vacancies = req.body.vacancies
        const newVacanciesCount = 0;
        const newVacancies = [];

        for (let vacancy of vacancies) {
            const vacancyName = vacancy.name;
            const vacancyText = vacancy.text;
            const vacancyType = vacancy.type;

            const vacanicesInDataBase = await Vacancy.findAll({ where: { name: vacancyName } });

            if (!Object.keys(vacanicesInDataBase).length) {
                newVacancies.push(vacancyName)
                await Vacancy.create({ name: vacancyName, text: vacancyText, type: vacancyType })
            }
        }
        return res.json({ "message": `Количество новых записей: ${newVacanciesCount}. Новые записи: [${newVacancies}]` })
    }

    async getAll(req, res) {
        const vacancies = await Vacancy.findAll({
            attributes: ['id', 'name', 'text'],
            include: [
                {
                  model: VacancyType,
                  attributes: [ 'name' ]
                }
              ]
        });
        return res.json(vacancies)
    }
}

module.exports = new VacancyController();
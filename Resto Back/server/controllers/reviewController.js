const {Review, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')

class ReviewController {
    async create(req, res, next) {
        const { review } = req.body
        const user_id = req.user.id

        const {rating, text, photos} = review
        const {name} = await User.findOne({where: {id: user_id}, raw: true});
        const reviewInDB = await Review.findOne({where: {user_id: user_id}});

        if (reviewInDB) {
            await Review.destroy({where: {user_id}})
            await Review.create({user_name: name, user_id, rating, photos, text});
        }
        else {
            await Review.create({user_name: name, user_id, rating, photos, text});
        }
        return res.json({"message": `success`});
    }

    async photos(req, res) {

        req.files.files.forEach(item => {
            item.mv(path.resolve(__dirname, '..', 'static/content', item.name))
        })
        return res.json({"message": `success`})
    }

    async get(req, res) {
        let {limit, page} = req.query

        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;

        let reviews = await Review.findAndCountAll({
            attributes: ['id', 'text', 'rating', 'photos', 'user_name', 'user_id'],
            limit,
            offset
        });

        return res.json(reviews)
    }
}

module.exports = new ReviewController();
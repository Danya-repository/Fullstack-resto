const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
})

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    type_id: { type: DataTypes.INTEGER, allowNull: false },
    protein_id: { type: DataTypes.INTEGER, allowNull: false },
    cuisine_id: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Сuisine = sequelize.define('сuisine', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Protein = sequelize.define('protein', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Review = sequelize.define('reviews', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING) },
    user_name: { type: DataTypes.STRING }
})

const Vacancy = sequelize.define('vacancy', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false }
})

const VacancyType = sequelize.define('vacancy_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

Basket.belongsTo(User, {
    foreignKey:
    {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Basket.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        type: DataTypes.INTEGER,
    }
})

Product.belongsTo(Type, {
    foreignKey:
    {
        name: 'type_id',
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Product.belongsTo(Сuisine, {
    foreignKey:
    {
        name: 'cuisine_id',
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Product.belongsTo(Protein, {
    foreignKey:
    {
        name: 'protein_id',
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Review.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Vacancy.belongsTo(VacancyType, {
    foreignKey:
    {
        name: 'type',
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})


module.exports = {
    User,
    Basket,
    Product,
    Type,
    Сuisine,
    Protein,
    Review,
    Vacancy,
    VacancyType
}

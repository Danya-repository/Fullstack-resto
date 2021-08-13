require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'client')))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.use(express.static(path.resolve(__dirname, 'static/content')))
app.use(express.static(path.resolve(__dirname, 'static/icons')))
app.use(fileUpload({}));
app.use('/api', router)

// Обработка ошибок
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is run! On port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()



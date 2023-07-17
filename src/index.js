const express = require('express')
const { PORT ,SYNC_DB} = require('./config/server-config')
const bodyParser = require('body-parser')
const app = express();
const sequelize = require('sequelize');
const db = require('./models/index');
const apiroutes = require('./routes/index');

const PrepareAndStartServer = async() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiroutes);
    if (SYNC_DB) {
       await db.sequelize.sync({ alter: true });
    }
    app.listen(PORT, () => {
        console.log(`server started on port : ${PORT}`);
    })
}
PrepareAndStartServer();
 
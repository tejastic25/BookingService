const express = require('express')
const { PORT } = require('./config/server-config')
const bodyParser = require('body-parser')
const app = express();

const PrepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`server started on port : ${PORT}`);
    })
}
PrepareAndStartServer();

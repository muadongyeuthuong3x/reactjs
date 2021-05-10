const express = require('express')
require('dotenv').config()
const cors = require('cors');
const morgan = require('morgan');
const databaseDB = require('./db/database');
const userrouter = require("./routers/Userrouter")
const app = express()
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

databaseDB()

app.use("/api",userrouter)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.debug('App listening');
});
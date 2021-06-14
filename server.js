const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database')
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(morgan('dev'));

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.set('port', 8000);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api", require('./router/Hang'))

app.use("/api", require('./router/Sanpham'))

app.use("/api", require('./router/User'))

app.use("/api/conversations", require('./router/iduserchatuser'))

app.listen(app.get('port'), function () {
    console.log('oke ' + app.get('port'));
  });
  
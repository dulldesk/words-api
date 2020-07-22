const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use('/', indexRouter);


module.exports = app;

const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
app.use(cors());

const randomRouter = require("./routes/random");
app.use('/', indexRouter);

app.get("/random/:type", randomRouter.genType);

app.get("/random/:type/:letter", randomRouter.genLetterOfType);


module.exports = app;

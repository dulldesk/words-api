const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const indexRouter = require('./routes/index');
const randomRouter = require("./routes/random");

app.use('/', indexRouter);

app.get("/random/:type", randomRouter.genType);
app.get("/random/:type/:letter", randomRouter.genLetterOfType);

app.use(function (req, res, next) {
	res.sendStatus(404);
});

app.use(function (err, req, res, next) {
	if (err) res.sendStatus(500);
});

module.exports = app;

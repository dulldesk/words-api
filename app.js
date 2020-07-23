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
	res.status(404).send("404 not found");
});

app.use(function (err, req, res, next) {
	if (err) res.status(500).send('500 server error');
});

module.exports = app;

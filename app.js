const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const indexRouter = require('./routes/index');
const randomRouter = require("./routes/random");

app.use('/random/:type', randomRouter);
app.use('/', indexRouter);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public"));

app.use(function (req, res, next) {
	res.sendStatus(404);
});

app.use(function (err, req, res, next) {
	if (err) res.sendStatus(500);
});

module.exports = app;

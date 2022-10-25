const express = require('express');
const connection = require("./connection");
const bugRoute = require('./routes/bugzilla');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/bugzilla', bugRoute);

module.exports = app;
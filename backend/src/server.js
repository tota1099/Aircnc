const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('config');

const app = express();

mongoose.connect(config.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

if(process.env.NODE_ENV === 'test'){
    module.exports = app;
} else {
    app.listen(3333);
}

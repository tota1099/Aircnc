const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const config = require('config');

const app = express();

mongoose.connect(config.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

if(process.env.NODE_ENV === 'test'){
    module.exports = app;
} else {
    app.listen(3333);
}

const express = require('express');
const mongodb = require('./data/database');

const app = express();

const port = process.env.port || 3000;

app.use('/', require('./routes'));


mongodb.intDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Running on port ${port}`) });
    }
})

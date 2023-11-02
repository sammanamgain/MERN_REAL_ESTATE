
const { mongoose } = require("mongoose");
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config({ path: './../.env' });

const app = express();
console.log(process.env.mongo, {
    useNewUrlParser: true,
    dbName: "real_estate"
});
mongoose
    .connect(process.env.mongo)
    .then(() => {
        console.log("connected");
    })
    .catch(e => {
        console.log(e);
    });


app.listen('3000', 'localhost', () => { console.log('listening on 3000 port') })
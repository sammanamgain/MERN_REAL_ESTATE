const cookieParser = require('cookie-parser');
const { mongoose } = require("mongoose");
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config({ path: './../.env' });
const user_router = require('./routes/user_routes');
const auth_router = require('./routes/auth_routes');
const listing_router = require('./routes/listing_router');
const app = express();


mongoose
    .connect(process.env.mongo
)
    .then(() => {
        console.log("connected");
    })
    .catch(e => {
        console.log(e);
    });
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', user_router);
app.use('/api/auth', auth_router);
app.use('/api/listing', listing_router);

app.listen('3000', 'localhost', () => { console.log('listening on 3000 port') })
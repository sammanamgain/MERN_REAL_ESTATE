const express = require('express');
const router = express.Router();
const sign = require('./../controller/authcontroller');


router.post('/signup', sign.signup);
module.exports= router;
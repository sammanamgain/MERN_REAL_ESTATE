const express = require('express');
const router = express.Router();
const sign = require('./../controller/authcontroller');
const handler=require('./../controller/errorhandling');

router.post('/signup', sign.signup,handler.handle);
module.exports= router;
const express = require('express');
const router = express.Router();
const sign = require('./../controller/authcontroller');

const handler=require('./../controller/errorhandling');
router.post('/google', sign.google, handler.handle);
router.post('/signup', sign.signup, handler.handle);
router.post('/signin', sign.signin, handler.handle);
module.exports = router;

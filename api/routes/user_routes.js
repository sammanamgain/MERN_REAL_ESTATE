const express = require('express');
const router = express.Router();
const usercontroller = require('./../controller/usercontroller');
const verify = require('./../utlility/verifyuser')

const handler = require('./../controller/errorhandling');
router.get('/test', usercontroller.gettest);
router.post('/update/:id', verify.verifyToken, usercontroller.updateuser, handler.handle)


module.exports = router;
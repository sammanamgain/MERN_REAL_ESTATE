const express = require('express');
const router = express.Router();
const usercontroller = require('./../controller/usercontroller');
const verify = require('./../utlility/verifyuser')

const handler = require('./../controller/errorhandling');
router.get('/test', usercontroller.gettest);
router.post('/update/:id', verify.verifyToken, usercontroller.updateuser, handler.handle)
router.delete('/delete/:id', verify.verifyToken, usercontroller.deleteuser, handler.handle)
router.get('/signout/:id', verify.verifyToken, usercontroller.signout, handler.handle)
router.get('/listing/:id', verify.verifyToken, usercontroller.listing, handler.handle)
router.get('/:id', verify.verifyToken, usercontroller.getUser, handler.handle)
module.exports = router;
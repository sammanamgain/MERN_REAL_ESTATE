const express = require('express');
const router = express.Router();
const usercontroller=require('./../controller/usercontroller');
router.get('/test', usercontroller.gettest);


module.exports = router;
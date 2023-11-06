const express = require('express');
const router = express.Router();
const handler = require('./../controller/errorhandling');
const listing = require('./../controller/listing');
const verify = require('./../utlility/verifyuser')
router.post('/create', verify.verifyToken, listing.createlisting, handler.handle)
module.exports = router;
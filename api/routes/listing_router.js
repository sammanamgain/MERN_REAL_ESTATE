const express = require('express');
const router = express.Router();
const handler = require('./../controller/errorhandling');
const listing = require('./../controller/listing');
const verify = require('./../utlility/verifyuser')
router.post('/create', verify.verifyToken, listing.createlisting, handler.handle)
router.delete('/delete/:id', verify.verifyToken, listing.delete, handler.handle)
router.post('/update/:id', verify.verifyToken, listing.updateListing, handler.handle)
module.exports = router;
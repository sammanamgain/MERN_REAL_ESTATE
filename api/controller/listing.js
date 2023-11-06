const LISTING = require('./../Models/listing_model');
exports.createlisting =async (req, res, next) => {
    try {

        const listing = await LISTING.create(req.body);
        return res.status(201).json(listing);
    }
    catch (e)
    {
        next(e);

    }
}
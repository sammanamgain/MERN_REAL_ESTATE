
const LISTING = require('./../Models/listing_model');
const custom = require('./../utlility/customerror');
exports.createlisting = async (req, res, next) => {
    try {

        const listing = await LISTING.create(req.body);
        return res.status(201).json(listing);
    }
    catch (e) {
        next(e);

    }
}
exports.delete = async (req, res, next) => {
    try {

        const data = await LISTING.findById(req.params.id);
        if (!data) {
            return next(custom.customerror(404, 'Not found'))
        }
        if (req.user.id !== data.userRef) {
            return next(custom.customerror(404, 'You can delete only your Account'))
        }
        await LISTING.findByIdAndDelete(req.params.id);
        res.status(200).json({ succes: true, message: 'List Deleted successfully' })


    }
    catch (e) {
        next(e);

    }
}

exports.updateListing = async (req, res, next) => {
    const listing = await LISTING.findById(req.params.id);
    if (!listing) {
        return next(custom.customerror(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(custom.customerror(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await LISTING.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }

        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

exports.getListing = async (req, res, next) => {
    try {
        const listing = await LISTING.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

exports.getallListing = async (req, res, next) => {
    try {
        console.log('search file called');
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        //undefined or false xa vane deutei dekha kina ki filter nagarda ta offer ko value nei hunna
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }
        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }
        let type = req.query.type;
        if (type === undefined || type === 'false') {
            type = { $in: ['sale', 'rent'] };
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const listing = await LISTING.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        }).sort({ [sort]: order }).limit(limit).skip(startIndex);
        console.log(listing);

        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
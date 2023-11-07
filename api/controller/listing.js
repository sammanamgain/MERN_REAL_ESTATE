
const LISTING = require('./../Models/listing_model');
const custom = require('./../utlility/customerror');
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
exports.delete = async (req, res, next) => {
    try {

        const data = await LISTING.findById(req.params.id);
        if (!data)
        {
            return next(custom.customerror(404,'Not found'))
        }
        if (req.user.id !== data.userRef)
        {
            return next(custom.customerror(404, 'You can delete only your Account'))
        }
        await LISTING.findByIdAndDelete(req.params.id);
        res.status(200).json({succes:true,message:'List Deleted successfully'})
            
            
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
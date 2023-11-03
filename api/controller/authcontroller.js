const User=require('./../Models/user_model')
exports.signup = async (req, res, next) => {
    console.log(req.body)
    try {
        const query=await User.create(req.body)
        res.status(201).json({ message: "success" })
    }
    catch (e) {
        next(e)
    }
    next();
}
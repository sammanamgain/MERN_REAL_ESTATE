const { customerror } = require("../utlility/customerror");
const jwt = require('jsonwebtoken');
const errorhandler = require("./errorhandling");
const bcrypt = require('bcryptjs');
const User = require('./../Models/user_model')

exports.gettest = (req, res) => {
    res.status(200).json({ message: "i am awesome" })
}
exports.updateuser =async (req,res,next) => {
    if (req.user.id === req.params.id)
    {
        return next(customerror(401,"you aren't allowed to update others id"))
    }
    try {
        if (req.body.password)
        {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avator: req.body.avator,
            }
        }, { new: true })
        const { password, ...rest } = updateuser._doc;
        res.status(200).json(rest);
    } catch (err)
    {
        next(err);
    }
}
const { customerror } = require("../utlility/customerror");
const jwt = require('jsonwebtoken');
const errorhandler = require("./errorhandling");
const bcrypt = require('bcryptjs');
const USER = require('./../Models/user_model');
const LISTING = require('./../Models/listing_model');

exports.gettest = (req, res) => {
    res.status(200).json({ message: "i am awesome" })
}
exports.updateuser = async (req, res, next) => {
    //console.log(req.user);
    //console.log(req.params.id)
    if (req.user.id !== req.params.id)
    {
        return next(customerror(401,"you aren't allowed to update others id"))
    }
    try {
        console.log("one");
        if (req.body.password)
        {
            let p1 = req.body.password.toString();
            req.body.password = bcrypt.hashSync(p1, 12);
        }
        //console.log(req.params.id);
        // console.log(req.body.username.toString());
        console.log(req.body.avator);
        let username, password1, avator, email;
        if (req.body.username) {
            console.log("username exists");
             username = req.body.username.toString();
        }
        if (req.body.email) {
            console.log("email exists");
             email = req.body.email.toString();
        }
        if (req.body.password) {
            console.log("pass exists");
             password1 = req.body.password.toString();
        }
        if (req.body.avator) {
            console.log("avator exists");
             avator = req.body.avator;
        }
        // const email = req.body.email.toString();
        // const password1 = req.body.password.toString();
        // const avator = req.body.avatar.toString();
             
        const updatedUser = await USER.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: username,
                    email: email,
                    password: password1,
                    avator: avator,
                },
            },
            { new: true }
        );
        console.log("hi");
        console.log(updatedUser);
        const { password, ...rest } = updatedUser._doc;
        console.log("printing rest");
        console.log(rest);
        res.status(200).json(rest);
    } catch (err)
    {
       
        next(err);
    }
}
exports.deleteuser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(customerror(401, "you aren't allowed to delete others id"))
    }
    try {
        await USER.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json({ success: true, message: "User has been deleted" });
        
    }
    catch (err)
    {
        
        next(err)

    }
}
exports.signout = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(customerror(401, "you aren't allowed to delete others id"))
    }
    try {
        
        res.clearCookie('access_token');
        res.status(200).json({ success: true, message: "User has been signout successfully" });

    }
    catch (err) {

        next(err)

    }
}
exports.listing = async (req, res, next) => {
 
    try {
        if (req.user.id !== req.params.id) {
            return next(customerror(401, "you aren't allowed to see  others id"))
        }
        const listing=await LISTING.find({ userRef:req.params.id })
     
        res.status(200).json({ success: true, data:listing });

    }
    catch (err) {

        next(err)

    }
}
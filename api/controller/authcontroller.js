const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../Models/user_model')
const custom = require('./../utlility/customerror');


exports.signup = async (req, res, next) => {
    let { username, email, password } = req.body;
    console.log(req.body);
    console.log(password);
    password = await bcrypt.hash(password, 12);

    console.log(req.body)
    try {
        const query=await User.create({username,email,password})
        res.status(201).json({ message: "success" });

    }
    catch (e) {
        next(e)
    }
    next();
}
exports.signin = async (req, res, next) => {
    let { email, password } = req.body;
  
    const query = await User.findOne({ email });
    if (!query) {
        return next(custom.customerror(404, 'user not found '))
        
    }
    const validpassword = await bcrypt.compareSync(password, query.password);
    if (!validpassword) {
        return next(custom.customerror(401, 'Wrong Password'));
    }
    const { password: pass, ...rest } = query._doc;
    const token = jwt.sign({ id: query._id }, process.env.jWT_SECRET);
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);


};
exports.google = async (req, res, next) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user)
        {
            console.log("user exists ")
            const { password, ...rest } = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.jWT_SECRET);
            console.log(rest);
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const password1 = await bcrypt.hash(generatedPassword, 12);
            const result = await User.create({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: password1, avator: req.body.photo });
            const { password, ...rest } = result._doc;
            const token = jwt.sign({ id: result._id }, process.env.jWT_SECRET);
            console.log(rest);
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    
    } catch (err) {
        console.log(err);
        next(err)
} 
}
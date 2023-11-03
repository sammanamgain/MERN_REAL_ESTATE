const bcrypt = require('bcryptjs');
const User = require('./../Models/user_model')

exports.signup = async (req, res, next) => {
    let { username, email, password } = req.body;
    console.log(req.body);
    console.log(password);
    password = await bcrypt.hash(password, 12);

    console.log(req.body)
    try {
        const query=await User.create({username,email,password})
        res.status(201).json({ message: "success" })
    }
    catch (e) {
        next(e)
    }
    next();
}
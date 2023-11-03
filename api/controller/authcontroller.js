const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../Models/user_model')
const customerror = require('./../utlility/customerror');


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
    const query = await User.findOne({ email: email});
    if (!query)
    {
        return next(customerror(404,'user not found '))
        
    }
    const validpassword = await bcrypt.compareSync(password, query.password);
    if (!validpassword) {
        return next(customerror(401, 'Wrong Password'));
    }
   const { password:pass, ...rest } = query._doc;
    const token = jwt.sign({ id: query._id }, process.env.jWT_SECRET);
    res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);


 }

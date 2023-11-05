const { customerror } = require("./customerror");
const jwt = require('jsonwebtoken');
const errorhandler=require("../controller/errorhandling");


exports.verifyToken = (req,res,next) => {
    const token = req.cookie.access_token;

    if (!token)
    {
        return errorhandler(customerror(401, 'unauthorized access'));
    }
    jwt.verify(token, process.env.jWT_SECRET, (err, user) => { 
        if (err)
        {
            return errorhandler(customerror(401, 'Invalid token'));
            
        }
        req.user = user;
    });
   
    next();
    
}
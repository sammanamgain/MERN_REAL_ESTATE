const { customerror } = require("./customerror");
const jwt = require('jsonwebtoken');
const errorhandler=require("./../controller/errorhandling");


exports.verifyToken = (req, res, next) => {
    console.log("verification token received");
    console.log(req.body);
    try {
        const token = req.cookies.access_token;
        console.log(token);

        if (!token) {
            console.log("not found");
            const e = customerror(401, 'unauthorized access');
            next(e);
        }
        jwt.verify(token, process.env.jWT_SECRET, (err, user) => {
            console.log("found");
            if (err) {
                return errorhandler.handle(customerror(401, 'Invalid token'));

            }
            console.log(user);
            req.user = user;
            next();

        });
        
    } catch (e)
    {
        
        console.log("catch block");
        console.log(e);
         res.status(500).json({message:"failed token" ,success:false})
    }
 
   
    
}
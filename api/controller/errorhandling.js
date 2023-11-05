exports.handle = (err, req, res) => {
    console.log("is this file called");
    console.log(err);
    
    const statuscode = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : "Internal Server Error";

    console.log(statuscode, message);
    res.status(statuscode).json({status:false, message });
    //next();
    
}
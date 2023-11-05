exports.handle = (err, req, res, next) => {
    console.log("is this file called");
    const statuscode = err.statuscode || 500;
    const message = err.message || err;
    res.status(statuscode).json({ status: false, message:message });
    next();
    
}
exports.handle = (err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || err;
    res.status(statuscode).json({ status: "failed", "messgae": message });
    next();
}
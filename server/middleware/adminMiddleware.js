const adminMiddleware = (req , res, next) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: " Access Denied. Admin only.",

        });
    }

    next();
}

module.exports = adminMiddleware;
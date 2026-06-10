const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req , res) => {
    res.json({
        message: "Admin Dashboard",
    })
})


module.exports = router;




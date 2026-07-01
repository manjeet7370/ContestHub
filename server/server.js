require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authMiddlewere = require("./middleware/authMiddleware")
const adminMiddleware = require("./middleware/adminMiddleware")

const authRoutes = require("./routes/authRoutes")
const contestRoutes = require("./routes/contestRoutes")
const problemRoutes = require("./routes/problemRoutes")
const submissionRoutes = require("./routes/submissionRoutes")
const {executeCode} = require("./services/piston")
const adminRoutes = require("./routes/adminRoutes");


const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/submission", submissionRoutes);

app.use("/api/admin", adminRoutes);
app.get("/test-run", async (req, res) => {
    try {
        const result = await executeCode(
            "javascript",
            `console.log("Hello ContestHub");`
        );

        res.json(result);
    } catch (err) {
    console.log("FULL ERROR:");
    console.log(err.response?.data);
    console.log(err.message);

    res.status(500).json({
        error: err.response?.data || err.message,
    });
}
});

app.get("/admin-test", authMiddlewere, adminMiddleware, (req, res) => {
    res.json({
        message: "Welcome Admin",
    });
})

app.get("/profile", authMiddlewere, (req, res) => {
    res.json({
        message: "profile Accessed",
        user: req.user,
    });
})

app.get("/", (req, res) => {
    res.send("ContestHub Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

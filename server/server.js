require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authMiddlewere = require("./middleware/authMiddleware")

const authRoutes = require("./routes/authRoutes")
const contestRoutes = require("./routes/contestRoutes")
const problemRoutes = require("./routes/problemRoutes")

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/problem", problemRoutes)

app.get("/profile", authMiddlewere, (req, res) => {
    res.json({
        message: "profile Accessed",
        user: req.user,
    });
})

app.get("/", (req, res) => {
    res.send("ContestHub Backend Running");
});

app.listen(5000 , ()=> {
    console.log("Server running on port 5000")
})

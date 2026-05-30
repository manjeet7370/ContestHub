const express = require("express");
const prisma = require("../prisma/prismaClient");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const contests = await prisma.contest.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.status(200).json(contests);
    }catch(err){
        console.log(err);
        
        return res.status(500).json({
            message: "Server Error",
        });
    }
})

router.post("/create", authMiddleware, async(req, res) => {
    try{
        const {
            title,
            description,
            startTime,
            endTime
        } = req.body;

        const contest = await prisma.contest.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                createdById: req.user.id,
            },
        });

        return res.status(201).json({
            message: "Contest created  successfully",
            contest,
        });
    }catch(err){
        console.log(err)

        return res.status(500).json({
            message : "server error",
        });
    }
});

module.exports = router;
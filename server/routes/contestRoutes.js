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


router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;

        const contest = await prisma.contest.findUnique({
            where: {
                id : Number(id),
            },
        });

        if(!contest){
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        return res.status(200).json({
             contest
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            message: "Server Error",
        })
    }
});

router.post("/create", authMiddleware, async(req, res) => {
    try{
        const {
            title,
            description,
            startTime,
            endTime
        } = req.body;

    if(!title || !description || !startTime || !endTime){
    return res.status(400).json({
        message: "All field are required"
    })
    }

     if(new Date(endTime) <= new Date(startTime)){
    res.status(400).json({
        message : "End time must be after start time"
    })
     }


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

router.get("/:id/problems", async (req , res) => {
    try{
        const {id} = req.params

        const problems = await prisma.problem.findMany({
            where: {
                contestId: Number(id)
            }
        });

        return res.status(200).json({
            problems
        });
    }catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;
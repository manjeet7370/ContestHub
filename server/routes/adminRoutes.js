const express = require("express");
const prisma = require("../prisma/prismaClient");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req , res) => {
    res.json({
        message: "Admin Dashboard",
    })
})

router.post(
    "/contest/create", authMiddleware, adminMiddleware,
   async (req, res) => {
     try{
        const {
            title,
            description,
            startTime,
            endTime,
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

        res.status(201).json({
            message: "Contest create successfully",
            contest,
        });
     }catch(err){
        console.log(err)
        
        res.status(500).json({
            message: "Server Error",
        });
     }

    }
)


router.post("/problem/create", authMiddleware, adminMiddleware, async(req, res) => {
    try{
        const {
           title,
           statement,
           difficulty,
           contestId,
        }  = req.body;

        const problem  = await prisma.problem.create({
            data: {
                title,
                statement,
                difficulty,
                contestId,
            },
        });

        res.status(201).json({
            message: "Problem created successfully",
            problem,
        });

    }catch(err){
       

        res.status(500).json({
            message: "Server Error",
        });
    }
})

router.post("/testcase/create", authMiddleware, adminMiddleware, 
    async (req , res) => {
        try{
            const {
                problemId,
                input,
                expectedOutput,
                explanation,
            } = req.body;

            const sampleCount = await prisma.testCase.count({
                where: {
                    problemId: Number(problemId),
                    isSample: true,
                },
            })

            const testCase = await prisma.testCase.create({
                data: {
                    problemId: Number(problemId),
                    input,
                    expectedOutput,
                    explanation,
                    isSample: sampleCount<3,
                },
            });

            res.status(201).json({
                message: "Test case created successfuly",
                testCase,
            });
        }catch(err){
          
            res.status(500).json({
                message: "Server Error",
            });
        }
    }
);




module.exports = router;




const express = require("express")
const prisma = require("../prisma/prismaClient")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create", authMiddleware , async (req, res) => {
    try{
        const{
            title,
            statement,
            difficulty,
            contestId
        } = req.body;
        // Required fields
        if(!title || !statement || !difficulty || !contestId){
            return res.status(400).json({
                message: "All field are required"
            })
        }
         // Difficulty validation
        const allowedDifficulties = ["Easy", "Medium", "Hard"];

        if(!allowedDifficulties.includes(difficulty)){
            return res.status(400).json({
                    message: " Invalid difficulty"
            })
        }

        // contest exist or not
        const contest = await prisma.contest.findUnique({
            where: {
                id: Number(contestId)
            }
        })

        if(!contest){
            return res.status(404).json({
                message: "Contest not found"
            })
        }

        const problem = await prisma.problem.create({
            data : {
                title,
                statement,
                difficulty,
                contestId: Number(contestId)
            }
        });

        return res.status(201).json({
            message: "Problem created  successfully",
            problem
        });
    }catch(err){
        console.log(err);

        return res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/:id/submissions", async (req, res) => {
    try{
        const {id} =  req.params
        const problem =  await prisma.problem.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!problem){
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const submissions = await prisma.submission.findMany({
            where : {
                problemId: Number(id)
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json({
            submissions
        })
    }catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Server Error"
        });
    }
})

router.get("/:id", async (req , res) => {
    try{
        
        const {id} = req.params;

        const problem = await prisma.problem.findUnique({
            where : {
                id : Number(id)
            }
        });

        if(!problem){
            return res.status(404).json({
                message: "problem not found"
            });
        }

        return res.status(200).json({
            problem
        });
    }catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router;
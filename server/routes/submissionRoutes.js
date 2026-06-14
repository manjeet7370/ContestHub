const express = require("express")
const prisma = require("../prisma/prismaClient")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();


router.post("/create", authMiddleware, async (req, res) => {
    try{
        const {
            problemId,
            language,
            code
        } = req.body;

        if(!problemId || !language || !code){
            return res.status(400).json({
                message : "All fields are required"
            });
        }

        const problem = await prisma.problem.findUnique({
            where : {
                id : Number(problemId)
            }
        });

        if(!problem){
            return res.status(404).json({
                message: "Problem not found"
            });
        }
        console.log(req.user);

        const submmision = await prisma.submission.create({
            data : {
                code,
                language,
                verdict: "PENDING",
                userId : req.user.id,
                problemId : Number(problemId)
            }
        });

        return res.status(201).json({
            message : "Submission created successfully",
            submmision
        });
    }catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Server Error"
        })
    }
})

router.get("/my", authMiddleware, async (req , res) => {
    try{
        const submission = await prisma.submission.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problem: true
            },
            
            orderBy: {
                id: "desc"
            }

        });

        return res.status(200).json({
            submission
        });
    }catch(err){
        console.log(err);

        return res.status(500).json({
            message: "Server Error"
        });
    }
})


module.exports = router
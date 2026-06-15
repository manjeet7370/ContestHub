const express = require("express")
const prisma = require("../prisma/prismaClient")
const authMiddleware = require("../middleware/authMiddleware")
const { submitCode, getSubmissionResult } = require("../services/judge0Service");

const router = express.Router();


router.post("/create", authMiddleware, async (req, res) => {
    try{
        const {
            problemId,
            language,
            code
        } = req.body;

        const languageMap = {
            'C++': 54,
            'Python': 71,
            'JavaScript': 63,
        };

        const languageId = languageMap[language]

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

        const testCase = await prisma.testCase.findFirst({
            where: {
                problemId: Number(problemId),
                isSample: false,
            }
        });
        if(!testCase){
          return res.status(400).json({
            message: "No hidden test case found"
         });
        }

        const token = await submitCode(
            code,
            languageId,
            testCase.input
        );
        console.log("Judge0 Token: ", token);

        await new Promise(resolve => 
            setTimeout(resolve, 3000)
        );

        const result = await getSubmissionResult(token);

        console.log("Expected Output:", testCase.expectedOutput);
        console.log("Actual Output:", result.stdout);
        console.log(result);
        console.log("Language:", language);
        console.log("Language ID:", languageId);

        // console.log(result)
        let verdict = "WRONG_ANSWER"
        if(result.stdout?.trim() === testCase.expectedOutput.trim()){
            verdict = "ACCEPTED";
        }



        const submmision = await prisma.submission.create({
            data : {
                code,
                language,
                verdict,
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
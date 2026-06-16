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

        const testCases = await prisma.testCase.findMany({
            where: {
                problemId: Number(problemId),
                isSample: false,
            }
        });
        if(testCases.length == 0){
          return res.status(400).json({
            message: "No hidden test case found"
         });
        }

        // const token = await submitCode(
        //     code,
        //     languageId,
        //     testCase.input
        // );
        // console.log("Judge0 Token: ", token);

        // await new Promise(resolve => 
        //     setTimeout(resolve, 3000)
        // );

        // const result = await getSubmissionResult(token);

        // console.log("Expected Output:", testCase.expectedOutput);
        // console.log("Actual Output:", result.stdout);
        // console.log(result);
        // console.log("Language:", language);
        // console.log("Language ID:", languageId);

        // console.log(result)
        let verdict = "ACCEPTED";
        let errorMessage = null;
        for(const testCase of testCases){
            const  token = await submitCode(
                code,
                languageId,
                testCase.input
            );

            await new Promise(resolve => 
                setTimeout(resolve, 3000)
            );
           console.log("Language:", language);
          console.log("Language ID:", languageId);
         console.log("Code:", code);
            const result = await getSubmissionResult(token);
            console.log(result)

            // if(result.compile_output){
            //     verdict = "COMPILATION_ERROR "
            //     break;
            // }

            // if(result.stderr){
            //     verdict="RUNTIME_ERROR"
            //     break;
            // }
if(result.status.id === 6){
    verdict = "COMPILATION_ERROR";

    errorMessage = Buffer.from(
        result.compile_output,
        "base64"
    ).toString("utf-8");

    break;
}

if(result.status.id === 11){
    verdict = "RUNTIME_ERROR";

    errorMessage = Buffer.from(
        result.stderr,
        "base64"
    ).toString("utf-8");

    break;
}
            console.log(result.status);
let actualOutput = "";

if(result.stdout){
    actualOutput = Buffer.from(
        result.stdout,
        "base64"
    ).toString("utf-8");
}

console.log("Expected:", testCase.expectedOutput);
console.log("Actual:", actualOutput);

if(actualOutput.trim() !== testCase.expectedOutput.trim()){
    verdict = "WRONG_ANSWER";
    break;
}
        }

        console.log(verdict)

      

        const submission = await prisma.submission.create({
            data : {
                code,
                language,
                verdict,
                errorMessage,
                userId : req.user.id,
                problemId : Number(problemId)
            }
        });


        return res.status(201).json({
            message : "Submission created successfully",
            submission
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
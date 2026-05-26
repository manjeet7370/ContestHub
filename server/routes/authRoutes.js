const express = require("express")
const bcrypt = require("bcrypt")
const prisma = require("../prisma/prismaClient")

const router = express.Router()

router.post("/register", async (req, res) => {
    try{
        const {name , email , password} = req.body;

        const existingUser = await prisma.client.findUnique({
            where: {email}
        });

        if (existingUser){
            return res.status(400).json({
                message: " User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.client.create({
            data : {
                name,
                email,
                password : hashedPassword,
            },
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

module.exports = router;
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";
import dotenv from "dotenv"

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const user = await userModel.findOne({ username });

        if (user) {
            console.log("User already exists:", user);
            res.status(409).json({ message: "User already exists" });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = new userModel({ username, password: hashedPass });
            await newUser.save();

            res.json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token, userID: user._id });
});


export { router as userRouter };

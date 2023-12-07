import { postModel } from "../models/posts.js"
import express from "express"


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await postModel.find({});
        res.json(response)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.post("/", async (req, res) => {
    const post = new postModel(req.body)
    try {
        const response = await post.save();
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export { router as postsRouter }


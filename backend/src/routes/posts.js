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

// router.put("/:postId", async (req, res) => {
//     const postId = req.params.postId;
//     const updatedData = req.body;

//     try {
//         const updatedPost = await postModel.findByIdAndUpdate(postId, updatedData, { new: true });

//         if (!updatedPost) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.json(updatedPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

export { router as postsRouter }


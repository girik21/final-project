import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: { type: String, required: true },
    details: { type: String, requied: true },
    imageUrl: { type: String, required: true },
    datePosted: { type: Date, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const postModel = mongoose.model("posts", postSchema)
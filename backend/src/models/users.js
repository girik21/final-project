import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }]
});

export const userModel = mongoose.model("users", userSchema)
import React, { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/getUserSession.js";
import { useNavigate } from "react-router-dom"
import "../styles/createPosts.css";

export const Create = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [post, setPosts] = useState({
        title: "",
        rating: "",
        details: "",
        imageUrl: "",
        datePosted: 0,
        userOwner: userID,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        const updatedValue = name === 'datePosted' ? new Date(value).getTime() : value;

        setPosts({ ...post, [name]: updatedValue });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://127.0.0.1:8080/posts", post)
            alert("Post created");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <div className="Formcontainer">
            <form className="create-post-form" onSubmit={onSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" onChange={handleChange} required />

                <label htmlFor="rating">Rating:</label>
                <input type="text" id="rating" name="rating" onChange={handleChange} required />

                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" rows="6" onChange={handleChange} required></textarea>

                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} required />

                <label htmlFor="datePosted">Date Posted:</label>
                <input type="date" id="datePosted" name="datePosted" onChange={handleChange} required />

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

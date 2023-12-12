import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css'; 

export const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8080/posts');
                setPosts(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="item_container">
            <div className='bannerContainer'>
                <h3 className='bannerText'>This is a safe space for people to review your good and bad landlords <br/><br />Happy Reviewing</h3>
            </div>
            <p className='main-title'>Recent Posts</p>
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post._id} className="post-item">
                        <div className="post-details">
                            <h2>{post.title}</h2>
                            <p className="post-rating">Rating: {post.rating} / 5</p>
                            <p className="post-description">Description: {post.details}</p>
                            <img src={post.imageUrl} alt="Post Image" className="post-image" />
                            <p className="post-date">Date Posted: {new Date(post.datePosted).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

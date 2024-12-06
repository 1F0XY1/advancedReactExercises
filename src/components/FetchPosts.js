import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./FetchPosts.css";

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fetch-posts-container">
      <Link to="/" className="back-button">Back</Link> 

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div>
          <h2>Post Titles</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchPosts;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DynamicFetch.css";

const DynamicFetch = () => {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    if (!userId) {
      setError("There is no such a user's id. Please enter a valid User id.");
      return;
    }

    setLoading(true);
    setError(null);
    setPosts([]);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setError("No posts found for the provided User ID.");
        } else {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="dynamic-fetch-container">
      <Link to="/" className="back-button">Back</Link>
      <h2>Dynamic Data Fetching</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="user-id-input"
        />
        <button onClick={fetchPosts} className="fetch-button">Fetch Posts</button>
      </div>
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {posts.length > 0 && (
        <div className="posts-container">
          <h3>Posts for User {userId}</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DynamicFetch;

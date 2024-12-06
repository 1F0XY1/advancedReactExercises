import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchablePosts.css";

const SearchablePosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="searchable-posts-container">
      <Link to="/" className="back-button">Back</Link>
      <br/> 
      <input
        type="text"
        placeholder="Search posts by title"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchablePosts;

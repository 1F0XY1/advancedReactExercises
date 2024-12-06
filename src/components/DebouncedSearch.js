import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DebouncedSearch.css";

const DebouncedSearch = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setPosts([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((data) => {
        const filteredPosts = data.filter((post) =>
          post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setPosts(filteredPosts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [debouncedQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Link to="/" className="back-button">Back</Link>
      <h2>Debounced Search for Posts</h2>
      <input
        type="text"
        placeholder="Search posts by title"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts.length === 0 && !loading && !error && <p>No posts found.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearch;

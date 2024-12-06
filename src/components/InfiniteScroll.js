import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1); 
  const observer = useRef(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return; 
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page.current}&_limit=10`);
      const newPosts = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
      if (newPosts.length < 10) {
        setHasMore(false);
      }
      page.current += 1;
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const lastPostElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPosts();
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="infinite-scroll-container">
      <Link to="/" className="back-button">Back</Link>
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <li key={post.id} ref={lastPostElementRef}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            );
          } else {
            return (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            );
          }
        })}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
};

export default InfiniteScroll;

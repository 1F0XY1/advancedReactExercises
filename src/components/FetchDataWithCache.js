import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FetchDataWithCache.css"

const FetchDataWithCache = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheMessage, setCacheMessage] = useState("");

  useEffect(() => {
    const cachedData = localStorage.getItem("usersData");

    if (cachedData) {
      setUsers(JSON.parse(cachedData));
      setLoading(false);
      setCacheMessage("Fetched from cache.");
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data.");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
          setCacheMessage("Fetched from API.");
          localStorage.setItem("usersData", JSON.stringify(data));
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  const clearCache = () => {
    localStorage.removeItem("usersData");
    setCacheMessage("Cache cleared. Please refresh to fetch from API.");
    setUsers([]);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Link to="/" className="back-button">Back</Link>
      <h2>User List</h2>
      <p>{cacheMessage}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={clearCache}>Clear Cache</button>
    </div>
  );
};

export default FetchDataWithCache;

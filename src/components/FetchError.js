import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FetchError.css";

const FetchError = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch("https://jsonplaceholder.typicode.com/invalid-endpoint")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="fetch-error-container">
      <Link to="/" className="back-button">Back</Link>
      <h2>Handle API Errors Gracefully</h2>
      <button onClick={fetchData} className="retry-button">Retry</button>
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {data && (
        <div className="data-display">
          <h3>Fetched Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FetchError;

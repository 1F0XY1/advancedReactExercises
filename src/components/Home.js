import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Fetching Exercises</h1>
      <ul>
        <li><Link to="/fetch-users">Fetch and Display Users</Link></li>
        <li><Link to="/fetch-posts">Fetch Posts Dynamically</Link></li>
        <li><Link to="/fetch-error">Handle API Errors</Link></li>
        <li><Link to="/dynamic-fetch">Dynamic Data Fetching</Link></li>
        <li><Link to="/paginated-users">Paginated Users</Link></li>
        <li><Link to="/searchable-posts">Search Posts</Link></li>
        <li><Link to="/fetch-data-with-cache">Fetch Data and Cache Results</Link></li>
        <li><Link to="/fetch-user-details">Fetch User Details</Link></li>
        <li><Link to="/debounced-search">Debounced Search</Link></li>
        <li><Link to="/infinite-scroll">Infinite Scroll</Link></li>
        <li><Link to="/auth">Register, Login, Logout</Link></li>
      </ul>
    </div>
  );
};

export default Home;

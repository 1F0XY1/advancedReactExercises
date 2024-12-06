import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PaginateUsers.css";

const PaginatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="paginated-users-container">
      <Link to="/" className="back-button">Back</Link>
      <h2>Paginated Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {currentUsers.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedUsers;

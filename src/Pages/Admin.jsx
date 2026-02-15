import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        
        {/* HEADER */}
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage MoviesWeb platform efficiently</p>
        </header>

        {/* STATS */}
        <section className="admin-stats">
          <div className="stat-card highlight">
            <h3>Total Movies</h3>
            <p>128</p>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>2,540</p>
          </div>

          <div className="stat-card">
            <h3>Total Reviews</h3>
            <p>8,920</p>
          </div>
        </section>

        {/* ACTIONS */}
        <section className="admin-actions">
          <h2>Admin Controls</h2>

          <div className="action-grid">
            <div className="action-card">
              <h3>Add Movie</h3>
              <p>Create and publish new movies</p>
              <button>Add Movie</button>
            </div>

            <div className="action-card">
              <h3>Manage Movies</h3>
              <p>Edit or remove existing movies</p>
              <button>Manage</button>
            </div>

            <div className="action-card">
              <h3>Manage Users</h3>
              <p>View, block or remove users</p>
              <button className="danger">Users</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;

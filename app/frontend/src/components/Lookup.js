import React from "react";
import "./Lookup.css";

function Lookup() {
  return (
    <div className="lookup-container">
      <header className="lookup-header">
        <h1>Lookup Records</h1>
      </header>

      <form className="lookup-form">
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <section className="lookup-section">
        <h2>Search Results</h2>
        <table className="lookup-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with dynamic data if needed */}
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Lookup;

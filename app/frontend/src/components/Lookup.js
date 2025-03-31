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
          <label htmlFor="caseId">Case ID</label>
          <input
            type="text"
            id="caseId"
            name="caseId"
            placeholder="Enter case ID"
          />
        </div>
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" />
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

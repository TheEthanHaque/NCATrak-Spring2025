import React from "react";
import "./PeopleInterface.css";

function PeopleInterface() {
  return (
    <div className="people-case-container">
      <header className="people-case-header">
        <h1>People Associated with Case</h1>
      </header>

      <form className="people-case-form">
        {/* 1. People Associated with Case Section */}
        <section className="pc-section">
          <div className="pc-actions">
            <button type="button" className="pc-add-button">
              Add
            </button>
          </div>
          <table className="pc-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Name</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>Role</th>
                <th>Relationship To Victim</th>
                <th>Same Household</th>
                <th>Custody</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row (replace or remove as needed) */}
              <tr>
                <td>
                  <button type="button" className="pc-edit-button">
                    Edit
                  </button>
                  <button type="button" className="pc-bio-button">
                    Bio
                  </button>
                </td>
                <td>Test 12345</td>
                <td>25</td>
                <td>01/01/2000</td>
                <td>Alleged Victim / Client</td>
                <td>Self</td>
                <td>Yes</td>
                <td>Unknown</td>
              </tr>
              {/* If there are no items, you can render a single row with a colSpan */}
            </tbody>
          </table>

          {/* Alleged Offender Name Unknown Checkbox + Comments */}
          <div className="pc-checkbox-row">
            <label>
              <input type="checkbox" name="allegedOffenderUnknown" />
              Alleged Offender Name Unknown
            </label>
          </div>
          <div className="pc-comments-row">
            <label htmlFor="unknownComments">
              Alleged Offender Unknown Comments
            </label>
            <textarea
              id="unknownComments"
              name="unknownComments"
              placeholder="Enter any additional information here..."
            />
          </div>
        </section>

        {/* 2. Document Upload Section */}
        <section className="pc-section">
          <h2>Document Upload</h2>
          <table className="pc-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>User</th>
                <th>Page</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. Save/Cancel Buttons */}
        <div className="pc-form-buttons">
          <button type="submit" className="save-button">
            SAVE
          </button>
          <button type="button" className="cancel-button">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default PeopleInterface;

import React from "react";
import "./TreatmentPlan.css";

function TreatmentPlan() {
  return (
    <div className="container">
      <header className="header">
        <h1>Mental Health Treatment Plan</h1>
        <p className="subtitle">
          Manage your treatment plan details and documents below.
        </p>
      </header>

      <div className="button-group">
        <button className="add-button">+ Add New Treatment Plan</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Planned Start Date</th>
            <th>Treatment Model</th>
            <th>Name</th>
            <th>Provider Agency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-04-01</td>
            <td>Cognitive Behavioral Therapy</td>
            <td>John Doe</td>
            <td>Agency XYZ</td>
          </tr>
        </tbody>
      </table>

      {/* Uploaded Documents Section */}
      <div className="uploaded-documents">
        <h3 className="documents-title">Uploaded Documents</h3>
        <div className="documents-grid">
          <div className="grid-header">
            <span>File Name</span>
            <span>Upload Date</span>
            <span>User</span>
            <span>Page</span>
            <span>Size</span>
          </div>
          <div className="no-items">No items to display</div>
          <button className="select-files-button">Select Files...</button>
          <p className="file-size-info">
            Maximum allowed file size is <strong>10 MB</strong>.
          </p>
          <p className="storage-warning">
            NCA does not recommend the storage of evidentiary documents as part
            of this case record. Any copies of evidentiary materials should be
            retained by the appropriate law enforcement and prosecution
            partners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TreatmentPlan;

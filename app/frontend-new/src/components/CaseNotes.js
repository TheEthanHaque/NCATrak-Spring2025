import React, { useState } from "react";
import "./CaseNotes.css";

const CaseNotes = () => {
  const [formData, setFormData] = useState({
    caseId: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="case-notes-container">
      <h2 className="case-notes-title">Case Notes</h2>
      <form onSubmit={handleSubmit} className="case-notes-form">
        <div>
          <label className="form-label">Case ID:</label>
          <input
            type="text"
            name="caseId"
            value={formData.caseId}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Case ID"
          />
        </div>
        <div>
          <label className="form-label">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Notes:</label>
          <textarea
            name="notes"
            rows="5"
            value={formData.notes}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter detailed notes here..."
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
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
};

export default CaseNotes;

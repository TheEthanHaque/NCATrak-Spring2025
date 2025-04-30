// src/components/CaseNotes.js
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
    <div className="case-notes-container" data-aoi="Case Notes Container">
      <h2 className="case-notes-title" data-aoi="Case Notes Header">
        Case Notes
      </h2>
      <form
        onSubmit={handleSubmit}
        className="case-notes-form"
        data-aoi="Case Notes Form"
      >
        <div>
          <label className="form-label" data-aoi="Case ID Label">
            Case ID:
          </label>
          <input
            type="text"
            name="caseId"
            value={formData.caseId}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Case ID"
            data-aoi="Case ID Input"
          />
        </div>
        <div>
          <label className="form-label" data-aoi="Date Label">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            data-aoi="Date Input"
          />
        </div>
        <div>
          <label className="form-label" data-aoi="Notes Label">
            Notes:
          </label>
          <textarea
            name="notes"
            rows="5"
            value={formData.notes}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter detailed notes here..."
            data-aoi="Notes Textarea"
          ></textarea>
        </div>
        <button
          type="submit"
          className="submit-button"
          data-aoi="Submit Button"
        >
          Submit
        </button>
      </form>

      <div
        className="uploaded-documents"
        data-aoi="Uploaded Documents Section"
      >
        <h3 className="documents-title" data-aoi="Uploaded Documents Header">
          Uploaded Documents
        </h3>
        <div className="documents-grid" data-aoi="Uploaded Documents Grid">
          <div className="grid-header" data-aoi="Uploaded Documents Grid Header">
            <span data-aoi="Upload Table Header File Name">File Name</span>
            <span data-aoi="Upload Table Header Upload Date">Upload Date</span>
            <span data-aoi="Upload Table Header User">User</span>
            <span data-aoi="Upload Table Header Page">Page</span>
            <span data-aoi="Upload Table Header Size">Size</span>
          </div>
          <div className="no-items" data-aoi="No Uploaded Documents">
            No items to display
          </div>
          <button
            className="select-files-button"
            data-aoi="Select Files Button"
          >
            Select Files...
          </button>
          <p className="file-size-info" data-aoi="File Size Info">
            Maximum allowed file size is <strong>10 MB</strong>.
          </p>
          <p className="storage-warning" data-aoi="Storage Warning">
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

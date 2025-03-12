import React, { useState } from "react";
import "./MHAssessment.css";

const MHAssessment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    assessmentDate: "",
    symptoms: "",
    diagnosis: "",
    treatmentPlan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="mh-container">
      <div className="mh-card">
        <h2 className="mh-title">Mental Health Assessment</h2>
        <form onSubmit={handleSubmit} className="mh-form">
          <div className="mh-form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
          </div>
          <div className="mh-form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>
          <div className="mh-form-group">
            <label>Assessment Date</label>
            <input
              type="date"
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleChange}
            />
          </div>
          <div className="mh-form-group">
            <label>Symptoms</label>
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter symptoms"
            />
          </div>
          <div className="mh-form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
            />
          </div>
          <div className="mh-form-group">
            <label>Treatment Plan</label>
            <input
              type="text"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              placeholder="Enter treatment plan"
            />
          </div>
          <button type="submit" className="mh-submit-button">
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
              NCA does not recommend the storage of evidentiary documents as
              part of this case record. Any copies of evidentiary materials
              should be retained by the appropriate law enforcement and
              prosecution partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MHAssessment;

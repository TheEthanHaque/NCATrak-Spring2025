// src/components/MHAssessment.js
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
    <div className="mh-container" data-aoi="MH Assessment Container">
      <div className="mh-card" data-aoi="MH Assessment Card">
        <h2 className="mh-title" data-aoi="MH Assessment Header">
          Mental Health Assessment
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mh-form"
          data-aoi="MH Assessment Form"
        >
          <div className="mh-form-group" data-aoi="Patient Name Group">
            <label data-aoi="Patient Name Label">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              data-aoi="Patient Name Input"
            />
          </div>
          <div className="mh-form-group" data-aoi="Age Group">
            <label data-aoi="Age Label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              data-aoi="Age Input"
            />
          </div>
          <div className="mh-form-group" data-aoi="Assessment Date Group">
            <label data-aoi="Assessment Date Label">Assessment Date</label>
            <input
              type="date"
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleChange}
              data-aoi="Assessment Date Input"
            />
          </div>
          <div className="mh-form-group" data-aoi="Symptoms Group">
            <label data-aoi="Symptoms Label">Symptoms</label>
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter symptoms"
              data-aoi="Symptoms Input"
            />
          </div>
          <div className="mh-form-group" data-aoi="Diagnosis Group">
            <label data-aoi="Diagnosis Label">Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              data-aoi="Diagnosis Input"
            />
          </div>
          <div className="mh-form-group" data-aoi="Treatment Plan Group">
            <label data-aoi="Treatment Plan Label">Treatment Plan</label>
            <input
              type="text"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              placeholder="Enter treatment plan"
              data-aoi="Treatment Plan Input"
            />
          </div>
          <button
            type="submit"
            className="mh-submit-button"
            data-aoi="Submit Button"
          >
            Submit
          </button>
        </form>

        <div className="uploaded-documents" data-aoi="Uploaded Documents Section">
          <h3 className="documents-title" data-aoi="Uploaded Documents Header">
            Uploaded Documents
          </h3>
          <div className="documents-grid" data-aoi="Documents Grid">
            <div className="grid-header" data-aoi="Documents Grid Header">
              <span data-aoi="Upload Table Header File Name">File Name</span>
              <span data-aoi="Upload Table Header Upload Date">Upload Date</span>
              <span data-aoi="Upload Table Header User">User</span>
              <span data-aoi="Upload Table Header Page">Page</span>
              <span data-aoi="Upload Table Header Size">Size</span>
            </div>
            <div className="no-items" data-aoi="No Documents Row">
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

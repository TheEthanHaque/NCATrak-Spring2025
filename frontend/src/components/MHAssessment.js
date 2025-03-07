import React, { useState } from "react";

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
    <div className="container">
      <h2>Mental Health Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Assessment Date:</label>
          <input type="date" name="assessmentDate" value={formData.assessmentDate} onChange={handleChange} />
        </div>
        <div>
          <label>Symptoms:</label>
          <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} />
        </div>
        <div>
          <label>Diagnosis:</label>
          <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
        </div>
        <div>
          <label>Treatment Plan:</label>
          <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MHAssessment;

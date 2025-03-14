import React, { useState } from "react";

const MHBasicInterface = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    dateOfBirth: "",
    diagnosis: "",
    medications: "",
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
      <h2>Mental Health Basic Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} />
        </div>
        <div>
          <label>Patient Name:</label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div>
          <label>Primary Diagnosis:</label>
          <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
        </div>
        <div>
          <label>Current Medications:</label>
          <input type="text" name="medications" value={formData.medications} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MHBasicInterface;

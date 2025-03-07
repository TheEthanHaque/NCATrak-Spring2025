import React, { useState } from "react";

const GeneralTab = () => {
  const [formData, setFormData] = useState({
    caseId: "",
    clientName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
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
      <h2>General Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Case ID:</label>
          <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} />
        </div>
        <div>
          <label>Client Name:</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GeneralTab;

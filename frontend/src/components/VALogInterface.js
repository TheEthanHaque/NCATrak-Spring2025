import React, { useState } from "react";

const VALogInterface = () => {
  const [formData, setFormData] = useState({
    caseId: "",
    veteranName: "",
    serviceBranch: "",
    dischargeStatus: "",
    benefitsReceived: "",
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
      <h2>VA Log Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>VA Case ID:</label>
          <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} />
        </div>
        <div>
          <label>Veteran Name:</label>
          <input type="text" name="veteranName" value={formData.veteranName} onChange={handleChange} />
        </div>
        <div>
          <label>Service Branch:</label>
          <input type="text" name="serviceBranch" value={formData.serviceBranch} onChange={handleChange} />
        </div>
        <div>
          <label>Discharge Status:</label>
          <input type="text" name="dischargeStatus" value={formData.dischargeStatus} onChange={handleChange} />
        </div>
        <div>
          <label>Benefits Received:</label>
          <input type="text" name="benefitsReceived" value={formData.benefitsReceived} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VALogInterface;

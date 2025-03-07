import React, { useState } from "react";

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
    <div className="container">
      <h2>Case Notes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Case ID:</label>
          <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label>Notes:</label>
          <textarea name="notes" rows="5" value={formData.notes} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CaseNotes;

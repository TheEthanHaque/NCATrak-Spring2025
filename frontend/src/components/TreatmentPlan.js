import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const TreatmentPlan = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Form data for adding treatment plans
  const [formData, setFormData] = useState({
    startDate: "",
    treatmentModel: "",
    providerAgency: "",
  });

  // Fetch treatment plans from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/treatment-plans")
      .then((response) => response.json())
      .then((data) => setTreatmentPlans(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new treatment plan
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/add-treatment-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTreatmentPlans([...treatmentPlans, formData]);
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload document to backend
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://localhost:5000/api/upload-document", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("File uploaded successfully!");
        console.log("Uploaded:", data);
        setSelectedFile(null);
      })
      .catch((error) => console.error("Upload error:", error));
  };

  return (
    <div className="container">
      <h2>Mental Health Treatment Plan</h2>

      {/* Treatment Plans Table */}
      <div className="treatment-plans">
        <button onClick={() => setIsModalOpen(true)}>+ Add New Treatment Plan</button>
        <table>
          <thead>
            <tr>
              <th>Planned Start Date</th>
              <th>Treatment Model Name</th>
              <th>Provider Agency</th>
            </tr>
          </thead>
          <tbody>
            {treatmentPlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.startDate}</td>
                <td>{plan.treatmentModel}</td>
                <td>{plan.providerAgency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Upload Section */}
      <div className="document-upload">
        <h3>Upload Treatment Document</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>

      {/* Modal for Adding New Treatment Plan */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h3>Add New Treatment Plan</h3>
        <form onSubmit={handleSubmit}>
          <label>Planned Start Date:</label>
          <input type="date" name="startDate" onChange={handleChange} required />

          <label>Treatment Model Name:</label>
          <input type="text" name="treatmentModel" onChange={handleChange} required />

          <label>Provider Agency:</label>
          <input type="text" name="providerAgency" onChange={handleChange} required />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default TreatmentPlan;

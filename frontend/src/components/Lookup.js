import React, { useState } from "react";

const Lookup = () => {
  const [searchParams, setSearchParams] = useState({
    caseId: "",
    firstName: "",
    lastName: "",
    dob: "",
  });
  const [results, setResults] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // Perform database search
  const handleSearch = () => {
    fetch(`http://localhost:5000/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchParams),
    })
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Fetch full record details
  const viewDetails = (caseId) => {
    fetch(`http://localhost:5000/api/get-record/${caseId}`)
      .then((response) => response.json())
      .then((data) => setSelectedRecord(data))
      .catch((error) => console.error("Error fetching details:", error));
  };

  return (
    <div className="container">
      <h2>Lookup Records</h2>

      <div>
        <label>Case ID:</label>
        <input type="text" name="caseId" value={searchParams.caseId} onChange={handleChange} />

        <label>First Name:</label>
        <input type="text" name="firstName" value={searchParams.firstName} onChange={handleChange} />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={searchParams.lastName} onChange={handleChange} />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={searchParams.dob} onChange={handleChange} />

        <button onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {results.map((record, index) => (
            <tr key={index}>
              <td>{record.caseId}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.dob}</td>
              <td><button onClick={() => viewDetails(record.caseId)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lookup;

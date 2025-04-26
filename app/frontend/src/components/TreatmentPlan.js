import React, { useState } from "react";
import "./TreatmentPlan.css";

export default function TreatmentPlan() {
  // Modal visibility state
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  // State for expanded rows in setup
  const [expandedRows, setExpandedRows] = useState({});

  // Treatment models list
  const [models, setModels] = useState([
    { name: "AF-CBT", intervention: "" },
    { name: "CBT", intervention: "step1" },
    { name: "CFTSI", intervention: "" },
    { name: "CPP", intervention: "" },
    { name: "EMDR", intervention: "" },
  ]);

  // Form state for main modal
  const [planDate, setPlanDate] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [provider, setProvider] = useState("");
  const [therapist, setTherapist] = useState("");
  const [expectedLength, setExpectedLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("Weeks");
  const [plannedStart, setPlannedStart] = useState("");
  const [plannedEnd, setPlannedEnd] = useState("");
  const [planReview, setPlanReview] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [sessionNotes, setSessionNotes] = useState([""]);
  const [planGoals, setPlanGoals] = useState([""]);
  const [privacyForms, setPrivacyForms] = useState({});
  const [consents, setConsents] = useState({});

  // "Add new record" state within setup
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecordModel, setNewRecordModel] = useState("");
  const [newRecordIntervention, setNewRecordIntervention] = useState("");

  // Handlers for main modal arrays
  const handleNoteChange = (i, val) => {
    const arr = [...sessionNotes];
    arr[i] = val;
    setSessionNotes(arr);
  };
  const addNote = () => setSessionNotes([...sessionNotes, ""]);
  const removeNote = (i) =>
    setSessionNotes(sessionNotes.filter((_, idx) => idx !== i));
  const handleGoalChange = (i, val) => {
    const arr = [...planGoals];
    arr[i] = val;
    setPlanGoals(arr);
  };
  const addGoal = () => setPlanGoals([...planGoals, ""]);
  const removeGoal = (i) =>
    setPlanGoals(planGoals.filter((_, idx) => idx !== i));

  const togglePrivacy = (key) =>
    setPrivacyForms({ ...privacyForms, [key]: !privacyForms[key] });
  const toggleConsent = (key) =>
    setConsents({ ...consents, [key]: !consents[key] });

  // Handlers for setup modal
  const startAddRecord = () => {
    setIsAddingRecord(true);
    setNewRecordModel("");
    setNewRecordIntervention("");
  };
  const cancelAddRecord = () => setIsAddingRecord(false);
  const saveNewRecord = () => {
    const trimmed = newRecordModel.trim();
    if (!trimmed) return;
    setModels([
      { name: trimmed, intervention: newRecordIntervention },
      ...models,
    ]);
    setIsAddingRecord(false);
  };
  const toggleExpand = (i) =>
    setExpandedRows((prev) => ({ ...prev, [i]: !prev[i] }));
  const handleSavePlan = () => setShowPlanModal(false);

  return (
    <div className="container">
      <h1>Mental Health Treatment Plan</h1>
      <button className="add-button" onClick={() => setShowPlanModal(true)}>
        + Add New Treatment Plan
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Planned Start Date</th>
            <th>Treatment Model</th>
            <th>Name</th>
            <th>Provider Agency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-04-01</td>
            <td>Cognitive Behavioral Therapy</td>
            <td>John Doe</td>
            <td>Agency XYZ</td>
          </tr>
        </tbody>
      </table>

      {/* Edit Modal */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Treatment Plan</h2>
              <button
                className="modal-close"
                onClick={() => setShowPlanModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Plan Date</label>
                <input
                  type="date"
                  value={planDate}
                  onChange={(e) => setPlanDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Treatment Model</label>
                <div className="inline-group">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="">-- select --</option>
                    {models.map((m, i) => (
                      <option key={i}>{m.name}</option>
                    ))}
                  </select>
                  <button onClick={() => setShowSetupModal(true)}>Add</button>
                </div>
              </div>
              <div className="form-row">
                <label>Provider Agency</label>
                <input
                  type="text"
                  placeholder="Agency Name"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Therapist</label>
                <input
                  type="text"
                  placeholder="Therapist Name"
                  value={therapist}
                  onChange={(e) => setTherapist(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Expected Length of Services</label>
                <div className="inline-group">
                  <input
                    type="number"
                    value={expectedLength}
                    onChange={(e) => setExpectedLength(e.target.value)}
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value)}
                  >
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <label>Planned Start</label>
                <input
                  type="date"
                  value={plannedStart}
                  onChange={(e) => setPlannedStart(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Planned End</label>
                <input
                  type="date"
                  value={plannedEnd}
                  onChange={(e) => setPlannedEnd(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Plan Review Date</label>
                <input
                  type="date"
                  value={planReview}
                  onChange={(e) => setPlanReview(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Authorization Status</label>
                <select
                  value={authStatus}
                  onChange={(e) => setAuthStatus(e.target.value)}
                >
                  <option value="">-- select --</option>
                  <option>Pending</option>
                  <option>Active</option>
                  <option>Closed</option>
                </select>
              </div>
              <div className="form-row">
                <label>Session Notes</label>
                {sessionNotes.map((note, i) => (
                  <div className="inline-group" key={i}>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => handleNoteChange(i, e.target.value)}
                    />
                    <button type="button" onClick={addNote}>
                      +
                    </button>
                    <button type="button" onClick={() => removeNote(i)}>
                      -
                    </button>
                  </div>
                ))}
              </div>
              <div className="form-row">
                <label>Treatment Plan Goals/Progress</label>
                {planGoals.map((goal, i) => (
                  <div className="inline-group" key={i}>
                    <textarea
                      rows={2}
                      value={goal}
                      onChange={(e) => handleGoalChange(i, e.target.value)}
                    />
                    <button type="button" onClick={addGoal}>
                      +
                    </button>
                    <button type="button" onClick={() => removeGoal(i)}>
                      -
                    </button>
                  </div>
                ))}
              </div>
              <div className="form-row">
                <label>Privacy Forms Distributed</label>
                <div className="checkbox-items">
                  {[
                    "HIPAA",
                    "Agency Disclosure",
                    "MDT Procedural",
                    "Right to Privacy",
                    "Chaperones",
                  ].map((key) => (
                    <label key={key}>
                      <input
                        type="checkbox"
                        checked={!!privacyForms[key]}
                        onChange={() => togglePrivacy(key)}
                      />
                      {key}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <label>Consents Obtained</label>
                <div className="checkbox-items">
                  {[
                    "Parent",
                    "Guardian",
                    "G. Ad Litem",
                    "CPS",
                    "District Attorney",
                  ].map((key) => (
                    <label key={key}>
                      <input
                        type="checkbox"
                        checked={!!consents[key]}
                        onChange={() => toggleConsent(key)}
                      />
                      {key}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-save" onClick={handleSavePlan}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="modal-overlay" onClick={() => setShowSetupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Treatment Plan Setup</h2>
              <button
                className="modal-close"
                onClick={() => setShowSetupModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="setup-actions">
                <button className="add-new-record" onClick={startAddRecord}>
                  + Add new record
                </button>
              </div>
              <div className="setup-table-container">
                <table className="setup-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Treatment Model</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isAddingRecord && (
                      <tr className="editing-row">
                        <td>
                          <button
                            className="update-btn"
                            onClick={saveNewRecord}
                          >
                            ✔ Update
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={cancelAddRecord}
                          >
                            ⛔ Cancel
                          </button>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Treatment Model"
                            value={newRecordModel}
                            onChange={(e) => setNewRecordModel(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Intervention"
                            value={newRecordIntervention}
                            onChange={(e) =>
                              setNewRecordIntervention(e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    )}
                    {models.map((entry, i) => (
                      <React.Fragment key={i}>
                        <tr>
                          <td>
                            <span
                              className="expand-icon"
                              onClick={() => toggleExpand(i)}
                              style={{
                                transform: expandedRows[i]
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              ▶
                            </span>
                          </td>
                          <td>
                            <strong>Treatment Model: {entry.name}</strong>
                          </td>
                          <td></td>
                        </tr>
                        {expandedRows[i] && (
                          <tr className="detail-row">
                            <td>
                              <button className="edit-btn">✎ Edit</button>
                              <button className="delete-btn">✖ Delete</button>
                            </td>
                            <td>{entry.name}</td>
                            <td>{entry.intervention}</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}{" "}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      )}
      <section className="mh-section">
        <h2>Uploaded Documents</h2>
        <div className="documents-grid">
          <div className="grid-header">
            <span>File Name</span>
            <span>Upload Date</span>
            <span>User</span>
            <span>Page</span>
            <span>Size</span>
          </div>
          <div className="no-items">No items to display</div>
          <button type="button" className="select-files-button">
            Select Files...
          </button>
          <p className="file-size-info">
            Maximum allowed file size is <strong>10 MB</strong>.
          </p>
          <p className="storage-warning">
            NCA does not recommend the storage of evidentiary documents as part
            of this case record. Any copies of evidentiary materials should be
            retained by the appropriate law enforcement and prosecution
            partners.
          </p>
        </div>
      </section>
    </div>
  );
}

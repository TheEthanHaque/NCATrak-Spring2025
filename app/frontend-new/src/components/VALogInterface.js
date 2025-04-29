import React from "react";
import "./VALogInterface.css";

const VALogInterface = () => {
  return (
    <div className="va-log-container">
      <header className="va-log-header">
        <h1>VA Log Interface</h1>
      </header>

      <form className="va-log-form">
        {/* REFERRAL SECTION */}
        <section className="va-section">
          <h2>Referral</h2>
          <div className="form-row">
            <label htmlFor="referral-date">Date</label>
            <input type="date" id="referral-date" name="referral-date" />
          </div>
          <div className="form-row">
            <label htmlFor="referral-source">Referral Source</label>
            <input type="text" id="referral-source" name="referral-source" />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
          <div className="form-row">
            <label htmlFor="person-select">Person</label>
            <select id="person-select" name="person-select">
              <option value="">Select...</option>
              {/* Add more options as needed */}
            </select>
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
        </section>

        {/* VICTIM ADVOCACY SERVICES SECTION */}
        <section className="va-section">
          <h2>Victim Advocacy Services</h2>
          <div className="form-row">
            <label htmlFor="cac-case-number">CAC Case Number</label>
            <input type="text" id="cac-case-number" name="cac-case-number" />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
          <div className="form-row">
            <label htmlFor="agency">Agency</label>
            <input type="text" id="agency" name="agency" />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
          <div className="form-row">
            <label htmlFor="person-select-2">Person</label>
            <select id="person-select-2" name="person-select-2">
              <option value="">Select...</option>
              {/* Add more options as needed */}
            </select>
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
          <div className="form-row">
            <label htmlFor="date-services-offered">
              Date Services first offered
            </label>
            <input
              type="date"
              id="date-services-offered"
              name="date-services-offered"
            />
          </div>
          <div className="form-row checkbox-row">
            <label htmlFor="accept-va-services">
              Did the child/family accept VA services?
            </label>
            <input
              type="checkbox"
              id="accept-va-services"
              name="accept-va-services"
            />
          </div>
          <div className="form-row">
            <label htmlFor="hope1">Hope (1)</label>
            <input type="text" id="hope1" name="hope1" />
          </div>
          <div className="form-row">
            <label htmlFor="va-custom-field-2">
              VA Services Custom Field #2
            </label>
            <input
              type="text"
              id="va-custom-field-2"
              name="va-custom-field-2"
            />
          </div>
          <div className="form-row">
            <label htmlFor="va-custom-field-3">
              VA Services Custom Field #3
            </label>
            <input
              type="text"
              id="va-custom-field-3"
              name="va-custom-field-3"
            />
          </div>
          <div className="form-row">
            <label htmlFor="va-custom-field-4">
              VA Services Custom Field #4
            </label>
            <input
              type="text"
              id="va-custom-field-4"
              name="va-custom-field-4"
            />
          </div>
          <div className="form-row">
            <label htmlFor="va-custom-field-5">
              VA Services Custom Field #5
            </label>
            <input
              type="text"
              id="va-custom-field-5"
              name="va-custom-field-5"
            />
          </div>
          <div className="form-row radio-row">
            <label>VA - Services Custom Field #6 (VOCA / No / Yes)</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="va-field-6" value="VOCA" />
                VOCA
              </label>
              <label>
                <input type="radio" name="va-field-6" value="No" />
                No
              </label>
              <label>
                <input type="radio" name="va-field-6" value="Yes" />
                Yes
              </label>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="va-custom-field-7">
              VA - Services Custom Field Cfp?
            </label>
            <input
              type="text"
              id="va-custom-field-7"
              name="va-custom-field-7"
            />
          </div>
          <div className="form-row">
            <label htmlFor="date-services-concluded">
              Date Services were concluded
            </label>
            <input
              type="date"
              id="date-services-concluded"
              name="date-services-concluded"
            />
          </div>
          <div className="form-row checkbox-row">
            <label htmlFor="ready-mdt-review">Ready for MDT Review</label>
            <input
              type="checkbox"
              id="ready-mdt-review"
              name="ready-mdt-review"
            />
          </div>
        </section>

        {/* VICTIM ADVOCACY SERVICES LOG SECTION */}
        <section className="va-section">
          <h2>Victim Advocacy Services Log</h2>
          <div className="va-log-actions">
            <button type="button" className="session-log-button">
              + Add New Session Log
            </button>
            <button type="button" className="session-log-button">
              Details
            </button>
          </div>
          <table className="va-log-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
          <div className="va-log-pagination">
            <button type="button" className="pagination-button">
              Newer Records
            </button>
            <button type="button" className="pagination-button">
              Older Records
            </button>
          </div>
        </section>

        {/* UPLOADED DOCUMENTS SECTION */}
        <section className="va-section">
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
              NCA does not recommend the storage of evidentiary documents as
              part of this case record. Any copies of evidentiary materials
              should be retained by the appropriate law enforcement and
              prosecution partners.
            </p>
          </div>
        </section>

        {/* SAVE/CANCEL BUTTONS */}
        <div className="va-form-buttons">
          <button type="submit" className="save-button">
            SAVE
          </button>
          <button type="button" className="cancel-button">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default VALogInterface;

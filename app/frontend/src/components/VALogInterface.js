import React from "react";
import "./VALogInterface.css";

const VALogInterface = () => {
  return (
    <div className="va-log-container" data-aoi="VA Log Container">
      <header className="va-log-header" data-aoi="VA Log Header">
        <h1 data-aoi="VA Log Title">VA Log Interface</h1>
      </header>

      <form className="va-log-form" data-aoi="VA Log Form">
        {/* REFERRAL SECTION */}
        <section className="va-section" data-aoi="Referral Section">
          <h2 data-aoi="Referral Section Header">Referral</h2>
          <div className="form-row" data-aoi="Referral Date Row">
            <label htmlFor="referral-date" data-aoi="Referral Date Label">Date</label>
            <input
              type="date"
              id="referral-date"
              name="referral-date"
              data-aoi="Referral Date Input"
            />
          </div>
          <div className="form-row" data-aoi="Referral Source Row">
            <label htmlFor="referral-source" data-aoi="Referral Source Label">Referral Source</label>
            <input
              type="text"
              id="referral-source"
              name="referral-source"
              data-aoi="Referral Source Input"
            />
            <button
              type="button"
              className="add-button"
              data-aoi="Add Referral Source Button"
            >
              + Add
            </button>
          </div>
          <div className="form-row" data-aoi="Referral Person Row">
            <label htmlFor="person-select" data-aoi="Referral Person Label">Person</label>
            <select
              id="person-select"
              name="person-select"
              data-aoi="Referral Person Select"
            >
              <option value="" data-aoi="Referral Person Option Select">Select...</option>
            </select>
            <button
              type="button"
              className="add-button"
              data-aoi="Add Referral Person Button"
            >
              + Add
            </button>
          </div>
        </section>

        {/* VICTIM ADVOCACY SERVICES SECTION */}
        <section className="va-section" data-aoi="Victim Advocacy Services Section">
          <h2 data-aoi="Victim Advocacy Services Header">Victim Advocacy Services</h2>
          <div className="form-row" data-aoi="CAC Case Number Row">
            <label htmlFor="cac-case-number" data-aoi="CAC Case Number Label">CAC Case Number</label>
            <input
              type="text"
              id="cac-case-number"
              name="cac-case-number"
              data-aoi="CAC Case Number Input"
            />
            <button
              type="button"
              className="add-button"
              data-aoi="Add CAC Case Number Button"
            >
              + Add
            </button>
          </div>
          <div className="form-row" data-aoi="Agency Row">
            <label htmlFor="agency" data-aoi="Agency Label">Agency</label>
            <input
              type="text"
              id="agency"
              name="agency"
              data-aoi="Agency Input"
            />
            <button
              type="button"
              className="add-button"
              data-aoi="Add Agency Button"
            >
              + Add
            </button>
          </div>
          <div className="form-row" data-aoi="VA Person Row">
            <label htmlFor="person-select-2" data-aoi="VA Person Label">Person</label>
            <select
              id="person-select-2"
              name="person-select-2"
              data-aoi="VA Person Select"
            >
              <option value="" data-aoi="VA Person Option Select">Select...</option>
            </select>
            <button
              type="button"
              className="add-button"
              data-aoi="Add VA Person Button"
            >
              + Add
            </button>
          </div>
          <div className="form-row" data-aoi="Date Services Offered Row">
            <label htmlFor="date-services-offered" data-aoi="Date Services Offered Label">
              Date Services first offered
            </label>
            <input
              type="date"
              id="date-services-offered"
              name="date-services-offered"
              data-aoi="Date Services Offered Input"
            />
          </div>
          <div className="form-row checkbox-row" data-aoi="Accept VA Services Row">
            <label htmlFor="accept-va-services" data-aoi="Accept VA Services Label">
              Did the child/family accept VA services?
            </label>
            <input
              type="checkbox"
              id="accept-va-services"
              name="accept-va-services"
              data-aoi="Accept VA Services Checkbox"
            />
          </div>
          <div className="form-row" data-aoi="Hope1 Row">
            <label htmlFor="hope1" data-aoi="Hope1 Label">Hope (1)</label>
            <input
              type="text"
              id="hope1"
              name="hope1"
              data-aoi="Hope1 Input"
            />
          </div>
          <div className="form-row" data-aoi="VA Custom Field2 Row">
            <label htmlFor="va-custom-field-2" data-aoi="VA Custom Field2 Label">
              VA Services Custom Field #2
            </label>
            <input
              type="text"
              id="va-custom-field-2"
              name="va-custom-field-2"
              data-aoi="VA Custom Field2 Input"
            />
          </div>
          <div className="form-row" data-aoi="VA Custom Field3 Row">
            <label htmlFor="va-custom-field-3" data-aoi="VA Custom Field3 Label">
              VA Services Custom Field #3
            </label>
            <input
              type="text"
              id="va-custom-field-3"
              name="va-custom-field-3"
              data-aoi="VA Custom Field3 Input"
            />
          </div>
          <div className="form-row" data-aoi="VA Custom Field4 Row">
            <label htmlFor="va-custom-field-4" data-aoi="VA Custom Field4 Label">
              VA Services Custom Field #4
            </label>
            <input
              type="text"
              id="va-custom-field-4"
              name="va-custom-field-4"
              data-aoi="VA Custom Field4 Input"
            />
          </div>
          <div className="form-row" data-aoi="VA Custom Field5 Row">
            <label htmlFor="va-custom-field-5" data-aoi="VA Custom Field5 Label">
              VA Services Custom Field #5
            </label>
            <input
              type="text"
              id="va-custom-field-5"
              name="va-custom-field-5"
              data-aoi="VA Custom Field5 Input"
            />
          </div>
          <div className="form-row radio-row" data-aoi="VA Custom Field6 Row">
            <label data-aoi="VA Custom Field6 Label">
              VA - Services Custom Field #6 (VOCA / No / Yes)
            </label>
            <div className="radio-group" data-aoi="VA Custom Field6 Radio Group">
              <label data-aoi="VOCA Radio Label">
                <input
                  type="radio"
                  name="va-field-6"
                  value="VOCA"
                  data-aoi="VOCA Radio Input"
                />
                VOCA
              </label>
              <label data-aoi="No Radio Label">
                <input
                  type="radio"
                  name="va-field-6"
                  value="No"
                  data-aoi="No Radio Input"
                />
                No
              </label>
              <label data-aoi="Yes Radio Label">
                <input
                  type="radio"
                  name="va-field-6"
                  value="Yes"
                  data-aoi="Yes Radio Input"
                />
                Yes
              </label>
            </div>
          </div>
          <div className="form-row" data-aoi="VA Custom Field7 Row">
            <label htmlFor="va-custom-field-7" data-aoi="VA Custom Field7 Label">
              VA - Services Custom Field Cfp?
            </label>
            <input
              type="text"
              id="va-custom-field-7"
              name="va-custom-field-7"
              data-aoi="VA Custom Field7 Input"
            />
          </div>
          <div className="form-row" data-aoi="Date Services Concluded Row">
            <label htmlFor="date-services-concluded" data-aoi="Date Services Concluded Label">
              Date Services were concluded
            </label>
            <input
              type="date"
              id="date-services-concluded"
              name="date-services-concluded"
              data-aoi="Date Services Concluded Input"
            />
          </div>
          <div className="form-row checkbox-row" data-aoi="Ready for MDT Review Row">
            <label htmlFor="ready-mdt-review" data-aoi="Ready for MDT Review Label">
              Ready for MDT Review
            </label>
            <input
              type="checkbox"
              id="ready-mdt-review"
              name="ready-mdt-review"
              data-aoi="Ready for MDT Review Checkbox"
            />
          </div>
        </section>

        {/* VICTIM ADVOCACY SERVICES LOG SECTION */}
        <section className="va-section" data-aoi="VA Services Log Section">
          <h2 data-aoi="VA Services Log Header">Victim Advocacy Services Log</h2>
          <div className="va-log-actions" data-aoi="VA Log Actions">
            <button
              type="button"
              className="session-log-button"
              data-aoi="Add VA Session Log Button"
            >
              + Add New Session Log
            </button>
            <button
              type="button"
              className="session-log-button"
              data-aoi="VA Session Log Details Button"
            >
              Details
            </button>
          </div>
          <table className="va-log-table" data-aoi="VA Services Log Table">
            <thead data-aoi="VA Log Table Head">
              <tr>
                <th data-aoi="VA Log Date Header">Date</th>
                <th data-aoi="VA Log Start Time Header">Start Time</th>
                <th data-aoi="VA Log End Time Header">End Time</th>
                <th data-aoi="VA Log Status Header">Status</th>
              </tr>
            </thead>
            <tbody data-aoi="VA Log Table Body">
              <tr data-aoi="VA Log No Items Row">
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
          <div className="va-log-pagination" data-aoi="VA Log Pagination">
            <button
              type="button"
              className="pagination-button"
              data-aoi="VA Log Newer Records Button"
            >
              Newer Records
            </button>
            <button
              type="button"
              className="pagination-button"
              data-aoi="VA Log Older Records Button"
            >
              Older Records
            </button>
          </div>
        </section>

        {/* UPLOADED DOCUMENTS SECTION */}
        <section className="va-section" data-aoi="VA Uploaded Documents Section">
          <h2 data-aoi="VA Uploaded Documents Header">Uploaded Documents</h2>
          <div className="documents-grid" data-aoi="VA Documents Grid">
            <div className="grid-header" data-aoi="VA Documents Grid Header">
              <span data-aoi="VA Documents File Name Header">File Name</span>
              <span data-aoi="VA Documents Upload Date Header">Upload Date</span>
              <span data-aoi="VA Documents User Header">User</span>
              <span data-aoi="VA Documents Page Header">Page</span>
              <span data-aoi="VA Documents Size Header">Size</span>
            </div>
            <div className="no-items" data-aoi="VA Documents No Items">No items to display</div>
            <button
              type="button"
              className="select-files-button"
              data-aoi="VA Documents Select Files Button"
            >
              Select Files...
            </button>
            <p className="file-size-info" data-aoi="VA Documents File Size Info">
              Maximum allowed file size is <strong>10 MB</strong>.
            </p>
            <p className="storage-warning" data-aoi="VA Documents Storage Warning">
              NCA does not recommend the storage of evidentiary documents as
              part of this case record. Any copies of evidentiary materials
              should be retained by the appropriate law enforcement and
              prosecution partners.
            </p>
          </div>
        </section>

        {/* SAVE/CANCEL BUTTONS */}
        <div className="va-form-buttons" data-aoi="VA Form Buttons Section">
          <button type="submit" className="save-button" data-aoi="VA Save Button">
            SAVE
          </button>
          <button type="button" className="cancel-button" data-aoi="VA Cancel Button">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default VALogInterface;

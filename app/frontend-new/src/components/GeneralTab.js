import React from "react";
import "./GeneralTab.css";

function GeneralTab() {
  return (
    <div className="general-tab-container">
      <header className="general-tab-header">
        <h1>Case Tracking</h1>
      </header>

      <form className="general-tab-form">
        {/* 1. CASE TRACKING TABLE */}
        <section className="gt-section">
          <table className="gt-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Service</th>
                <th>Referral Date</th>
                <th>Referred By</th>
                <th>Providing Agency</th>
                <th>Primary Contact</th>
                <th>Status</th>
                <th>Status Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows - replace or remove as needed */}
              <tr>
                <td>
                  <button type="button" className="gt-edit-button">
                    Edit
                  </button>
                </td>
                <td>MDT</td>
                <td>07/03/2015</td>
                <td>Unknown</td>
                <td>Anderson SVU Team</td>
                <td>Jane Doe</td>
                <td>Adjourned</td>
                <td>07/03/2015</td>
              </tr>
              <tr>
                <td>
                  <button type="button" className="gt-edit-button">
                    Edit
                  </button>
                </td>
                <td>MH</td>
                <td>07/03/2015</td>
                <td>DCS - Anderson Co.</td>
                <td>Anderson SVU Team</td>
                <td>Sylvia Jones</td>
                <td>Referred</td>
                <td>01/10/2030</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 2. FIELDS BELOW THE TABLE */}
        <section className="gt-section">
          <div className="form-row">
            <label htmlFor="date-received-cac">Date Received by CAC</label>
            <input type="date" id="date-received-cac" name="dateReceivedCAC" />
          </div>

          <div className="form-row">
            <label htmlFor="main-agency">Main Agency Involved</label>
            <input
              type="text"
              id="main-agency"
              name="mainAgency"
              placeholder="Anderson SVU Team"
            />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>

          <div className="form-row">
            <label htmlFor="main-personnel">Main Personnel Involved</label>
            <input
              type="text"
              id="main-personnel"
              name="mainPersonnel"
              placeholder="Janice Smith"
            />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>

          <div className="form-row">
            <label htmlFor="case-closed-reason">Case Closed Reason</label>
            <select id="case-closed-reason" name="caseClosedReason">
              <option value="">Select reason...</option>
              <option value="allComplete">
                All Investigations/Services Completed
              </option>
              <option value="clientMoved">Client Moved</option>
              <option value="noServicesNeeded">No Services Needed</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="case-close-date">Case Close Date</label>
            <input type="date" id="case-close-date" name="caseCloseDate" />
          </div>

          <div className="form-row checkbox-row">
            <label htmlFor="survey-complete">Survey Complete (1)</label>
            <input type="checkbox" id="survey-complete" name="surveyComplete" />
          </div>

          <div className="form-row checkbox-row">
            <label htmlFor="followup-survey-complete">
              Follow Up Survey Complete (2)
            </label>
            <input
              type="checkbox"
              id="followup-survey-complete"
              name="followupSurveyComplete"
            />
          </div>

          <div className="form-row">
            <label htmlFor="cac-case-b">CAC Case # (3)</label>
            <input
              type="text"
              id="cac-case-b"
              name="cacCaseB"
              placeholder="Enter CAC Case #(B)"
            />
          </div>

          {/* EDUCATION PROGRAM QUESTION */}
          <div className="form-row">
            <label>Did child go through the education program? (4)</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="educationProgram" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="educationProgram" value="no" />
                No
              </label>
              <label>
                <input type="radio" name="educationProgram" value="maybe" />
                Maybe
              </label>
              <label>
                <input type="radio" name="educationProgram" value="notSure" />
                Not sure
              </label>
              <label>
                <input
                  type="radio"
                  name="educationProgram"
                  value="notInterested"
                />
                Not interested
              </label>
              <label>
                <input type="radio" name="educationProgram" value="denied" />
                Denied
              </label>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="test-3">Test (5)</label>
            <input
              type="text"
              id="test-3"
              name="test3"
              placeholder="Optional field"
            />
          </div>

          <div className="form-row">
            <label htmlFor="general-custom-6">General - Custom Field (6)</label>
            <input
              type="text"
              id="general-custom-6"
              name="generalCustom6"
              placeholder="Optional field"
            />
          </div>

          <div className="form-row">
            <label htmlFor="general-custom-cfp">
              General - Custom Field Chp (7)
            </label>
            <input
              type="text"
              id="general-custom-cfp"
              name="generalCustomCfp"
              placeholder="Optional field"
            />
          </div>

          <div className="form-row checkbox-group-row">
            <label>Chapter Test Field (8)</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="chapterTestField"
                  value="noTesting"
                />
                No Testing
              </label>
              <label>
                <input
                  type="checkbox"
                  name="chapterTestField"
                  value="newClient"
                />
                New Client
              </label>
            </div>
          </div>
        </section>

        {/* 3. CASES LINKED TO THIS ALLEGATION */}
        <section className="gt-section">
          <h2>Cases Linked to this Allegation</h2>
          <button type="button" className="session-log-button">
            + Add new record
          </button>
          <table className="gt-table">
            <thead>
              <tr>
                <th>CAC Case Number</th>
                <th>Alleged Victim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4. COURT ACTIVITIES */}
        <section className="gt-section">
          <h2>Court Activities</h2>
          <button type="button" className="session-log-button">
            + Add new record
          </button>
          <table className="gt-table">
            <thead>
              <tr>
                <th>Court Type</th>
                <th>Court Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. RELEASE OF INFORMATION */}
        <section className="gt-section">
          <h2>Release of Information</h2>
          <button type="button" className="session-log-button">
            + Add new record
          </button>
          <table className="gt-table">
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Requested By</th>
                <th>By Subpoena</th>
                <th>Authorized By</th>
                <th>Released By</th>
                <th>Records</th>
                <th>Date Released</th>
                <th>Date to be Returned</th>
                <th>Date Returned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 6. OUTSIDE REFERRALS */}
        <section className="gt-section">
          <h2>Outside Referrals</h2>
          <table className="gt-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Referred From</th>
                <th>Referral Date</th>
                <th>Referred To</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr>
                <td>
                  <button type="button" className="gt-view-button">
                    View
                  </button>
                </td>
                <td>Prosecution</td>
                <td>11/19/2014</td>
                <td>ChildSafe Therapeutic Foster Care</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 7. INSURANCE INFORMATION */}
        <section className="gt-section">
          <h2>Insurance Information</h2>
          <div className="insurance-container">
            {/* Primary Insurance */}
            <div className="insurance-column">
              <h3>Primary Insurance</h3>
              <div className="form-row">
                <label htmlFor="primary-company">Company</label>
                <input type="text" id="primary-company" name="primaryCompany" />
              </div>
              <div className="form-row">
                <label htmlFor="primary-subscriber">Subscriber</label>
                <input
                  type="text"
                  id="primary-subscriber"
                  name="primarySubscriber"
                />
              </div>
              <div className="form-row">
                <label htmlFor="primary-policy">Policy Number</label>
                <input
                  type="text"
                  id="primary-policy"
                  name="primaryPolicyNumber"
                />
              </div>
              <div className="form-row">
                <label htmlFor="primary-group">Group</label>
                <input type="text" id="primary-group" name="primaryGroup" />
              </div>
            </div>

            {/* Secondary Insurance */}
            <div className="insurance-column">
              <h3>Secondary Insurance</h3>
              <div className="form-row">
                <label htmlFor="secondary-company">Company</label>
                <input
                  type="text"
                  id="secondary-company"
                  name="secondaryCompany"
                />
              </div>
              <div className="form-row">
                <label htmlFor="secondary-subscriber">Subscriber</label>
                <input
                  type="text"
                  id="secondary-subscriber"
                  name="secondarySubscriber"
                />
              </div>
              <div className="form-row">
                <label htmlFor="secondary-policy">Policy Number</label>
                <input
                  type="text"
                  id="secondary-policy"
                  name="secondaryPolicyNumber"
                />
              </div>
              <div className="form-row">
                <label htmlFor="secondary-group">Group</label>
                <input type="text" id="secondary-group" name="secondaryGroup" />
              </div>
            </div>
          </div>

          <div className="form-row checkbox-row">
            <label htmlFor="client-received-referral">
              Has Client received referral?
            </label>
            <input
              type="checkbox"
              id="client-received-referral"
              name="clientReceivedReferral"
            />
          </div>

          <div className="form-row">
            <label htmlFor="primary-clinic">Primary Clinic</label>
            <input type="text" id="primary-clinic" name="primaryClinic" />
          </div>

          <div className="form-row">
            <label htmlFor="primary-provider">Primary Provider</label>
            <input type="text" id="primary-provider" name="primaryProvider" />
          </div>

          <div className="form-row">
            <label htmlFor="primary-provider-phone">
              Primary Provider Phone
            </label>
            <input
              type="text"
              id="primary-provider-phone"
              name="primaryProviderPhone"
            />
          </div>
        </section>

        {/* 8. ICD CODES SECTION */}
        <section className="gt-section">
          <h2>ICD Codes</h2>
          <button type="button" className="session-log-button">
            + Add new record
          </button>
          <table className="gt-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Group</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              <tr>
                <td>
                  <button type="button" className="gt-edit-button">
                    Delete
                  </button>
                  <button type="button" className="gt-edit-button">
                    Edit
                  </button>
                </td>
                <td>Child Abuse Diagnosis</td>
                <td>995.53 sexual abuse</td>
              </tr>
              <tr>
                <td>
                  <button type="button" className="gt-edit-button">
                    Delete
                  </button>
                  <button type="button" className="gt-edit-button">
                    Edit
                  </button>
                </td>
                <td>Physical Abuse Diagnosis</td>
                <td>T07 Unspecified multiple injuries</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 9. DOCUMENT UPLOAD SECTION */}
        <section className="gt-section">
          <h2>Document Upload</h2>
          <table className="gt-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>User</th>
                <th>Page</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </section>

        {/* 10. FINAL SAVE / CANCEL BUTTONS */}
        <div className="gt-form-buttons">
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
}

export default GeneralTab;

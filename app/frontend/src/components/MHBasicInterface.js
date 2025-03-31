import React from "react";
import "./MHBasicInterface.css";

function MHBasicInterface() {
  return (
    <div className="mh-basic-container">
      <header className="mh-basic-header">
        <h1>Mental Health Basic Information</h1>
      </header>

      <form className="mh-basic-form">
        {/* 1. INCOMING REFERRAL SECTION */}
        <section className="mh-section">
          <h2>Incoming Referral</h2>
          <div className="form-row">
            <label htmlFor="referral-date">Date</label>
            <input type="date" id="referral-date" name="referralDate" />
          </div>
          <div className="form-row">
            <label htmlFor="referral-source">Referral Source</label>
            <input
              type="text"
              id="referral-source"
              name="referralSource"
              placeholder="Enter referral source"
            />
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
          <div className="form-row">
            <label htmlFor="person-select">Person</label>
            <select id="person-select" name="personSelect">
              <option value="">Select...</option>
              {/* Add more options as needed */}
            </select>
            <button type="button" className="add-button">
              + Add
            </button>
          </div>
        </section>

        {/* 2. CUSTOM FIELDS SECTION */}
        <section className="mh-section">
          <h2>Custom Fields</h2>
          {/* MH_Abuse Type */}
          <div className="form-row">
            <label>MH_Abuse Type</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="mhAbuseType" value="Yes" /> Yes
              </label>
              <label>
                <input type="checkbox" name="mhAbuseType" value="No" /> No
              </label>
              <label>
                <input type="checkbox" name="mhAbuseType" value="Bullying" />{" "}
                Bullying
              </label>
              <label>
                <input type="checkbox" name="mhAbuseType" value="DV" /> DV
              </label>
              <label>
                <input type="checkbox" name="mhAbuseType" value="PA" /> PA
              </label>
            </div>
          </div>
          {/* Status of Mental Health Referral */}
          <div className="form-row">
            <label>Status of Mental Health Referral</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="declined"
                />
                Declined/Already receiving therapy services
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="waitingList"
                />
                Accept &amp; On waiting list
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="attending"
                />
                Accepting/Attending therapy sessions
              </label>
            </div>
          </div>
          {/* Seen For MH Services Elsewhere */}
          <div className="form-row">
            <label htmlFor="seenElsewhere">
              Seen For MH Services Elsewhere
            </label>
            <input
              type="text"
              id="seenElsewhere"
              name="seenElsewhere"
              placeholder="Enter details (e.g., where/when)"
            />
          </div>
          {/* PsychoSocial Notes (4) with + button */}
          <div className="form-row">
            <label htmlFor="psychoSocialNotes">PsychoSocial Notes (4)</label>
            <div className="plus-group">
              <input
                type="text"
                id="psychoSocialNotes"
                name="psychoSocialNotes"
                placeholder="Enter notes"
              />
              <button type="button" className="add-button">
                +
              </button>
            </div>
          </div>
          {/* MH Extended Services Candidate */}
          <div className="form-row">
            <label htmlFor="mhExtendedServicesCandidate">
              MH Extended Services Candidate?
            </label>
            <select
              id="mhExtendedServicesCandidate"
              name="mhExtendedServicesCandidate"
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* MH - Services Custom Field #5 */}
          <div className="form-row">
            <label htmlFor="mhCustomField5">
              MH - Services Custom Field #5
            </label>
            <input
              type="text"
              id="mhCustomField5"
              name="mhCustomField5"
              placeholder="Enter info for Custom Field #5"
            />
          </div>
          {/* Client Declined Services? */}
          <div className="form-row">
            <label>Client Declined Services?</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="clientDeclinedReason"
                  value="alreadyReceivingTherapy"
                />
                Already receiving therapy services
              </label>
              <label>
                <input
                  type="checkbox"
                  name="clientDeclinedReason"
                  value="familyNotSupportive"
                />
                Family didn't think needed/not supportive
              </label>
            </div>
          </div>
        </section>

        {/* 3. TELEHEALTH SERVICES SECTION */}
        <section className="mh-section">
          <h2>Telehealth Services</h2>
          <div className="form-row">
            <label htmlFor="milesSaved">
              Number of Miles Saved Providing Telehealth Services Per Session
            </label>
            <input
              type="number"
              id="milesSaved"
              name="milesSaved"
              placeholder="e.g., 30"
            />
          </div>
          <div className="form-row">
            <label>Barriers Encountered During Mental Health Services</label>
            <div className="checkbox-group column-layout">
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="noServicesNeeded"
                />
                Center doesn't offer the Services needed
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="stigma"
                />
                Concerned about what others would think about seeking services
              </label>
              <label>
                <input type="checkbox" name="telehealthBarriers" value="cost" />
                Cost of services
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="distance"
                />
                Distance to mental health services clinic
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="programCriteria"
                />
                Doesn't fit Program Criteria
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="lackOfNeed"
                />
                Family Perceived Lack of Need
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="transportation"
                />
                Lack of Transportation
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="language"
                />
                Language - Provider does not speak my preferred language
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="noInsurance"
                />
                No insurance
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="other"
                />
                Other
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="acuteFamilyNeeds"
                />
                Other Acute Family Needs
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="schedulingDifficulty"
                />
                Scheduling Difficulty
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="waitlistTooLong"
                />
                Waitlist Too Long
              </label>
            </div>
          </div>
        </section>

        {/* 4. MENTAL HEALTH PROVIDER LOG SECTION */}
        <section className="mh-section">
          <h2>Mental Health Provider Log</h2>
          <div className="mh-log-actions">
            <button type="button" className="session-log-button">
              + Add Provider
            </button>
            <button type="button" className="session-log-button">
              Details
            </button>
          </div>
          <table className="mh-log-table">
            <thead>
              <tr>
                <th>Date Services Offered</th>
                <th>Agency</th>
                <th>Therapist</th>
                <th>Referral Type</th>
                <th>Case #</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row; replace or remove as needed */}
              <tr>
                <td>08/30/2015</td>
                <td>Anderson SW Team</td>
                <td>Sylvia Jones</td>
                <td>Therapy</td>
                <td>12345</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. OUTSIDE REFERRALS SECTION */}
        <section className="mh-section">
          <h2>Outside Referrals</h2>
          <button type="button" className="session-log-button">
            + Add New Referral
          </button>
          <table className="mh-log-table">
            <thead>
              <tr>
                <th>Referral Date</th>
                <th>Referred To</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 6. ADDITIONAL POINTS OF CONTACT SECTION */}
        <section className="mh-section">
          <h2>Additional Points of Contact</h2>
          <button type="button" className="session-log-button">
            + Add New Point of Contact
          </button>
          <table className="mh-log-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Agency</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No items to display
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 7. CONTACT INFO SECTION */}
        <section className="mh-section">
          <h2>Contact Info</h2>
          <div className="contact-info-row">
            <div className="contact-box">
              <label htmlFor="clientContactInfo">Client Contact Info</label>
              <textarea
                id="clientContactInfo"
                name="clientContactInfo"
                placeholder="Enter client contact info..."
              ></textarea>
            </div>
            <div className="contact-box">
              <label htmlFor="parentContactInfo">Parent Contact Info</label>
              <textarea
                id="parentContactInfo"
                name="parentContactInfo"
                placeholder="Enter parent contact info..."
              ></textarea>
            </div>
            <div className="contact-box">
              <label htmlFor="dateTherapyCompleted">
                Date Therapy Completed
              </label>
              <input
                type="date"
                id="dateTherapyCompleted"
                name="dateTherapyCompleted"
              />
            </div>
          </div>
        </section>

        {/* 8. UPLOADED DOCUMENTS SECTION */}
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
              NCA does not recommend the storage of evidentiary documents as
              part of this case record. Any copies of evidentiary materials
              should be retained by the appropriate law enforcement and
              prosecution partners.
            </p>
          </div>
        </section>

        {/* FINAL SAVE/CANCEL BUTTONS */}
        <div className="mh-form-buttons">
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

export default MHBasicInterface;

// src/components/MHBasicInterface.js
import React from "react";
import "./MHBasicInterface.css";

function MHBasicInterface() {
  return (
    <div className="mh-basic-container" data-aoi="MH Basic Container">
      <header className="mh-basic-header" data-aoi="MH Basic Header">
        <h1 data-aoi="MH Basic Title">Mental Health Basic Information</h1>
      </header>

      <form className="mh-basic-form" data-aoi="MH Basic Form">
        {/* 1. INCOMING REFERRAL SECTION */}
        <section className="mh-section" data-aoi="Incoming Referral Section">
          <h2 data-aoi="Incoming Referral Header">Incoming Referral</h2>
          <div className="form-row" data-aoi="Referral Date Row">
            <label htmlFor="referral-date" data-aoi="Referral Date Label">
              Date
            </label>
            <input
              type="date"
              id="referral-date"
              name="referralDate"
              data-aoi="Referral Date Input"
            />
          </div>
          <div className="form-row" data-aoi="Referral Source Row">
            <label htmlFor="referral-source" data-aoi="Referral Source Label">
              Referral Source
            </label>
            <input
              type="text"
              id="referral-source"
              name="referralSource"
              placeholder="Enter referral source"
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
          <div className="form-row" data-aoi="Person Select Row">
            <label htmlFor="person-select" data-aoi="Person Select Label">
              Person
            </label>
            <select
              id="person-select"
              name="personSelect"
              data-aoi="Person Select Input"
            >
              <option value="" data-aoi="Person Select Option">
                Select...
              </option>
            </select>
            <button
              type="button"
              className="add-button"
              data-aoi="Add Person Button"
            >
              + Add
            </button>
          </div>
        </section>

        {/* 2. CUSTOM FIELDS SECTION */}
        <section className="mh-section" data-aoi="Custom Fields Section">
          <h2 data-aoi="Custom Fields Header">Custom Fields</h2>
          {/* MH_Abuse Type */}
          <div className="form-row" data-aoi="MH Abuse Type Row">
            <label data-aoi="MH Abuse Type Label">MH_Abuse Type</label>
            <div className="checkbox-group" data-aoi="MH Abuse Type Group">
              <label data-aoi="MH Abuse Yes Checkbox">
                <input
                  type="checkbox"
                  name="mhAbuseType"
                  value="Yes"
                  data-aoi="MH Abuse Yes Input"
                />
                Yes
              </label>
              <label data-aoi="MH Abuse No Checkbox">
                <input
                  type="checkbox"
                  name="mhAbuseType"
                  value="No"
                  data-aoi="MH Abuse No Input"
                />
                No
              </label>
              <label data-aoi="MH Abuse Bullying Checkbox">
                <input
                  type="checkbox"
                  name="mhAbuseType"
                  value="Bullying"
                  data-aoi="MH Abuse Bullying Input"
                />
                Bullying
              </label>
              <label data-aoi="MH Abuse DV Checkbox">
                <input
                  type="checkbox"
                  name="mhAbuseType"
                  value="DV"
                  data-aoi="MH Abuse DV Input"
                />
                DV
              </label>
              <label data-aoi="MH Abuse PA Checkbox">
                <input
                  type="checkbox"
                  name="mhAbuseType"
                  value="PA"
                  data-aoi="MH Abuse PA Input"
                />
                PA
              </label>
            </div>
          </div>
          {/* Status of Mental Health Referral */}
          <div className="form-row" data-aoi="MH Referral Status Row">
            <label data-aoi="MH Referral Status Label">
              Status of Mental Health Referral
            </label>
            <div className="checkbox-group" data-aoi="MH Referral Status Group">
              <label data-aoi="Referral Declined Checkbox">
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="declined"
                  data-aoi="Referral Declined Input"
                />
                Declined/Already receiving therapy services
              </label>
              <label data-aoi="Referral Waiting List Checkbox">
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="waitingList"
                  data-aoi="Referral Waiting List Input"
                />
                Accept &amp; On waiting list
              </label>
              <label data-aoi="Referral Attending Checkbox">
                <input
                  type="checkbox"
                  name="mhReferralStatus"
                  value="attending"
                  data-aoi="Referral Attending Input"
                />
                Accepting/Attending therapy sessions
              </label>
            </div>
          </div>
          {/* Seen For MH Services Elsewhere */}
          <div className="form-row" data-aoi="Seen Elsewhere Row">
            <label htmlFor="seenElsewhere" data-aoi="Seen Elsewhere Label">
              Seen For MH Services Elsewhere
            </label>
            <input
              type="text"
              id="seenElsewhere"
              name="seenElsewhere"
              placeholder="Enter details (e.g., where/when)"
              data-aoi="Seen Elsewhere Input"
            />
          </div>
          {/* PsychoSocial Notes (4) with + button */}
          <div className="form-row" data-aoi="PsychoSocial Notes Row">
            <label
              htmlFor="psychoSocialNotes"
              data-aoi="PsychoSocial Notes Label"
            >
              PsychoSocial Notes (4)
            </label>
            <div className="plus-group" data-aoi="PsychoSocial Notes Group">
              <input
                type="text"
                id="psychoSocialNotes"
                name="psychoSocialNotes"
                placeholder="Enter notes"
                data-aoi="PsychoSocial Notes Input"
              />
              <button
                type="button"
                className="add-button"
                data-aoi="Add PsychoSocial Note Button"
              >
                +
              </button>
            </div>
          </div>
          {/* MH Extended Services Candidate */}
          <div className="form-row" data-aoi="MH Extended Services Candidate Row">
            <label
              htmlFor="mhExtendedServicesCandidate"
              data-aoi="MH Extended Services Candidate Label"
            >
              MH Extended Services Candidate?
            </label>
            <select
              id="mhExtendedServicesCandidate"
              name="mhExtendedServicesCandidate"
              data-aoi="MH Extended Services Candidate Select"
            >
              <option value="" data-aoi="MH Extended Services Candidate Option">
                Select...
              </option>
              <option value="Yes" data-aoi="MH Extended Services Yes Option">
                Yes
              </option>
              <option value="No" data-aoi="MH Extended Services No Option">
                No
              </option>
            </select>
          </div>
          {/* MH - Services Custom Field #5 */}
          <div className="form-row" data-aoi="MH Custom Field 5 Row">
            <label htmlFor="mhCustomField5" data-aoi="MH Custom Field 5 Label">
              MH - Services Custom Field #5
            </label>
            <input
              type="text"
              id="mhCustomField5"
              name="mhCustomField5"
              placeholder="Enter info for Custom Field #5"
              data-aoi="MH Custom Field 5 Input"
            />
          </div>
          {/* Client Declined Services? */}
          <div className="form-row" data-aoi="Client Declined Services Row">
            <label data-aoi="Client Declined Services Label">
              Client Declined Services?
            </label>
            <div className="checkbox-group" data-aoi="Client Declined Services Group">
              <label data-aoi="Declined Already Receiving Checkbox">
                <input
                  type="checkbox"
                  name="clientDeclinedReason"
                  value="alreadyReceivingTherapy"
                  data-aoi="Declined Already Receiving Input"
                />
                Already receiving therapy services
              </label>
              <label data-aoi="Declined Family Not Supportive Checkbox">
                <input
                  type="checkbox"
                  name="clientDeclinedReason"
                  value="familyNotSupportive"
                  data-aoi="Declined Family Not Supportive Input"
                />
                Family didn't think needed/not supportive
              </label>
            </div>
          </div>
        </section>

        {/* 3. TELEHEALTH SERVICES SECTION */}
        <section className="mh-section" data-aoi="Telehealth Services Section">
          <h2 data-aoi="Telehealth Services Header">Telehealth Services</h2>
          <div className="form-row" data-aoi="Miles Saved Row">
            <label htmlFor="milesSaved" data-aoi="Miles Saved Label">
              Number of Miles Saved Providing Telehealth Services Per Session
            </label>
            <input
              type="number"
              id="milesSaved"
              name="milesSaved"
              placeholder="e.g., 30"
              data-aoi="Miles Saved Input"
            />
          </div>
          <div className="form-row" data-aoi="Telehealth Barriers Row">
            <label data-aoi="Telehealth Barriers Label">
              Barriers Encountered During Mental Health Services
            </label>
            <div className="checkbox-group column-layout" data-aoi="Telehealth Barriers Group">
              {/* repeat each <label>…<input> with its own data-aoi as needed */}
              <label data-aoi="Barrier No Services Checkbox">
                <input
                  type="checkbox"
                  name="telehealthBarriers"
                  value="noServicesNeeded"
                  data-aoi="Barrier No Services Input"
                />
                Center doesn't offer the Services needed
              </label>
              {/* …other barrier checkboxes, each with data-aoi */}
            </div>
          </div>
        </section>

        {/* 4. MENTAL HEALTH PROVIDER LOG SECTION */}
        <section className="mh-section" data-aoi="Provider Log Section">
          <h2 data-aoi="Provider Log Header">Mental Health Provider Log</h2>
          <div className="mh-log-actions" data-aoi="Provider Log Actions">
            <button
              type="button"
              className="session-log-button"
              data-aoi="Add Provider Button"
            >
              + Add Provider
            </button>
            <button
              type="button"
              className="session-log-button"
              data-aoi="Provider Details Button"
            >
              Details
            </button>
          </div>
          <table className="mh-log-table" data-aoi="Provider Log Table">
            <thead data-aoi="Provider Log Table Header">
              <tr>
                <th data-aoi="Date Services Offered Header">
                  Date Services Offered
                </th>
                <th data-aoi="Agency Header">Agency</th>
                <th data-aoi="Therapist Header">Therapist</th>
                <th data-aoi="Referral Type Header">Referral Type</th>
                <th data-aoi="Case Number Header">Case #</th>
              </tr>
            </thead>
            <tbody data-aoi="Provider Log Table Body">
              <tr data-aoi="Provider Log Example Row">
                <td data-aoi="Example Date Services Offered">08/30/2015</td>
                <td data-aoi="Example Agency">Anderson SW Team</td>
                <td data-aoi="Example Therapist">Sylvia Jones</td>
                <td data-aoi="Example Referral Type">Therapy</td>
                <td data-aoi="Example Case Number">12345</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. OUTSIDE REFERRALS SECTION */}
        <section className="mh-section" data-aoi="Outside Referrals Section">
          <h2 data-aoi="Outside Referrals Header">Outside Referrals</h2>
          <button
            type="button"
            className="session-log-button"
            data-aoi="Add Outside Referral Button"
          >
            + Add New Referral
          </button>
          <table className="mh-log-table" data-aoi="Outside Referrals Table">
            <thead data-aoi="Outside Referrals Table Header">
              <tr>
                <th data-aoi="Referral Date Header">Referral Date</th>
                <th data-aoi="Referred To Header">Referred To</th>
                <th data-aoi="Comments Header">Comments</th>
              </tr>
            </thead>
            <tbody data-aoi="Outside Referrals Table Body">
              <tr data-aoi="No Outside Referrals Row">
                <td colSpan="3">No items to display</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 6. ADDITIONAL POINTS OF CONTACT SECTION */}
        <section className="mh-section" data-aoi="Additional Points of Contact Section">
          <h2 data-aoi="Additional Points of Contact Header">
            Additional Points of Contact
          </h2>
          <button
            type="button"
            className="session-log-button"
            data-aoi="Add Point of Contact Button"
          >
            + Add New Point of Contact
          </button>
          <table className="mh-log-table" data-aoi="Points of Contact Table">
            <thead data-aoi="Points of Contact Table Header">
              <tr>
                <th data-aoi="Action Header">Action</th>
                <th data-aoi="Agency Header">Agency</th>
                <th data-aoi="Name Header">Name</th>
                <th data-aoi="Phone Header">Phone</th>
                <th data-aoi="Email Header">Email</th>
              </tr>
            </thead>
            <tbody data-aoi="Points of Contact Table Body">
              <tr data-aoi="No Points of Contact Row">
                <td colSpan="5">No items to display</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 7. CONTACT INFO SECTION */}
        <section className="mh-section" data-aoi="Contact Info Section">
          <h2 data-aoi="Contact Info Header">Contact Info</h2>
          <div className="contact-info-row" data-aoi="Contact Info Row">
            <div className="contact-box" data-aoi="Client Contact Info Box">
              <label
                htmlFor="clientContactInfo"
                data-aoi="Client Contact Info Label"
              >
                Client Contact Info
              </label>
              <textarea
                id="clientContactInfo"
                name="clientContactInfo"
                placeholder="Enter client contact info..."
                data-aoi="Client Contact Info Input"
              ></textarea>
            </div>
            <div className="contact-box" data-aoi="Parent Contact Info Box">
              <label
                htmlFor="parentContactInfo"
                data-aoi="Parent Contact Info Label"
              >
                Parent Contact Info
              </label>
              <textarea
                id="parentContactInfo"
                name="parentContactInfo"
                placeholder="Enter parent contact info..."
                data-aoi="Parent Contact Info Input"
              ></textarea>
            </div>
            <div className="contact-box" data-aoi="Date Therapy Completed Box">
              <label
                htmlFor="dateTherapyCompleted"
                data-aoi="Date Therapy Completed Label"
              >
                Date Therapy Completed
              </label>
              <input
                type="date"
                id="dateTherapyCompleted"
                name="dateTherapyCompleted"
                data-aoi="Date Therapy Completed Input"
              />
            </div>
          </div>
        </section>

        {/* 8. UPLOADED DOCUMENTS SECTION */}
        <section className="mh-section" data-aoi="Uploaded Documents Section">
          <h2 data-aoi="Uploaded Documents Header">Uploaded Documents</h2>
          <div className="documents-grid" data-aoi="Documents Grid">
            <div className="grid-header" data-aoi="Documents Grid Header">
              <span data-aoi="Upload Table Header File Name">File Name</span>
              <span data-aoi="Upload Table Header Upload Date">Upload Date</span>
              <span data-aoi="Upload Table Header User">User</span>
              <span data-aoi="Upload Table Header Page">Page</span>
              <span data-aoi="Upload Table Header Size">Size</span>
            </div>
            <div className="no-items" data-aoi="No Documents Row">
              No items to display
            </div>
            <button
              type="button"
              className="select-files-button"
              data-aoi="Select Files Button"
            >
              Select Files...
            </button>
            <p className="file-size-info" data-aoi="File Size Info">
              Maximum allowed file size is <strong>10 MB</strong>.
            </p>
            <p className="storage-warning" data-aoi="Storage Warning">
              NCA does not recommend the storage of evidentiary documents as
              part of this case record. Any copies of evidentiary materials
              should be retained by the appropriate law enforcement and
              prosecution partners.
            </p>
          </div>
        </section>

        {/* FINAL SAVE/CANCEL BUTTONS */}
        <div className="mh-form-buttons" data-aoi="Form Buttons Section">
          <button type="submit" className="save-button" data-aoi="Save Button">
            SAVE
          </button>
          <button type="button" className="cancel-button" data-aoi="Cancel Button">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default MHBasicInterface;

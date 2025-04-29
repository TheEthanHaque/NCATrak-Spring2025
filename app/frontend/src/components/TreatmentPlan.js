import React from "react";
import "./TreatmentPlan.css";

function TreatmentPlan() {
  return (
    <div className="container" data-aoi="TreatmentPlan Container">
      <header className="header" data-aoi="TreatmentPlan Header">
        <h1 data-aoi="TreatmentPlan Title">Mental Health Treatment Plan</h1>
        <p className="subtitle" data-aoi="TreatmentPlan Subtitle">
          Manage your treatment plan details and documents below.
        </p>
      </header>

      <div className="button-group" data-aoi="TreatmentPlan Button Group">
        <button className="add-button" data-aoi="Add TreatmentPlan Button">
          + Add New Treatment Plan
        </button>
      </div>

      <table className="data-table" data-aoi="TreatmentPlan Data Table">
        <thead data-aoi="TreatmentPlan Table Head">
          <tr>
            <th data-aoi="Planned Start Date Header">Planned Start Date</th>
            <th data-aoi="Treatment Model Header">Treatment Model</th>
            <th data-aoi="Name Header">Name</th>
            <th data-aoi="Provider Agency Header">Provider Agency</th>
          </tr>
        </thead>
        <tbody data-aoi="TreatmentPlan Table Body">
          <tr data-aoi="TreatmentPlan Row 1">
            <td data-aoi="Planned Start Date Cell">2025-04-01</td>
            <td data-aoi="Treatment Model Cell">Cognitive Behavioral Therapy</td>
            <td data-aoi="Name Cell">John Doe</td>
            <td data-aoi="Provider Agency Cell">Agency XYZ</td>
          </tr>
        </tbody>
      </table>

      {/* Uploaded Documents Section */}
      <div className="uploaded-documents" data-aoi="TreatmentPlan Uploaded Documents Section">
        <h3 className="documents-title" data-aoi="TreatmentPlan Documents Title">Uploaded Documents</h3>
        <div className="documents-grid" data-aoi="TreatmentPlan Documents Grid">
          <div className="grid-header" data-aoi="TreatmentPlan Documents Grid Header">
            <span data-aoi="File Name Header">File Name</span>
            <span data-aoi="Upload Date Header">Upload Date</span>
            <span data-aoi="User Header">User</span>
            <span data-aoi="Page Header">Page</span>
            <span data-aoi="Size Header">Size</span>
          </div>
          <div className="no-items" data-aoi="TreatmentPlan No Items">No items to display</div>
          <button className="select-files-button" data-aoi="TreatmentPlan Select Files Button">
            Select Files...
          </button>
          <p className="file-size-info" data-aoi="TreatmentPlan File Size Info">
            Maximum allowed file size is <strong>10 MB</strong>.
          </p>
          <p className="storage-warning" data-aoi="TreatmentPlan Storage Warning">
            NCA does not recommend the storage of evidentiary documents as part
            of this case record. Any copies of evidentiary materials should be
            retained by the appropriate law enforcement and prosecution
            partners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TreatmentPlan;

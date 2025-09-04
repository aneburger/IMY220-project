/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/editProfile.css';

const EditProjectForm = ({ onCancel }) => {
   return (
        <div id="editProjectFormDiv">
            <div id="editProjectForm">
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" name="projectName" id="projectName" placeholder="E.g. 'Version_Ctrl'" autoComplete="projectName"/>

                <label htmlFor="createDate">Created on:</label>
                <input type="date" name="createDate" id="createDate" autoComplete="createDate"/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" name="owner" id="owner" placeholder="Owner of the project" autoComplete="owner"/>
            
                <label htmlFor="version">Version:</label>
                <input type="text" name="version" id="version" placeholder="E.g. 'v.1.2.3'" autoComplete="version"/>
            
                <label htmlFor="status">Status:</label>
                <input type="text" id="status" name="status" placeholder="Checked 'In' / 'Out'"/>
            
                <label htmlFor="imgUpload">Project Image:</label>
                <input type="file" id="imgUpload" name="imgUpload"/>
            
                <div id="editProjectFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditProjectForm;
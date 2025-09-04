/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/createProject.css';

const CreateProjectForm = ({ onCancel }) => {
   return (
        <div id="createProjectFormDiv">
            <div id="createProjectForm">
                <img alt="projectimg" id="projectFormImg" src="/assets/images/project.png" height="152"/>

                <div id="prName">
                    <label htmlFor="projectFormName">Project Name:</label>
                    <input type="text" name="projectFormName" id="projectFormName" placeholder="E.g. 'Version_Ctrl'" autoComplete="projectFormName"/>
                </div>

                <div id="crDate">
                    <label htmlFor="createFormDate">Created on:</label>
                    <input type="date" name="createFormDate" id="createFormDate" autoComplete="createFormDate"/>
                </div>

                <div id="details">
                    <label htmlFor="owner">Owner:</label>
                    <input type="text" name="owner" id="owner" placeholder="Owner of the project" autoComplete="owner"/>
                
                    <label htmlFor="version">Version:</label>
                    <input type="text" name="version" id="version" placeholder="E.g. 'v.1.2.3'" autoComplete="version"/>
                
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" name="status" placeholder="Checked 'In' / 'Out'"/>
                
                    <label htmlFor="imgUpload">Project Image:</label>
                    <input type="file" id="imgUpload" name="imgUpload"/>
                </div>

                <div id="descr">
                    <form>
                        <fieldset>
                            <legend>Description</legend>
                            <textarea placeholder="Add Project Description Here..." name="textarea"></textarea>
                        </fieldset>
                    </form>
                </div>

                <div id="filesField">
                    <form>
                        <fieldset>
                            <legend>Files</legend>
                            <input type="file" id="fileUpload" name="fileUpload"/><button type="button" id="filefieldAdd">Add</button>
                            <p>1. File_name.js</p>  {/* Delete button */}
                            <p>2. File_name.html</p>
                            <p>3. File_name.css</p>
                        </fieldset>
                    </form>
                </div>

                <div id="membersField">
                    <form>
                        <fieldset>
                            <legend>Members</legend>
                            <input type="text" id="memFieldAdd" name="memFieldAdd" placeholder="Add Member..."/><button type="button" id="memFieldAddB">Add</button>
                            <p>1. Member_name</p>
                            <p>2. Member_name</p>
                            <p>3. Member_name</p>
                        </fieldset>
                    </form>
                </div>
                
                <div id="createProjectFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreateProjectForm;
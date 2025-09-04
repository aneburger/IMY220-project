/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/checkIn.css';
import AddFiles from "./AddFiles";

const CheckInForm = ({ onCancel }) => {
   return (
        <div id="checkInFormDiv">
            <div id="checkInProjectForm">
                <label htmlFor="version">Version:</label>
                <input type="text" name="version" id="version" placeholder="E.g. 'v.1.2.3'" autoComplete="version"/>
            
                <label htmlFor="message">Message:</label>
                <input type="text" id="message" name="message" placeholder="Short description of changes..."/>
            
                <label htmlFor="imgUpload">Add Files:</label>
                <input type="file" id="imgUpload" name="imgUpload" multiple/>
            
                <div id="checkInProjectFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CheckInForm;
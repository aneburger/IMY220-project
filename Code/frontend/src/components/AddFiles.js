/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/singleProject.css';

const AddFiles = ({ onCancel }) => {
   return (
        <div id="filesAddDiv">
            <div id="fileForm">
                <label htmlFor="myFile">Select a file:</label>
                <input type="file" id="myFile" name="uploadedFile" multiple/>
            
                <div id="fileFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddFiles;

                
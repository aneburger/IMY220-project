/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/singleProject.css';

const EditDescription = ({ onCancel }) => {
   return (
        <div id="editDescriptionDiv">
            <div id="editForm">
                <textarea placeholder="Add the project description here..."></textarea>
            
                <div id="editFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditDescription;

                
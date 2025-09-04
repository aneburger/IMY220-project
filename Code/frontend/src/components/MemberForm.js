/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/singleProject.css';

const MemberForm = ({ onCancel }) => {
   return (
        <div id="memberFormDiv">
            <div id="memberForm">
                <input type="text" name="member" id="member" placeholder="Add a member..." autoComplete="member"/>
                <button id="addMem">Add</button>
            
                <div id="memberFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default MemberForm;

                
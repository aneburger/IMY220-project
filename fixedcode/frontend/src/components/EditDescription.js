/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/singleProject.css';

const EditDescription = ({ currentDescription, onSave, onCancel }) => {
    const [description, setDescription] = useState(currentDescription || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSave) onSave(description);
    };

    return (
        <div id="editDescriptionDiv">
            <form id="editForm" onSubmit={handleSubmit}>
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Add the project description here..."/>
            
                <div id="editFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditDescription;

                
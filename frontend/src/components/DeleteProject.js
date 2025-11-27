/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';

const DeleteProject = ({ onDelete }) => {
    return (
        <div id="deleteProjectDiv">
            <button id="deleteProjectB" onClick={onDelete}>Delete Project</button>
        </div>
    );
}

export default DeleteProject;
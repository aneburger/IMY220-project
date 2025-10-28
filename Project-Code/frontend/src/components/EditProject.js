/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/editProfile.css';
// import '../../public/assets/style/css/profileForm.css';
import EditProjectForm from "./EditProjectForm";

const EditProject = ({ project, onProjectUpdated }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const requestingUsername = loggedInUser ? loggedInUser.username : null; 

    return (
        <div id="editProjectButtonDiv">
            <button onClick={toggle} id="editImg">Edit Project</button>
            {isOpen && <EditProjectForm project={project} onCancel={toggle} onProjectUpdated={onProjectUpdated} requestingUser={requestingUsername}/>}
        </div>
    );
}

export default EditProject;
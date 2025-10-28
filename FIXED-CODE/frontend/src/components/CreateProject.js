/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/projects.css';
import CreateProjectForm from "./CreateProjectForm";

const CreateProject = ({ onProjectCreated }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div id="createProjectDiv">
            <button onClick={toggle} id="createProjectB">Create New</button>
            {isOpen && <CreateProjectForm onCancel={toggle} onProjectCreated={onProjectCreated}/>}
        </div>
    );
}

export default CreateProject;
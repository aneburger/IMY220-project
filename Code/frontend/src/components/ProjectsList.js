/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';
import ProjectView from "./ProjectView";

const ProjectsList = () => {
    return (
        <div className="projectsListGrid">
            <ProjectView/>
            <ProjectView/>
            <ProjectView/>
            <ProjectView/>
        </div>
    );
}

export default ProjectsList;
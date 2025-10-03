/* Ane' Burger 24565068, 33 */

import React from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';
import ProjectView from "./ProjectView";

const ProjectsList = ({ projects, onDelete, sort }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    let sortedProjects = [...projects];
    if (sort === "Alphabetically") {
        sortedProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sort === "Newest to oldest") {
        sortedProjects.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else if (sort === "Oldest to newest") {
        sortedProjects.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    }

    return (
        <div className="projectsListGrid">
            {sortedProjects.length === 0 ? (
                    <p id="vision"><span><img alt="rocket" src="/assets/images/rocket.png"/></span><span id="com" style={{color: "#90d9fd", fontWeight: "550"}}>Commit</span> to your vision. Launch your first project right here!</p>
                ):(
            sortedProjects.map(project => (
                <ProjectView key={project.projectId || project._id} project={project} onDelete={onDelete} loggedInUsername={user.username}/>
            )))}
        </div>
    );
}

export default ProjectsList;
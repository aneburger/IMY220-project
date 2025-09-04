/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';

const ProjectsList = () => {
    return (
        <div className="projectsListGrid">
            <article className="projectCard">
                <h1>Project_Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <Link to="/project:projectId"><button id="viewProjectButton">View</button></Link>
                <button id="deleteProjectButton">Delete</button>
            </article>

            <article className="projectCard2">
                <h1>Project_Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <Link to="/project:projectId"><button id="viewProjectButton">View</button></Link>
                <button id="deleteProjectButton">Delete</button>
            </article>

            <article className="projectCard3">
                <h1>Project_Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <Link to="/project:projectId"><button id="viewProjectButton">View</button></Link>
                <button id="deleteProjectButton">Delete</button>
            </article>

            <article className="projectCard4">
                <h1>Project_Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <Link to="/project:projectId"><button id="viewProjectButton">View</button></Link>
                <button id="deleteProjectButton">Delete</button>
            </article>
        </div>
    );
}

export default ProjectsList;
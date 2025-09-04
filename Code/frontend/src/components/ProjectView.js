/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';

const ProjectView = () => {
    return (
        <section>
            <article className="projectCard">
                <h1>Project_Name</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <Link to="/project/:projectId"><button id="viewProjectButton">View</button></Link>
                <button id="deleteProjectButton">Delete</button>
            </article>
        </section>
    );
}

export default ProjectView;
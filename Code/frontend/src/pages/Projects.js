/* Ane' Burger 24565068, 33 */

import React from "react";
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/projects.css';
// import '../../public/assets/style/css/home.css';
import QuickLinks from "../components/QuickLinks";
import CreateProject from "../components/CreateProject";
import ProjectsList from "../components/ProjectsList";

const Projects = () => {
    return (
        <div className="projectsBody">
            <div id="navDiv">
                <Navbar/>
            </div>

            <section id="projectsGrid">
                <div id="projectsPageHead"> 
                    <h1>Projects</h1>
                </div>

                <div id="projectPageFeedDiv">
                    <div id="projectsListComp">
                        <ProjectsList/>
                    </div>
                </div>

                <aside id="quickAside">
                    <QuickLinks/>
                </aside>

                <div id="createPB">
                    <CreateProject/>
                </div>

                

            </section>
        </div>
    );
}

export default Projects;
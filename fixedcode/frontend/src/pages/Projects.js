/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/projects.css';
// import '../../public/assets/style/css/home.css';
import QuickLinks from "../components/QuickLinks";
import CreateProject from "../components/CreateProject";
import ProjectsList from "../components/ProjectsList";

const Projects = () => {
    const [sort, setSort] = useState("");
    const [projects, setProjects] = useState([]);
    const [userObj, setUserObj] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then(res => res.json())
            .then(data => {
                if (userObj && userObj.projects) {
                    const userProjectIds = userObj.projects.map(id => id.toString());
                    const filtered = data.filter(project =>
                        userProjectIds.includes(project._id.toString()) ||
                        (project.projectId && userProjectIds.includes(project.projectId))
                    );
                    setProjects(filtered);
                } else {
                    setProjects([]);
                }
            });
    }, [userObj]);

    const refreshProjects = async () => {
        const updatedUserRes = await fetch(`http://localhost:3000/api/profile/${userObj._id}`);
        const updatedUser = await updatedUserRes.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserObj(updatedUser);

        const projectsRes = await fetch("http://localhost:3000/api/projects");
        const allProjects = await projectsRes.json();
        if (updatedUser && updatedUser.projects) {
            const userProjectIds = updatedUser.projects.map(id => id.toString());
            const filtered = allProjects.filter(project => userProjectIds.includes(project._id.toString()));
            setProjects(filtered);
        } else {
            setProjects([]);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (data.success) {
                alert("Project deleted successfully.");
                refreshProjects();
            } else {
                alert("Failed to delete project.");
            }
        } catch (err) {
            alert("Error deleting project.");
            console.error(err);
        }
    };

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
                        <ProjectsList projects={projects} onDelete={handleDeleteProject} sort={sort}/>
                    </div>
                </div>

                <aside id="quickAside">
                    <QuickLinks/>
                </aside>

                <div id="createPB">
                    <CreateProject onProjectCreated={refreshProjects}/>
                </div>

                <div id="sortE">
                    <select id="sortDrop" name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="">Sort</option>
                        <option value="Alphabetically">Alphabetically</option>
                        <option value="Newest to oldest">Newest to oldest</option>
                        <option value="Oldest to newest">Oldest to newest</option>
                    </select>
                </div>

            </section>
        </div>
    );
}

export default Projects;
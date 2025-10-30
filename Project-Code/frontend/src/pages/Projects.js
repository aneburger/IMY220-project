/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect, useCallback } from "react";
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

    const removeProjectFromState = useCallback((id) => {
        const idStr = id ? id.toString() : "";
        setProjects(prev => prev.filter(p => {
            const pid = (p._id && p._id.toString()) || (p.projectId && p.projectId.toString()) || "";
            return pid !== idStr;
        }));
    }, []);


    const refreshProjects = useCallback(async () => {
        if (!userObj || !userObj._id) return;
        try {
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
        } catch (err) {
            console.error("refreshProjects error", err);
        }
    }, [userObj]);

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


    useEffect(() => {
        const requestHandler = (e) => {
            const { projectId, requestingUser } = e?.detail || {};
            if (!projectId) return;
            handleDeleteProject(projectId, requestingUser);
        };
        window.addEventListener('requestProjectDelete', requestHandler);
        return () => window.removeEventListener('requestProjectDelete', requestHandler);
    }, []); 


   useEffect(() => {
        const deletedHandler = (e) => {
            const deletedId = e?.detail?.projectId;
            if (!deletedId) return;
            removeProjectFromState(deletedId); // immediate UI update
            refreshProjects().catch(() => {});
        };
        window.addEventListener('projectDeleted', deletedHandler);
        return () => window.removeEventListener('projectDeleted', deletedHandler);
    }, [removeProjectFromState, refreshProjects]);


    const handleDeleteProject = async (projectId, requestingUsernameParam) => {
        const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const requestingUsername = requestingUsernameParam || (loggedInUser ? loggedInUser.username : null);
        
        if (!requestingUsername) {
            alert("Not authenticated to delete project.");
            return;
        }

        removeProjectFromState(projectId);

        try {
            console.log('handleDeleteProject called with', projectId, requestingUsername);
            const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestingUser: requestingUsername })
            });
            const data = await response.json();
            if (data.success) {
                //removeProjectFromState(projectId);
                refreshProjects().catch(err => console.error("refresh after delete failed", err));
                alert("Project deleted successfully.");
            } else {
                await refreshProjects();
                alert(data.message || "Failed to delete project.");
            }
        } catch (err) {
            await refreshProjects();
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
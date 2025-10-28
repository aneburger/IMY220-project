/* Ane' Burger 24565068, 33 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';

const ProjectView = ({ project, onDelete, loggedInUsername }) => {
    const [enlarged, setEnlarged] = useState(false);
    const [deleted, setDeleted] = useState(false);

    // const loggedInUser = JSON.parse(localStorage.getItem('user'));
    // const requestingUsername = loggedInUser ? loggedInUser.username : null;
    // const isOwner = project.owner === loggedInUsername;
    // const isAdmin = loggedInUser && loggedInUser.role === 'admin';
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const currentUsername = loggedInUsername || (storedUser ? storedUser.username : null);
    const isOwner = project.owner === currentUsername;
    const isAdmin = storedUser && storedUser.role === 'admin';
    const projectImage = project.projectImage ? project.projectImage : "/assets/images/project.png";

    if (deleted) {
        return null;
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        //if (window.confirm("Are you sure you want to delete this project?")) {
            const id = project._id || project.projectId;
            console.log('ProjectView.handleDelete called for id=', id, ' onDelete type=', typeof onDelete, ' currentUsername=', currentUsername);
            // const loggedInUser = JSON.parse(localStorage.getItem('user'));
            // const requestingUsername = loggedInUser ? loggedInUser.username : null;
            if (typeof onDelete === 'function') {
                try {
                    await onDelete(id, currentUsername);
                    //return;
                } catch (err) {
                    console.error("onDelete handler failed:", err);
                }
                return;
            }
            //console.error("onDelete is not a function (parent didn't pass handler).");

            try {
                if (!currentUsername) {
                    alert("Not authenticated to delete project.");
                    return;
                }
                const url = `http://localhost:3000/api/project/${id}?requestingUser=${encodeURIComponent(currentUsername)}`;
                const res = await fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ requestingUser: currentUsername })
                });
                const data = await res.json();
                if (data.success) {
                    setDeleted(true); 
                    window.dispatchEvent(new CustomEvent('projectDeleted', { detail: { projectId: id } })); // let parent sync
                } else {
                    alert(data.message || "Failed to delete project.");
                }
            } catch (err) {
                console.error("Direct delete failed:", err);
                alert("Error deleting project.");
            }

            //window.dispatchEvent(new CustomEvent('requestProjectDelete', { detail: { projectId: id, requestingUser: currentUsername } }));

            // try {
            //     if (!currentUsername) {
            //         alert("Not authenticated to delete project.");
            //         return;
            //     }
            //     const url = `http://localhost:3000/api/project/${id}?requestingUser=${encodeURIComponent(currentUsername)}`;
            //     const res = await fetch(url, {
            //         method: "DELETE",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ requestingUser: currentUsername })
            //     });
            //     const data = await res.json();
            //     if (data.success) {
            //         window.dispatchEvent(new CustomEvent('projectDeleted', { detail: { projectId: id } }));
            //     } else {
            //         alert(data.message || "Failed to delete project.");
            //     }
            // } catch (err) {
            //     console.error("Direct delete failed:", err);
            //     alert("Error deleting project.");
            // }
        //}
    };

    const handleImageClick = () => {
        setEnlarged(!enlarged);
    };


    return (
        <section>
            <article className="projectCard">
                <img alt="projectImage" className="projectImg" 
                    src={projectImage} 
                    style={{
                            width: enlarged ? 300 : 100,
                            height: enlarged ? 300 : 100,
                            borderRadius: "15px",
                            objectFit: "cover",
                            cursor: "pointer",
                            transition: "width 0.2s, height 0.2s",
                            zIndex: enlarged ? 3 : 0,
                            marginLeft: enlarged ? "5em" : "1.2em",
                            position: enlarged ? "absolute" : "",
                            boxShadow: enlarged ? "#0000005c 0px 5px 20px 4px" : null,
                            marginTop: "1em",
                            top: enlarged ? "35%" : null,
                            left: enlarged ? "35%" : null 
                        }}
                    onClick={handleImageClick}
                    title={enlarged ? "Click to shrink" : "Click to enlarge"}
                />
                <Link id="nameLink" to={`/project/${project.projectId || project._id}`}><h1>{project.projectName}</h1></Link>
                <Link id="descrLink" to={`/project/${project.projectId || project._id}`}><div className="desc"><p>{project.description}</p></div></Link>
                <p id="creation">Created On: {new Date(project.createdOn).toLocaleString()}</p> 
                {/* <Link to={`/project/${project.projectId || project._id}`}><button id="viewProjectButton">View</button></Link> */}
                {(isOwner || isAdmin) && (
                    // <button id="deleteProjectButton" onClick={handleDelete}>Delete</button>
                    <img
                        alt="delete"
                        id="deleteProjectButton"
                        src="/assets/images/close.png"
                        height="18"
                        onClick={handleDelete}
                        style={{ cursor: "pointer" }}
                    />
                )}
            </article>
        </section>
    );
}

export default ProjectView;
/* Ane' Burger 24565068, 33 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/projects.css';

const ProjectView = ({ project, onDelete, loggedInUsername }) => {
    const [enlarged, setEnlarged] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            onDelete(project._id);
        }
    };

    const handleImageClick = () => {
        setEnlarged(!enlarged);
    };

    const isOwner = project.owner === loggedInUsername;
    const projectImage = project.projectImage ? project.projectImage : "/assets/images/project.png";


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
                <h1>{project.projectName}</h1>
                <p>{project.description}</p>
                <Link to={`/project/${project.projectId || project._id}`}><button id="viewProjectButton">View</button></Link>
                {isOwner && (
                    <button id="deleteProjectButton" onClick={handleDelete}>Delete</button>
                )}
            </article>
        </section>
    );
}

export default ProjectView;
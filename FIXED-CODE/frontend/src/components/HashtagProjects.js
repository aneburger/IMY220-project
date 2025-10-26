/* Ane' Burger 24565068, 33 */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../public/assets/style/css/singleProject.css';

const HashtagProjects = ({ projects, hashtag, onCancel }) => {
    const navigate = useNavigate();

    return (
        <div id="hashtagProjectsListDiv">
            <h2>Projects using <span>#{hashtag}</span></h2>
            <div id="hashList">
                {projects.length === 0 ? (
                    <p>No projects found for #{hashtag}</p>
                ) : (
                    projects.map(project => (
                        <div className="hashProjectCard" key={project._id || project.projectId}>
                            <h1>{project.projectName}</h1>
                            <p>
                                Owner:{" "}
                                <Link to={`/profile/${project.owner}`}>
                                    <span style={{ cursor: "pointer" }}>{project.owner}</span>
                                </Link>
                            </p>
                            <div>
                                <button onClick={() => navigate(`/project/${project._id || project.projectId}`)}>View</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div id="hashButtons">
                <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default HashtagProjects;
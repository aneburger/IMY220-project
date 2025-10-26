/* Ane' Burger 24565068, 33 */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../public/assets/style/css/singleProject.css';
import '../../public/assets/style/css/search.css';

const SearchResults = ({ users = [], projects = [], hashtags = [], onCancel }) => {
    const navigate = useNavigate();

    return (
        <div id="searchResultsListDiv">
            <h2>Search Results:</h2>
            <div id="resultsList">
                { users.length === 0 ? (
                    <p style={{ marginLeft: "1em" }}>No results found for users.</p>
                ) : (
                users.map(user => (
                    <div className="userProjectCard" key={user._id || user.userId}>
                        <img alt="profile" className="profileBFeed" src={user.image || "/assets/images/profile.png"} style={{ width: 45, height: 45, borderRadius: "50%", objectFit: "cover" }}/>
                        <Link to={`/profile/${user._id || user.userId}`} style={{ color: "#71ccf9" }}><h1>{user.username}</h1></Link>
                        <p>Email: {user.email}</p>
                    </div>
                )))}
                { projects.length === 0 ? (
                    <p style={{ marginLeft: "1em" }}>No results found for projects.</p>
                ) : (
                projects.map(project => (
                    <div className="hashProjectCard" key={project._id || project.projectId}>
                        <h1>{project.projectName}</h1>
                        <p>
                            Owner:{" "}
                            <Link to={`/profile/${project.owner}`}>
                                <span style={{ cursor: "pointer", textDecoration: "underline", color: "#71ccf9" }}>{project.owner}</span>
                            </Link>
                        </p>
                        <div>
                            <button onClick={() => navigate(`/project/${project._id || project.projectId}`)}>View</button>
                        </div>
                        <p style={{marginLeft: "1.3em", marginTop: "0em"}}>Type: <span style={{color: "#71ccf9"}}>{project.type}</span></p>
                        <p style={{marginTop: "0em"}}>
                            Check-in Messages: {
                                Array.isArray(project.checkInMessages)
                                ? project.checkInMessages.join(", ")
                                : (typeof project.checkInMessages === "object" && project.checkInMessages !== null)
                                    ? Object.values(project.checkInMessages).join(", ")
                                    : (typeof project.checkInMessages === "string" ? project.checkInMessages : "")
                            }
                        </p>
                    </div>
                )))}
                {hashtags.map(project => (
                    <div className="hashProjectCard" key={project._id || project.projectId}>
                        <h1>{project.projectName}</h1>
                        <p>
                            Hashtags:{" "}
                            {Array.isArray(project.languages) && project.languages.length > 0
                                ? project.languages.map(lang => (
                                    <Link key={lang} to={`/hashtag/${lang}`}>
                                        <span style={{ cursor: "pointer", marginRight: "0.3em" }}>#{lang}</span>
                                    </Link>
                                ))
                                : <span style={{ color: "#888" }}>None</span>
                            }
                        </p>
                        <div>
                            <button onClick={() => navigate(`/project/${project._id || project.projectId}`)}>View</button>
                        </div>
                    </div>
                ))}
            </div>
            <div id="resultsButtons">
                <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default SearchResults;
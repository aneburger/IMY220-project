/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/singleProject.css';
import DownloadFiles from "../components/DownloadFiles";
import DeleteProject from "../components/DeleteProject";
import AddProjectMember from "../components/AddProjectMember";
import EditDescription from "../components/EditDescription";
import AddFiles from "../components/AddFiles";
import FilesList from "../components/FilesList";
import ActivityList from "../components/ActivityList";
import EditProject from "../components/EditProject";
import ProjectMessages from "../components/ProjectMessages";
import CheckIn from "../components/CheckIn";
import ViewActivity from "../components/ViewActivity";
import EditDiscussion from "../components/EditDiscussion";
import HashtagProjects from "../components/HashtagProjects";
import ProjectImageUpload from "../components/ProjectImageUpload";

const SingleProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [messages, setMessages] = useState([]);
    const [projectActivity, setProjectActivity] = useState([]);
    const [hashtagProjects, setHashtagProjects] = useState([]);
    const [selectedHashtag, setSelectedHashtag] = useState("");
    const [enlarged, setEnlarged] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isFilesOpen, setIsFilesOpen] = useState(false);
    const [isActOpen, setIsActOpen] = useState(false);
    const [isHashOpen, setIsHashOpen] = useState(false);

    const extensionToLanguage = {
        "js": "JavaScript",
        "jsx": "JavaScript",
        "ts": "TypeScript",
        "tsx": "TypeScript",
        "py": "Python",
        "java": "Java",
        "c": "C",
        "cpp": "C++",
        "cs": "C#",
        "rb": "Ruby",
        "php": "PHP",
        "go": "Go",
        "rs": "Rust",
        "swift": "Swift",
        "kt": "Kotlin",
        "html": "HTML",
        "css": "CSS",
        "json": "JSON",
        "xml": "XML",
        "sh": "Shell",
        "pl": "Perl",
        "r": "R",
        "scala": "Scala",
        "dart": "Dart",
        "m": "Objective-C",
        "sql": "SQL"
    };
    
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
            fetch(`http://localhost:3000/api/project/${projectId}`)
            .then(res => res.json())
            .then(data => setProject(data))
            .catch(err => console.error("Error fetching project:", err));
    }, [projectId]); 

    useEffect(() => {
        fetchMessages();
    }, [projectId]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/project/${projectId}/activity`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setProjectActivity(data.activities);
            });
    }, [projectId]);

    const fetchMessages = () => {
        fetch(`http://localhost:3000/api/project/${projectId}/discussion`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMessages(data.messages);
            });
    };

    if (!project) return <div>Loading project...</div>;

    const isOwner = loggedInUser && project.owner === loggedInUser.username;
            
    const toggleFileDiv = () => {
        setIsFilesOpen((isFilesOpen) => !isFilesOpen);
    }

    const toggleActDiv = () => {
        setIsActOpen((isActOpen) => !isActOpen);
        console.log("view clicked");
    }
            
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    // const toggleHash = () => {
    //     setIsHashOpen((isHashOpen) => !isHashOpen);
    // }

    const handleHashtagClick = async (lang) => {
        setIsHashOpen(true);
        setSelectedHashtag(lang);
        const response = await fetch(`http://localhost:3000/api/projects/hashtag/${lang}`);
        const data = await response.json();
        if (data.success) {
            setHashtagProjects(data.projects);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
                    method: "DELETE"
                });
                const data = await response.json();
                if (data.success) {
                    alert("Project deleted successfully.");
                    navigate("/projects");
                } else {
                    alert("Failed to delete project.");
                }
            } catch (err) {
                alert("Error deleting project.");
                console.error(err);
            }
        }
    };


    const fetchProjectActivity = () => {
        fetch(`http://localhost:3000/api/project/${projectId}/activity`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setProjectActivity(data.activities);
            });
    };

    const handleProjectUpdated = (updatedProject) => {
        setProject(updatedProject);
        fetchProjectActivity();
    };

    const handleDescriptionSave = async (newDescription) => {
        try {
            const response = await fetch(`http://localhost:3000/api/project/${projectId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: newDescription })
            });
            const data = await response.json();
            if (data.success) {
                setProject(data.project); 
                setIsOpen(false);
            } else {
                alert("Failed to update description.");
            }
        } catch (err) {
            alert("Error updating description.");
            console.error(err);
        }
    };

    const handleMemberAdded = (updatedProject) => {
        setProject(updatedProject);
    };

    const handleDeleteMember = async (memberUsername) => {
        try {
            const response = await fetch(`http://localhost:3000/api/project/${projectId}/member`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberUsername })
            });
            const data = await response.json();
            if (data.success) {
                setProject(data.project);
            } else {
                alert(data.message || "Failed to remove member.");
            }
        } catch (err) {
            alert("Error removing member.");
        }
    };

    const handleFilesAdded = (newFiles) => {
        setProject(prev => ({ ...prev, files: newFiles }));
    };

    const handleDeleteFile = async (filename) => {
        const newFiles = project.files.filter(f => f !== filename);
        const response = await fetch(`http://localhost:3000/api/project/${projectId}/files`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: newFiles })
        });
        const data = await response.json();
        if (data.success) {
            setProject(prev => ({ ...prev, files: newFiles }));
        }
    };

    const handleMessageAdded = (newMessage) => {
        // fetchMessages();
        setMessages(prev => [newMessage, ...prev]);
    };

    const isCheckedOut = !!project.checkedOutBy;
    const isCheckedOutByMe = project.checkedOutBy === loggedInUser.username;

    const isMember = project.members && project.members.includes(loggedInUser.username);

    const getLanguagesFromFiles = (files) => {
        const langs = new Set();
        files.forEach(file => {
            const ext = file.split('.').pop().toLowerCase();
            if (extensionToLanguage[ext]) {
                langs.add(extensionToLanguage[ext]);
            }
        });
        return Array.from(langs);
    };

    const handleImageClick = () => {
        setEnlarged(!enlarged);
    };

    const languageHashtags = project.files ? getLanguagesFromFiles(project.files) : [];

    return (
        <div className="singleProjectBody">
            <div id="navDiv">
                <Navbar/>
            </div>

            <main id="singleProjectGrid">
                <div id="projectNameHead"> 
                    <h1 id="pName">{project.projectName}</h1>
                </div>

                <p id="createdDate">Created: {new Date(project.createdOn).toLocaleString()}</p>

                {(isOwner || isMember) && (
                    <div id="downloadDelete">
                        {isOwner && <DeleteProject onDelete={handleDelete}/>}
                        <CheckIn project={project} onProjectUpdated={handleProjectUpdated} isCheckedOutByMe={isCheckedOutByMe} isCheckedOut={isCheckedOut}/>
                    </div>
                )}

                {/* {isOwner && (
                    <ProjectImageUpload project={project} onImageUploaded={handleProjectUpdated} />
                )} */}
                {/* {!isOwner && ( */}
                    <img
                        alt="project"
                        id="projectImg"
                        src={project.projectImage || "/assets/images/project.png"}
                        style={{
                            width: enlarged ? 300 : 140,
                            height: enlarged ? 300 : 140,
                            borderRadius: "15px",
                            objectFit: "cover",
                            cursor: "pointer",
                            transition: "width 0.2s, height 0.2s",
                            zIndex: enlarged ? 3 : 0,
                            marginLeft: enlarged ? "58em" : "1.2em",
                            position: enlarged ? "absolute" : "",
                            boxShadow: enlarged ? "#0000005c 0px 5px 20px 4px" : null,
                             
                        }}
                        onClick={handleImageClick}
                        title={enlarged ? "Click to shrink" : "Click to enlarge"}
                    />
                {/* )} */}

                <div id="editImgDiv">
                    {isOwner && (
                        <EditProject project={project} onProjectUpdated={handleProjectUpdated}/>
                    )}
                </div>

                <div id="hashtags">
                    {languageHashtags.length > 0 ? (
                        languageHashtags.map(lang => (
                            <p key={lang} onClick={() => handleHashtagClick(lang)} style={{ cursor: "pointer" }}>#{lang}</p>
                        ))
                    ) : (
                        <p id="noProg">No programming languages detected</p>
                    )}
                    {isHashOpen && (
                        <HashtagProjects 
                            projects={hashtagProjects}
                            hashtag={selectedHashtag}
                            onCancel={() => setIsHashOpen(false)}/>
                    )}
                </div>

                <div id="projectInfoCard">
                    <Link to={`/profile/${project.owner}`}><label htmlFor="owner" >Owner: <span style={{ cursor: "pointer" }}>{project.owner}</span></label></Link>

                    <label htmlFor="type" id="typeL">Type: <span>{project.type}</span></label>

                    <label htmlFor="version" className="version">Version: <span>{project.version}</span></label> 

                    <label htmlFor="status">Status: <span>
                                                Checked {project.status}
                                                {isCheckedOut && (
                                                    <span>
                                                        (by {project.checkedOutBy})
                                                    </span>
                                                )}
                                            </span></label> 
                </div>

                <div id="membersHead"> 
                    <h1 id="memName">Members</h1>
                </div>

                {(isOwner || isMember) && (
                    <div id="addMember">
                        <AddProjectMember projectId={projectId} onMemberAdded={handleMemberAdded} members={project.members || []}/>
                    </div>
                )}

                <div id="membersDiv">
                     <div id="memberList">
                        <div className="ol">
                            {project.members && project.members.map((member) => {
                                const isMemberOwner = member === project.owner;
                                return (
                                    <div key={member}>
                                        <Link to={`/profile/${member}`}>
                                            <p style={{ cursor: "pointer" }}>
                                                {member} {isMemberOwner && <span style={{ color: "#63c9fcff", fontSize: "0.8em", marginLeft: "0.3em", fontWeight: "400" }}>(owner)</span>}
                                            </p>
                                        </Link>
                                        {isOwner && !isMemberOwner && (
                                            <button className="deleteFriend" onClick={() => handleDeleteMember(member)}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {(isOwner || isMember) && (
                    <>
                    <div id="discussionHead"> 
                        <h1 id="discussionName">Discussion Board</h1>
                        <EditDiscussion projectId={projectId} onMessageAdded={handleMessageAdded}/>
                    </div>

                    <div id="discussionDiv">
                        <ProjectMessages projectId={projectId} messages={messages}/>
                    </div>
                    </>
                )}

                <div id="descriptionHead"> 
                    <h1 id="descriptionName">Description</h1>
                </div>

                <div id="discriptionEdit">
                    {isOwner && (
                        <button onClick={toggle} className="editDescriptionB">Edit</button>
                    )}
                    {isOpen && isOwner && (
                        <EditDescription 
                                currentDescription={project.description}
                                onSave={handleDescriptionSave}
                                onCancel={toggle}/>
                    )}
                </div>

                <div id="descriptionDiv">
                    <section id="descriptionText">
                        <textarea value={project.description} readOnly/>
                    </section>
                </div>

                <div id="filesHead"> 
                    <h1 id="filesName">Files</h1>
                </div>

                <div id="filesAdd">
                    {isCheckedOutByMe && (
                        <>
                            <button onClick={toggleFileDiv} className="filesAddB">Add +</button>
                        </>
                    )}
                    {isFilesOpen && isCheckedOutByMe && ( <AddFiles
                                        projectFiles={project.files || []}
                                        projectId={projectId}
                                        onFilesAdded={handleFilesAdded} 
                                        onCancel={toggleFileDiv}/>
                    )}
                    
                    <DownloadFiles/>
                </div>

                <div id="filesDiv">
                    <p id="filesDivSmallHead">File name <span>Check-In Message</span></p>
                    <FilesList files={project.files || []} onDeleteFile={handleDeleteFile} isCheckedOutByMe={isCheckedOutByMe} checkInMessages={project.checkInMessages} project={project}/>
                </div>


                <div id="activityProjectHead"> 
                    <h1 id="activityProjectName">Activity</h1>
                    <button onClick={toggleActDiv} className="actAddB">View</button>
                    {isActOpen && <ViewActivity activities={projectActivity} onCancel={toggleActDiv}/>}
                </div>

                <div id="activityProjectDiv">
                    <p id="activityDivSmallHead">User name <span>Checked In / Out</span> <span>Timestamp</span></p>
                    <ActivityList activities={projectActivity}/>
                </div>
                

            </main>
        </div>
    );
}

export default SingleProject;
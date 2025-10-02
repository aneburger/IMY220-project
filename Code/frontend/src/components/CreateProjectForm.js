/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/createProject.css';

const CreateProjectForm = ({ onCancel, onProjectCreated }) => {
    const [memberInput, setMemberInput] = useState("");
    const [memberError, setMemberError] = useState("");
    const [membersList, setMembersList] = useState([]);
    const [fileInput, setFileInput] = useState([]);
    const [filesList, setFilesList] = useState([]);
    const [formData, setFormData] = useState({
        projectName: '',
        createdOn: '',
        description: '',
        type: '',
        files: [],
        members: [],
        owner: '',
        version: '',
        status: '',
        projectImage: '',
        checkedOutBy: '',
        checkInMessages: []
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    

    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const payload = { ...formData, userId: userObj._id, members: membersList, files: filesList };
    //     try {
    //         const response = await fetch('http://localhost:3000/api/project', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(payload)
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             const updatedUserRes = await fetch(`http://localhost:3000/api/profile/${userObj._id}`);
    //             const updatedUser = await updatedUserRes.json();
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //             if (onProjectCreated) onProjectCreated();
    //             alert('Project created!');
    //             onCancel();
    //         } else {
    //             alert('Error creating project');
    //         }
    //     } catch (err) {
    //         console.error('Error:', err);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = { ...formData, userId: userObj._id, members: membersList };
        const formDataToSend = new FormData();
        Object.entries(formDataObj).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formDataToSend.append(key, JSON.stringify(value));
            } else {
                formDataToSend.append(key, value);
            }
        });
        selectedFiles.forEach(file => {
            formDataToSend.append("files", file);
        });

        try {
            const response = await fetch('http://localhost:3000/api/project/create-with-files', {
                method: 'POST',
                body: formDataToSend
            });
            const data = await response.json();
            if (data.success) {
                const updatedUserRes = await fetch(`http://localhost:3000/api/profile/${userObj._id}`);
                const updatedUser = await updatedUserRes.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                if (onProjectCreated) onProjectCreated();
                alert('Project created!');
                onCancel();
            } else {
                alert('Error creating project');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleMemberBlur = async () => {
        if (!memberInput) return;
        if (membersList.includes(memberInput)) {
            setMemberError("User is already added as a member.");
            return;
        }
        const response = await fetch(`http://localhost:3000/api/check-username/${encodeURIComponent(memberInput)}`);
        const data = await response.json();
        if (!data.exists) {
            setMemberError("User does not exist.");
        } else {
            setMemberError("");
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!memberInput) return;
        if (membersList.includes(memberInput)) {
            setMemberError("User is already added as a member.");
            return;
        }
        const response = await fetch(`http://localhost:3000/api/check-username/${encodeURIComponent(memberInput)}`);
        const data = await response.json();
        if (!data.exists) {
            setMemberError("User does not exist.");
            return;
        }
        setMembersList([...membersList, memberInput]);
        setMemberInput("");
        setMemberError("");
    };

    const handleRemoveMember = (username) => {
        setMembersList(membersList.filter(m => m !== username));
    };

    const handleFileChange = (e) => {
        // // setFileInput(Array.from(e.target.files).map(f => f.name));
        // setSelectedFiles(Array.from(e.target.files));
        const filesArr = Array.from(e.target.files);
        setSelectedFiles(filesArr);
        setFilesList(filesArr.map(f => f.name));
    };

    const handleAddFile = (e) => {
        e.preventDefault();
        const newFiles = fileInput.filter(f => !filesList.includes(f));
        setFilesList([...filesList, ...newFiles]);
        setFileInput([]);
        document.getElementById('fileUpload').value = "";
    };

    const handleRemoveFile = (filename) => {
        setFilesList(filesList.filter(f => f !== filename));
        setSelectedFiles(selectedFiles.filter(f => f.name !== filename));
    };

    return (
        <div id="createProjectFormDiv">
            <form onSubmit={handleSubmit} id="createProjectForm">
                <img alt="projectimg" id="projectFormImg" src="/assets/images/rocket.png" height="210"/>

                <div id="prName">
                    <label htmlFor="projectName">Project Name:</label>
                    <input type="text" 
                            name="projectName" 
                            id="projectFormName" 
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="E.g. 'Version_Ctrl'" 
                            autoComplete="projectFormName"/>
                </div>

                <div id="details">
                    <label htmlFor="owner">Owner:</label>
                    <input type="text" 
                            name="owner" 
                            id="owner" 
                            value={formData.owner}
                            onChange={handleChange}
                            placeholder="Owner of the project" 
                            autoComplete="owner"/>
                
                    {/* <label htmlFor="version">Version:</label>
                    <input type="text" 
                            name="version" 
                            id="version"
                            value={formData.version}
                            onChange={handleChange} 
                            placeholder="E.g. 'v.1.2.3'" 
                            autoComplete="version"/> */}
                
                    {/*                     
                    <label htmlFor="projectImage">Project Image:</label>
                    <input type="file" 
                            id="imgUpload"
                            value={formData.projectImage}
                            onChange={handleChange} 
                            name="projectImage"/> */}

                    <label htmlFor="type" id="typeL">Type:</label>
                    <div id="typeApp">
                        <select id="typeAppSelect" name="type"
                                value={formData.type}
                                onChange={handleChange}>
                            <option value="">Select type</option>
                            <option value="Web App">Web App</option>
                            <option value="Desktop App">Desktop App</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Framework">Framework</option>
                        </select>
                    </div>
                
                </div>

                <div id="descr">
                    <fieldset>
                        <legend>Description</legend>
                        <textarea placeholder="Add Project Description Here..."
                                    value={formData.description}
                                    onChange={handleChange} 
                                    name="description"/>                            
                    </fieldset>
                </div>

                <div id="filesField">
                        <fieldset>
                            <legend>Files</legend>
                            <input type="file" 
                                    id="fileUpload"
                                    onChange={handleFileChange}  
                                    multiple
                                    name="files"/>
                            <button type="button" id="filefieldAdd" onClick={handleAddFile}>Add</button>
                            {filesList.map((file, idx) => (
                                <div key={file}>
                                    <p>{idx + 1}. {file}</p>
                                    <button type="button" onClick={() => handleRemoveFile(file)}>Delete</button>
                                </div>
                            ))}
                        </fieldset>
                </div>

                <div id="membersField">
                    
                        <fieldset>
                            <legend>Members</legend>
                            <input type="text" 
                                    id="memFieldAdd" 
                                    value={memberInput}
                                    onChange={e => setMemberInput(e.target.value)} 
                                    onBlur={handleMemberBlur}
                                    name="members" 
                                    placeholder="Add Member..."/>
                            <button type="button" id="memFieldAddB" onClick={handleAddMember}>Add</button>
                            {memberError && <p id="memberError">{memberError}</p>}
                            {membersList.map((member, idx) => (
                                <div key={member}>
                                    <p>{idx + 1}. {member}</p>
                                    <button type="button" onClick={() => handleRemoveMember(member)}>Delete</button>
                                </div>
                            ))}
                        </fieldset>
                    
                </div>
                
                <div id="createProjectFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateProjectForm;
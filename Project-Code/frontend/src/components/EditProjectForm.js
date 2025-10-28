/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/editProfile.css';
import ProjectImageUpload from "./ProjectImageUpload";

const EditProjectForm = ({ project, onCancel, onProjectUpdated, requestingUser }) => {
    const [ownerInput, setOwnerInput] = useState(project.owner);
    const [ownerError, setOwnerError] = useState("");
    const [formData, setFormData] = useState({
        projectName: project.projectName || "",
        //owner: project.owner || "",
        version: project.version || "",
        status: project.status || "",
        projectImage: project.projectImage || "/assets/images/project.png"
    });
    const [projectImage, setProjectImage] = useState(project.projectImage || "/assets/images/project.png");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const requestingUsername = requestingUser || (loggedInUser ? loggedInUser.username : null);


    const buildNonOwnerPatch = () => {
        const patch = {};
        if (formData.projectName !== project.projectName) patch.projectName = formData.projectName;
        if (formData.version !== project.version) patch.version = formData.version;
        if (formData.status !== project.status) patch.status = formData.status;
        if (formData.type !== project.type) patch.type = formData.type;
        if (formData.projectImage !== project.projectImage) patch.projectImage = formData.projectImage;
        return patch;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ownerError) return;

        let updatedProject = { ...project };

        try {
            const nonOwnerPatch = buildNonOwnerPatch();
            if (Object.keys(nonOwnerPatch).length > 0) {
                const response = await fetch(`http://localhost:3000/api/project/${project._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...nonOwnerPatch, requestingUser: requestingUsername })
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    alert(data.message || "Failed to update project.");
                    return;
                }
                updatedProject = { ...updatedProject, ...data.project };
            }

            if (ownerInput !== project.owner) {
                const ownerResponse = await fetch(`http://localhost:3000/api/project/${project._id}/owner`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        newOwnerUsername: ownerInput,
                        previousOwnerUsername: project.owner,
                        requestingUser: requestingUsername
                    })
                });
                const ownerData = await ownerResponse.json();
                if (!ownerResponse.ok || !ownerData.success) {
                    setOwnerError(ownerData.message || "Failed to change owner.");
                    return;
                }
             updatedProject = ownerData.project || { ...updatedProject, owner: ownerInput };
            }

            if (onProjectUpdated) onProjectUpdated(updatedProject);
            onCancel();
        } catch (err) {
            alert("Error updating project.");
            console.error(err);
        }
    };



    const handleOwnerBlur = async () => {
        if (!ownerInput) return;
        const response = await fetch(`http://localhost:3000/api/check-username/${encodeURIComponent(ownerInput)}`);
        const data = await response.json();
        if (!data.exists) {
            setOwnerError("User does not exist.");
        } else {
            setOwnerError("");
        }
    };

    const handleImageUploaded = (updatedProject) => {
        setProjectImage(updatedProject.projectImage);
        setFormData(formData => ({
            ...formData,
            projectImage: updatedProject.projectImage
        }));
    };

    return (
        <div id="editProjectFormDiv">
            <form id="editProjectForm" onSubmit={handleSubmit}>
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" name="projectName" id="projectName" placeholder="E.g. 'Version_Ctrl'" autoComplete="projectName"
                        value={formData.projectName}
                        onChange={handleChange}/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" name="owner" id="owner" placeholder="Owner of the project" autoComplete="owner"
                        value={ownerInput}
                        onChange={e => setOwnerInput(e.target.value)}
                        onBlur={handleOwnerBlur}/>
                {ownerError && <p>{ownerError}</p>}
            
            
                <label htmlFor="imgUpload">Project Image:</label>
                {/* <input type="file" id="imgUpload" name="imgUpload"/> */}

                <ProjectImageUpload project={{ ...project, projectImage }} onImageUploaded={handleImageUploaded} />

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

                {/* <label htmlFor="addType">Add a new type:</label>
                <input type="text" name="addType" id="addType" placeholder="E.g. 'Framework'" autoComplete="type"
                        // value={formData.version}
                        // onChange={handleChange}
                /> */}
            
                <div id="editProjectFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProjectForm;
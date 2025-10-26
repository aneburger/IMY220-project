/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/editProfile.css';
import ProjectImageUpload from "./ProjectImageUpload";

const EditProjectForm = ({ project, onCancel, onProjectUpdated }) => {
    const [ownerInput, setOwnerInput] = useState(project.owner);
    const [ownerError, setOwnerError] = useState("");
    const [formData, setFormData] = useState({
        projectName: project.projectName || "",
        owner: project.owner || "",
        version: project.version || "",
        status: project.status || ""
    });
    const [projectImage, setProjectImage] = useState(project.projectImage || "/assets/images/project.png");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ownerError) return;
        let updatedProject = project;

        if (ownerInput !== project.owner) {
            try {
                const ownerResponse = await fetch(`http://localhost:3000/api/project/${project._id}/owner`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        newOwnerUsername: ownerInput,
                        previousOwnerUsername: project.owner
                    })
                });
                const ownerData = await ownerResponse.json();
                if (!ownerData.success) {
                    setOwnerError(ownerData.message || "Failed to change owner.");
                    return;
                }
                updatedProject = ownerData.project;
                if (onProjectUpdated) onProjectUpdated(updatedProject);
            } catch (err) {
                setOwnerError("Error changing owner.");
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/api/project/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, owner: ownerInput })
            });
            const data = await response.json();
            if (data.success) {
                const finalProject = { ...updatedProject, ...data.project };
                if (onProjectUpdated) onProjectUpdated(finalProject);
                onCancel();
            } else {
                alert("Failed to update project.");
            }
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
            
                {/* <label htmlFor="version">Version:</label>
                <input type="text" name="version" id="version" placeholder="E.g. 'v.1.2.3'" autoComplete="version"
                        value={formData.version}
                        onChange={handleChange}/> */}
            
                {/* <label htmlFor="status">Status:</label>
                <input type="text" id="status" name="status" placeholder="Checked 'In' / 'Out'"
                        value={formData.status}
                        onChange={handleChange}/> */}
            
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
            
                <div id="editProjectFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProjectForm;
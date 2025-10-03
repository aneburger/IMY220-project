/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/checkIn.css';
import AddFiles from "./AddFiles";

const CheckInForm = ({ project, onCancel, onProjectCheckedIn }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [checkInMessage, setCheckInMessage] = useState("");
    const [version, setVersion] = useState(project.version || "");
    const [error, setError] = useState("");
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const handleFileChange = (e) => {
        // setSelectedFiles(Array.from(e.target.files).map(f => f.name));
        setSelectedFiles(Array.from(e.target.files));
    };

    // const handleSave = async (e) => {
    //     e.preventDefault();
    //     if (!checkInMessage.trim()) {
    //         setError("Check-in message is required.");
    //         return;
    //     }
    //     if (!version.trim()) {
    //         setError("Version is required.");
    //         return;
    //     }
        
    //     const filesWithMessages = selectedFiles.map(filename => ({
    //         filename,
    //         message: checkInMessage
    //     }));

    //     const duplicates = project.files.filter(f => selectedFiles.includes(f));
    //     if (duplicates.length > 0) {
    //         if (!window.confirm(`The following files already exist: ${duplicates.join(", ")}. Do you want to replace them?`)) {
    //             return;
    //         }
    //     }
        
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/project/${project._id}/checkin`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 username: loggedInUser.username,
    //                 files: filesWithMessages,
    //                 checkInMessage,
    //                 version
    //             })
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             if (onProjectCheckedIn) onProjectCheckedIn(data.project);
    //             onCancel();
    //         } else {
    //             setError(data.message || "Failed to check in project.");
    //         }
    //     } catch (err) {
    //         setError("Error checking in project.");
    //     }
    // };


    const handleSave = async (e) => {
        e.preventDefault();
        if (!checkInMessage.trim()) {
            setError("Check-in message is required.");
            return;
        }
        if (!version.trim()) {
            setError("Version is required.");
            return;
        }

        const selectedFileNames = selectedFiles.map(file => file.name);
        const duplicates = project.files.filter(f => selectedFileNames.includes(f));
        if (duplicates.length > 0) {
            if (!window.confirm(`The following files already exist: ${duplicates.join(", ")}. Do you want to replace them?`)) {
                return;
            }
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("files", file);
        });
        formData.append("username", loggedInUser.username);
        formData.append("checkInMessage", checkInMessage);
        formData.append("version", version);

        try {
            const response = await fetch(`http://localhost:3000/api/project/${project._id}/checkin-files`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                if (onProjectCheckedIn) onProjectCheckedIn(data.project);
                onCancel();
            } else {
                setError(data.message || "Failed to check in project.");
            }
        } catch (err) {
            setError("Error checking in project.");
        }
    };


    return (
        <div id="checkInFormDiv">
            <form id="checkInProjectForm" onSubmit={handleSave}>
                <label htmlFor="message">Message:</label>
                <input type="text" id="message" name="message" placeholder="Short description of changes..." 
                        value={checkInMessage}
                        onChange={e => setCheckInMessage(e.target.value)}
                        required/>

                <label htmlFor="version">Version:</label>
                <input type="text" id="version" name="version" placeholder="E.g. v.1.2.3" 
                        value={version}
                        onChange={e => setVersion(e.target.value)}
                        required/>
            
                <label htmlFor="imgUpload">Add Files:</label>
                <input type="file" id="imgUpload" name="imgUpload" multiple
                        onChange={handleFileChange}/>

                {error && <p>{error}</p>}
            
                <div id="checkInProjectFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CheckInForm;
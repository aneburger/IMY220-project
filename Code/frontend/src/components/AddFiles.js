/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/singleProject.css';

const AddFiles = ({ projectFiles, projectId, onFilesAdded, onCancel }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        // const filesArr = Array.from(e.target.files).map(f => f.name);
        // setSelectedFiles(filesArr);

        setSelectedFiles(Array.from(e.target.files));
    };

    // add only file names
    // const handleSave = async (e) => {
    //     e.preventDefault();
    //     if (selectedFiles.length === 0) return;

    //     const duplicates = projectFiles.filter(f => selectedFiles.includes(f));
    //     // const duplicates = projectFiles.filter(f =>
    //     //     selectedFiles.map(file => file.name).includes(f)
    //     // );
    //     let newFiles;
    //     // const selectedFileNames = selectedFiles.map(file => file.name);
    //     // const duplicates = projectFiles.filter(f => selectedFileNames.includes(f));
    //     // let newFiles;


    //     if (duplicates.length > 0) {
    //         if (!window.confirm(`The following files already exist: ${duplicates.join(", ")}. Do you want to replace them?`)) {
    //             return;
    //         }
            
    //         newFiles = [
    //             ...projectFiles.filter(f => !selectedFiles.includes(f)),
    //             ...selectedFiles
    //         ];
    //     } else {
    //         newFiles = [...projectFiles, ...selectedFiles];
    //     }

    //     const response = await fetch(`http://localhost:3000/api/project/${projectId}/files`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ files: newFiles })
    //     });
    //     const data = await response.json();
    //     if (data.success) {
    //         onFilesAdded(data.project.files);
    //         onCancel();
    //     }
    // };


    const handleSave = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) return;

        const selectedFileNames = selectedFiles.map(file => file.name);
        const duplicates = projectFiles.filter(f => selectedFileNames.includes(f));
        let newFiles;
        if (duplicates.length > 0) {
            if (!window.confirm(`The following files already exist: ${duplicates.join(", ")}. Do you want to replace them?`)) {
                return;
            }
            newFiles = [
                ...projectFiles.filter(f => !selectedFileNames.includes(f)),
                ...selectedFileNames
            ];
        } else {
            newFiles = [...projectFiles, ...selectedFileNames];
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("files", file);
        });
        formData.append("projectId", projectId);
        formData.append("filesList", JSON.stringify(newFiles)); 

        const response = await fetch(`http://localhost:3000/api/project/${projectId}/upload-files`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            onFilesAdded(data.project.files);
            onCancel();
        }
    };


    return (
        <div id="filesAddDiv">
            <div id="fileForm">
                <label htmlFor="myFile">Select a file:</label>
                <input type="file" id="myFile" name="uploadedFile" multiple onChange={handleFileChange}/>
            
                <div id="fileFormButtons">
                    <button onClick={handleSave}>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddFiles;

                
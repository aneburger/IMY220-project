/* Ane' Burger 24565068, 33 */

import React from "react";
import { useParams } from "react-router-dom";
import '../../public/assets/style/css/singleProject.css';

const DownloadFiles = () => {
    const { projectId } = useParams();

    const handleDownload = () => {
        if (window.confirm("Are you sure you want to download all project files?")) {
            window.location.href = `http://localhost:3000/api/project/${projectId}/download`;
        }
    };
    return (
        <div id="downloadFilesDiv">
            <button id="downloadFilesB" onClick={handleDownload}>Download Files</button>
        </div>
    );
}

export default DownloadFiles;
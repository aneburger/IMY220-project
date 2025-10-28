/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';

const truncateFileName = (filename, maxLength = 20) => {
    if (filename.length > maxLength) {
        return filename.slice(0, maxLength - 3) + '...';
    }
    return filename;
};

const FilesList = ({ files, onDeleteFile, isCheckedOutByMe, checkInMessages, project }) => {
    const handleDownloadFile = (file) => {
        if (window.confirm(`Download "${file}"?`)) {
            window.location.href = `http://localhost:3000/api/project/${project._id}/download-file/${encodeURIComponent(file)}`;
        }
    };

    return (
        <div id="filesListDiv">
            { files.length === 0 ? (
                <p>No files added yet.</p>
            ):(
            files.map((file, idx) => (
                <section className="fileCard" key={file}>
                    <p className="fileNameInList" title={file}>{truncateFileName(file)}</p>
                    <p className="checkInMsg">{checkInMessages && checkInMessages[file] ? checkInMessages[file] : ""}</p>
                    {isCheckedOutByMe && (
                        <>
                            <img
                                alt="download"
                                className="downloadImg"
                                src="/assets/images/download.png"
                                height="25"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDownloadFile(file)}
                            />
                            <img
                                alt="delete"
                                className="deleteImg"
                                src="/assets/images/trash.png"
                                height="25"
                                onClick={() => onDeleteFile(file)}
                                style={{ cursor: "pointer" }}
                            />
                        </>
                    )}
                </section>
            )))}
        </div>
    );
}

export default FilesList;
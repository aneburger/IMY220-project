import React, { useRef, useState, useEffect } from "react";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit

const ProjectImageUpload = ({ project, onImageUploaded }) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(project.projectImage || "/assets/images/project.png");
    const [enlarged, setEnlarged] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setPreview(project.projectImage || "/assets/images/project.png");
    }, [project.projectImage]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.size > MAX_SIZE) {
            alert("Image is too large (max 5MB). Please choose a smaller image.");
            inputRef.current.value = "";
            return;
        }
        setPreview(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("projectImage", file);

        fetch(`http://localhost:3000/api/project/${project._id}/upload-image`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const cacheB = `?t=${Date.now()}`;
                setPreview(data.image + cacheB);
                if (onImageUploaded) onImageUploaded({ ...project, projectImage: data.image + cacheB });
            } else {
                alert("Error uploading image");
            }
        });
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleImageClick = () => {
        setEnlarged(!enlarged);
    };

    return (
        <div
            className={`project-upload-block${dragActive ? " drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
                width: enlarged ? 300 : 120,
                height: enlarged ? 300 : 120,
                borderRadius: "10px",
                // border: "2px dashed #1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                margin: "auto",
                position: "relative",
                // background: "#f8f8f8",
                cursor: "pointer",
                transition: "width 0.2s, height 0.2s",
                marginLeft: "5.1em",
                marginBottom: "1em"
            }}
        >
            <img
                src={preview}
                alt="project"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                    opacity: "25%"
                }}
                onClick={handleImageClick}
                title={enlarged ? "Click to shrink" : "Click to enlarge"}
            />
            <input
                type="file"
                accept="image/*"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer"
                }}
                ref={inputRef}
                onChange={handleChange}
                title="Upload project image"
            />
            {!enlarged && (
                <span style={{
                    position: "absolute",
                    bottom: 5,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    color: "white",
                    fontSize: "1.05em",
                    fontFamily: 'Albert Sans',
                    fontWeight: "500",
                    marginBottom: "2.1em"
                }}>
                    Drag & drop or click to upload
                </span>
            )}
        </div>
    );
};

export default ProjectImageUpload;
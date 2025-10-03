/* Ane' Burger 24565068, 33 */

import React, { useRef, useState, useEffect } from "react";

const ProfileImageUpload = ({ userObj, onImageUploaded }) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(userObj.image || "/assets/images/profile.png");
    const inputRef = useRef();

    useEffect(() => {
        if (userObj.image) {
            setPreview(userObj.image + `?t=${Date.now()}`);
        } else {
            setPreview("/assets/images/profile.png");
        }
    }, [userObj.image]);

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
        setPreview(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("userId", userObj._id);

        fetch(`http://localhost:3000/api/profile/${userObj._id}/upload-image`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const cacheB = `?t=${Date.now()}`;
                setPreview(data.image + cacheB);
                if (onImageUploaded) onImageUploaded({ ...data.user, image: data.image + cacheB });
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

    return (
        <div
            className={`profile-upload-block${dragActive ? " drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                // border: "2px dashed #1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                margin: "auto",
                position: "relative",
                marginLeft: "4.4em",
                marginBottom: "2em",
                marginTop: "0.7em",
                // background: "#f8f8f8"
            }}
        >
            <img
                src={preview}
                alt="profile"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    opacity: "40%"
                }}
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
                title="Upload profile image"
            />
            <span style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: 'Albert Sans',
                marginBottom: "2.7em",
                fontSize: "1em",
                color: "white",
                fontWeight: "500"
                // color: "#1976d2",
                // fontSize: "0.9em"
            }}>
                Drag & drop or click to upload
            </span>
        </div>
    );
};

export default ProfileImageUpload;
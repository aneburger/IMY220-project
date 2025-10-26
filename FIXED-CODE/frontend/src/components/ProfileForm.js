/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../public/assets/style/css/profileForm.css';
import ProfileImageUpload from "./ProfileImageUpload";

const ProfileForm = ({ userObj, onCancel, onProfileUpdated, onImageUploaded }) => {
    const [formData, setFormData] = useState({
        _id: userObj._id || "",
        username: userObj.username || "",
        birthday: userObj.birthday || "",
        occupation: userObj.occupation || "",
        bio: userObj.bio || "",
        socials: userObj.socials || "",
        friends: userObj.friends || "",
        image: userObj.image || ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...updateData } = formData;
            console.log("Submitting profile update with formData:", updateData);
            const response = await fetch(`http://localhost:3000/api/profile/${userObj._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            });
            const data = await response.json();
            if(data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if(onProfileUpdated) {
                    onProfileUpdated(data.user);
                }
                onCancel();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            alert("Error updating profile.");
            console.error(error);
        }
    }

    const handleDeleteProfile = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/profile/${userObj._id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (data.success) {
                localStorage.removeItem('user');
                navigate("/");
            } else {
                alert("Failed to delete profile.");
            }
        } catch (error) {
            alert("Error deleting profile.");
            console.error(error);
        }
    };

    const handleProfileUpdated = (updatedUser) => {
        setFormData(formData => ({
            ...formData,
            image: updatedUser.image,
            _id: updatedUser._id
        }));
        if (onProfileUpdated) onProfileUpdated(updatedUser);
    };

    return (
        <div id="profileFormDiv">
            <form id="profileForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="name" placeholder="Name" autoComplete="name"
                        value={formData.username}
                        onChange={handleChange}/>
            
                <label htmlFor="birthday">Birthday:</label>
                <input type="date" name="birthday" id="birthday" placeholder="Birthday" autoComplete="birthday"
                        value={formData.birthday}
                        onChange={handleChange}/>
            
                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" placeholder="Occupation"
                        value={formData.occupation}
                        onChange={handleChange}/>
            
                <label htmlFor="bio">Bio:</label>
                <input type="text" id="bio" name="bio" placeholder="Write something..."
                        value={formData.bio}
                        onChange={handleChange}/>

                <label htmlFor="socials">Socials:</label>
                <input type="text" id="socials" name="socials" placeholder="Social Media Accounts"
                        value={formData.socials}
                        onChange={handleChange}/>

                <label htmlFor="image">Profile Image:</label>
                {/* <input type="file" id="imgProfileUpload" name="image"/> */}

                <ProfileImageUpload userObj={formData} onImageUploaded={handleProfileUpdated} />
            
                <div id="profileFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>

                <button id="deleteProfileB" onClick={handleDeleteProfile}>Delete Profile</button>
            </form>
        </div>
    );
}

export default ProfileForm;
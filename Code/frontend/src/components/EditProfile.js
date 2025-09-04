/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/profile.css';
// import '../../public/assets/style/css/profileForm.css';
import ProfileForm from "./ProfileForm";

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div id="editButtonDiv">
            <button onClick={toggle}>Edit Profile</button>
            {isOpen && <ProfileForm onCancel={toggle}/>}
        </div>
    );
}

export default EditProfile;
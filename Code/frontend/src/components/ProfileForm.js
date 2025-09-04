/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/profileForm.css';

const ProfileForm = ({ onCancel }) => {
   return (
        <div id="profileFormDiv">
            <div id="profileForm">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Name" autoComplete="name"/>
            
                <label htmlFor="birthday">Birthday:</label>
                <input type="text" name="birthday" id="birthday" placeholder="Birthday" autoComplete="birthday"/>
            
                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" placeholder="Occupation"/>
            
                <label htmlFor="bio">Bio:</label>
                <input type="text" id="bio" name="bio" placeholder="Write something..."/>

                <label htmlFor="socials">Socials:</label>
                <input type="text" id="socials" name="socials" placeholder="Social Media Accounts"/>

                <label htmlFor="friends">Friends:</label>
                <input type="text" id="friends" name="friends" placeholder="Nr. of friends"/>

                <label htmlFor="imgProfileUpload">Profile Image:</label>
                <input type="file" id="imgProfileUpload" name="imgProfileUpload"/>
            
                <div id="profileFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
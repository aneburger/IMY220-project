/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/profile.css';

const ProfileTemplate = ({ userObj, hideInfoCard }) => {
    const friendCount = Array.isArray(userObj.friends) ? userObj.friends.length : 0;
    const friendLabel = friendCount === 1 ? "friend" : "friends";

    return (
        <section id="tempSection">
            <img alt="profile" id="profileB2" src={userObj.image || "/assets/images/profile.png"} style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}/>
            {!hideInfoCard && (
                <div className="infoCard">
                    <p><span style={{ fontWeight: 500, fontSize: "1.25em", color: "#96d0ff" }}>{userObj.username}</span></p>
                    <p><span>{userObj.birthday || "No date added."}</span></p>
                    <p><span>{userObj.occupation || "No occupation added."}</span></p>
                    <p><span>{userObj.bio || "No bio added."}</span></p>
                    <p><span>{userObj.socials || "No socials added."}</span></p>
                    <p><span>{friendCount} {friendLabel}</span></p>
                </div>
            )}
        </section>
    );
}

export default ProfileTemplate;
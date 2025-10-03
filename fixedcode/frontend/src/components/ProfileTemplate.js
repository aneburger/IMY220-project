/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/profile.css';

const ProfileTemplate = ({ userObj, hideInfoCard }) => {
    return (
        <section id="tempSection">
            <img alt="profile" id="profileB2" src={userObj.image || "/assets/images/profile.png"} style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}/>
            {!hideInfoCard && (
                <div className="infoCard">
                    <p>Username: <span>{userObj.username}</span></p>
                    <p>Birthday: <span>{userObj.birthday}</span></p>
                    <p>Occupation: <span>{userObj.occupation}</span></p>
                    <p>Bio: <span>{userObj.bio}</span></p>
                    <p>Socials: <span>{userObj.socials}</span></p>
                    <p>Friends: <span>{userObj.friends ? userObj.friends.length : 0}</span></p>
                </div>
            )}
        </section>
    );
}

export default ProfileTemplate;
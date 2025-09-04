/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/profile.css';

const ProfileTemplate = () => {
    return (
        <section>
            <img alt="profile" id="profileB2" src="/assets/images/profile.png" height="150"/>

            <div className="infoCard">
                <p>Name: </p>
                <p>Birthday: </p>
                <p>Occupation: </p>
                <p>Bio: </p>
                <p>Socials: </p>
                <p>Friends: </p>
            </div>
        </section>
    );
}

export default ProfileTemplate;
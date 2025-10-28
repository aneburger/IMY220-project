/* Ane' Burger 24565068, 33 */

import React from "react";
import { useNavigate } from "react-router-dom";
import '../../public/assets/style/css/profile.css';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div id="logoutDiv">
            <button id="logoutB" onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Logout;
/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link }  from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../../public/assets/style/css/nav.css';
import SearchBar from "./SearchBar";

const Navbar = () => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    const profileUrl = userObj ? `/profile/${userObj.userId || userObj._id}` : '/login';

    const profileImage = userObj && userObj.image ? userObj.image : "/assets/images/profile.png";

    return (
        <nav>
            <div className="nav">
                {/* <Link to="/">Splash</Link> */}
                <Link to="/home"><img id="commitedLogo" alt="commited" src={"/assets/images/commited.png"} width="350"/></Link>
                <SearchBar/>
                <div id="searchDiv">
                    <NavLink to="/home" id="homeNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                    <NavLink to="/projects" id="projectsNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Projects</NavLink>
                    <NavLink to={profileUrl} id="profileNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Profile</NavLink>
                    <img alt="profile" id="profileB" src={profileImage} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
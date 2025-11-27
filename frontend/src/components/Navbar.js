/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link }  from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../../public/assets/style/css/nav.css';
import SearchBar from "./SearchBar";
import RandomPlaceholderImage from "./RandomPlaceholder";

const Navbar = () => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    const profileUrl = userObj ? `/profile/${userObj.userId || userObj._id}` : '/login';

    const profileImage = userObj && userObj.image ? userObj.image : "/assets/images/profile.png";

    return (
        <nav>
            <div className="nav">

                <Link to="/home" id="commitedLogo">
                    <img id="logo-light" className="nav-logo" alt="Commited" src="/assets/images/dark-logo.png" width="350"/>
                    <img id="logo-dark" className="nav-logo" alt="Commited (dark)" src="/assets/images/commited.png" width="350"/>
                </Link>
                
                <SearchBar/>
                <div id="searchDiv">
                    <NavLink to="/home" id="homeNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                    <NavLink to="/projects" id="projectsNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Projects</NavLink>
                    <NavLink to={profileUrl} id="profileNav" className={({ isActive }) => (isActive ? 'active-link' : '')}>Profile</NavLink>
                    {/* <img alt="profile" id="profileB" src={profileImage} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}/> */}
                    {userObj?.image ? (
                        <img
                            alt="profile"
                            id="profileB"
                            src={userObj.image}
                            style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
                        />
                    ) : (
                        <RandomPlaceholderImage
                            userKey={userObj?._id || userObj?.username || "guest"}
                            size={60}
                            style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", alignSelf: "flex-end",
                                        position: "relative",
                                        marginRight: "4em",
                                        marginTop: "3em",
                                        paddingBottom: "5px" }}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
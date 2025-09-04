/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileTemplate from "../components/ProfileTemplate";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/home.css';
import '../../public/assets/style/css/profile.css';
import '../../public/assets/style/css/friends.css';
import LocalFeed from "../components/LocalFeed";
import EditProfile from "../components/EditProfile";
import TagCloud from "../components/TagCloud";
import CreateProject from "../components/CreateProject";
import ProjectsList from "../components/ProjectsList";
import ProfileForm from "../components/ProfileForm";
import FriendsList from "../components/FriendsList";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }
    return ( 
        <main className="profileBody">
            <div id="navDiv">
                <Navbar/>
            </div>
            <div id="profileGrid">
                <div id="profileHead"> 
                    <h1 id="uAct">Username's Profile</h1>
                </div>
                <p className="reposLink">Repositories</p>
                <p className="friendsLink" onClick={toggle}>Friends</p>
                {isOpen && <FriendsList onCancel={toggle}/>}
                <ProfileTemplate/>

                <EditProfile/>

                <TagCloud/>

                <div id="projectsHead"> 
                    <h1 id="uAct">Projects</h1>
                </div>

                <div id="yearFilter">
                    <select id="yearFilterDrop" name="filter">
                        <option id="yearFilterOption" value="filter">Year</option>
                        <option value="option1">2025</option>
                        <option value="option2">2024</option>
                        <option value="option3">2023</option>
                    </select>
                </div>

                <div id="sortE2">
                    <select id="sortDrop2" name="sort">
                        <option value="sort">Sort</option>
                        <option value="option1">Most popular</option>
                        <option value="option2">Newest to oldest</option>
                        <option value="option3">Oldest to newest</option>
                    </select>
                </div>

                <div id="profileCreateProject">
                    <CreateProject/>
                </div>

                <div id="projectFeedDiv">
                    <div>
                        <ProjectsList/>
                    </div>
                </div>

                <div id="activityHead"> 
                    <h1 id="uAct">Activity</h1>
                </div>

                <div id="activityFeedDiv">
                    <LocalFeed/>
                </div>
            </div>
        </main>
    );
}

export default Profile;
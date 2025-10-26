/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ProfileTemplate from "../components/ProfileTemplate";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/home.css';
import '../../public/assets/style/css/profile.css';
import '../../public/assets/style/css/friends.css';
import EditProfile from "../components/EditProfile";
import TagCloud from "../components/TagCloud";
import CreateProject from "../components/CreateProject";
import ProjectsList from "../components/ProjectsList";
import ProfileForm from "../components/ProfileForm";
import FriendsList from "../components/FriendsList";
import Logout from "../components/Logout";
import NotifsList from "../components/NotifsList";
import PersonalFeed from "../components/PersonalFeed";

const Profile = () => {
    const [sort, setSort] = useState("");
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [userObj, setUserObj] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });
    const [connectionStatus, setConnectionStatus] = useState("not-connected"); // "not-connected", "requested", "connected"

    useEffect(() => {
        fetch(`http://localhost:3000/api/profile/${userId}`)
        .then(response => response.json())
        .then(data => setUserData(data));
    }, [userId]); 

    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then(res => res.json())
            .then(data => {
                if (userData && userData.projects) {
                    const userProjectIds = userData.projects.map(id => id.toString());
                    const filtered = data.filter(project =>
                        userProjectIds.includes(project._id?.toString()) ||
                        (project.projectId && userProjectIds.includes(project.projectId))
                    );
                    setProjects(filtered);
                } else {
                    setProjects([]);
                }
            });
    }, [userData]);

    useEffect(() => {
        if (!isOwnProfile && userObj && userData) {
            if (userObj.friends && userObj.friends.includes(userData.username)) {
                setConnectionStatus("connected");
            }
            
            else if (userObj.sentRequests && userObj.sentRequests.includes(userData.username)) {
                setConnectionStatus("requested");
            }
            else {
                setConnectionStatus("not-connected");
            }
        }
    }, [userObj, userData, isOwnProfile]);
    
    const refreshProjects = async () => {
        const updatedUserRes = await fetch(`http://localhost:3000/api/profile/${userObj._id}`);
        const updatedUser = await updatedUserRes.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserObj(updatedUser);
    
        const projectsRes = await fetch("http://localhost:3000/api/projects");
        const allProjects = await projectsRes.json();
        if (updatedUser && updatedUser.projects) {
            const userProjectIds = updatedUser.projects.map(id => id.toString());
            const filtered = allProjects.filter(project => userProjectIds.includes(project._id.toString()));
            setProjects(filtered);
        } else {
            setProjects([]);
        }
    };

        
    if (!userData) {
        return <div>Loading profile...</div>;
    }
    
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const toggleNotifs = () => {
        setIsNotifOpen((isNotifOpen) => !isNotifOpen);
    }

    const handleProfileUpdated = (updatedUser) => {
        setUserObj(updatedUser);
        setUserData(updatedUser);
    };

    const isOwnProfile = userObj && (userObj._id === userId || userObj.username === userId);

    const handleSendRequest = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/friend-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fromUsername: userObj.username, toUsername: userData.username })
            });
            const data = await response.json();
            if (data.success) {
                setConnectionStatus("requested");
            }
        } catch (err) {
            alert("Error sending friend request.");
        }
    };

    const handleFriendRemoved = (removedFriendUsername) => {
        if (userObj && userObj.friends) {
            setUserObj({
                ...userObj,
                friends: userObj.friends.filter(f => f !== removedFriendUsername)
            });
        }
        if (userData && userData.friends) {
            setUserData({
                ...userData,
                friends: userData.friends.filter(f => f !== removedFriendUsername)
            });
        }
        
        setConnectionStatus("not-connected");
        fetch(`http://localhost:3000/api/profile/${userObj._id}`)
            .then(res => res.json())
            .then(updatedUser => {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUserObj(updatedUser);
            });
        fetch(`http://localhost:3000/api/profile/${userId}`)
            .then(res => res.json())
            .then(updatedProfile => setUserData(updatedProfile));
        setConnectionStatus("not-connected");
    };

    const isFriend = userObj && userObj.friends && userObj.friends.includes(userData.username);

    return ( 
        <main className="profileBody">
            <div id="navDiv">
                <Navbar/>
            </div>
            <div id="profileGrid">
                <div id="profileHead"> 
                    <h1 id="uAct">{userData.username}'s Profile</h1>
                </div>

                {isOwnProfile && (
                    <>
                        <p className="reposLink" onClick={toggleNotifs}>Notifications</p>
                        {isNotifOpen && <NotifsList onCancel={toggleNotifs} onUserUpdated={setUserObj} />}
                    </>
                )}

                {!isOwnProfile && (
                    <div>
                        <button
                            className="connectedLink"
                            style={{
                                background: connectionStatus === "connected" ? "#4eb4e7a8" : "#ffffff4a",
                                color: connectionStatus === "connected" ? "white" : "#e4e4e4ff",
                                width: connectionStatus === "connected" ? "7em" : "8em",
                                marginLeft: connectionStatus === "connected" ? "9.6em" : "8.9em",
                                cursor: connectionStatus === "not-connected" ? "pointer" : "default"
                            }}
                            disabled={connectionStatus !== "not-connected"}
                            onClick={connectionStatus === "not-connected" ? handleSendRequest : undefined}
                        >
                            {connectionStatus === "connected" && "Connected"}
                            {connectionStatus === "requested" && "Requested"}
                            {connectionStatus === "not-connected" && "Connect"}
                        </button>
                    </div>
                )}

                <p className="friendsLink" onClick={toggle}>Friends</p>
                {isOpen && <FriendsList onCancel={toggle} onFriendRemoved={handleFriendRemoved} profileUsername={userData.username}/>}
                
                <ProfileTemplate userObj={userData} hideInfoCard={!isOwnProfile && !isFriend}/>

                {isOwnProfile && (
                    <>
                        <EditProfile userObj={userObj} onProfileUpdated={handleProfileUpdated}/>
                        <Logout/>
                    </>
                )}

                {(isOwnProfile || isFriend) && <TagCloud userId={userData._id || userData.userId}/>}

                <div id="projectsHead"> 
                    <h1 id="uAct">Projects</h1>
                </div>

                {(isOwnProfile || isFriend) && (
                    <>
                        <div id="sortE2">
                            <select id="sortDrop2" name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                                <option value="">Sort</option>
                                <option value="Alphabetically">Alphabetically</option>
                                <option value="Newest to oldest">Newest to oldest</option>
                                <option value="Oldest to newest">Oldest to newest</option>
                            </select>
                        </div>
                    </>
                )}

                {isOwnProfile && (
                    <>
                        <div id="profileCreateProject">
                            <CreateProject onProjectCreated={refreshProjects}/>
                        </div>
                    </>
                )}

                <div id="projectFeedDiv">
                    <div>
                         {(isOwnProfile || isFriend)
                            ? <ProjectsList projects={projects} sort={sort}/>
                            : <p id="notFriendMessage">Connect with {userData.username} to view their projects! <span id="clickOn">(Click on the 'Connect' button to send a friend request)</span></p>
                        }
                    </div>
                </div>

                {(isOwnProfile || isFriend) && (
                    <>
                        <div id="activityHead"> 
                            <h1 id="uAct">Activity</h1>
                        </div>
                        <div id="activityFeedDiv">
                            <PersonalFeed/>
                        </div>
                    </>
                )}

            </div>
        </main>
    );
}

export default Profile;
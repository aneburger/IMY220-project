/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../public/assets/style/css/home.css';
import '../../public/assets/style/css/feed.css';

const PersonalFeed = () => {
    const [activities, setActivities] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const profileImage = user && user.image ? user.image : "/assets/images/profile.png";

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${user.username}/personal-activity`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setActivities(data.activities);
            });
    }, [user.username]);

    return (
        <div id="LocalE">
            <section id="localGrid">
                {activities.length === 0 ? (
                    <p id="noPersonalActDisplay">No activity to display yet. <span>(Your personal activity will display here.)</span></p>
                ):(
                activities.map(act => (
                    <div className="actCard" key={act._id}>
                        <img alt="profile" className="profileBFeed" src={profileImage} style={{ width: 45, height: 45, borderRadius: "50%", objectFit: "cover" }}/>
                        <p className="user">{act.user}</p>
                        <p className="timestamp">{new Date(act.timestamp).toLocaleString()}</p>
                        <p className="project">{act.projectName}</p>
                        <p className="checkedInOut">
                            Checked: <span className="inOut">{act.action === "checked in" ? "In" : "Out"}</span>
                        </p>
                        {/* {act.details && <p className="checkMsgP">{act.details}</p>} */}
                        {/* <button onClick={() => navigate(`/project/${act.projectId}`)}>View</button> */}
                        <button onClick={async () => {
                            const res = await fetch(`http://localhost:3000/api/project/${act.projectId}`);
                            if (res.ok) {
                                const project = await res.json();
                                if (project && project.projectName) {
                                    navigate(`/project/${act.projectId}`);
                                } else {
                                    alert("This project is no longer available or has been deleted.");
                                }
                            } else {
                                alert("This project is no longer available or has been deleted.");
                            }
                        }}>View</button>
                    </div>
                )))}
            </section>
        </div>
    );
}

export default PersonalFeed;
/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../public/assets/style/css/home.css';
import '../../public/assets/style/css/feed.css';
import { Link } from 'react-router-dom';

const LocalFeed = ({ filter, sort }) => {
    const [activities, setActivities] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${user.username}/member-activity`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setActivities(data.activities);
            });
    }, [user.username]);

    let filteredActivities = activities;
    if (filter === "Checked Out") {
        filteredActivities = filteredActivities.filter(act => act.action === "checked out");
    } else if (filter === "Checked In") {
        filteredActivities = filteredActivities.filter(act => act.action === "checked in");
    }

    if (sort === "Alphabetically") {
        filteredActivities = [...filteredActivities].sort((a, b) =>
            a.projectName.localeCompare(b.projectName)
        );
    } else if (sort === "Newest to oldest") {
        filteredActivities = [...filteredActivities].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );
    } else if (sort === "Oldest to newest") {
        filteredActivities = [...filteredActivities].sort((a, b) =>
            new Date(a.timestamp) - new Date(b.timestamp)
        );
    }

    return (
        <div id="LocalE">
            <section id="localGrid">
                { filteredActivities.length === 0 ? (
                    <p id="noActDisplay">No activity to display yet. <span>(Activity of projects you're a member of will display here.)</span></p>
                ):(
                filteredActivities.map(act => (
                    <div className="actCard" key={act._id}>
                        <img alt="profile" className="profileBFeed" src={act.profileImage} style={{ width: 45, height: 45, borderRadius: "50%", objectFit: "cover" }}/>
                        <Link to={`/profile/${act.user}`}><p className="user" style={{ cursor: "pointer" }}>{act.user}</p></Link>
                        <p className="timestamp">{new Date(act.timestamp).toLocaleString()}</p>
                        <p className="project">{act.projectName}</p>
                        <p className="checkedInOut">
                            Checked: <span className="inOut">{act.action === "checked in" ? "In" : "Out"}</span>
                        </p>
                        {/* {act.details && <p className="checkMsg">{act.details}</p>} */}
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

export default LocalFeed;
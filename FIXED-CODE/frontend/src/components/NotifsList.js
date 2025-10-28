/* Ane' Burger 24565068, 33 */

import React, { useEffect, useState } from "react";
import '../../public/assets/style/css/profile.css';

const NotifsList = ({ onCancel }) => {
    const [requests, setRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${user.username}/pending-requests`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setRequests(data.requests);
            });
    }, [user.username]);

    const handleAccept = async (friendUsername) => {
        await fetch("http://localhost:3000/api/friend-request/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userUsername: user.username, friendUsername })
        });
        setRequests(requests.filter(r => r !== friendUsername));
         const updatedUserRes = await fetch(`http://localhost:3000/api/profile/${user._id}`);
        const updatedUser = await updatedUserRes.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (typeof onUserUpdated === "function") {
            onUserUpdated(updatedUser);
        }
    };

    const handleReject = async (friendUsername) => {
        await fetch("http://localhost:3000/api/friend-request/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userUsername: user.username, friendUsername })
        });
        setRequests(requests.filter(r => r !== friendUsername));
    };

    return (
        <div id="notifsListDiv">
            <h1 className="friendReq">Friend Requests</h1>
            {requests.length === 0 && <p>No friend requests.</p>}
            {requests.map(friendUsername => (
                <section className="friendReqCard" key={friendUsername}>
                    <p>{friendUsername}</p>
                    <div id="notifsButtons">
                        <button className="accept" onClick={() => handleAccept(friendUsername)}>Accept</button>
                        <button className="reject" onClick={() => handleReject(friendUsername)}>Reject</button>
                    </div>
                </section>
            ))}

            <button id="cancel" type="button" onClick={onCancel}>Close</button>
        </div>
    );
}

export default NotifsList;
/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState, useEffect } from "react";
import '../../public/assets/style/css/singleProject.css';

const MemberForm = ({ projectId, members = [], onCancel, onMemberAdded }) => {
    const [member, setMember] = useState("");
    const [error, setError] = useState("");
    const [friends, setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${user.username}/friends`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setFriends(data.friends);
            });
    }, [user.username]);

    const handleBlur = async () => {
        if (!member) return;
        if (members.includes(member)) {
            setError("User is already a member of this project.");
            return;
        }
        const response = await fetch(`http://localhost:3000/api/check-username/${encodeURIComponent(member)}`);
        const data = await response.json();
        if (!data.exists) {
            setError("User does not exist.");
            return;
        } 

        if (!friends.includes(member)) {
            setError("You can only add your friends as members.");
            return;
        }
        setError("");
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!member) return;
        if (members.includes(member)) {
            setError("User is already a member of this project.");
            return;
        }
        if (error) return;
        try {
            const response = await fetch(`http://localhost:3000/api/project/${projectId}/member`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberUsername: member })
            });
            const data = await response.json();
            if (data.success) {
                setMember("");
                setError("");
                if (onMemberAdded) onMemberAdded(data.project);
            } else {
                setError(data.message || "Failed to add member.");
            }
        } catch (err) {
            setError("Error adding member.");
        }
    };

    return (
        <div id="memberFormDiv">
            <form id="memberForm" onSubmit={handleAdd}>
                <input type="text" name="member" id="member" placeholder="Add a member..." autoComplete="member"
                        value={member}
                        onChange={e => setMember(e.target.value)}
                        onBlur={handleBlur}/>
                <button id="addMem" type="submit">Add</button>
                {error && <p>{error}</p>}
            
                <div id="memberFormButtons">
                    {/* <button>Save</button> */}
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default MemberForm;

                
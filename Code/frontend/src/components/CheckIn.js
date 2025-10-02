/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/checkIn.css';
import CheckInForm from './CheckInForm';

const CheckIn = ({ project, onProjectUpdated, isCheckedOutByMe, isCheckedOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const handleCheckOut = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/project/${project._id}/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loggedInUser.username })
            });
            const data = await response.json();
            if (data.success) {
                if (onProjectUpdated) onProjectUpdated(data.project);
            } else {
                alert(data.message || "Failed to check out project.");
            }
        } catch (err) {
            alert("Error checking out project.");
        }
    };

    if (!project.checkedOutBy) {
        const canCheckOut = project.members.includes(loggedInUser.username);
        return (
            <div id="checkInButtonDiv">
                <button
                    onClick={handleCheckOut}
                    id="checkInB"
                    disabled={!canCheckOut}
                    style={!canCheckOut ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                    Check Out
                </button>
            </div>
        );
    }

    if (isCheckedOutByMe) {
        return (
            <div id="checkInButtonDiv">
                <button onClick={toggle} id="checkInB">Check In</button>
                {isOpen && <CheckInForm project={project} onCancel={toggle} onProjectCheckedIn={onProjectUpdated}/>}
            </div>
        );
    } else {
        return (
            <div id="checkInButtonDiv">
                <button
                    id="checkInB"
                    disabled
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                >
                    Check Out
                </button>
            </div>
        );
    }
}

export default CheckIn;
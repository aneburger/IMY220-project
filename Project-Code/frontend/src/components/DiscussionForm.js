/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/discuss.css';

const DiscussionForm = ({ onCancel, projectId, onMessageAdded }) => {
    const [message, setMessage] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSave = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        const response = await fetch(`http://localhost:3000/api/project/${projectId}/discussion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender: user.username, content: message })
        });
        const data = await response.json();
        if (data.success) {
            onMessageAdded(data.message);
            setMessage("");
            onCancel();
        }
    };

    return (
        <div id="discussFormDiv">
            <form id="discussForm" onSubmit={handleSave}>
                <label htmlFor="message">Message:</label>
                <input type="text" id="message" name="message" placeholder="Type your message..." 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required/>
            
                <div id="discussFormButtons">
                    <button type="submit">Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default DiscussionForm;
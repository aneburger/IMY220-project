/* Ane' Burger 24565068, 33 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/singleProject.css';

const ProjectMessages = ({ messages }) => {
    return (
        <div id="projectMessagesDiv">
            { messages.length === 0 ? (
                <p>No messages yet.</p>
            ):(
            messages.map(msg => (
                <section className="messageCard" key={msg._id}>
                    <p>{new Date(msg.timestamp).toLocaleString()} <span>by @<Link to={`/profile/${msg.sender}`} style={{textDecoration: "underline"}}>{msg.sender}</Link></span></p>
                    <p>"{msg.content}"</p>
                </section>
            )))}
        </div>
    );
}

export default ProjectMessages;
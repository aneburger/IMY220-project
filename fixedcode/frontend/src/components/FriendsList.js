/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/friends.css';

const FriendsList = ({ onCancel, onFriendRemoved, profileUsername }) => {
    const [friends, setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${profileUsername}/friends`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setFriends(data.friends);
            });
    }, [user.username]);

    const handleRemoveFriend = async (friendUsername) => {
        try {
            const response = await fetch("http://localhost:3000/api/friend/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userUsername: user.username, friendUsername })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setFriends(friends.filter(f => f !== friendUsername));
                if (onFriendRemoved) {
                    onFriendRemoved(friendUsername);
                }
            } else {
                alert(data.message || "Error removing friend if statement.");
            }
        } catch (err) {
            alert("Error removing friend.");
        }
    };

    return (
        <div id="friendsListDiv">
            <div id="friendForm">
                <div id="friendList">
                    <div className="ol">
                        {friends.length === 0 && <p>No friends yet.</p>}
                        {friends
                            .filter(friend => friend !== profileUsername) 
                            .map(friend => (
                                <div key={friend}>
                                    <Link to={`/profile/${friend}`}><p style={{ cursor: "pointer"}}>{friend}</p></Link>
                                    {user.username === profileUsername && (
                                        <button onClick={() => handleRemoveFriend(friend)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>


                {/* <input type="text" name="friend" id="friend" placeholder="Add a friend..." autoComplete="friend"/>
                <button id="add">Add</button> */}
            
                <div id="friendFormButtons">
                    {/* <button>Save</button> */}
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default FriendsList;
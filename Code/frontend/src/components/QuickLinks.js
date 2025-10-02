/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/home.css';
import FriendsList from "./FriendsList";

const QuickLinks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            fetch(`http://localhost:3000/api/profile/${user._id}`)
                .then(res => res.json())
                .then(data => setUserData(data));
        }
    }, []);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    
    // const handleFriendRemoved = async (removedFriendUsername) => {
    //     try {
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         const response = await fetch(`http://localhost:3000/api/user/${user._id}/remove-friend`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ friendUsername: removedFriendUsername })
    //         });
    //         const data = await response.json();
    //         if (!data.success) {
    //             alert("Error removing friend");
    //             return;
    //         }

    //         if (userObj && userObj.friends) {
    //             setUserObj({
    //                 ...userObj,
    //                 friends: userObj.friends.filter(f => f !== removedFriendUsername)
    //             });
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //         }
    //         if (userData && userData.friends) {
    //             setUserData({
    //                 ...userData,
    //                 friends: userData.friends.filter(f => f !== removedFriendUsername)
    //             });
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //         }

    //     } catch (error) {
    //         alert("Error removing friend");
    //         console.error(error);
    //     }
        
    //     setConnectionStatus("not-connected");
    //     fetch(`http://localhost:3000/api/profile/${userObj._id}`)
    //         .then(res => res.json())
    //         .then(updatedUser => {
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //             setUserObj(updatedUser);
    //         });
    //     fetch(`http://localhost:3000/api/profile/${userId}`)
    //         .then(res => res.json())
    //         .then(updatedProfile => setUserData(updatedProfile));
    //     setConnectionStatus("not-connected");
    // };

    const handleFriendRemoved = async (removedFriendUsername) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch(`http://localhost:3000/api/friend/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userUsername: user.username, friendUsername: removedFriendUsername })
            });
            const data = await response.json();
            if (!data.success) {
                alert("Error removing friend");
                return;
            }

            fetch(`http://localhost:3000/api/profile/${user._id}`)
                .then(res => res.json())
                .then(updatedUser => {
                    setUserData(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                });
        } catch (error) {
            alert("Error removing friend");
            console.error(error);
        }
    };

    return (
        <section className="quickL">
            <div id="quickHdiv">
                <h1 id="quickHead">Quick Links</h1>
            </div>
            <div id="quickDiv">
                <img alt="home" className="quickLink2" src="/assets/images/home.png" height="23"/><Link to="/home"><p>Home</p></Link>
                <img alt="friends" className="quickLink" src="/assets/images/friends.png" height="23"/><p onClick={toggle}>Friends</p>
                {isOpen && <FriendsList onCancel={toggle} onFriendRemoved={handleFriendRemoved} profileUsername={userData.username}/>}
                <img alt="projects" className="quickLink4" src="/assets/images/projects.png" height="23"/><Link to="/projects"><p>Projects</p></Link>
            </div>
        </section>
    );
}

export default QuickLinks;
/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/viewAct.css';

const ViewActivity = ({ activities, onCancel }) => {
    const checkIns = activities.filter(act => act.action === "checked in");

    return (
         <div id="viewProjectActDiv">
            <div id="viewCard">
                { checkIns.length === 0 ? (
                    <p style={{ marginLeft: "1em" }}>No Check In activity yet.</p>
                ):(
                checkIns.map(act => (
                    <div className="viewActCard" key={act._id}>
                        <img alt="profile" className="profileBFeed" src={act.profileImage} style={{ width: 45, height: 45, borderRadius: "50%", objectFit: "cover" }}/>
                        <p className="userV">{act.user}</p>
                        <p className="timestampV">{new Date(act.timestamp).toLocaleString()}</p>
                        <p className="checkMsg">Check-In message: <span>"{act.details}"</span></p>
                    </div>
                )))}
            </div>
            <div id="viewCardButtons">
                <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default ViewActivity;
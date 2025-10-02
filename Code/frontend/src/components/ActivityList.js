/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';
import { Link } from "react-router-dom";

const ActivityList = ({ activities }) => {
    return (
        <div id="activityListDiv">
            { activities.length === 0 ? (
                <p>No activity yet.</p>
            ):(
            activities.map(act => (
                <section className="actProjectCard" key={act._id}>
                    <Link to={`/profile/${act.user}`}><p className="actUserName">{act.user}</p></Link>
                    <p className="actChecked">{act.action === "checked in" ? "In" : "Out"}</p>
                    <p className="acttimeSt">{new Date(act.timestamp).toLocaleString()}</p>
                </section>
            )))}
        </div>
    );
}

export default ActivityList;
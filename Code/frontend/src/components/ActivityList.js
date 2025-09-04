/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';

const ActivityList = () => {
    return (
        <div id="activityListDiv">
            <section className="actProjectCard">
                <p className="actUserName">User_name</p>
                <p className="actChecked">In</p>
                <p className="acttimeSt">5 mins ago</p>
            </section>

            <section className="actProjectCard">
                <p className="actUserName">User_name</p>
                <p className="actChecked">In</p>
                <p className="acttimeSt">7 mins ago</p>
            </section>

            <section className="actProjectCard">
                <p className="actUserName">User_name</p>
                <p className="actChecked">In</p>
                <p className="acttimeSt">10 mins ago</p>
            </section>
        </div>
    );
}

export default ActivityList;
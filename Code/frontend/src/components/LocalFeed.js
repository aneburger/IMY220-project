/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/home.css';
import '../../public/assets/style/css/feed.css';

const LocalFeed = () => {
    return (
        <div id="LocalE">
            <section id="localGrid">
                <div className="actCard">
                    <img alt="profile" className="profileBFeed" src="/assets/images/profile.png" height="45"/>
                    <p className="user">Friend_username</p>
                    <p className="timestamp">23 secs ago</p>
                    <p className="project">Project_Name</p>
                    <p className="checkedInOut">Checked:  <span className="inOut"> In</span></p>
                    <button>View</button>
                </div>

                <div className="actCard2">
                    <img alt="profile" className="profileBFeed" src="/assets/images/profile.png" height="45"/>
                    <p className="user">Friend_username</p>
                    <p className="timestamp">27 secs ago</p>
                    <p className="project">Project_Name</p>
                    <p className="checkedInOut">Checked: <span className="inOut">Out</span></p>
                    <button>View</button>
                </div>

                 <div className="actCard3">
                    <img alt="profile" className="profileBFeed" src="/assets/images/profile.png" height="45"/>
                    <p className="user">Friend_username</p>
                    <p className="timestamp">5 mins ago</p>
                    <p className="project">Project_Name</p>
                    <p className="checkedInOut">Checked: <span className="inOut">Out</span></p>
                    <button>View</button>
                </div>

                <div className="actCard4">
                    <img alt="profile" className="profileBFeed" src="/assets/images/profile.png" height="45"/>
                    <p className="user">Friend_username</p>
                    <p className="timestamp">2025 / 08 / 25</p>
                    <p className="project">Project_Name</p>
                    <p className="checkedInOut">Checked: <span className="inOut">In</span></p>
                    <button>View</button>
                </div>

                <div className="actCard5">
                    <img alt="profile" className="profileBFeed" src="/assets/images/profile.png" height="45"/>
                    <p className="user">Friend_username</p>
                    <p className="timestamp">2025 / 08 / 25</p>
                    <p className="project">Project_Name</p>
                    <p className="checkedInOut">Checked: <span className="inOut">In</span></p>
                    <button>View</button>
                </div>
            </section>
        </div>
    );
}

export default LocalFeed;
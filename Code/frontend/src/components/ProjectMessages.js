/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';

const ProjectMessages = () => {
    return (
        <div id="projectMessagesDiv">
            <section className="messageCard">
                <p>20 mins ago <span>by @user_name</span></p>
                <p>"Lorem ipsum dolor sit amet..."</p>
            </section>

            <section className="messageCard">
                <p>23 mins ago <span>by @user_name</span></p>
                <p>"Lorem ipsum dolor sit amet..."</p>
            </section>

            <section className="messageCard">
                    <p>3 hours ago <span>by @user_name</span></p>
                    <p>"Lorem ipsum dolor sit amet..."</p>
            </section>
        </div>
    );
}

export default ProjectMessages;
/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/home.css';

const QuickLinks = () => {
    return (
        <section className="quickL">
            <div id="quickHdiv">
                <h1 id="quickHead">Quick Links</h1>
            </div>
            <div id="quickDiv">
                <img alt="friends" className="quickLink" src="/assets/images/friends.png" height="23"/><p>Friends</p>
                <img alt="repository" className="quickLink2" src="/assets/images/repository.png" height="23"/><p>Repositories</p>
                <img alt="discuss" className="quickLink3" src="/assets/images/discuss.png" height="23"/><p>Discussions</p>
                <img alt="projects" className="quickLink4" src="/assets/images/projects.png" height="23"/><Link to="/projects"><p>Projects</p></Link>
            </div>
        </section>
    );
}

export default QuickLinks;
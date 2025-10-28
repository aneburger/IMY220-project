/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import '../../public/assets/style/css/splash.css';

const Splash = () => {
    return (
        <div className="splashBody">
            <div id="splash-head">
                <img id="commited" alt="commited" src="/assets/images/commited.png" width="350"/>
                <div id="already">Already your favourite? <Link to="/login"><button id="logIn">Log in</button></Link></div>
            </div>
            <div id="flow"><img alt="flow" src="/assets/images/flow.png" width="600"/></div>                                                                    {/* Tailwind class */}
            <div id="favourite" className="w-[600px]">your new favourite version control site <img alt="greater" id="greater" src="/assets/images/greater.png" className="inline-block mt-[0.15em]"/></div>
            <div id="newUser">New user? <Link to="/signup"><button id="signUp">Sign up</button></Link></div>
        </div>
    );
}

export default Splash;
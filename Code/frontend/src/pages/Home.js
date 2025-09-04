/* Ane' Burger 24565068, 33 */

import React from "react";
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/home.css';
import LocalFeed from "../components/LocalFeed";
import GlobalFeed from "../components/GlobalFeed";
import QuickLinks from "../components/QuickLinks";

const Home = () => {
    return (
        <div className="homeBody">
            <div id="navDiv">
                <Navbar/>
            </div>

            <div id="homeGrid">
                <div id="filterE">
                    <select id="filterDrop" name="filter">
                        <option id="filterOption" value="filter">Filter</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>

                <div id="sortE">
                    <select id="sortDrop" name="sort">
                        <option value="sort">Sort</option>
                        <option value="option1">Most popular</option>
                        <option value="option2">Newest to oldest</option>
                        <option value="option3">Oldest to newest</option>
                    </select>
                </div>

                <div id="localGlobalE">
                    <select id="localGlobal" name="localGlobal">
                        <option value="local">Local</option>
                        <option value="global">Global</option>
                    </select>
                </div>

                <div id="actHead"> 
                    <h1 id="uAct">Username's Activity</h1>
                </div>

                <QuickLinks/>

                <div id="feedDiv">
                    <LocalFeed/>
                    {/* <GlobalFeed/> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
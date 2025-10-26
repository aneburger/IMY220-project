/* Ane' Burger 24565068, 33 */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/home.css';
import LocalFeed from "../components/LocalFeed";
import GlobalFeed from "../components/GlobalFeed";
import QuickLinks from "../components/QuickLinks";

const Home = () => {
    const [filter, setFilter] = useState(""); 
    const [sort, setSort] = useState("");
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const [feedType, setFeedType] = useState("local");

    return (
        <div className="homeBody">
            <div id="navDiv">
                <Navbar/>
            </div>

            <div id="homeGrid">
                <div id="filterE">
                    <select id="filterDrop" name="filter" value={filter} onChange={e => setFilter(e.target.value)}>
                        <option id="filterOption" value="">Filter</option>
                        <option value="Checked Out">Checked Out</option>
                        <option value="Checked In">Checked In</option>
                    </select>
                </div>

                <div id="sortE">
                    <select id="sortDrop" name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="">Sort</option>
                        <option value="Alphabetically">Alphabetically</option>
                        <option value="Newest to oldest">Newest to oldest</option>
                        <option value="Oldest to newest">Oldest to newest</option>
                    </select>
                </div>

                <div id="localGlobalE">
                    <select id="localGlobal" name="localGlobal" value={feedType}
                            onChange={e => setFeedType(e.target.value)}>
                        <option value="local">Local</option>
                        <option value="global">Global</option>
                    </select>
                </div>

                <div id="actHead"> 
                    <h1 id="uAct">{ userObj.username }'s Activity</h1>
                </div>

                <QuickLinks/>

                <div id="feedDiv">
                    {feedType === "local" ? <LocalFeed filter={filter} sort={sort}/> : <GlobalFeed filter={filter} sort={sort}/>}
                </div>
            </div>
        </div>
    );
}

export default Home;
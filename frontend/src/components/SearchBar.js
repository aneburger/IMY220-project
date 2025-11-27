/* Ane' Burger 24565068, 33 */

import React, { useState } from "react";
import { Link }  from "react-router-dom";
import '../../public/assets/style/css/nav.css';
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState({ users: [], projects: [], hashtags: [] });
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowResults(true);
        if (value.trim() === "") {
            setSearchResults({ users: [], projects: [], hashtags: [] });
            return;
        }
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSearchResults(data);
    };

    const handleBlur = () => setShowResults(false);
    //onBlur={handleBlur}
    return (
        <div id="searchBarDiv">
            <label htmlFor="search">Search</label>
            <input type="text" name="search" id="search" placeholder="Search for projects or users..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowResults(true)}
                    /> 
            {showResults && (
                <SearchResults
                    users={searchResults.users}
                    projects={searchResults.projects}
                    hashtags={searchResults.hashtags}
                    onCancel={() => setShowResults(false)}
                />
            )}
        </div>
    );
}

export default SearchBar;
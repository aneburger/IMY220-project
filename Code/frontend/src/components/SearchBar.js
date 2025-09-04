/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link }  from "react-router-dom";
import '../../public/assets/style/css/nav.css';

const SearchBar = () => {
    return (
        <div id="searchBarDiv">
            <label htmlFor="search">Search</label>
            <input type="text" name="search" id="search" placeholder="Search"/>
        </div>
    );
}

export default SearchBar;
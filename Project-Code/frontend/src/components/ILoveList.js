/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState, useEffect } from "react";
import '../../public/assets/style/css/love.css';

const ILoveList = ({ onCancel, onAddLanguage }) => {
    const [langInput, setLangInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (langInput.trim()) {
            onAddLanguage(langInput.trim());
            setLangInput("");
        }
    };

    return (
        <div id="loveFormDiv">
            <form id="loveForm" onSubmit={handleSubmit}>
                <input type="text" name="lang" id="lang" placeholder="Add a language..." autoComplete="lang"
                        value={langInput}
                        onChange={e => setLangInput(e.target.value)}
                />
                <button id="addLang" type="submit">Add</button>
                <div id="loveFormButtons">
                    {/* <button>Save</button> */}
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ILoveList;

                
/* Ane' Burger 24565068, 33 */

import React, { useState, useEffect } from "react";
import '../../public/assets/style/css/profile.css';
import ILoveList from "./ILoveList";

const TagCloud = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/profile/${userId}`)
            .then(res => res.json())
            .then(data => setLanguages(data.languages || []));
    }, [userId]);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const handleAddLanguage = async (lang) => {
        const res = await fetch(`http://localhost:3000/api/profile/${userId}/languages`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language: lang })
        });
        const data = await res.json();
        if (data.success) {
            setLanguages(data.user.languages);
            setIsOpen(false);
        }
    };

    return (
        <div id="tagCloudDiv">
            <h1>I Love:</h1>
            {languages.map(lang => (
                <p key={lang} className={lang.toLowerCase().replace(/[^a-z0-9]/g, "")}>#{lang}</p>
            ))}
            <p className="addHash" onClick={toggle}>#Add+</p>
            {isOpen && <ILoveList onCancel={toggle} onAddLanguage={handleAddLanguage} />}
        </div>
    );
}

export default TagCloud;
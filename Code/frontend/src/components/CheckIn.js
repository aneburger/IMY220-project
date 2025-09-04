/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/checkIn.css';
import CheckInForm from './CheckInForm';

const CheckIn = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div id="checkInButtonDiv">
            <button onClick={toggle} id="checkInB">Check In</button>
            {isOpen && <CheckInForm onCancel={toggle}/>}
        </div>
    );
}

export default CheckIn;
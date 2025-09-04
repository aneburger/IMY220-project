/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import MemberForm from "./MemberForm";
import '../../public/assets/style/css/singleProject.css';

const AddProjectMember = () => {
    const [isOpen, setIsOpen] = useState(false);
        
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
        console.log("add clicked in addprojectmember")
    }

    return (
        <div id="addMemberDiv">
            <button onClick={toggle} id="addMain">Add +</button>
            {isOpen && <MemberForm onCancel={toggle}/>}
        </div>  
    );
}

export default AddProjectMember;
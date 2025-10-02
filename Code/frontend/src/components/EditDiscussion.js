/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/discuss.css';
import DiscussionForm from "./DiscussionForm";

const EditDiscussion = ({ projectId, onMessageAdded }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div id="discussEditButtonDiv">
            <button onClick={toggle}>Add +</button>
            {isOpen && <DiscussionForm onCancel={toggle} projectId={projectId} onMessageAdded={onMessageAdded} />}
        </div>
    );
}

export default EditDiscussion;
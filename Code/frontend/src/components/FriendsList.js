/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import '../../public/assets/style/css/friends.css';

const FriendsList = ({ onCancel }) => {
   return (
        <div id="friendsListDiv">
            <div id="friendForm">
                <div id="friendList">
                    <div className="ol">
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                        <p>Friend_name</p><button className="deleteFriendL">Delete</button>
                    </div>
                </div>


                <input type="text" name="friend" id="friend" placeholder="Add a friend..." autoComplete="friend"/>
                <button id="add">Add</button>
            
                <div id="friendFormButtons">
                    <button>Save</button>
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default FriendsList;
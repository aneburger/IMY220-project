/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import '../../public/assets/style/css/singleProject.css';
import DownloadFiles from "../components/DownloadFiles";
import DeleteProject from "../components/DeleteProject";
import AddProjectMember from "../components/AddProjectMember";
import EditDescription from "../components/EditDescription";
import AddFiles from "../components/AddFiles";
import FilesList from "../components/FilesList";
import ActivityList from "../components/ActivityList";
import EditProject from "../components/EditProject";

const SingleProject = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFilesOpen, setIsFilesOpen] = useState(false);
            
    const toggleFileDiv = () => {
        setIsFilesOpen((isFilesOpen) => !isFilesOpen);
    }
            
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div className="singleProjectBody">
            <div id="navDiv">
                <Navbar/>
            </div>

            <main id="singleProjectGrid">
                <div id="projectNameHead"> 
                    <h1 id="pName">Project_Name</h1>
                </div>

                <p id="createdDate">Created: 2025 / 08 / 01</p>

                <div id="downloadDelete">
                    <DownloadFiles/>
                    <DeleteProject/>
                </div>

                <img alt="profile" id="projectImg" src="/assets/images/project.png" height="140"/>

                <div id="editImgDiv">
                    {/* <button id="editImg">Edit Project</button> */}
                    <EditProject/>
                </div>

                <div id="hashtags">
                    <p>#javascript</p>
                    <p className="py">#python</p>
                </div>

                <div id="projectInfoCard">
                    <label htmlFor="owner">Owner: <span>@user_name</span></label> 
                    {/* <input type="text" name="owner" id="owner" placeholder="Owner e.g. '@user_name' " autoComplete="owner"/> */}

                    <label htmlFor="typeApp">Type:</label>
                    <div id="typeApp">
                        <select id="typeAppSelect" name="typeAppSelect">
                            <option value="webApp">Web App</option>
                            <option value="desktopApp">Desktop App</option>
                            <option value="desktopApp">Desktop App</option>
                            <option value="mobileApp">Mobile App</option>
                            <option value="framework">Framework</option>
                        </select>
                    </div>

                    <label htmlFor="version" className="version">Version: <span>v.1.2.3</span></label> 
                    {/* <input type="text" name="version" id="version" placeholder="Version e.g. 'v1.2.3' " autoComplete="version"/> */}

                    <label htmlFor="status">Status: <span>Checked In</span></label> 
                    {/* <input type="text" name="status" id="status" placeholder="Checked In / Out" autoComplete="status"/> */}
                </div>

                <div id="membersHead"> 
                    <h1 id="memName">Members</h1>
                </div>

                <div id="addMember">
                    <AddProjectMember/>
                </div>

                <div id="membersDiv">
                     <div id="memberList">
                        <div className="ol">
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                            <p>Member_name</p><button className="deleteFriend">Delete</button>
                        </div>
                    </div>
                </div>

                <div id="discussionHead"> 
                    <h1 id="discussionName">Discussion Board</h1>
                </div>

                <div id="discussionDiv">
                    <section className="messageCard">
                        <p>20 mins ago <span>by @user_name</span></p>
                        <p>"Lorem ipsum dolor sit amet..."</p>
                    </section>

                    <section className="messageCard">
                        <p>23 mins ago <span>by @user_name</span></p>
                        <p>"Lorem ipsum dolor sit amet..."</p>
                    </section>

                    <section className="messageCard">
                        <p>3 hours ago <span>by @user_name</span></p>
                        <p>"Lorem ipsum dolor sit amet..."</p>
                    </section>
                </div>

                <div id="descriptionHead"> 
                    <h1 id="descriptionName">Description</h1>
                </div>

                <div id="discriptionEdit">
                    <button onClick={toggle} className="editDescriptionB">Edit</button>
                    {isOpen && <EditDescription onCancel={toggle}/>}
                </div>

                <div id="descriptionDiv">
                    <section id="descriptionText">
                        <textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "/>
                    </section>
                </div>

                <div id="filesHead"> 
                    <h1 id="filesName">Files</h1>
                </div>

                <div id="filesAdd">
                    <button onClick={toggleFileDiv} className="filesAddB">Add +</button>
                    {isFilesOpen && <AddFiles onCancel={toggleFileDiv}/>}
                </div>

                <div id="filesDiv">
                    <p id="filesDivSmallHead">File name <span>Last modified</span></p>
                    <FilesList/>
                </div>


                <div id="activityProjectHead"> 
                    <h1 id="activityProjectName">Activity</h1>
                </div>

                <div id="activityProjectDiv">
                    <p id="activityDivSmallHead">User name <span>Checked In / Out</span> <span>Timestamp</span></p>
                    <ActivityList/>
                </div>
                

            </main>
        </div>
    );
}

export default SingleProject;
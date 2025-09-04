/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/singleProject.css';

const FilesList = () => {
    return (
        <div id="filesListDiv">
            <section className="fileCard">
                <p>File_name</p>
                <p className="timeSt">5 mins ago</p>
                <img alt="download" className="downloadImg" src="/assets/images/download.png" height="25"/>
                <img alt="delete" className="deleteImg" src="/assets/images/trash.png" height="25"/>
            </section>

            <section className="fileCard">
                <p>File_name</p>
                <p className="timeSt">7 mins ago</p>
                <img alt="download" className="downloadImg" src="/assets/images/download.png" height="25"/>
                <img alt="delete" className="deleteImg" src="/assets/images/trash.png" height="25"/>
            </section>

            <section className="fileCard">
                <p>File_name</p>
                <p className="timeSt">9 mins ago</p>
                <img alt="download" className="downloadImg" src="/assets/images/download.png" height="25"/>
                <img alt="delete" className="deleteImg" src="/assets/images/trash.png" height="25"/>
            </section>

            <section className="fileCard">
                <p>File_name</p>
                <p className="timeSt">1 hour ago</p>
                <img alt="download" className="downloadImg" src="/assets/images/download.png" height="25"/>
                <img alt="delete" className="deleteImg" src="/assets/images/trash.png" height="25"/>
            </section>
        </div>
    );
}

export default FilesList;
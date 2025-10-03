/* Ane' Burger 24565068, 33 */

import "regenerator-runtime/runtime.js";
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import Fuse from 'fuse.js';

const uri = "mongodb+srv://test-user:test-password@imyproject.uvrd6ue.mongodb.net/?retryWrites=true&w=majority&appName=imyProject";
const client = new MongoClient(uri);

const dbName = 'projectDB';
const db = client.db(dbName);

const userCollection = db.collection('users');
const projectCollection = db.collection('projects');
const activityCollection = db.collection('activity');
const discussionCollection = db.collection('discussion');

async function insertData() {
    try {
        const userJsonData = 
            [
                {   "userId": "U001", 
                    "username": "Admin",
                    "surname": "AdminSurname", 
                    "email": "admin@ad.co.za",
                    "password": "Admin123@", 
                    "birthday": "1992/09/15",
                    "occupation": "Developer",
                    "bio": "Passionate about developing!",
                    "socials": "@Admin",
                    "friends": 23,
                    "image": "image/url",
                    "projects": ["p1", "p2"],
                    "connectedWith": ["friend1", "friend2"],
                    "role": "admin", 
                    "checkedOut": [] 
                }, 

                {   "userId": "U002", 
                    "username": "Alice",
                    "surname": "AliceSurname",
                    "email": "alice@al.co.za",  
                    "password": "Alice123@", 
                    "birthday": "1992/04/08",
                    "occupation": "Manager",
                    "bio": "Passionate about collaborating!",
                    "socials": "@Alice",
                    "friends": 53,
                    "image": "image/url",
                    "projects": ["P001", "P002"],
                    "connectedWith": ["friend1", "friend2"],
                    "role": "user", 
                    "checkedOut": []
                }, 
            ];

        const projectsJsonData = 
            [
                { 
                    "projectId": "P001",
                    "projectName": "Project1",
                    "createdOn": "2025/09/15",
                    "description": "Version Control Site",
                    "type": "Web App",
                    "files": ["server.js", "index.html", "index.js"],
                    "members": ["User1", "User2"],
                    "owner": "User1",
                    "version": "v1.2.3",
                    "status": "In",
                    "projectImage": "image/url",
                    "checkedOutBy": null,
                    "checkInMessages": ["Added files", "Updated home.html"]
                }, 
                { 
                    "projectId": "P002",
                    "projectName": "Project2",
                    "createdOn": "2025/08/15",
                    "description": "E-commerce Website",
                    "type": "Web App",
                    "files": ["server.js", "home.html", "index.js"],
                    "members": ["User3", "User4"],
                    "owner": "User2",
                    "version": "v1.2.3",
                    "status": "Out",
                    "projectImage": "image/url",
                    "checkedOutBy": "User2",
                    "checkInMessages": null
                }, 
            ];

        const activityJsonData = 
            [
                {
                    "user": "friend_username",
                    "projectId": "P001",
                    "projectName": "Project1",
                    "action": "checked out",
                    "timestamp": "2025-09-15T10:00:00Z",
                    "details": "Updated index.js"
                }
            ];

        const discussionJsonData =
            [
                {
                    "projectId": "68cc11a92804d6e70b5b6d82",
                    "sender": "Philip",
                    "content": "Let's collaborate!",
                    "timestamp": "2025-09-15T10:05:00Z"
                }
            ];

        const usersResult = await userCollection.insertMany(userJsonData);
        const projectsResult = await projectCollection.insertMany(projectsJsonData);
        const activityResult = await activityCollection.insertMany(activityJsonData);
        const discussResult = await discussionCollection.insertMany(discussionJsonData);
        
    } finally {
        await client.close();
    }
}

// insertData().catch(console.error);





async function getUser(userN) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ "username": userN });
        console.log("User fetched for login:", user);
        return user;

    } catch (error) {
        console.error("Error displaying user: ", error);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        await client.connect();
        let query;
        if (/^[a-fA-F0-9]{24}$/.test(userId)) {
            query = { _id: new ObjectId(userId) };
        } else {
            query = { userId: userId };
        }
        const user = await userCollection.findOne(query);
        console.log("User fetched for profile:", user);
        return user;

    } catch (error) {
        console.error("Error displaying user: ", error);
        throw error;
    }
}

async function getProjectById(projectId) {
    try {
        await client.connect();
        let query;
        if (/^[a-fA-F0-9]{24}$/.test(projectId)) {
            query = { _id: new ObjectId(projectId) };
        } else {
            query = { projectId: projectId };
        }
        const project = await projectCollection.findOne(query);
        console.log("Project fetched:", project);
        return project;

    } catch (error) {
        console.error("Error displaying user: ", error);
        throw error;
    }
}

async function getProjectIdByNameAndOwner(projectName, owner) {
    try {
        await client.connect();
        const project = await projectCollection.findOne({ projectName, owner });
        if (!project) return null;
        return project._id.toString();
    } catch (error) {
        console.error("Error fetching project by name and owner:", error);
        throw error;
    }
}

async function getProjects() {
    try {
        await client.connect();
        const cursor = projectCollection.find({});
        const projects = await cursor.toArray();
        return projects;
    } catch (error) {
        console.error("Error displaying projects:", error);
        throw error;
    }
}

async function addUser(userN, surN, email, passw) {
    try {
        await client.connect();
        const userDoc = {
            username: userN,
            surname: surN,
            email: email,
            password: passw,
            birthday: null,
            occupation: null,
            bio: null,
            socials: null,
            friends: [],
            image: null,
            projects: [],
            connectedWith: [],
            role: null,
            checkedOut: []
        };
        const result = await userCollection.insertOne(userDoc);
        userDoc._id = result.insertedId;
        console.log(`User added with name:`, userDoc.username); 
        return userDoc; 
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

async function addProject(projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId) {
    try {
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        const ownerUsername = owner || (user ? user.username : "Unknown");

        let membersArr = members || [];
        if (!membersArr.includes(ownerUsername)) {
            membersArr = [ownerUsername, ...membersArr];
        }

        const projectDoc = {
            projectName: projectName || "Untitled Project",
            createdOn: createdOn || new Date().toISOString(),
            description: description || "No description provided.",
            type: type || "Web App",
            files: files || [],
            members: membersArr,
            owner: owner || (user ? user.username : "Unknown"),
            version: version || "v.0.0.0",
            status: status || "In",
            projectImage: projectImage || null,
            checkedOutBy: checkedOutBy || null,
            checkInMessages: checkInMessages || []
        };
        const result = await projectCollection.insertOne(projectDoc);
        const projectId = result.insertedId;
        projectDoc._id = result.insertedId;

        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $push: { projects: projectId.toString() } }
        );
        return projectDoc;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}

async function deleteProject(projectId) {
    try {
        await client.connect();
        const result = await projectCollection.deleteOne({_id: new ObjectId(projectId)});
        await userCollection.updateMany(
            { projects: projectId.toString() },
            { $pull: { projects: projectId.toString() } }
        );
        return result;
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}

async function updateUser(userId, updateFields) {
    try {
        await client.connect();
        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );
        const updatedUser = await userCollection.findOne({ _id: new ObjectId(userId) });
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

async function updateProject(projectId, updateFields) {
    try {
        await client.connect();
        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $set: updateFields }
        );
        const updatedProject = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        return updatedProject;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

async function addProjectMember(projectId, memberUsername) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ username: memberUsername });
        if (!user) return { success: false, message: "User does not exist." };

        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        if (project.members && project.members.includes(memberUsername)) {
            return { success: false, message: "User is already a member of this project." };
        }

        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $addToSet: { members: memberUsername } }
        );

        await userCollection.updateOne(
            { _id: user._id },
            { $addToSet: { projects: projectId.toString() } }
        );

        return { success: true, user };
    } catch (error) {
        console.error("Error adding project member:", error);
        throw error;
    }
}

async function removeProjectMember(projectId, memberUsername) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ username: memberUsername });
        if (!user) return { success: false, message: "User does not exist." };

        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        if (!project.members || !project.members.includes(memberUsername)) {
            return { success: false, message: "User is not a member of this project." };
        }

        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $pull: { members: memberUsername } }
        );

        await userCollection.updateOne(
            { _id: user._id },
            { $pull: { projects: projectId.toString() } }
        );

        return { success: true, user };
    } catch (error) {
        console.error("Error removing project member:", error);
        throw error;
    }
}

async function sendFriendRequest(fromUsername, toUsername) {
    try {
        await client.connect();
        await userCollection.updateOne(
            { username: toUsername },
            { $addToSet: { friendRequests: fromUsername } }
        );
        
        await userCollection.updateOne(
            { username: fromUsername },
            { $addToSet: { sentRequests: toUsername } }
        );
        return true;
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
}

async function acceptFriendRequest(userUsername, friendUsername) {
    await client.connect();
    await userCollection.updateOne(
        { username: userUsername },
        { $pull: { friendRequests: friendUsername } }
    );
    
    await userCollection.updateOne(
        { username: userUsername },
        { $addToSet: { friends: friendUsername } }
    );
    
    await userCollection.updateOne(
        { username: friendUsername },
        { $addToSet: { friends: userUsername } }
    );
    
    await userCollection.updateOne(
        { username: friendUsername },
        { $pull: { sentRequests: userUsername } }
    );
    return true;
}

async function rejectFriendRequest(userUsername, friendUsername) {
    await client.connect();
    
    await userCollection.updateOne(
        { username: userUsername },
        { $pull: { friendRequests: friendUsername } }
    );
    
    await userCollection.updateOne(
        { username: friendUsername },
        { $pull: { sentRequests: userUsername } }
    );
    return true;
}

async function getPendingRequests(username) {
    await client.connect();
    const user = await userCollection.findOne({ username });
    return user.friendRequests || [];
}

async function getFriends(username) {
    await client.connect();
    const user = await userCollection.findOne({ username });
    return user.friends || [];
}

async function removeFriend(userUsername, friendUsername) {
    await client.connect();
    await userCollection.updateOne(
        { username: userUsername },
        { $pull: { friends: friendUsername } }
    );
    await userCollection.updateOne(
        { username: friendUsername },
        { $pull: { friends: userUsername } }
    );
    
    await userCollection.updateOne(
        { username: userUsername },
        { $pull: { sentRequests: friendUsername, friendRequests: friendUsername } }
    );
    await userCollection.updateOne(
        { username: friendUsername },
        { $pull: { sentRequests: userUsername, friendRequests: userUsername } }
    );
    return true;
}

async function changeProjectOwner(projectId, newOwnerUsername, previousOwnerUsername) {
    try {
        await client.connect();
        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        if (!project) {
            return { success: false, message: "Project not found." };
        }

        const newOwner = await userCollection.findOne({ username: newOwnerUsername });
        if (!newOwner) {
            return { success: false, message: "User does not exist." };
        }

        if (
            !project.members.includes(newOwnerUsername) ||
            newOwnerUsername === previousOwnerUsername
        ) {
            return { success: false, message: "New owner must be a member of the project." };
        }

        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { owner: newOwnerUsername } }
        );

        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $addToSet: { members: newOwnerUsername } }
        );

        return { success: true };
    } catch (error) {
        console.error("Error changing owner:", error);
        throw error;
    }
}

async function addDiscussionMessage(projectId, sender, content) {
    try {
        await client.connect();
        const timestamp = new Date().toISOString();
        const messageDoc = { projectId, sender, content, timestamp };
        await discussionCollection.insertOne(messageDoc);
        return messageDoc;
    } catch (error) {
        console.error("Error adding discussion message:", error);
        throw error;
    }
}

async function getDiscussionMessages(projectId) {
    try {
        await client.connect();
        const messages = await discussionCollection.find({ projectId }).sort({ timestamp: -1 }).toArray();
        return messages;
    } catch (error) {
        console.error("Error getting discussion message:", error);
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return { success: false, message: "User not found." };
        }

        const ownedProjects = await projectCollection.find({ owner: user.username }).toArray();
        for (const project of ownedProjects) {
            await projectCollection.deleteOne({ _id: project._id });
            await activityCollection.deleteMany({ projectId: project.projectId });
            await discussionCollection.deleteMany({ projectId: project.projectId });
        }

        await projectCollection.updateMany(
            { members: user.username },
            { $pull: { members: user.username } }
        );

        await userCollection.deleteOne({ _id: new ObjectId(userId) });

        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

async function checkOutProject(projectId, username) {
    try {
        await client.connect();
        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        if (!project) {
            return { success: false, message: "Project not found." };
        }
        if (project.checkedOutBy) {
            return { success: false, message: "Project is already checked out." };
        }
        
        if (!project.members.includes(username)) {
            return { success: false, message: "You are not a member of this project." };
        }
        
        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { checkedOutBy: username, status: "Out" } }
        );
        
        await userCollection.updateOne(
            { username },
            { $addToSet: { checkedOut: projectId.toString() } }
        );

        await addActivity(username, projectId, project.projectName, "checked out", "");

        return { success: true };
    } catch (error) {
        console.error("Error checking out project:", error);
        throw error;
    }
}

async function checkInProject(projectId, username, newFiles, checkInMessage, version) {
    try {
        await client.connect();
        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        if (!project) {
            return { success: false, message: "Project not found." };
        }
        if (project.checkedOutBy !== username) {
            return { success: false, message: "You do not have this project checked out." };
        }

        let updatedFiles = [...project.files];
        let updatedFileMessages = project.checkInMessages ? [...project.checkInMessages] : [];

        newFiles.forEach((fileObj) => {
            const { filename, message } = fileObj;
            const idx = updatedFiles.indexOf(filename);
            if (idx !== -1) {
                updatedFiles[idx] = filename;
                updatedFileMessages[idx] = message;
            } else {
                updatedFiles.push(filename);
                updatedFileMessages.push(message);
            }
        });

        const projectMessages = project.checkInMessages || [];
        projectMessages.push(checkInMessage);

        await projectCollection.updateOne(
            { _id: new ObjectId(projectId) },
            {
                $set: {
                    files: updatedFiles,
                    checkInMessages: updatedFileMessages,
                    checkedOutBy: null,
                    status: "In",
                    version: version
                }
            }
        );

        await userCollection.updateOne(
            { username },
            { $pull: { checkedOut: projectId.toString() } }
        );

        const updatedProject = await projectCollection.findOne({ _id: new ObjectId(projectId) });

        await addActivity(username, projectId, project.projectName, "checked in", checkInMessage);

        return { success: true, project: updatedProject };
    } catch (error) {
        console.error("Error checking in project:", error);
        throw error;
    }
}

async function addActivity(user, projectId, projectName, action, details) {
    try {
        await client.connect();
        const timestamp = new Date().toISOString();
        const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
        const memberSnapshot = project.members;
        const activityDoc = { user, projectId, projectName, action, timestamp, details, members: memberSnapshot };
        await activityCollection.insertOne(activityDoc);
        return activityDoc;
    } catch (error) {
        console.error("Error adding activity:", error);
        throw error;
    }
}

async function getFriendsActivity(username) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ username });
        if (!user || !user.friends) return [];
        
        const activities = await activityCollection.find({
            user: { $in: user.friends }
        }).sort({ timestamp: -1 }).toArray();
        return activities;
    } catch (error) {
        console.error("Error getting friends' activity:", error);
        throw error;
    }
}

async function getMemberProjectsActivity(username) {
    try {
        await client.connect();
        
        const projects = await projectCollection.find({ members: username }).toArray();
        const projectIds = projects.map(p => p.projectId || p._id.toString());
        
        const activities = await activityCollection.find({
            // projectId: { $in: projectIds },
            members: username
        }).sort({ timestamp: -1 }).toArray();

        for (const act of activities) {
            const user = await userCollection.findOne({ username: act.user });
            act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        }

        return activities;
    } catch (error) {
        console.error("Error getting member projects activity:", error);
        throw error;
    }
}

async function getGlobalActivity() {
    try {
        await client.connect();
        const activities = await activityCollection.find({})
            .sort({ timestamp: -1 })
            .toArray();

        for (const act of activities) {
            const user = await userCollection.findOne({ username: act.user });
            act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        }

        return activities;
    } catch (error) {
        console.error("Error getting global activity:", error);
        throw error;
    }
}

async function getProjectActivity(projectId) {
    try {
        await client.connect();
        const activities = await activityCollection.find({
            projectId: projectId
        }).sort({ timestamp: -1 }).toArray();

        for (const act of activities) {
            const user = await userCollection.findOne({ username: act.user });
            act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        }

        return activities;
    } catch (error) {
        console.error("Error getting project activity:", error);
        throw error;
    }
}

async function getUserActivity(username) {
    try {
        await client.connect();
        const activities = await activityCollection.find({
            user: username
        }).sort({ timestamp: -1 }).toArray();
        return activities;
    } catch (error) {
        console.error("Error getting user activity:", error);
        throw error;
    }
}

async function getProjectsByLanguage(language) {
    try {
        await client.connect();

        const languageToExtensions = {
            "JavaScript": ["js", "jsx"],
            "TypeScript": ["ts", "tsx"],
            "Python": ["py"],
            "Java": ["java"],
            "C": ["c"],
            "C++": ["cpp"],
            "C#": ["cs"],
            "Ruby": ["rb"],
            "PHP": ["php"],
            "Go": ["go"],
            "Rust": ["rs"],
            "Swift": ["swift"],
            "Kotlin": ["kt"],
            "HTML": ["html"],
            "CSS": ["css"],
            "JSON": ["json"],
            "XML": ["xml"],
            "Shell": ["sh"],
            "Perl": ["pl"],
            "R": ["r"],
            "Scala": ["scala"],
            "Dart": ["dart"],
            "Objective-C": ["m"],
            "SQL": ["sql"]
        };
        const extensions = languageToExtensions[language];
        if (!extensions) return [];
        const regexes = extensions.map(ext => new RegExp(`\\.${ext}$`, "i"));
        const projects = await projectCollection.find({
            files: { $elemMatch: { $in: regexes } }
        }).toArray();
        return projects;
    } catch (error) {
        console.error("Error getting projects by language:", error);
        throw error;
    }
}

async function getProjectFilesInfo(projectId) {
    await client.connect();
    const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
    if (!project || !project.files) return null;
    return {
        files: project.files,
        dir: path.join(process.cwd(), 'frontend', 'public', 'assets', 'projectFiles', projectId)
    };
}

async function fuzzySearchUsers(searchTerm) {
    await client.connect();
    const users = await userCollection.find({}).toArray();
    const fuse = new Fuse(users, {
        keys: ['username', 'surname', 'email'],
        threshold: 0.4 
    });
    return fuse.search(searchTerm).map(result => result.item);
}

async function fuzzySearchProjects(searchTerm) {
    await client.connect();
    const projects = await projectCollection.find({}).toArray();
    
    projects.forEach(p => {
        if (Array.isArray(p.checkInMessages)) {
            p.checkInMessagesFlat = p.checkInMessages.join(' ');
        } else if (typeof p.checkInMessages === 'object' && p.checkInMessages !== null) {
            p.checkInMessagesFlat = Object.values(p.checkInMessages).join(' ');
        } else if (typeof p.checkInMessages === 'string') {
            p.checkInMessagesFlat = p.checkInMessages;
        } else {
            p.checkInMessagesFlat = '';
        }
    });
    const fuse = new Fuse(projects, {
        keys: ['projectName', 'type', 'checkInMessagesFlat'],
        threshold: 0.4
    });
    return fuse.search(searchTerm).map(result => result.item);
}

const extensionToLanguage = {
    "js": "JavaScript",
    "jsx": "JavaScript",
    "ts": "TypeScript",
    "tsx": "TypeScript",
    "py": "Python",
    "java": "Java",
    "c": "C",
    "cpp": "C++",
    "cs": "C#",
    "rb": "Ruby",
    "php": "PHP",
    "go": "Go",
    "rs": "Rust",
    "swift": "Swift",
    "kt": "Kotlin",
    "html": "HTML",
    "css": "CSS",
    "json": "JSON",
    "xml": "XML",
    "sh": "Shell",
    "pl": "Perl",
    "r": "R",
    "scala": "Scala",
    "dart": "Dart",
    "m": "Objective-C",
    "sql": "SQL"
};

function getLanguagesFromFiles(files) {
    if (!Array.isArray(files)) return [];
    const langs = new Set();
    files.forEach(filename => {
        const ext = filename.split('.').pop().toLowerCase();
        if (extensionToLanguage[ext]) langs.add(extensionToLanguage[ext]);
    });
    return Array.from(langs);
}

async function fuzzySearchHashtags(searchTerm) {
    await client.connect();
    const projects = await projectCollection.find({}).toArray();

    projects.forEach(p => {
        p.languages = getLanguagesFromFiles(p.files);
    });

    const fuse = new Fuse(projects, {
        keys: ['languages'],
        threshold: 0.4
    });

    const cleanTerm = searchTerm.startsWith('#') ? searchTerm.slice(1) : searchTerm;

    return fuse.search(cleanTerm).map(result => result.item);
}




export { getUser };
export { getUserById };
export { getProjectById };
export { getProjects };
export { addUser };
export { addProject };
export { deleteProject };
export { updateUser };
export { updateProject };
export { addProjectMember };
export { removeProjectMember };
export { sendFriendRequest };
export { acceptFriendRequest };
export { rejectFriendRequest };
export { getPendingRequests };
export { getFriends };
export { removeFriend };
export { changeProjectOwner };
export { addDiscussionMessage };
export { getDiscussionMessages };
export { deleteUser };
export { checkOutProject };
export { checkInProject };
export { addActivity };
export { getFriendsActivity };
export { getMemberProjectsActivity };
export { getGlobalActivity };
export { getProjectActivity };
export { getUserActivity };
export { getProjectsByLanguage };
export { getProjectIdByNameAndOwner };
export { getProjectFilesInfo };
export { fuzzySearchUsers };
export { fuzzySearchProjects };
export { fuzzySearchHashtags };

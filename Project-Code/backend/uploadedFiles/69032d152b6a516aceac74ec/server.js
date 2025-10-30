/* Ane' Burger 24565068, 33 */


import express from 'express';
import { addUser, getUser, getUserById, getProjectById, getProjects, addProject, deleteProject, updateUser, updateProject, addProjectMember, removeProjectMember, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getPendingRequests, getFriends, removeFriend, changeProjectOwner, addDiscussionMessage, getDiscussionMessages, deleteUser, checkOutProject, checkInProject, addActivity, getFriendsActivity, getMemberProjectsActivity, getGlobalActivity, getProjectActivity, getUserActivity, getProjectsByLanguage, getProjectIdByNameAndOwner, getProjectFilesInfo, fuzzySearchUsers, fuzzySearchProjects, fuzzySearchHashtags } from './database.js';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import archiver from 'archiver'; 

import { fileURLToPath } from 'url';



const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const __dirname = path.resolve();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.use(express.static(path.join(__dirname, "../../frontend/public")));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'frontend', 'public', 'assets', 'images'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.params.userId + ext);
    }
});
const upload = multer({ storage: storage });

const projectImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'frontend', 'public', 'assets', 'images'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.params.projectId + ext);
    }
});
const uploadProjectImage = multer({ 
    storage: projectImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // limit images to 5MB
});

const filesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, 'frontend', 'public', 'assets', 'projectFiles', req.params.projectId);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});
const uploadFiles = multer({ storage: filesStorage });


const newFilesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempDir = path.join(__dirname, 'frontend', 'public', 'assets', 'projectFiles', 'temp');
        fs.mkdirSync(tempDir, { recursive: true });
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadNewFiles = multer({ storage: newFilesStorage });






app.get("/api/projects", async (req, res) => {
   const projects = await getProjects();
   res.json(projects);
});

app.get('/api/profile/:userId', async (req, res) => {
   const { userId } = req.params;
   if (!userId) {
      return res.status(400).json({ error: "UserId required." });
   }
   try {
      let user;
      if (/^[a-fA-F0-9]{24}$/.test(userId)) {
         user = await getUserById(userId);
      } else {
         user = await getUser(userId); 
      }
      if (!user) {
         return res.status(404).json({ error: "User not found." });
      }
      res.json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.get('/api/project/:projectId', async (req, res) => {
   const { projectId } = req.params;
   if(!projectId) {
      return res.status(400).json({error: "ProjectId required."});
   }
   try {
      const project = await getProjectById(projectId);
      res.json(project);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.get('/api/check-username/:username', async (req, res) => {
   const { username } = req.params;
   try {
      const user = await getUser(username);
      if(user) {
         res.json({ exists: true });
      } else {
         res.json({ exists: false });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ exists: false, message: "Server error" });
   }
});

app.get('/api/user/:username/pending-requests', async (req, res) => {
    const { username } = req.params;
    try {
        const requests = await getPendingRequests(username);
        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/user/:username/friends', async (req, res) => {
    const { username } = req.params;
    try {
        const friends = await getFriends(username);
        res.json({ success: true, friends });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/project/:projectId/discussion', async (req, res) => {
    const { projectId } = req.params;
    try {
        const messages = await getDiscussionMessages(projectId);
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/user/:username/activity', async (req, res) => {
    const { username } = req.params;
    try {
        const activities = await getFriendsActivity(username);
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/user/:username/member-activity', async (req, res) => {
    const { username } = req.params;
    try {
        const activities = await getMemberProjectsActivity(username);
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/activity/global', async (req, res) => {
    try {
        const activities = await getGlobalActivity();
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/project/:projectId/activity', async (req, res) => {
    const { projectId } = req.params;
    try {
        const activities = await getProjectActivity(projectId);
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/user/:username/personal-activity', async (req, res) => {
    const { username } = req.params;
    try {
        const activities = await getUserActivity(username);
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/projects/hashtag/:language', async (req, res) => {
    const { language } = req.params;
    try {
        const projects = await getProjectsByLanguage(language);
        res.json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.get('/api/project/:projectId/download', async (req, res) => {
    const { projectId } = req.params;
    try {
        const info = await getProjectFilesInfo(projectId);
        if (!info || !info.files || info.files.length === 0) {
            return res.status(404).json({ success: false, message: "No files to download." });
        }
        const filesDir = info.dir;

        if (!fs.existsSync(filesDir)) {
            return res.status(404).json({ success: false, message: "Files not found." });
        }

        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="project_${projectId}_files.zip"`
        });

        const archive = archiver('zip');
        archive.pipe(res);

        info.files.forEach(filename => {
            const filePath = path.join(filesDir, filename);
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: filename });
            }
        });
        archive.finalize();
    } catch (error) {
        console.error("Error downloading files:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/project/:projectId/download-file/:filename', async (req, res) => {
    const { projectId, filename } = req.params;
    const filePath = path.join(__dirname, 'frontend', 'public', 'assets', 'projectFiles', projectId, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "File not found." });
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error downloading file." });
        }
    });
});

app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim() === "") return res.json({ users: [], projects: [], hashtags: [] });

    try {
        const [users, projects, hashtags] = await Promise.all([
            fuzzySearchUsers(q),
            fuzzySearchProjects(q),
            fuzzySearchHashtags(q)
        ]);
        res.json({ users, projects, hashtags });
    } catch (error) {
        console.error("Error in search:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});






app.put('/api/profile/:userId', async (req, res) => {
   const { userId } = req.params;
   const updateFields = req.body;
   try {
      const updatedUser = await updateUser(userId, updateFields);
      res.json({ success: true, user: updatedUser });
   } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.put('/api/project/:projectId', async (req, res) => {
   const { projectId } = req.params;
   const updateFields = req.body;
   try {
        const updatedProject = await updateProject(projectId, updateFields);
        res.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.put('/api/project/:projectId/files', async (req, res) => {
   const { projectId } = req.params;
   const { files } = req.body;
   try {
      const updatedProject = await updateProject(projectId, { files });
      res.json({ success: true, project: updatedProject });
   } catch (error) {
      console.error("Error adding files:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.put('/api/project/:projectId/owner', async (req, res) => {
    const { projectId } = req.params;
    const { newOwnerUsername, previousOwnerUsername } = req.body;
    try {
        const result = await changeProjectOwner(projectId, newOwnerUsername, previousOwnerUsername);
        if (!result.success) {
            return res.status(400).json(result);
        }
        const updatedProject = await getProjectById(projectId);
        res.json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.put('/api/profile/:userId/languages', async (req, res) => {
    const { userId } = req.params;
    const { language } = req.body;
    try {
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        const updatedLanguages = user.languages ? [...user.languages] : [];
        if (!updatedLanguages.includes(language)) updatedLanguages.push(language);

        const updatedUser = await updateUser(userId, { languages: updatedLanguages });
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});




app.post('/api/signup', async (req, res) => {
   const { username, surname, email, password } = req.body;
   console.log("Signup attempt: ", username, surname, email, password);
   try {
      const user = await addUser(username, surname, email, password);
      // const userRet = { _id: user._id, username: user.username, surname: user.surname, email: user.email, password: user.password };
      res.json({ success: true, message: "Sign Up successful", user });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error in /signup" });
   }
});

app.post('/api/login', async (req, res) => {
   const { username, password } = req.body;
   console.log("Login attempt: ", username, password);

   try {
      const user = await getUser(username);
      if(!user) {
         return res.status(401).json({ success: false, message: "User not found." });
      }

      if(user.password !== password) {
         return res.status(401).json({ success: false, message: "Invalid password." });
      }

      // const userRet = { _id: user._id, username: user.username, role: user.role };
      res.json({ success: true, message: "Login successful", user });

   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.post('/api/project', async (req, res) => {
   const { projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId } = req.body;
   try {
      const project = await addProject(projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId);
      res.json({ success: true, message: "Sign Up successful", projectId: project.projectId});
   } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.post('/api/project/:projectId/member', async (req, res) => {
   const { projectId } = req.params;
   const { memberUsername } = req.body;
   try {
      const result = await addProjectMember(projectId, memberUsername);
      if (!result.success) {
         return res.status(400).json(result);
      }
        
      const updatedProject = await getProjectById(projectId);
      res.json({ success: true, project: updatedProject });
   } catch (error) {
      console.error("Error adding member:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});  

app.post('/api/friend-request', async (req, res) => {
    const { fromUsername, toUsername } = req.body;
    try {
        await sendFriendRequest(fromUsername, toUsername);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/friend-request/accept', async (req, res) => {
    const { userUsername, friendUsername } = req.body;
    try {
        await acceptFriendRequest(userUsername, friendUsername);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/friend-request/reject', async (req, res) => {
    const { userUsername, friendUsername } = req.body;
    try {
        await rejectFriendRequest(userUsername, friendUsername);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/friend/remove', async (req, res) => {
    const { userUsername, friendUsername } = req.body;
    try {
        await removeFriend(userUsername, friendUsername);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/:projectId/discussion', async (req, res) => {
    const { projectId } = req.params;
    const { sender, content } = req.body;
    try {
        const message = await addDiscussionMessage(projectId, sender, content);
        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/:projectId/checkout', async (req, res) => {
    const { projectId } = req.params;
    const { username } = req.body;
    try {
        const result = await checkOutProject(projectId, username);
        if (!result.success) {
            return res.status(400).json(result);
        }
        
        const updatedProject = await getProjectById(projectId);
        res.json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/:projectId/checkin', async (req, res) => {
    const { projectId } = req.params;
    const { username, files, checkInMessage, version } = req.body;
    try {
        const result = await checkInProject(projectId, username, files, checkInMessage, version);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/profile/:userId/upload-image', upload.single('profileImage'), async (req, res) => {
    const { userId } = req.params;
    const username = req.body.username;
    const imagePath = `/assets/images/${req.file.filename}`;
    try {
        const updatedUser = await updateUser(userId, { image: imagePath });
        res.json({ success: true, image: imagePath, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/:projectId/upload-image', uploadProjectImage.single('projectImage'), async (req, res) => {
    const { projectId } = req.params;
    const imagePath = `/assets/images/${req.file.filename}`;
    try {
        const updatedProject = await updateProject(projectId, { projectImage: imagePath });
        res.json({ success: true, image: imagePath, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/:projectId/upload-files', uploadFiles.array('files'), async (req, res) => {
    const { projectId } = req.params;
    try {
        const filesList = req.body.filesList ? JSON.parse(req.body.filesList) : req.files.map(f => f.originalname);
        const updatedProject = await updateProject(projectId, { files: filesList });

        res.json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/project/create-with-files', uploadNewFiles.array('files'), async (req, res) => {
    try {
        const projectData = { ...req.body };
        projectData.members = projectData.members ? JSON.parse(projectData.members) : [];
        projectData.files = req.files ? req.files.map(f => f.originalname) : [];

        projectData.checkInMessages = Array.isArray(projectData.checkInMessages)
            ? projectData.checkInMessages
            : (projectData.checkInMessages ? JSON.parse(projectData.checkInMessages) : []);


        const newProject = await addProject(
            projectData.projectName,
            projectData.createdOn,
            projectData.description,
            projectData.type,
            projectData.files,
            projectData.members,
            projectData.owner,
            projectData.version,
            projectData.status,
            projectData.projectImage,
            projectData.checkedOutBy,
            projectData.checkInMessages,
            projectData.userId
        );

        // const projectDir = path.join(__dirname, 'frontend', 'public', 'assets', 'projectFiles', newProject._id.toString());
        // fs.mkdirSync(projectDir, { recursive: true });
        // req.files.forEach(file => {
        //     const oldPath = file.path;
        //     const newPath = path.join(projectDir, file.originalname);
        //     fs.renameSync(oldPath, newPath);
        // });
        
        const projectId = newProject._id ? newProject._id.toString() : await getProjectIdByNameAndOwner(projectData.projectName, projectData.owner);

        const projectDir = path.join(__dirname, 'frontend', 'public', 'assets', 'projectFiles', projectId);
        fs.mkdirSync(projectDir, { recursive: true });
        req.files.forEach(file => {
            const oldPath = file.path;
            const newPath = path.join(projectDir, file.originalname);
            fs.renameSync(oldPath, newPath);
        });

        const createdProject = await getProjectById(projectId);

        res.json({ success: true, project: createdProject });

        // res.json({ success: true, project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// app.post('/api/project/:projectId/checkin-files', uploadFiles.array('files'), async (req, res) => {
//     const { projectId } = req.params;
//     const { username, checkInMessage, version } = req.body;
//     try {
//         const newFileNames = req.files ? req.files.map(f => f.originalname) : [];

//         const project = await getProjectById(projectId);
//         let updatedFiles = [...project.files];
//         newFileNames.forEach(filename => {
//             if (!updatedFiles.includes(filename)) {
//                 updatedFiles.push(filename);
//             }
//         });

//         const updatedMessages = Array.isArray(project.checkInMessages)
//             ? [...project.checkInMessages, checkInMessage]
//             : [checkInMessage];

//         await updateProject(projectId, {
//             files: updatedFiles,
//             checkInMessages: updatedMessages,
//             checkedOutBy: null,
//             status: "In",
//             version: version
//         });

//         // await updateUser(project.checkedOutBy, { $pull: { checkedOut: projectId.toString() } });
//         if (project.checkedOutBy && /^[a-f\d]{24}$/i.test(project.checkedOutBy)) {
//             await updateUser(project.checkedOutBy, { $pull: { checkedOut: projectId.toString() } });
//         }

//         const updatedProject = await getProjectById(projectId);

//         res.json({ success: true, project: updatedProject });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });


app.post('/api/project/:projectId/checkin-files', uploadFiles.array('files'), async (req, res) => {
    const { projectId } = req.params;
    const { username, checkInMessage, version } = req.body;
    try {
        const newFileNames = req.files ? req.files.map(f => f.originalname) : [];
        const project = await getProjectById(projectId);

        let updatedFiles = [...project.files];
        newFileNames.forEach(filename => {
            if (!updatedFiles.includes(filename)) {
                updatedFiles.push(filename);
            }
        });

        let updatedMessages = project.checkInMessages && typeof project.checkInMessages === "object"
            ? { ...project.checkInMessages }
            : {};

        newFileNames.forEach(filename => {
            updatedMessages[filename] = checkInMessage;
        });

        await updateProject(projectId, {
            files: updatedFiles,
            checkInMessages: updatedMessages,
            checkedOutBy: null,
            status: "In",
            version: version
        });

        if (project.checkedOutBy && /^[a-f\d]{24}$/i.test(project.checkedOutBy)) {
            await updateUser(project.checkedOutBy, { $pull: { checkedOut: projectId.toString() } });
        }

        const updatedProject = await getProjectById(projectId);

        await addActivity(username, projectId, project.projectName, "checked in", checkInMessage);

        res.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});








app.delete('/api/project/:projectId', async (req, res) => {
   const { projectId } = req.params;
   try {
      const result = await deleteProject(projectId);
      res.json({ success: true, message: "Project deleted successfully.", result });
   } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.delete('/api/project/:projectId/member', async (req, res) => {
   const { projectId } = req.params;
   const { memberUsername } = req.body;
   try {
      const result = await removeProjectMember(projectId, memberUsername);
      if (!result.success) {
         return res.status(400).json(result);
      }
        
      const updatedProject = await getProjectById(projectId);
      res.json({ success: true, project: updatedProject });
   } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.delete('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await deleteUser(userId);
        if (!result.success) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});








// app.get('/{*any}', (req, res) => res.sendFile(path.resolve('frontend', 'public', 'index.html')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve('frontend', 'public', 'index.html'));
// });

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.resolve('frontend', 'public', 'index.html'));
// });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public", "index.html"));
});


app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`);
});



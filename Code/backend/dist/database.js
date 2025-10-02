"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptFriendRequest = acceptFriendRequest;
exports.addActivity = addActivity;
exports.addDiscussionMessage = addDiscussionMessage;
exports.addProject = addProject;
exports.addProjectMember = addProjectMember;
exports.addUser = addUser;
exports.changeProjectOwner = changeProjectOwner;
exports.checkInProject = checkInProject;
exports.checkOutProject = checkOutProject;
exports.deleteProject = deleteProject;
exports.deleteUser = deleteUser;
exports.fuzzySearchHashtags = fuzzySearchHashtags;
exports.fuzzySearchProjects = fuzzySearchProjects;
exports.fuzzySearchUsers = fuzzySearchUsers;
exports.getDiscussionMessages = getDiscussionMessages;
exports.getFriends = getFriends;
exports.getFriendsActivity = getFriendsActivity;
exports.getGlobalActivity = getGlobalActivity;
exports.getMemberProjectsActivity = getMemberProjectsActivity;
exports.getPendingRequests = getPendingRequests;
exports.getProjectActivity = getProjectActivity;
exports.getProjectById = getProjectById;
exports.getProjectFilesInfo = getProjectFilesInfo;
exports.getProjectIdByNameAndOwner = getProjectIdByNameAndOwner;
exports.getProjects = getProjects;
exports.getProjectsByLanguage = getProjectsByLanguage;
exports.getUser = getUser;
exports.getUserActivity = getUserActivity;
exports.getUserById = getUserById;
exports.rejectFriendRequest = rejectFriendRequest;
exports.removeFriend = removeFriend;
exports.removeProjectMember = removeProjectMember;
exports.sendFriendRequest = sendFriendRequest;
exports.updateProject = updateProject;
exports.updateUser = updateUser;
require("regenerator-runtime/runtime.js");
var _mongodb = require("mongodb");
var _path = _interopRequireDefault(require("path"));
var _fuse = _interopRequireDefault(require("fuse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* Ane' Burger 24565068, 33 */
var uri = "mongodb+srv://test-user:test-password@imyproject.uvrd6ue.mongodb.net/?retryWrites=true&w=majority&appName=imyProject";
var client = new _mongodb.MongoClient(uri);
var dbName = 'projectDB';
var db = client.db(dbName);
var userCollection = db.collection('users');
var projectCollection = db.collection('projects');
var activityCollection = db.collection('activity');
var discussionCollection = db.collection('discussion');
function insertData() {
  return _insertData.apply(this, arguments);
} // insertData().catch(console.error);
function _insertData() {
  _insertData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var userJsonData, projectsJsonData, activityJsonData, discussionJsonData, usersResult, projectsResult, activityResult, discussResult;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          userJsonData = [{
            "userId": "U001",
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
          }, {
            "userId": "U002",
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
          }];
          projectsJsonData = [{
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
          }, {
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
          }];
          activityJsonData = [{
            "user": "friend_username",
            "projectId": "P001",
            "projectName": "Project1",
            "action": "checked out",
            "timestamp": "2025-09-15T10:00:00Z",
            "details": "Updated index.js"
          }];
          discussionJsonData = [{
            "projectId": "68cc11a92804d6e70b5b6d82",
            "sender": "Philip",
            "content": "Let's collaborate!",
            "timestamp": "2025-09-15T10:05:00Z"
          }];
          _context.n = 1;
          return userCollection.insertMany(userJsonData);
        case 1:
          usersResult = _context.v;
          _context.n = 2;
          return projectCollection.insertMany(projectsJsonData);
        case 2:
          projectsResult = _context.v;
          _context.n = 3;
          return activityCollection.insertMany(activityJsonData);
        case 3:
          activityResult = _context.v;
          _context.n = 4;
          return discussionCollection.insertMany(discussionJsonData);
        case 4:
          discussResult = _context.v;
        case 5:
          _context.p = 5;
          _context.n = 6;
          return client.close();
        case 6:
          return _context.f(5);
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[0,, 5, 7]]);
  }));
  return _insertData.apply(this, arguments);
}
function getUser(_x) {
  return _getUser.apply(this, arguments);
}
function _getUser() {
  _getUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userN) {
    var user, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return client.connect();
        case 1:
          _context2.n = 2;
          return userCollection.findOne({
            "username": userN
          });
        case 2:
          user = _context2.v;
          console.log("User fetched for login:", user);
          return _context2.a(2, user);
        case 3:
          _context2.p = 3;
          _t = _context2.v;
          console.error("Error displaying user: ", _t);
          throw _t;
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return _getUser.apply(this, arguments);
}
function getUserById(_x2) {
  return _getUserById.apply(this, arguments);
}
function _getUserById() {
  _getUserById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId) {
    var query, user, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return client.connect();
        case 1:
          if (/^[a-fA-F0-9]{24}$/.test(userId)) {
            query = {
              _id: new _mongodb.ObjectId(userId)
            };
          } else {
            query = {
              userId: userId
            };
          }
          _context3.n = 2;
          return userCollection.findOne(query);
        case 2:
          user = _context3.v;
          console.log("User fetched for profile:", user);
          return _context3.a(2, user);
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error("Error displaying user: ", _t2);
          throw _t2;
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return _getUserById.apply(this, arguments);
}
function getProjectById(_x3) {
  return _getProjectById.apply(this, arguments);
}
function _getProjectById() {
  _getProjectById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(projectId) {
    var query, project, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return client.connect();
        case 1:
          if (/^[a-fA-F0-9]{24}$/.test(projectId)) {
            query = {
              _id: new _mongodb.ObjectId(projectId)
            };
          } else {
            query = {
              projectId: projectId
            };
          }
          _context4.n = 2;
          return projectCollection.findOne(query);
        case 2:
          project = _context4.v;
          console.log("Project fetched:", project);
          return _context4.a(2, project);
        case 3:
          _context4.p = 3;
          _t3 = _context4.v;
          console.error("Error displaying user: ", _t3);
          throw _t3;
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return _getProjectById.apply(this, arguments);
}
function getProjectIdByNameAndOwner(_x4, _x5) {
  return _getProjectIdByNameAndOwner.apply(this, arguments);
}
function _getProjectIdByNameAndOwner() {
  _getProjectIdByNameAndOwner = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(projectName, owner) {
    var project, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return client.connect();
        case 1:
          _context5.n = 2;
          return projectCollection.findOne({
            projectName: projectName,
            owner: owner
          });
        case 2:
          project = _context5.v;
          if (project) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, null);
        case 3:
          return _context5.a(2, project._id.toString());
        case 4:
          _context5.p = 4;
          _t4 = _context5.v;
          console.error("Error fetching project by name and owner:", _t4);
          throw _t4;
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return _getProjectIdByNameAndOwner.apply(this, arguments);
}
function getProjects() {
  return _getProjects.apply(this, arguments);
}
function _getProjects() {
  _getProjects = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var cursor, projects, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return client.connect();
        case 1:
          cursor = projectCollection.find({});
          _context6.n = 2;
          return cursor.toArray();
        case 2:
          projects = _context6.v;
          return _context6.a(2, projects);
        case 3:
          _context6.p = 3;
          _t5 = _context6.v;
          console.error("Error displaying projects:", _t5);
          throw _t5;
        case 4:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 3]]);
  }));
  return _getProjects.apply(this, arguments);
}
function addUser(_x6, _x7, _x8, _x9) {
  return _addUser.apply(this, arguments);
}
function _addUser() {
  _addUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userN, surN, email, passw) {
    var userDoc, result, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return client.connect();
        case 1:
          userDoc = {
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
          _context7.n = 2;
          return userCollection.insertOne(userDoc);
        case 2:
          result = _context7.v;
          userDoc._id = result.insertedId;
          console.log("User added with name:", userDoc.username);
          return _context7.a(2, userDoc);
        case 3:
          _context7.p = 3;
          _t6 = _context7.v;
          console.error("Error adding user:", _t6);
          throw _t6;
        case 4:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 3]]);
  }));
  return _addUser.apply(this, arguments);
}
function addProject(_x0, _x1, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20) {
  return _addProject.apply(this, arguments);
}
function _addProject() {
  _addProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId) {
    var user, ownerUsername, membersArr, projectDoc, result, projectId, _t7;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return userCollection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 1:
          user = _context8.v;
          ownerUsername = owner || (user ? user.username : "Unknown");
          membersArr = members || [];
          if (!membersArr.includes(ownerUsername)) {
            membersArr = [ownerUsername].concat(_toConsumableArray(membersArr));
          }
          projectDoc = {
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
          _context8.n = 2;
          return projectCollection.insertOne(projectDoc);
        case 2:
          result = _context8.v;
          projectId = result.insertedId;
          projectDoc._id = result.insertedId;
          _context8.n = 3;
          return userCollection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $push: {
              projects: projectId.toString()
            }
          });
        case 3:
          return _context8.a(2, projectDoc);
        case 4:
          _context8.p = 4;
          _t7 = _context8.v;
          console.error("Error creating project:", _t7);
          throw _t7;
        case 5:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 4]]);
  }));
  return _addProject.apply(this, arguments);
}
function deleteProject(_x21) {
  return _deleteProject.apply(this, arguments);
}
function _deleteProject() {
  _deleteProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(projectId) {
    var result, _t8;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return client.connect();
        case 1:
          _context9.n = 2;
          return projectCollection.deleteOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          result = _context9.v;
          _context9.n = 3;
          return userCollection.updateMany({
            projects: projectId.toString()
          }, {
            $pull: {
              projects: projectId.toString()
            }
          });
        case 3:
          return _context9.a(2, result);
        case 4:
          _context9.p = 4;
          _t8 = _context9.v;
          console.error("Error deleting project:", _t8);
          throw _t8;
        case 5:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 4]]);
  }));
  return _deleteProject.apply(this, arguments);
}
function updateUser(_x22, _x23) {
  return _updateUser.apply(this, arguments);
}
function _updateUser() {
  _updateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(userId, updateFields) {
    var updatedUser, _t9;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _context0.n = 1;
          return client.connect();
        case 1:
          _context0.n = 2;
          return userCollection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $set: updateFields
          });
        case 2:
          _context0.n = 3;
          return userCollection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 3:
          updatedUser = _context0.v;
          return _context0.a(2, updatedUser);
        case 4:
          _context0.p = 4;
          _t9 = _context0.v;
          console.error("Error updating user:", _t9);
          throw _t9;
        case 5:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 4]]);
  }));
  return _updateUser.apply(this, arguments);
}
function updateProject(_x24, _x25) {
  return _updateProject.apply(this, arguments);
}
function _updateProject() {
  _updateProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(projectId, updateFields) {
    var updatedProject, _t0;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return client.connect();
        case 1:
          _context1.n = 2;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $set: updateFields
          });
        case 2:
          _context1.n = 3;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 3:
          updatedProject = _context1.v;
          return _context1.a(2, updatedProject);
        case 4:
          _context1.p = 4;
          _t0 = _context1.v;
          console.error("Error updating user:", _t0);
          throw _t0;
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 4]]);
  }));
  return _updateProject.apply(this, arguments);
}
function addProjectMember(_x26, _x27) {
  return _addProjectMember.apply(this, arguments);
}
function _addProjectMember() {
  _addProjectMember = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(projectId, memberUsername) {
    var user, project, _t1;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return client.connect();
        case 1:
          _context10.n = 2;
          return userCollection.findOne({
            username: memberUsername
          });
        case 2:
          user = _context10.v;
          if (user) {
            _context10.n = 3;
            break;
          }
          return _context10.a(2, {
            success: false,
            message: "User does not exist."
          });
        case 3:
          _context10.n = 4;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 4:
          project = _context10.v;
          if (!(project.members && project.members.includes(memberUsername))) {
            _context10.n = 5;
            break;
          }
          return _context10.a(2, {
            success: false,
            message: "User is already a member of this project."
          });
        case 5:
          _context10.n = 6;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $addToSet: {
              members: memberUsername
            }
          });
        case 6:
          _context10.n = 7;
          return userCollection.updateOne({
            _id: user._id
          }, {
            $addToSet: {
              projects: projectId.toString()
            }
          });
        case 7:
          return _context10.a(2, {
            success: true,
            user: user
          });
        case 8:
          _context10.p = 8;
          _t1 = _context10.v;
          console.error("Error adding project member:", _t1);
          throw _t1;
        case 9:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return _addProjectMember.apply(this, arguments);
}
function removeProjectMember(_x28, _x29) {
  return _removeProjectMember.apply(this, arguments);
}
function _removeProjectMember() {
  _removeProjectMember = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(projectId, memberUsername) {
    var user, project, _t10;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return client.connect();
        case 1:
          _context11.n = 2;
          return userCollection.findOne({
            username: memberUsername
          });
        case 2:
          user = _context11.v;
          if (user) {
            _context11.n = 3;
            break;
          }
          return _context11.a(2, {
            success: false,
            message: "User does not exist."
          });
        case 3:
          _context11.n = 4;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 4:
          project = _context11.v;
          if (!(!project.members || !project.members.includes(memberUsername))) {
            _context11.n = 5;
            break;
          }
          return _context11.a(2, {
            success: false,
            message: "User is not a member of this project."
          });
        case 5:
          _context11.n = 6;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $pull: {
              members: memberUsername
            }
          });
        case 6:
          _context11.n = 7;
          return userCollection.updateOne({
            _id: user._id
          }, {
            $pull: {
              projects: projectId.toString()
            }
          });
        case 7:
          return _context11.a(2, {
            success: true,
            user: user
          });
        case 8:
          _context11.p = 8;
          _t10 = _context11.v;
          console.error("Error removing project member:", _t10);
          throw _t10;
        case 9:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return _removeProjectMember.apply(this, arguments);
}
function sendFriendRequest(_x30, _x31) {
  return _sendFriendRequest.apply(this, arguments);
}
function _sendFriendRequest() {
  _sendFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(fromUsername, toUsername) {
    var _t11;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return client.connect();
        case 1:
          _context12.n = 2;
          return userCollection.updateOne({
            username: toUsername
          }, {
            $addToSet: {
              friendRequests: fromUsername
            }
          });
        case 2:
          _context12.n = 3;
          return userCollection.updateOne({
            username: fromUsername
          }, {
            $addToSet: {
              sentRequests: toUsername
            }
          });
        case 3:
          return _context12.a(2, true);
        case 4:
          _context12.p = 4;
          _t11 = _context12.v;
          console.error("Error sending friend request:", _t11);
          throw _t11;
        case 5:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 4]]);
  }));
  return _sendFriendRequest.apply(this, arguments);
}
function acceptFriendRequest(_x32, _x33) {
  return _acceptFriendRequest.apply(this, arguments);
}
function _acceptFriendRequest() {
  _acceptFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(userUsername, friendUsername) {
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.n = 1;
          return client.connect();
        case 1:
          _context13.n = 2;
          return userCollection.updateOne({
            username: userUsername
          }, {
            $pull: {
              friendRequests: friendUsername
            }
          });
        case 2:
          _context13.n = 3;
          return userCollection.updateOne({
            username: userUsername
          }, {
            $addToSet: {
              friends: friendUsername
            }
          });
        case 3:
          _context13.n = 4;
          return userCollection.updateOne({
            username: friendUsername
          }, {
            $addToSet: {
              friends: userUsername
            }
          });
        case 4:
          _context13.n = 5;
          return userCollection.updateOne({
            username: friendUsername
          }, {
            $pull: {
              sentRequests: userUsername
            }
          });
        case 5:
          return _context13.a(2, true);
      }
    }, _callee13);
  }));
  return _acceptFriendRequest.apply(this, arguments);
}
function rejectFriendRequest(_x34, _x35) {
  return _rejectFriendRequest.apply(this, arguments);
}
function _rejectFriendRequest() {
  _rejectFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(userUsername, friendUsername) {
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          _context14.n = 1;
          return client.connect();
        case 1:
          _context14.n = 2;
          return userCollection.updateOne({
            username: userUsername
          }, {
            $pull: {
              friendRequests: friendUsername
            }
          });
        case 2:
          _context14.n = 3;
          return userCollection.updateOne({
            username: friendUsername
          }, {
            $pull: {
              sentRequests: userUsername
            }
          });
        case 3:
          return _context14.a(2, true);
      }
    }, _callee14);
  }));
  return _rejectFriendRequest.apply(this, arguments);
}
function getPendingRequests(_x36) {
  return _getPendingRequests.apply(this, arguments);
}
function _getPendingRequests() {
  _getPendingRequests = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(username) {
    var user;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          _context15.n = 1;
          return client.connect();
        case 1:
          _context15.n = 2;
          return userCollection.findOne({
            username: username
          });
        case 2:
          user = _context15.v;
          return _context15.a(2, user.friendRequests || []);
      }
    }, _callee15);
  }));
  return _getPendingRequests.apply(this, arguments);
}
function getFriends(_x37) {
  return _getFriends.apply(this, arguments);
}
function _getFriends() {
  _getFriends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(username) {
    var user;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          _context16.n = 1;
          return client.connect();
        case 1:
          _context16.n = 2;
          return userCollection.findOne({
            username: username
          });
        case 2:
          user = _context16.v;
          return _context16.a(2, user.friends || []);
      }
    }, _callee16);
  }));
  return _getFriends.apply(this, arguments);
}
function removeFriend(_x38, _x39) {
  return _removeFriend.apply(this, arguments);
}
function _removeFriend() {
  _removeFriend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(userUsername, friendUsername) {
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          _context17.n = 1;
          return client.connect();
        case 1:
          _context17.n = 2;
          return userCollection.updateOne({
            username: userUsername
          }, {
            $pull: {
              friends: friendUsername
            }
          });
        case 2:
          _context17.n = 3;
          return userCollection.updateOne({
            username: friendUsername
          }, {
            $pull: {
              friends: userUsername
            }
          });
        case 3:
          _context17.n = 4;
          return userCollection.updateOne({
            username: userUsername
          }, {
            $pull: {
              sentRequests: friendUsername,
              friendRequests: friendUsername
            }
          });
        case 4:
          _context17.n = 5;
          return userCollection.updateOne({
            username: friendUsername
          }, {
            $pull: {
              sentRequests: userUsername,
              friendRequests: userUsername
            }
          });
        case 5:
          return _context17.a(2, true);
      }
    }, _callee17);
  }));
  return _removeFriend.apply(this, arguments);
}
function changeProjectOwner(_x40, _x41, _x42) {
  return _changeProjectOwner.apply(this, arguments);
}
function _changeProjectOwner() {
  _changeProjectOwner = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(projectId, newOwnerUsername, previousOwnerUsername) {
    var project, newOwner, _t12;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          _context18.n = 1;
          return client.connect();
        case 1:
          _context18.n = 2;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          project = _context18.v;
          if (project) {
            _context18.n = 3;
            break;
          }
          return _context18.a(2, {
            success: false,
            message: "Project not found."
          });
        case 3:
          _context18.n = 4;
          return userCollection.findOne({
            username: newOwnerUsername
          });
        case 4:
          newOwner = _context18.v;
          if (newOwner) {
            _context18.n = 5;
            break;
          }
          return _context18.a(2, {
            success: false,
            message: "User does not exist."
          });
        case 5:
          if (!(!project.members.includes(newOwnerUsername) || newOwnerUsername === previousOwnerUsername)) {
            _context18.n = 6;
            break;
          }
          return _context18.a(2, {
            success: false,
            message: "New owner must be a member of the project."
          });
        case 6:
          _context18.n = 7;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $set: {
              owner: newOwnerUsername
            }
          });
        case 7:
          _context18.n = 8;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $addToSet: {
              members: newOwnerUsername
            }
          });
        case 8:
          return _context18.a(2, {
            success: true
          });
        case 9:
          _context18.p = 9;
          _t12 = _context18.v;
          console.error("Error changing owner:", _t12);
          throw _t12;
        case 10:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 9]]);
  }));
  return _changeProjectOwner.apply(this, arguments);
}
function addDiscussionMessage(_x43, _x44, _x45) {
  return _addDiscussionMessage.apply(this, arguments);
}
function _addDiscussionMessage() {
  _addDiscussionMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(projectId, sender, content) {
    var timestamp, messageDoc, _t13;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          _context19.n = 1;
          return client.connect();
        case 1:
          timestamp = new Date().toISOString();
          messageDoc = {
            projectId: projectId,
            sender: sender,
            content: content,
            timestamp: timestamp
          };
          _context19.n = 2;
          return discussionCollection.insertOne(messageDoc);
        case 2:
          return _context19.a(2, messageDoc);
        case 3:
          _context19.p = 3;
          _t13 = _context19.v;
          console.error("Error adding discussion message:", _t13);
          throw _t13;
        case 4:
          return _context19.a(2);
      }
    }, _callee19, null, [[0, 3]]);
  }));
  return _addDiscussionMessage.apply(this, arguments);
}
function getDiscussionMessages(_x46) {
  return _getDiscussionMessages.apply(this, arguments);
}
function _getDiscussionMessages() {
  _getDiscussionMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(projectId) {
    var messages, _t14;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _context20.n = 1;
          return client.connect();
        case 1:
          _context20.n = 2;
          return discussionCollection.find({
            projectId: projectId
          }).sort({
            timestamp: -1
          }).toArray();
        case 2:
          messages = _context20.v;
          return _context20.a(2, messages);
        case 3:
          _context20.p = 3;
          _t14 = _context20.v;
          console.error("Error getting discussion message:", _t14);
          throw _t14;
        case 4:
          return _context20.a(2);
      }
    }, _callee20, null, [[0, 3]]);
  }));
  return _getDiscussionMessages.apply(this, arguments);
}
function deleteUser(_x47) {
  return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
  _deleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(userId) {
    var user, ownedProjects, _iterator, _step, project, _t15, _t16;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _context21.n = 1;
          return client.connect();
        case 1:
          _context21.n = 2;
          return userCollection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 2:
          user = _context21.v;
          if (user) {
            _context21.n = 3;
            break;
          }
          return _context21.a(2, {
            success: false,
            message: "User not found."
          });
        case 3:
          _context21.n = 4;
          return projectCollection.find({
            owner: user.username
          }).toArray();
        case 4:
          ownedProjects = _context21.v;
          _iterator = _createForOfIteratorHelper(ownedProjects);
          _context21.p = 5;
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context21.n = 10;
            break;
          }
          project = _step.value;
          _context21.n = 7;
          return projectCollection.deleteOne({
            _id: project._id
          });
        case 7:
          _context21.n = 8;
          return activityCollection.deleteMany({
            projectId: project.projectId
          });
        case 8:
          _context21.n = 9;
          return discussionCollection.deleteMany({
            projectId: project.projectId
          });
        case 9:
          _context21.n = 6;
          break;
        case 10:
          _context21.n = 12;
          break;
        case 11:
          _context21.p = 11;
          _t15 = _context21.v;
          _iterator.e(_t15);
        case 12:
          _context21.p = 12;
          _iterator.f();
          return _context21.f(12);
        case 13:
          _context21.n = 14;
          return projectCollection.updateMany({
            members: user.username
          }, {
            $pull: {
              members: user.username
            }
          });
        case 14:
          _context21.n = 15;
          return userCollection.deleteOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 15:
          return _context21.a(2, {
            success: true
          });
        case 16:
          _context21.p = 16;
          _t16 = _context21.v;
          console.error("Error deleting user:", _t16);
          throw _t16;
        case 17:
          return _context21.a(2);
      }
    }, _callee21, null, [[5, 11, 12, 13], [0, 16]]);
  }));
  return _deleteUser.apply(this, arguments);
}
function checkOutProject(_x48, _x49) {
  return _checkOutProject.apply(this, arguments);
}
function _checkOutProject() {
  _checkOutProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(projectId, username) {
    var project, _t17;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _context22.p = 0;
          _context22.n = 1;
          return client.connect();
        case 1:
          _context22.n = 2;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          project = _context22.v;
          if (project) {
            _context22.n = 3;
            break;
          }
          return _context22.a(2, {
            success: false,
            message: "Project not found."
          });
        case 3:
          if (!project.checkedOutBy) {
            _context22.n = 4;
            break;
          }
          return _context22.a(2, {
            success: false,
            message: "Project is already checked out."
          });
        case 4:
          if (project.members.includes(username)) {
            _context22.n = 5;
            break;
          }
          return _context22.a(2, {
            success: false,
            message: "You are not a member of this project."
          });
        case 5:
          _context22.n = 6;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $set: {
              checkedOutBy: username,
              status: "Out"
            }
          });
        case 6:
          _context22.n = 7;
          return userCollection.updateOne({
            username: username
          }, {
            $addToSet: {
              checkedOut: projectId.toString()
            }
          });
        case 7:
          _context22.n = 8;
          return addActivity(username, projectId, project.projectName, "checked out", "");
        case 8:
          return _context22.a(2, {
            success: true
          });
        case 9:
          _context22.p = 9;
          _t17 = _context22.v;
          console.error("Error checking out project:", _t17);
          throw _t17;
        case 10:
          return _context22.a(2);
      }
    }, _callee22, null, [[0, 9]]);
  }));
  return _checkOutProject.apply(this, arguments);
}
function checkInProject(_x50, _x51, _x52, _x53, _x54) {
  return _checkInProject.apply(this, arguments);
}
function _checkInProject() {
  _checkInProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(projectId, username, newFiles, checkInMessage, version) {
    var project, updatedFiles, updatedFileMessages, projectMessages, updatedProject, _t18;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          _context23.n = 1;
          return client.connect();
        case 1:
          _context23.n = 2;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          project = _context23.v;
          if (project) {
            _context23.n = 3;
            break;
          }
          return _context23.a(2, {
            success: false,
            message: "Project not found."
          });
        case 3:
          if (!(project.checkedOutBy !== username)) {
            _context23.n = 4;
            break;
          }
          return _context23.a(2, {
            success: false,
            message: "You do not have this project checked out."
          });
        case 4:
          updatedFiles = _toConsumableArray(project.files);
          updatedFileMessages = project.checkInMessages ? _toConsumableArray(project.checkInMessages) : [];
          newFiles.forEach(function (fileObj) {
            var filename = fileObj.filename,
              message = fileObj.message;
            var idx = updatedFiles.indexOf(filename);
            if (idx !== -1) {
              updatedFiles[idx] = filename;
              updatedFileMessages[idx] = message;
            } else {
              updatedFiles.push(filename);
              updatedFileMessages.push(message);
            }
          });
          projectMessages = project.checkInMessages || [];
          projectMessages.push(checkInMessage);
          _context23.n = 5;
          return projectCollection.updateOne({
            _id: new _mongodb.ObjectId(projectId)
          }, {
            $set: {
              files: updatedFiles,
              checkInMessages: updatedFileMessages,
              checkedOutBy: null,
              status: "In",
              version: version
            }
          });
        case 5:
          _context23.n = 6;
          return userCollection.updateOne({
            username: username
          }, {
            $pull: {
              checkedOut: projectId.toString()
            }
          });
        case 6:
          _context23.n = 7;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 7:
          updatedProject = _context23.v;
          _context23.n = 8;
          return addActivity(username, projectId, project.projectName, "checked in", checkInMessage);
        case 8:
          return _context23.a(2, {
            success: true,
            project: updatedProject
          });
        case 9:
          _context23.p = 9;
          _t18 = _context23.v;
          console.error("Error checking in project:", _t18);
          throw _t18;
        case 10:
          return _context23.a(2);
      }
    }, _callee23, null, [[0, 9]]);
  }));
  return _checkInProject.apply(this, arguments);
}
function addActivity(_x55, _x56, _x57, _x58, _x59) {
  return _addActivity.apply(this, arguments);
}
function _addActivity() {
  _addActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(user, projectId, projectName, action, details) {
    var timestamp, project, memberSnapshot, activityDoc, _t19;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _context24.p = 0;
          _context24.n = 1;
          return client.connect();
        case 1:
          timestamp = new Date().toISOString();
          _context24.n = 2;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          project = _context24.v;
          memberSnapshot = project.members;
          activityDoc = {
            user: user,
            projectId: projectId,
            projectName: projectName,
            action: action,
            timestamp: timestamp,
            details: details,
            members: memberSnapshot
          };
          _context24.n = 3;
          return activityCollection.insertOne(activityDoc);
        case 3:
          return _context24.a(2, activityDoc);
        case 4:
          _context24.p = 4;
          _t19 = _context24.v;
          console.error("Error adding activity:", _t19);
          throw _t19;
        case 5:
          return _context24.a(2);
      }
    }, _callee24, null, [[0, 4]]);
  }));
  return _addActivity.apply(this, arguments);
}
function getFriendsActivity(_x60) {
  return _getFriendsActivity.apply(this, arguments);
}
function _getFriendsActivity() {
  _getFriendsActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(username) {
    var user, activities, _t20;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _context25.p = 0;
          _context25.n = 1;
          return client.connect();
        case 1:
          _context25.n = 2;
          return userCollection.findOne({
            username: username
          });
        case 2:
          user = _context25.v;
          if (!(!user || !user.friends)) {
            _context25.n = 3;
            break;
          }
          return _context25.a(2, []);
        case 3:
          _context25.n = 4;
          return activityCollection.find({
            user: {
              $in: user.friends
            }
          }).sort({
            timestamp: -1
          }).toArray();
        case 4:
          activities = _context25.v;
          return _context25.a(2, activities);
        case 5:
          _context25.p = 5;
          _t20 = _context25.v;
          console.error("Error getting friends' activity:", _t20);
          throw _t20;
        case 6:
          return _context25.a(2);
      }
    }, _callee25, null, [[0, 5]]);
  }));
  return _getFriendsActivity.apply(this, arguments);
}
function getMemberProjectsActivity(_x61) {
  return _getMemberProjectsActivity.apply(this, arguments);
}
function _getMemberProjectsActivity() {
  _getMemberProjectsActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(username) {
    var projects, projectIds, activities, _iterator2, _step2, act, user, _t21, _t22;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          _context26.p = 0;
          _context26.n = 1;
          return client.connect();
        case 1:
          _context26.n = 2;
          return projectCollection.find({
            members: username
          }).toArray();
        case 2:
          projects = _context26.v;
          projectIds = projects.map(function (p) {
            return p.projectId || p._id.toString();
          });
          _context26.n = 3;
          return activityCollection.find({
            // projectId: { $in: projectIds },
            members: username
          }).sort({
            timestamp: -1
          }).toArray();
        case 3:
          activities = _context26.v;
          _iterator2 = _createForOfIteratorHelper(activities);
          _context26.p = 4;
          _iterator2.s();
        case 5:
          if ((_step2 = _iterator2.n()).done) {
            _context26.n = 8;
            break;
          }
          act = _step2.value;
          _context26.n = 6;
          return userCollection.findOne({
            username: act.user
          });
        case 6:
          user = _context26.v;
          act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        case 7:
          _context26.n = 5;
          break;
        case 8:
          _context26.n = 10;
          break;
        case 9:
          _context26.p = 9;
          _t21 = _context26.v;
          _iterator2.e(_t21);
        case 10:
          _context26.p = 10;
          _iterator2.f();
          return _context26.f(10);
        case 11:
          return _context26.a(2, activities);
        case 12:
          _context26.p = 12;
          _t22 = _context26.v;
          console.error("Error getting member projects activity:", _t22);
          throw _t22;
        case 13:
          return _context26.a(2);
      }
    }, _callee26, null, [[4, 9, 10, 11], [0, 12]]);
  }));
  return _getMemberProjectsActivity.apply(this, arguments);
}
function getGlobalActivity() {
  return _getGlobalActivity.apply(this, arguments);
}
function _getGlobalActivity() {
  _getGlobalActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
    var activities, _iterator3, _step3, act, user, _t23, _t24;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _context27.p = 0;
          _context27.n = 1;
          return client.connect();
        case 1:
          _context27.n = 2;
          return activityCollection.find({}).sort({
            timestamp: -1
          }).toArray();
        case 2:
          activities = _context27.v;
          _iterator3 = _createForOfIteratorHelper(activities);
          _context27.p = 3;
          _iterator3.s();
        case 4:
          if ((_step3 = _iterator3.n()).done) {
            _context27.n = 7;
            break;
          }
          act = _step3.value;
          _context27.n = 5;
          return userCollection.findOne({
            username: act.user
          });
        case 5:
          user = _context27.v;
          act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        case 6:
          _context27.n = 4;
          break;
        case 7:
          _context27.n = 9;
          break;
        case 8:
          _context27.p = 8;
          _t23 = _context27.v;
          _iterator3.e(_t23);
        case 9:
          _context27.p = 9;
          _iterator3.f();
          return _context27.f(9);
        case 10:
          return _context27.a(2, activities);
        case 11:
          _context27.p = 11;
          _t24 = _context27.v;
          console.error("Error getting global activity:", _t24);
          throw _t24;
        case 12:
          return _context27.a(2);
      }
    }, _callee27, null, [[3, 8, 9, 10], [0, 11]]);
  }));
  return _getGlobalActivity.apply(this, arguments);
}
function getProjectActivity(_x62) {
  return _getProjectActivity.apply(this, arguments);
}
function _getProjectActivity() {
  _getProjectActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(projectId) {
    var activities, _iterator4, _step4, act, user, _t25, _t26;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          _context28.p = 0;
          _context28.n = 1;
          return client.connect();
        case 1:
          _context28.n = 2;
          return activityCollection.find({
            projectId: projectId
          }).sort({
            timestamp: -1
          }).toArray();
        case 2:
          activities = _context28.v;
          _iterator4 = _createForOfIteratorHelper(activities);
          _context28.p = 3;
          _iterator4.s();
        case 4:
          if ((_step4 = _iterator4.n()).done) {
            _context28.n = 7;
            break;
          }
          act = _step4.value;
          _context28.n = 5;
          return userCollection.findOne({
            username: act.user
          });
        case 5:
          user = _context28.v;
          act.profileImage = user && user.image ? user.image : "/assets/images/profile.png";
        case 6:
          _context28.n = 4;
          break;
        case 7:
          _context28.n = 9;
          break;
        case 8:
          _context28.p = 8;
          _t25 = _context28.v;
          _iterator4.e(_t25);
        case 9:
          _context28.p = 9;
          _iterator4.f();
          return _context28.f(9);
        case 10:
          return _context28.a(2, activities);
        case 11:
          _context28.p = 11;
          _t26 = _context28.v;
          console.error("Error getting project activity:", _t26);
          throw _t26;
        case 12:
          return _context28.a(2);
      }
    }, _callee28, null, [[3, 8, 9, 10], [0, 11]]);
  }));
  return _getProjectActivity.apply(this, arguments);
}
function getUserActivity(_x63) {
  return _getUserActivity.apply(this, arguments);
}
function _getUserActivity() {
  _getUserActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(username) {
    var activities, _t27;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          _context29.p = 0;
          _context29.n = 1;
          return client.connect();
        case 1:
          _context29.n = 2;
          return activityCollection.find({
            user: username
          }).sort({
            timestamp: -1
          }).toArray();
        case 2:
          activities = _context29.v;
          return _context29.a(2, activities);
        case 3:
          _context29.p = 3;
          _t27 = _context29.v;
          console.error("Error getting user activity:", _t27);
          throw _t27;
        case 4:
          return _context29.a(2);
      }
    }, _callee29, null, [[0, 3]]);
  }));
  return _getUserActivity.apply(this, arguments);
}
function getProjectsByLanguage(_x64) {
  return _getProjectsByLanguage.apply(this, arguments);
}
function _getProjectsByLanguage() {
  _getProjectsByLanguage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(language) {
    var languageToExtensions, extensions, regexes, projects, _t28;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          _context30.p = 0;
          _context30.n = 1;
          return client.connect();
        case 1:
          languageToExtensions = {
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
          extensions = languageToExtensions[language];
          if (extensions) {
            _context30.n = 2;
            break;
          }
          return _context30.a(2, []);
        case 2:
          regexes = extensions.map(function (ext) {
            return new RegExp("\\.".concat(ext, "$"), "i");
          });
          _context30.n = 3;
          return projectCollection.find({
            files: {
              $elemMatch: {
                $in: regexes
              }
            }
          }).toArray();
        case 3:
          projects = _context30.v;
          return _context30.a(2, projects);
        case 4:
          _context30.p = 4;
          _t28 = _context30.v;
          console.error("Error getting projects by language:", _t28);
          throw _t28;
        case 5:
          return _context30.a(2);
      }
    }, _callee30, null, [[0, 4]]);
  }));
  return _getProjectsByLanguage.apply(this, arguments);
}
function getProjectFilesInfo(_x65) {
  return _getProjectFilesInfo.apply(this, arguments);
}
function _getProjectFilesInfo() {
  _getProjectFilesInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(projectId) {
    var project;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.n) {
        case 0:
          _context31.n = 1;
          return client.connect();
        case 1:
          _context31.n = 2;
          return projectCollection.findOne({
            _id: new _mongodb.ObjectId(projectId)
          });
        case 2:
          project = _context31.v;
          if (!(!project || !project.files)) {
            _context31.n = 3;
            break;
          }
          return _context31.a(2, null);
        case 3:
          return _context31.a(2, {
            files: project.files,
            dir: _path["default"].join(process.cwd(), 'frontend', 'public', 'assets', 'projectFiles', projectId)
          });
      }
    }, _callee31);
  }));
  return _getProjectFilesInfo.apply(this, arguments);
}
function fuzzySearchUsers(_x66) {
  return _fuzzySearchUsers.apply(this, arguments);
}
function _fuzzySearchUsers() {
  _fuzzySearchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(searchTerm) {
    var users, fuse;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.n) {
        case 0:
          _context32.n = 1;
          return client.connect();
        case 1:
          _context32.n = 2;
          return userCollection.find({}).toArray();
        case 2:
          users = _context32.v;
          fuse = new _fuse["default"](users, {
            keys: ['username', 'surname', 'email'],
            threshold: 0.4
          });
          return _context32.a(2, fuse.search(searchTerm).map(function (result) {
            return result.item;
          }));
      }
    }, _callee32);
  }));
  return _fuzzySearchUsers.apply(this, arguments);
}
function fuzzySearchProjects(_x67) {
  return _fuzzySearchProjects.apply(this, arguments);
}
function _fuzzySearchProjects() {
  _fuzzySearchProjects = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(searchTerm) {
    var projects, fuse;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.n) {
        case 0:
          _context33.n = 1;
          return client.connect();
        case 1:
          _context33.n = 2;
          return projectCollection.find({}).toArray();
        case 2:
          projects = _context33.v;
          projects.forEach(function (p) {
            if (Array.isArray(p.checkInMessages)) {
              p.checkInMessagesFlat = p.checkInMessages.join(' ');
            } else if (_typeof(p.checkInMessages) === 'object' && p.checkInMessages !== null) {
              p.checkInMessagesFlat = Object.values(p.checkInMessages).join(' ');
            } else if (typeof p.checkInMessages === 'string') {
              p.checkInMessagesFlat = p.checkInMessages;
            } else {
              p.checkInMessagesFlat = '';
            }
          });
          fuse = new _fuse["default"](projects, {
            keys: ['projectName', 'type', 'checkInMessagesFlat'],
            threshold: 0.4
          });
          return _context33.a(2, fuse.search(searchTerm).map(function (result) {
            return result.item;
          }));
      }
    }, _callee33);
  }));
  return _fuzzySearchProjects.apply(this, arguments);
}
var extensionToLanguage = {
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
  var langs = new Set();
  files.forEach(function (filename) {
    var ext = filename.split('.').pop().toLowerCase();
    if (extensionToLanguage[ext]) langs.add(extensionToLanguage[ext]);
  });
  return Array.from(langs);
}
function fuzzySearchHashtags(_x68) {
  return _fuzzySearchHashtags.apply(this, arguments);
}
function _fuzzySearchHashtags() {
  _fuzzySearchHashtags = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(searchTerm) {
    var projects, fuse, cleanTerm;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.n) {
        case 0:
          _context34.n = 1;
          return client.connect();
        case 1:
          _context34.n = 2;
          return projectCollection.find({}).toArray();
        case 2:
          projects = _context34.v;
          projects.forEach(function (p) {
            p.languages = getLanguagesFromFiles(p.files);
          });
          fuse = new _fuse["default"](projects, {
            keys: ['languages'],
            threshold: 0.4
          });
          cleanTerm = searchTerm.startsWith('#') ? searchTerm.slice(1) : searchTerm;
          return _context34.a(2, fuse.search(cleanTerm).map(function (result) {
            return result.item;
          }));
      }
    }, _callee34);
  }));
  return _fuzzySearchHashtags.apply(this, arguments);
}
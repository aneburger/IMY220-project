"use strict";

var _express = _interopRequireDefault(require("express"));
var _database = require("./database.js");
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _fs = _interopRequireDefault(require("fs"));
var _archiver = _interopRequireDefault(require("archiver"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* Ane' Burger 24565068, 33 */
var app = (0, _express["default"])();
var port = 3000;
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);

// const __dirname = path.resolve();

app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());

// app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.use(_express["default"]["static"](_path["default"].join(_dirname, "../../frontend/public")));
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'images'));
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname);
    cb(null, req.params.userId + ext);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
var projectImageStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'images'));
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname);
    cb(null, req.params.projectId + ext);
  }
});
var uploadProjectImage = (0, _multer["default"])({
  storage: projectImageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  } // limit images to 5MB
});
var filesStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var dir = _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'projectFiles', req.params.projectId);
    _fs["default"].mkdirSync(dir, {
      recursive: true
    });
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadFiles = (0, _multer["default"])({
  storage: filesStorage
});
var newFilesStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var tempDir = _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'projectFiles', 'temp');
    _fs["default"].mkdirSync(tempDir, {
      recursive: true
    });
    cb(null, tempDir);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadNewFiles = (0, _multer["default"])({
  storage: newFilesStorage
});
app.get("/api/projects", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var projects;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0, _database.getProjects)();
        case 1:
          projects = _context.v;
          res.json(projects);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/api/profile/:userId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, user, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          userId = req.params.userId;
          if (userId) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "UserId required."
          }));
        case 1:
          _context2.p = 1;
          if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
            _context2.n = 3;
            break;
          }
          _context2.n = 2;
          return (0, _database.getUserById)(userId);
        case 2:
          user = _context2.v;
          _context2.n = 5;
          break;
        case 3:
          _context2.n = 4;
          return (0, _database.getUser)(userId);
        case 4:
          user = _context2.v;
        case 5:
          if (user) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, res.status(404).json({
            error: "User not found."
          }));
        case 6:
          res.json(user);
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t = _context2.v;
          console.error(_t);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/api/project/:projectId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var projectId, project, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          projectId = req.params.projectId;
          if (projectId) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            error: "ProjectId required."
          }));
        case 1:
          _context3.p = 1;
          _context3.n = 2;
          return (0, _database.getProjectById)(projectId);
        case 2:
          project = _context3.v;
          res.json(project);
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error(_t2);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get('/api/check-username/:username', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var username, user, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          username = req.params.username;
          _context4.p = 1;
          _context4.n = 2;
          return (0, _database.getUser)(username);
        case 2:
          user = _context4.v;
          if (user) {
            res.json({
              exists: true
            });
          } else {
            res.json({
              exists: false
            });
          }
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t3 = _context4.v;
          console.error(_t3);
          res.status(500).json({
            exists: false,
            message: "Server error"
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.get('/api/user/:username/pending-requests', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var username, requests, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          username = req.params.username;
          _context5.p = 1;
          _context5.n = 2;
          return (0, _database.getPendingRequests)(username);
        case 2:
          requests = _context5.v;
          res.json({
            success: true,
            requests: requests
          });
          _context5.n = 4;
          break;
        case 3:
          _context5.p = 3;
          _t4 = _context5.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 3]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
app.get('/api/user/:username/friends', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var username, friends, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          username = req.params.username;
          _context6.p = 1;
          _context6.n = 2;
          return (0, _database.getFriends)(username);
        case 2:
          friends = _context6.v;
          res.json({
            success: true,
            friends: friends
          });
          _context6.n = 4;
          break;
        case 3:
          _context6.p = 3;
          _t5 = _context6.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 3]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
app.get('/api/project/:projectId/discussion', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var projectId, messages, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          projectId = req.params.projectId;
          _context7.p = 1;
          _context7.n = 2;
          return (0, _database.getDiscussionMessages)(projectId);
        case 2:
          messages = _context7.v;
          res.json({
            success: true,
            messages: messages
          });
          _context7.n = 4;
          break;
        case 3:
          _context7.p = 3;
          _t6 = _context7.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 3]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
app.get('/api/user/:username/activity', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var username, activities, _t7;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          username = req.params.username;
          _context8.p = 1;
          _context8.n = 2;
          return (0, _database.getFriendsActivity)(username);
        case 2:
          activities = _context8.v;
          res.json({
            success: true,
            activities: activities
          });
          _context8.n = 4;
          break;
        case 3:
          _context8.p = 3;
          _t7 = _context8.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 3]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
app.get('/api/user/:username/member-activity', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var username, activities, _t8;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          username = req.params.username;
          _context9.p = 1;
          _context9.n = 2;
          return (0, _database.getMemberProjectsActivity)(username);
        case 2:
          activities = _context9.v;
          res.json({
            success: true,
            activities: activities
          });
          _context9.n = 4;
          break;
        case 3:
          _context9.p = 3;
          _t8 = _context9.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 3]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());
app.get('/api/activity/global', /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var activities, _t9;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _context0.n = 1;
          return (0, _database.getGlobalActivity)();
        case 1:
          activities = _context0.v;
          res.json({
            success: true,
            activities: activities
          });
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t9 = _context0.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());
app.get('/api/project/:projectId/activity', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var projectId, activities, _t0;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          projectId = req.params.projectId;
          _context1.p = 1;
          _context1.n = 2;
          return (0, _database.getProjectActivity)(projectId);
        case 2:
          activities = _context1.v;
          res.json({
            success: true,
            activities: activities
          });
          _context1.n = 4;
          break;
        case 3:
          _context1.p = 3;
          _t0 = _context1.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context1.a(2);
      }
    }, _callee1, null, [[1, 3]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
app.get('/api/user/:username/personal-activity', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var username, activities, _t1;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          username = req.params.username;
          _context10.p = 1;
          _context10.n = 2;
          return (0, _database.getUserActivity)(username);
        case 2:
          activities = _context10.v;
          res.json({
            success: true,
            activities: activities
          });
          _context10.n = 4;
          break;
        case 3:
          _context10.p = 3;
          _t1 = _context10.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context10.a(2);
      }
    }, _callee10, null, [[1, 3]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}());
app.get('/api/projects/hashtag/:language', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var language, projects, _t10;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          language = req.params.language;
          _context11.p = 1;
          _context11.n = 2;
          return (0, _database.getProjectsByLanguage)(language);
        case 2:
          projects = _context11.v;
          res.json({
            success: true,
            projects: projects
          });
          _context11.n = 4;
          break;
        case 3:
          _context11.p = 3;
          _t10 = _context11.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context11.a(2);
      }
    }, _callee11, null, [[1, 3]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());
app.get('/api/project/:projectId/download', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var projectId, info, filesDir, archive, _t11;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          projectId = req.params.projectId;
          _context12.p = 1;
          _context12.n = 2;
          return (0, _database.getProjectFilesInfo)(projectId);
        case 2:
          info = _context12.v;
          if (!(!info || !info.files || info.files.length === 0)) {
            _context12.n = 3;
            break;
          }
          return _context12.a(2, res.status(404).json({
            success: false,
            message: "No files to download."
          }));
        case 3:
          filesDir = info.dir;
          if (_fs["default"].existsSync(filesDir)) {
            _context12.n = 4;
            break;
          }
          return _context12.a(2, res.status(404).json({
            success: false,
            message: "Files not found."
          }));
        case 4:
          res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': "attachment; filename=\"project_".concat(projectId, "_files.zip\"")
          });
          archive = (0, _archiver["default"])('zip');
          archive.pipe(res);
          info.files.forEach(function (filename) {
            var filePath = _path["default"].join(filesDir, filename);
            if (_fs["default"].existsSync(filePath)) {
              archive.file(filePath, {
                name: filename
              });
            }
          });
          archive.finalize();
          _context12.n = 6;
          break;
        case 5:
          _context12.p = 5;
          _t11 = _context12.v;
          console.error("Error downloading files:", _t11);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context12.a(2);
      }
    }, _callee12, null, [[1, 5]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}());
app.get('/api/project/:projectId/download-file/:filename', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var _req$params, projectId, filename, filePath;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _req$params = req.params, projectId = _req$params.projectId, filename = _req$params.filename;
          filePath = _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'projectFiles', projectId, filename);
          if (_fs["default"].existsSync(filePath)) {
            _context13.n = 1;
            break;
          }
          return _context13.a(2, res.status(404).json({
            success: false,
            message: "File not found."
          }));
        case 1:
          res.download(filePath, filename, function (err) {
            if (err) {
              res.status(500).json({
                success: false,
                message: "Error downloading file."
              });
            }
          });
        case 2:
          return _context13.a(2);
      }
    }, _callee13);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}());
app.get('/api/search', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var q, _yield$Promise$all, _yield$Promise$all2, users, projects, hashtags, _t12;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          q = req.query.q;
          if (!(!q || q.trim() === "")) {
            _context14.n = 1;
            break;
          }
          return _context14.a(2, res.json({
            users: [],
            projects: [],
            hashtags: []
          }));
        case 1:
          _context14.p = 1;
          _context14.n = 2;
          return Promise.all([(0, _database.fuzzySearchUsers)(q), (0, _database.fuzzySearchProjects)(q), (0, _database.fuzzySearchHashtags)(q)]);
        case 2:
          _yield$Promise$all = _context14.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          users = _yield$Promise$all2[0];
          projects = _yield$Promise$all2[1];
          hashtags = _yield$Promise$all2[2];
          res.json({
            users: users,
            projects: projects,
            hashtags: hashtags
          });
          _context14.n = 4;
          break;
        case 3:
          _context14.p = 3;
          _t12 = _context14.v;
          console.error("Error in search:", _t12);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context14.a(2);
      }
    }, _callee14, null, [[1, 3]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}());
app.put('/api/profile/:userId', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var userId, updateFields, updatedUser, _t13;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          userId = req.params.userId;
          updateFields = req.body;
          _context15.p = 1;
          _context15.n = 2;
          return (0, _database.updateUser)(userId, updateFields);
        case 2:
          updatedUser = _context15.v;
          res.json({
            success: true,
            user: updatedUser
          });
          _context15.n = 4;
          break;
        case 3:
          _context15.p = 3;
          _t13 = _context15.v;
          console.error("Error updating profile:", _t13);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context15.a(2);
      }
    }, _callee15, null, [[1, 3]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}());
app.put('/api/project/:projectId', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var projectId, updateFields, updatedProject, _t14;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          projectId = req.params.projectId;
          updateFields = req.body;
          _context16.p = 1;
          _context16.n = 2;
          return (0, _database.updateProject)(projectId, updateFields);
        case 2:
          updatedProject = _context16.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context16.n = 4;
          break;
        case 3:
          _context16.p = 3;
          _t14 = _context16.v;
          console.error("Error updating project:", _t14);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context16.a(2);
      }
    }, _callee16, null, [[1, 3]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}());
app.put('/api/project/:projectId/files', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var projectId, files, updatedProject, _t15;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          projectId = req.params.projectId;
          files = req.body.files;
          _context17.p = 1;
          _context17.n = 2;
          return (0, _database.updateProject)(projectId, {
            files: files
          });
        case 2:
          updatedProject = _context17.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context17.n = 4;
          break;
        case 3:
          _context17.p = 3;
          _t15 = _context17.v;
          console.error("Error adding files:", _t15);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context17.a(2);
      }
    }, _callee17, null, [[1, 3]]);
  }));
  return function (_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}());
app.put('/api/project/:projectId/owner', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
    var projectId, _req$body, newOwnerUsername, previousOwnerUsername, result, updatedProject, _t16;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          projectId = req.params.projectId;
          _req$body = req.body, newOwnerUsername = _req$body.newOwnerUsername, previousOwnerUsername = _req$body.previousOwnerUsername;
          _context18.p = 1;
          _context18.n = 2;
          return (0, _database.changeProjectOwner)(projectId, newOwnerUsername, previousOwnerUsername);
        case 2:
          result = _context18.v;
          if (result.success) {
            _context18.n = 3;
            break;
          }
          return _context18.a(2, res.status(400).json(result));
        case 3:
          _context18.n = 4;
          return (0, _database.getProjectById)(projectId);
        case 4:
          updatedProject = _context18.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context18.n = 6;
          break;
        case 5:
          _context18.p = 5;
          _t16 = _context18.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context18.a(2);
      }
    }, _callee18, null, [[1, 5]]);
  }));
  return function (_x37, _x38) {
    return _ref18.apply(this, arguments);
  };
}());
app.put('/api/profile/:userId/languages', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
    var userId, language, user, updatedLanguages, updatedUser, _t17;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          userId = req.params.userId;
          language = req.body.language;
          _context19.p = 1;
          _context19.n = 2;
          return (0, _database.getUserById)(userId);
        case 2:
          user = _context19.v;
          if (user) {
            _context19.n = 3;
            break;
          }
          return _context19.a(2, res.status(404).json({
            success: false,
            message: "User not found."
          }));
        case 3:
          updatedLanguages = user.languages ? _toConsumableArray(user.languages) : [];
          if (!updatedLanguages.includes(language)) updatedLanguages.push(language);
          _context19.n = 4;
          return (0, _database.updateUser)(userId, {
            languages: updatedLanguages
          });
        case 4:
          updatedUser = _context19.v;
          res.json({
            success: true,
            user: updatedUser
          });
          _context19.n = 6;
          break;
        case 5:
          _context19.p = 5;
          _t17 = _context19.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context19.a(2);
      }
    }, _callee19, null, [[1, 5]]);
  }));
  return function (_x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}());
app.post('/api/signup', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
    var _req$body2, username, surname, email, password, user, _t18;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, surname = _req$body2.surname, email = _req$body2.email, password = _req$body2.password;
          console.log("Signup attempt: ", username, surname, email, password);
          _context20.p = 1;
          _context20.n = 2;
          return (0, _database.addUser)(username, surname, email, password);
        case 2:
          user = _context20.v;
          // const userRet = { _id: user._id, username: user.username, surname: user.surname, email: user.email, password: user.password };
          res.json({
            success: true,
            message: "Sign Up successful",
            user: user
          });
          _context20.n = 4;
          break;
        case 3:
          _context20.p = 3;
          _t18 = _context20.v;
          console.error(_t18);
          res.status(500).json({
            success: false,
            message: "Server error in /signup"
          });
        case 4:
          return _context20.a(2);
      }
    }, _callee20, null, [[1, 3]]);
  }));
  return function (_x41, _x42) {
    return _ref20.apply(this, arguments);
  };
}());
app.post('/api/login', /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
    var _req$body3, username, password, user, _t19;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
          console.log("Login attempt: ", username, password);
          _context21.p = 1;
          _context21.n = 2;
          return (0, _database.getUser)(username);
        case 2:
          user = _context21.v;
          if (user) {
            _context21.n = 3;
            break;
          }
          return _context21.a(2, res.status(401).json({
            success: false,
            message: "User not found."
          }));
        case 3:
          if (!(user.password !== password)) {
            _context21.n = 4;
            break;
          }
          return _context21.a(2, res.status(401).json({
            success: false,
            message: "Invalid password."
          }));
        case 4:
          // const userRet = { _id: user._id, username: user.username, role: user.role };
          res.json({
            success: true,
            message: "Login successful",
            user: user
          });
          _context21.n = 6;
          break;
        case 5:
          _context21.p = 5;
          _t19 = _context21.v;
          console.error(_t19);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context21.a(2);
      }
    }, _callee21, null, [[1, 5]]);
  }));
  return function (_x43, _x44) {
    return _ref21.apply(this, arguments);
  };
}());
app.post('/api/project', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
    var _req$body4, projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId, project, _t20;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _req$body4 = req.body, projectName = _req$body4.projectName, createdOn = _req$body4.createdOn, description = _req$body4.description, type = _req$body4.type, files = _req$body4.files, members = _req$body4.members, owner = _req$body4.owner, version = _req$body4.version, status = _req$body4.status, projectImage = _req$body4.projectImage, checkedOutBy = _req$body4.checkedOutBy, checkInMessages = _req$body4.checkInMessages, userId = _req$body4.userId;
          _context22.p = 1;
          _context22.n = 2;
          return (0, _database.addProject)(projectName, createdOn, description, type, files, members, owner, version, status, projectImage, checkedOutBy, checkInMessages, userId);
        case 2:
          project = _context22.v;
          res.json({
            success: true,
            message: "Sign Up successful",
            projectId: project.projectId
          });
          _context22.n = 4;
          break;
        case 3:
          _context22.p = 3;
          _t20 = _context22.v;
          console.error("Error creating project:", _t20);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context22.a(2);
      }
    }, _callee22, null, [[1, 3]]);
  }));
  return function (_x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/member', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
    var projectId, memberUsername, result, updatedProject, _t21;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          projectId = req.params.projectId;
          memberUsername = req.body.memberUsername;
          _context23.p = 1;
          _context23.n = 2;
          return (0, _database.addProjectMember)(projectId, memberUsername);
        case 2:
          result = _context23.v;
          if (result.success) {
            _context23.n = 3;
            break;
          }
          return _context23.a(2, res.status(400).json(result));
        case 3:
          _context23.n = 4;
          return (0, _database.getProjectById)(projectId);
        case 4:
          updatedProject = _context23.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context23.n = 6;
          break;
        case 5:
          _context23.p = 5;
          _t21 = _context23.v;
          console.error("Error adding member:", _t21);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context23.a(2);
      }
    }, _callee23, null, [[1, 5]]);
  }));
  return function (_x47, _x48) {
    return _ref23.apply(this, arguments);
  };
}());
app.post('/api/friend-request', /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
    var _req$body5, fromUsername, toUsername, _t22;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _req$body5 = req.body, fromUsername = _req$body5.fromUsername, toUsername = _req$body5.toUsername;
          _context24.p = 1;
          _context24.n = 2;
          return (0, _database.sendFriendRequest)(fromUsername, toUsername);
        case 2:
          res.json({
            success: true
          });
          _context24.n = 4;
          break;
        case 3:
          _context24.p = 3;
          _t22 = _context24.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context24.a(2);
      }
    }, _callee24, null, [[1, 3]]);
  }));
  return function (_x49, _x50) {
    return _ref24.apply(this, arguments);
  };
}());
app.post('/api/friend-request/accept', /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
    var _req$body6, userUsername, friendUsername, _t23;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _req$body6 = req.body, userUsername = _req$body6.userUsername, friendUsername = _req$body6.friendUsername;
          _context25.p = 1;
          _context25.n = 2;
          return (0, _database.acceptFriendRequest)(userUsername, friendUsername);
        case 2:
          res.json({
            success: true
          });
          _context25.n = 4;
          break;
        case 3:
          _context25.p = 3;
          _t23 = _context25.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context25.a(2);
      }
    }, _callee25, null, [[1, 3]]);
  }));
  return function (_x51, _x52) {
    return _ref25.apply(this, arguments);
  };
}());
app.post('/api/friend-request/reject', /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(req, res) {
    var _req$body7, userUsername, friendUsername, _t24;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          _req$body7 = req.body, userUsername = _req$body7.userUsername, friendUsername = _req$body7.friendUsername;
          _context26.p = 1;
          _context26.n = 2;
          return (0, _database.rejectFriendRequest)(userUsername, friendUsername);
        case 2:
          res.json({
            success: true
          });
          _context26.n = 4;
          break;
        case 3:
          _context26.p = 3;
          _t24 = _context26.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context26.a(2);
      }
    }, _callee26, null, [[1, 3]]);
  }));
  return function (_x53, _x54) {
    return _ref26.apply(this, arguments);
  };
}());
app.post('/api/friend/remove', /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(req, res) {
    var _req$body8, userUsername, friendUsername, _t25;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _req$body8 = req.body, userUsername = _req$body8.userUsername, friendUsername = _req$body8.friendUsername;
          _context27.p = 1;
          _context27.n = 2;
          return (0, _database.removeFriend)(userUsername, friendUsername);
        case 2:
          res.json({
            success: true
          });
          _context27.n = 4;
          break;
        case 3:
          _context27.p = 3;
          _t25 = _context27.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context27.a(2);
      }
    }, _callee27, null, [[1, 3]]);
  }));
  return function (_x55, _x56) {
    return _ref27.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/discussion', /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(req, res) {
    var projectId, _req$body9, sender, content, message, _t26;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          projectId = req.params.projectId;
          _req$body9 = req.body, sender = _req$body9.sender, content = _req$body9.content;
          _context28.p = 1;
          _context28.n = 2;
          return (0, _database.addDiscussionMessage)(projectId, sender, content);
        case 2:
          message = _context28.v;
          res.json({
            success: true,
            message: message
          });
          _context28.n = 4;
          break;
        case 3:
          _context28.p = 3;
          _t26 = _context28.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context28.a(2);
      }
    }, _callee28, null, [[1, 3]]);
  }));
  return function (_x57, _x58) {
    return _ref28.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/checkout', /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(req, res) {
    var projectId, username, result, updatedProject, _t27;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          projectId = req.params.projectId;
          username = req.body.username;
          _context29.p = 1;
          _context29.n = 2;
          return (0, _database.checkOutProject)(projectId, username);
        case 2:
          result = _context29.v;
          if (result.success) {
            _context29.n = 3;
            break;
          }
          return _context29.a(2, res.status(400).json(result));
        case 3:
          _context29.n = 4;
          return (0, _database.getProjectById)(projectId);
        case 4:
          updatedProject = _context29.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context29.n = 6;
          break;
        case 5:
          _context29.p = 5;
          _t27 = _context29.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context29.a(2);
      }
    }, _callee29, null, [[1, 5]]);
  }));
  return function (_x59, _x60) {
    return _ref29.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/checkin', /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(req, res) {
    var projectId, _req$body0, username, files, checkInMessage, version, result, _t28;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          projectId = req.params.projectId;
          _req$body0 = req.body, username = _req$body0.username, files = _req$body0.files, checkInMessage = _req$body0.checkInMessage, version = _req$body0.version;
          _context30.p = 1;
          _context30.n = 2;
          return (0, _database.checkInProject)(projectId, username, files, checkInMessage, version);
        case 2:
          result = _context30.v;
          if (result.success) {
            _context30.n = 3;
            break;
          }
          return _context30.a(2, res.status(400).json(result));
        case 3:
          res.json(result);
          _context30.n = 5;
          break;
        case 4:
          _context30.p = 4;
          _t28 = _context30.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 5:
          return _context30.a(2);
      }
    }, _callee30, null, [[1, 4]]);
  }));
  return function (_x61, _x62) {
    return _ref30.apply(this, arguments);
  };
}());
app.post('/api/profile/:userId/upload-image', upload.single('profileImage'), /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(req, res) {
    var userId, username, imagePath, updatedUser, _t29;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          userId = req.params.userId;
          username = req.body.username;
          imagePath = "/assets/images/".concat(req.file.filename);
          _context31.p = 1;
          _context31.n = 2;
          return (0, _database.updateUser)(userId, {
            image: imagePath
          });
        case 2:
          updatedUser = _context31.v;
          res.json({
            success: true,
            image: imagePath,
            user: updatedUser
          });
          _context31.n = 4;
          break;
        case 3:
          _context31.p = 3;
          _t29 = _context31.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context31.a(2);
      }
    }, _callee31, null, [[1, 3]]);
  }));
  return function (_x63, _x64) {
    return _ref31.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/upload-image', uploadProjectImage.single('projectImage'), /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(req, res) {
    var projectId, imagePath, updatedProject, _t30;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          projectId = req.params.projectId;
          imagePath = "/assets/images/".concat(req.file.filename);
          _context32.p = 1;
          _context32.n = 2;
          return (0, _database.updateProject)(projectId, {
            projectImage: imagePath
          });
        case 2:
          updatedProject = _context32.v;
          res.json({
            success: true,
            image: imagePath,
            project: updatedProject
          });
          _context32.n = 4;
          break;
        case 3:
          _context32.p = 3;
          _t30 = _context32.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context32.a(2);
      }
    }, _callee32, null, [[1, 3]]);
  }));
  return function (_x65, _x66) {
    return _ref32.apply(this, arguments);
  };
}());
app.post('/api/project/:projectId/upload-files', uploadFiles.array('files'), /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(req, res) {
    var projectId, filesList, updatedProject, _t31;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          projectId = req.params.projectId;
          _context33.p = 1;
          filesList = req.body.filesList ? JSON.parse(req.body.filesList) : req.files.map(function (f) {
            return f.originalname;
          });
          _context33.n = 2;
          return (0, _database.updateProject)(projectId, {
            files: filesList
          });
        case 2:
          updatedProject = _context33.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context33.n = 4;
          break;
        case 3:
          _context33.p = 3;
          _t31 = _context33.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context33.a(2);
      }
    }, _callee33, null, [[1, 3]]);
  }));
  return function (_x67, _x68) {
    return _ref33.apply(this, arguments);
  };
}());
app.post('/api/project/create-with-files', uploadNewFiles.array('files'), /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(req, res) {
    var projectData, newProject, projectId, projectDir, createdProject, _t32, _t33;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          _context34.p = 0;
          projectData = _objectSpread({}, req.body);
          projectData.members = projectData.members ? JSON.parse(projectData.members) : [];
          projectData.files = req.files ? req.files.map(function (f) {
            return f.originalname;
          }) : [];
          projectData.checkInMessages = Array.isArray(projectData.checkInMessages) ? projectData.checkInMessages : projectData.checkInMessages ? JSON.parse(projectData.checkInMessages) : [];
          _context34.n = 1;
          return (0, _database.addProject)(projectData.projectName, projectData.createdOn, projectData.description, projectData.type, projectData.files, projectData.members, projectData.owner, projectData.version, projectData.status, projectData.projectImage, projectData.checkedOutBy, projectData.checkInMessages, projectData.userId);
        case 1:
          newProject = _context34.v;
          if (!newProject._id) {
            _context34.n = 2;
            break;
          }
          _t32 = newProject._id.toString();
          _context34.n = 4;
          break;
        case 2:
          _context34.n = 3;
          return (0, _database.getProjectIdByNameAndOwner)(projectData.projectName, projectData.owner);
        case 3:
          _t32 = _context34.v;
        case 4:
          projectId = _t32;
          projectDir = _path["default"].join(_dirname, 'frontend', 'public', 'assets', 'projectFiles', projectId);
          _fs["default"].mkdirSync(projectDir, {
            recursive: true
          });
          req.files.forEach(function (file) {
            var oldPath = file.path;
            var newPath = _path["default"].join(projectDir, file.originalname);
            _fs["default"].renameSync(oldPath, newPath);
          });
          _context34.n = 5;
          return (0, _database.getProjectById)(projectId);
        case 5:
          createdProject = _context34.v;
          res.json({
            success: true,
            project: createdProject
          });

          // res.json({ success: true, project: newProject });
          _context34.n = 7;
          break;
        case 6:
          _context34.p = 6;
          _t33 = _context34.v;
          console.error(_t33);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 7:
          return _context34.a(2);
      }
    }, _callee34, null, [[0, 6]]);
  }));
  return function (_x69, _x70) {
    return _ref34.apply(this, arguments);
  };
}());

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

app.post('/api/project/:projectId/checkin-files', uploadFiles.array('files'), /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(req, res) {
    var projectId, _req$body1, username, checkInMessage, version, newFileNames, project, updatedFiles, updatedMessages, updatedProject, _t34;
    return _regenerator().w(function (_context35) {
      while (1) switch (_context35.p = _context35.n) {
        case 0:
          projectId = req.params.projectId;
          _req$body1 = req.body, username = _req$body1.username, checkInMessage = _req$body1.checkInMessage, version = _req$body1.version;
          _context35.p = 1;
          newFileNames = req.files ? req.files.map(function (f) {
            return f.originalname;
          }) : [];
          _context35.n = 2;
          return (0, _database.getProjectById)(projectId);
        case 2:
          project = _context35.v;
          updatedFiles = _toConsumableArray(project.files);
          newFileNames.forEach(function (filename) {
            if (!updatedFiles.includes(filename)) {
              updatedFiles.push(filename);
            }
          });
          updatedMessages = project.checkInMessages && _typeof(project.checkInMessages) === "object" ? _objectSpread({}, project.checkInMessages) : {};
          newFileNames.forEach(function (filename) {
            updatedMessages[filename] = checkInMessage;
          });
          _context35.n = 3;
          return (0, _database.updateProject)(projectId, {
            files: updatedFiles,
            checkInMessages: updatedMessages,
            checkedOutBy: null,
            status: "In",
            version: version
          });
        case 3:
          if (!(project.checkedOutBy && /^[a-f\d]{24}$/i.test(project.checkedOutBy))) {
            _context35.n = 4;
            break;
          }
          _context35.n = 4;
          return (0, _database.updateUser)(project.checkedOutBy, {
            $pull: {
              checkedOut: projectId.toString()
            }
          });
        case 4:
          _context35.n = 5;
          return (0, _database.getProjectById)(projectId);
        case 5:
          updatedProject = _context35.v;
          _context35.n = 6;
          return (0, _database.addActivity)(username, projectId, project.projectName, "checked in", checkInMessage);
        case 6:
          res.json({
            success: true,
            project: updatedProject
          });
          _context35.n = 8;
          break;
        case 7:
          _context35.p = 7;
          _t34 = _context35.v;
          console.error(_t34);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 8:
          return _context35.a(2);
      }
    }, _callee35, null, [[1, 7]]);
  }));
  return function (_x71, _x72) {
    return _ref35.apply(this, arguments);
  };
}());
app["delete"]('/api/project/:projectId', /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(req, res) {
    var projectId, result, _t35;
    return _regenerator().w(function (_context36) {
      while (1) switch (_context36.p = _context36.n) {
        case 0:
          projectId = req.params.projectId;
          _context36.p = 1;
          _context36.n = 2;
          return (0, _database.deleteProject)(projectId);
        case 2:
          result = _context36.v;
          res.json({
            success: true,
            message: "Project deleted successfully.",
            result: result
          });
          _context36.n = 4;
          break;
        case 3:
          _context36.p = 3;
          _t35 = _context36.v;
          console.error("Error deleting project:", _t35);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 4:
          return _context36.a(2);
      }
    }, _callee36, null, [[1, 3]]);
  }));
  return function (_x73, _x74) {
    return _ref36.apply(this, arguments);
  };
}());
app["delete"]('/api/project/:projectId/member', /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(req, res) {
    var projectId, memberUsername, result, updatedProject, _t36;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.p = _context37.n) {
        case 0:
          projectId = req.params.projectId;
          memberUsername = req.body.memberUsername;
          _context37.p = 1;
          _context37.n = 2;
          return (0, _database.removeProjectMember)(projectId, memberUsername);
        case 2:
          result = _context37.v;
          if (result.success) {
            _context37.n = 3;
            break;
          }
          return _context37.a(2, res.status(400).json(result));
        case 3:
          _context37.n = 4;
          return (0, _database.getProjectById)(projectId);
        case 4:
          updatedProject = _context37.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context37.n = 6;
          break;
        case 5:
          _context37.p = 5;
          _t36 = _context37.v;
          console.error("Error deleting member:", _t36);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context37.a(2);
      }
    }, _callee37, null, [[1, 5]]);
  }));
  return function (_x75, _x76) {
    return _ref37.apply(this, arguments);
  };
}());
app["delete"]('/api/profile/:userId', /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(req, res) {
    var userId, result, _t37;
    return _regenerator().w(function (_context38) {
      while (1) switch (_context38.p = _context38.n) {
        case 0:
          userId = req.params.userId;
          _context38.p = 1;
          _context38.n = 2;
          return (0, _database.deleteUser)(userId);
        case 2:
          result = _context38.v;
          if (result.success) {
            _context38.n = 3;
            break;
          }
          return _context38.a(2, res.status(404).json(result));
        case 3:
          res.json(result);
          _context38.n = 5;
          break;
        case 4:
          _context38.p = 4;
          _t37 = _context38.v;
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 5:
          return _context38.a(2);
      }
    }, _callee38, null, [[1, 4]]);
  }));
  return function (_x77, _x78) {
    return _ref38.apply(this, arguments);
  };
}());

// app.get('/{*any}', (req, res) => res.sendFile(path.resolve('frontend', 'public', 'index.html')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve('frontend', 'public', 'index.html'));
// });

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.resolve('frontend', 'public', 'index.html'));
// });

app.get("/*", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../frontend/public", "index.html"));
});
app.listen(port, function () {
  console.log("Listening on http://localhost:".concat(port));
});
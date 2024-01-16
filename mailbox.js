"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailbox = void 0;
var axios_1 = require("axios");
var Mailbox = /** @class */ (function () {
    function Mailbox() {
        this.token = '';
        this.expire_at = 0;
        this.api = axios_1.default.create({
            baseURL: Mailbox.baseURL,
        });
        this.api.defaults.headers.post['Content-Type'] = 'application/json';
        //TODO auto refresh
        this.api.interceptors.response.use(function (response) { return response; }, function (err) {
            if (err.response.status >= 500) {
                return Promise.reject(err);
            }
            return Promise.reject({
                code: err.response.data.code,
                message: err.response.data.message,
            });
        });
    }
    Object.defineProperty(Mailbox, "instance", {
        get: function () {
            if (!Mailbox._instance) {
                Mailbox._instance = new Mailbox();
            }
            return Mailbox._instance;
        },
        enumerable: false,
        configurable: true
    });
    Mailbox.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/health")];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.status === 200];
                }
            });
        });
    };
    Mailbox.prototype.getToken = function () {
        return this.token;
    };
    Mailbox.prototype.accountExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/api/v1/setup/account/exist")];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.exist];
                }
            });
        });
    };
    Mailbox.prototype.setPass = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/setup/account/setpass", {
                            password: password,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.success];
                }
            });
        });
    };
    Mailbox.prototype.smtpStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/api/v1/service/smtp/status")];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.status];
                }
            });
        });
    };
    Mailbox.prototype.smtpStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/api/v1/service/smtp/start")];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.status === "started"];
                }
            });
        });
    };
    Mailbox.prototype.smtpStop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/api/v1/service/smtp/stop")];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.status === "stopped"];
                }
            });
        });
    };
    Mailbox.prototype.signIn = function (address, password) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/auth/signin", {
                            email: address,
                            password: password,
                        })];
                    case 1:
                        rs = _a.sent();
                        this.expire_at = rs.data.expire_at;
                        this.token = rs.data.token;
                        this.api.defaults.headers.common['Authorization'] = rs.data.token;
                        console.log("token => ", this.token);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Mailbox.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/auth/refresh", {
                            token: this.token,
                        })];
                    case 1:
                        rs = _a.sent();
                        this.expire_at = rs.data.expire_at;
                        this.token = rs.data.token;
                        this.api.defaults.headers.common['Authorization'] = rs.data.token;
                        console.log("refresh => ", this.token);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Mailbox.prototype.aliases = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/alias/list", {
                            address: address
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.aliases];
                }
            });
        });
    };
    Mailbox.prototype.aliasCreate = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/alias/create", {
                            address: address
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.aliases];
                }
            });
        });
    };
    Mailbox.prototype.aliasRemove = function (address, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/alias/remove", {
                            address: address,
                            force: force,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.aliases];
                }
            });
        });
    };
    Mailbox.prototype.aliasInfo = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get("/api/v1/mailbox/alias/".concat(address))];
            });
        });
    };
    Mailbox.prototype.aliasFolders = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/alias/folders", {
                            address: address
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.folders];
                }
            });
        });
    };
    Mailbox.prototype.folderList = function (categories, regex) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/list", {
                            categories: categories,
                            regex: regex,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.folders];
                }
            });
        });
    };
    Mailbox.prototype.folderInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get("/api/v1/mailbox/folder/".concat(id))];
            });
        });
    };
    Mailbox.prototype.folderClean = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/clean", {
                            id: id,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.folderCreate = function (name, path) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/create", {
                            name: name,
                            path: path,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.folderRemove = function (id, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/remove", {
                            id: id,
                            force: force,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.folderRename = function (id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/rename", {
                            id: id,
                            name: name,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.folderRepath = function (id, path) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/repath", {
                            id: id,
                            repath: path,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.folderMessages = function (folderId, offset, limit, flags, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/messages", {
                            folder_id: folderId,
                            offset: offset,
                            limit: limit,
                            flags: flags,
                            fields: fields,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data];
                }
            });
        });
    };
    Mailbox.prototype.folderThreads = function (folderId, offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/folder/messages", {
                            folder_id: folderId,
                            offset: offset,
                            limit: limit,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data];
                }
            });
        });
    };
    Mailbox.prototype.flagSet = function (uid, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/flag/set", {
                            uid: uid,
                            flags: flags,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.flagAppend = function (uid, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/flag/append", {
                            uid: uid,
                            flags: flags,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.flagRemove = function (uid, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/flag/remove", {
                            uid: uid,
                            flags: flags,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.MessageInfo = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get("/api/v1/mailbox/message/".concat(uid))];
            });
        });
    };
    Mailbox.prototype.MessageSection = function (uid, section) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get("/api/v1/mailbox/message/".concat(uid, "/").concat(section))];
            });
        });
    };
    Mailbox.prototype.MessageRemove = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/message/remove", {
                            uid: uid,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.MessageMove = function (uid, folder_id) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/message/move", {
                            uid: uid,
                            folder_id: folder_id,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    Mailbox.prototype.MessageSend = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/message/send", {
                            uid: uid,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data.effected];
                }
            });
        });
    };
    //TODO
    Mailbox.prototype.MessageAppend = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            });
        });
    };
    Mailbox.prototype.threadMessages = function (folderId, offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.post("/api/v1/mailbox/thread/messages", {
                            folder_id: folderId,
                            offset: offset,
                            limit: limit,
                        })];
                    case 1:
                        rs = _a.sent();
                        return [2 /*return*/, rs.data];
                }
            });
        });
    };
    return Mailbox;
}());
exports.Mailbox = Mailbox;

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
var globals_1 = require("@jest/globals");
var _1 = require(".");
beforeAll(function () {
    console.log("beforeAll");
    _1.Mailbox.baseURL = "http://localhost:8080";
});
afterAll(function () {
    console.log("afterAll");
});
(0, globals_1.test)('health', function () {
    (0, globals_1.expect)(_1.Mailbox.instance.health()).resolves.toBe(true);
});
(0, globals_1.test)('set pass', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs1, rs2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.accountExist()];
            case 1:
                rs1 = _a.sent();
                if (!(rs1.exist === false)) return [3 /*break*/, 3];
                return [4 /*yield*/, _1.Mailbox.instance.setPass("hello789122")];
            case 2:
                rs2 = _a.sent();
                (0, globals_1.expect)(rs2).toBe(true);
                return [3 /*break*/, 4];
            case 3:
                (0, globals_1.expect)(rs1.exist).toBe(true);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('dns settings', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.dnsrecords()];
            case 1:
                rs = _a.sent();
                (0, globals_1.expect)(rs.a_records.length).toBeGreaterThanOrEqual(1);
                (0, globals_1.expect)(rs.mx_records.length).toBeGreaterThanOrEqual(1);
                (0, globals_1.expect)(rs.txt_records.length).toBeGreaterThanOrEqual(1);
                return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('sign in', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs, tk;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.signIn("i@example.com", "hello789122")];
            case 1:
                rs = _a.sent();
                (0, globals_1.expect)(rs).toBe(true);
                tk = _1.Mailbox.instance.getToken();
                (0, globals_1.expect)(tk).not.toBeNull();
                return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('refresh', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.refresh()];
            case 1:
                rs = _a.sent();
                (0, globals_1.expect)(rs).not.toBeNull();
                return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('smtp ctrl', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs, rs1, rs2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.smtpStatus()];
            case 1:
                rs = _a.sent();
                if (!(rs === "started")) return [3 /*break*/, 3];
                return [4 /*yield*/, _1.Mailbox.instance.smtpStop()];
            case 2:
                rs1 = _a.sent();
                (0, globals_1.expect)(rs1).toBe(true);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, _1.Mailbox.instance.smtpStart()];
            case 4:
                rs2 = _a.sent();
                (0, globals_1.expect)(rs2).toBe(true);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('folder list', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.folderList([], "*")];
            case 1:
                rs = _a.sent();
                (0, globals_1.expect)(rs.length).toBeGreaterThanOrEqual(5);
                return [2 /*return*/];
        }
    });
}); });
(0, globals_1.test)('folder tree', function () { return __awaiter(void 0, void 0, void 0, function () {
    var rs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.Mailbox.instance.folderTree()];
            case 1:
                rs = _a.sent();
                (0, globals_1.expect)(rs.length).toBeGreaterThanOrEqual(5);
                return [2 /*return*/];
        }
    });
}); });

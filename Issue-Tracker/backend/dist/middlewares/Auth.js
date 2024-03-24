"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const verifyToken = (req, res, next) => {
    var _a, _b;
    // console.log(req.body);
    const token = (_b = (_a = req.header) === null || _a === void 0 ? void 0 : _a.call(req, 'Authorization')) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    try {
        if (!token) {
            throw new ApiError_1.default(401, "Unauthorized: Token missing");
        }
        //  console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            throw new ApiError_1.default(401, "Unauthorized");
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
        return;
    }
};
exports.default = verifyToken;

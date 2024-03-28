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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const User_1 = require("../models/User");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const AsyncHandler_1 = __importDefault(require("../utils/AsyncHandler"));
const random_avatar_generator_1 = require("random-avatar-generator");
exports.Register = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        throw new ApiError_1.default(400, "Please provide all required fields");
    }
    try {
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            throw new ApiError_1.default(400, "User already exists");
        }
        ;
        const avatarGenerator = new random_avatar_generator_1.AvatarGenerator();
        const avatar = avatarGenerator.generateRandomAvatar();
        const user = yield User_1.User.create({ userName, email, password, avatar });
        yield user.save();
        return new ApiResponse_1.default(201, user, "User registered successfully");
    }
    catch (error) {
        throw new ApiError_1.default(400, "User already exists");
    }
}));

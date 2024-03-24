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
exports.DeleteUser = exports.UpdateUser = exports.GetUsers = exports.LoginUser = exports.RegisterUser = void 0;
const User_model_1 = require("../models/User.model");
const AsyncHandler_1 = __importDefault(require("../utils/AsyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const random_avatar_generator_1 = require("random-avatar-generator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError_1.default(400, "Please provide all required fields");
    }
    const userExists = yield User_model_1.User.findOne({ email });
    if (userExists) {
        throw new ApiError_1.default(400, "User already exists");
    }
    const findByName = yield User_model_1.User.findOne({ name });
    if (findByName) {
        throw new ApiError_1.default(400, "Select Another UserName");
    }
    try {
        const generator = new random_avatar_generator_1.AvatarGenerator();
        const user = yield User_model_1.User.create({
            name,
            email,
            password,
            avatar: generator.generateRandomAvatar('avatar')
        });
        yield user.save();
        return res.status(201).json(new ApiResponse_1.default(201, user));
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
}));
exports.RegisterUser = RegisterUser;
const LoginUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.default(400, "Please provide all required fields");
    }
    try {
        const user = yield User_model_1.User.findOne({ email });
        if (!user) {
            throw new ApiError_1.default(400, "User not found");
        }
        const isPasswordCorrect = yield user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError_1.default(400, "Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        const loggedInUser = yield User_model_1.User.findById(user._id).select('-password');
        return res.json(new ApiResponse_1.default(200, { loggedInUser, token }));
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
}));
exports.LoginUser = LoginUser;
const GetUsers = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_model_1.User.find();
        // console.log(users);
        return res.json(new ApiResponse_1.default(200, users));
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
}));
exports.GetUsers = GetUsers;
const UpdateUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const validUser = yield User_model_1.User.findById(req.params.id).select('-password');
        return res.json(new ApiResponse_1.default(200, validUser));
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
}));
exports.UpdateUser = UpdateUser;
const DeleteUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.User.findByIdAndDelete(req.params.id);
        return res.json(new ApiResponse_1.default(200, user));
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
}));
exports.DeleteUser = DeleteUser;

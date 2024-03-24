"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../controllers/User");
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', User_1.RegisterUser);
router.post('/signin', User_1.LoginUser);
router.use(Auth_1.default);
router.get('/users', User_1.GetUsers);
router.delete('/user/:id', User_1.DeleteUser);
router.put('/user/:id', User_1.UpdateUser);
exports.default = router;

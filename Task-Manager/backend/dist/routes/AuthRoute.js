"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const router = express_1.default.Router();
router.post('/register', Auth_1.Register);
router.post('/login', Auth_1.Login);
exports.default = router;

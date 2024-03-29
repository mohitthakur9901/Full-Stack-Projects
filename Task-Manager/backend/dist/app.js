"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const User_1 = __importDefault(require("./routes/User"));
const TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express_1.default.static("public"));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/user', User_1.default);
app.use('/api/auth', AuthRoute_1.default);
app.use('/api/task', TaskRoute_1.default);

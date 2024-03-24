"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
dotenv_1.default.config({
    path: "./.env"
});
(0, db_1.default)().then(() => {
    app_1.app.listen(process.env.PORT || 3000, () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
    app_1.app.on("error", (err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

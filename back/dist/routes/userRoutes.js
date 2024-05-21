"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const userRoutes = (0, express_1.default)();
userRoutes.get("/", userControllers_1.default.getUsers);
userRoutes.get("/:id", userControllers_1.default.getUserById);
userRoutes.post("/register", userControllers_1.default.postRegister);
userRoutes.post("/login", userControllers_1.default.postLogin);
exports.default = userRoutes;

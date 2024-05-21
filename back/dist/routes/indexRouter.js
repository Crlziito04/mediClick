"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
const appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
const indexRouter = (0, express_1.default)();
indexRouter.use("/users", userRoutes_1.default);
indexRouter.use("/appointments", appointmentsRouter_1.default);
indexRouter.use("/appointment", appointmentRouter_1.default);
exports.default = indexRouter;

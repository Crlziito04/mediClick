"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_1 = __importDefault(require("../controllers/appointmentController"));
const appointmentRouter = (0, express_1.default)();
appointmentRouter.get("/", appointmentController_1.default.getAppointment);
appointmentRouter.post("/schedule", appointmentController_1.default.postSchedule);
appointmentRouter.put("/cancel", appointmentController_1.default.cancelAppointment);
exports.default = appointmentRouter;

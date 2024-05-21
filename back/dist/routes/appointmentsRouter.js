"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentsController_1 = __importDefault(require("../controllers/appointmentsController"));
const appointmentsRouter = (0, express_1.default)();
appointmentsRouter.get("/", appointmentsController_1.default.getAppointments);
exports.default = appointmentsRouter;

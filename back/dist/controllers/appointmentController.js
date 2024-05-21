"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentController = {
    getAppointment: (req, res) => {
        res.json({ message: "Turno elegido" });
    },
    postSchedule: (req, res) => {
        res.json({ message: "Agrega Turno nuevo" });
    },
    cancelAppointment: (req, res) => {
        res.json({ message: "Cancela Turno" });
    },
};
exports.default = appointmentController;

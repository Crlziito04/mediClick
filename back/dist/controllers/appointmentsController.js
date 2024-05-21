"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentsController = {
    getAppointments: (req, res) => {
        res.json({ message: "Lista de turnos" });
    },
};
exports.default = appointmentsController;

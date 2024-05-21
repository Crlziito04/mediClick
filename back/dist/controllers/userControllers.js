"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = {
    getUsers: (req, res) => {
        res.json({ message: "Todos los usuarios" });
    },
    getUserById: (req, res) => {
        const userId = req.params.id;
        res.json({ message: `Tienes el usuario elegido ${userId}` });
    },
    postRegister: (req, res) => {
        res.json({ message: "registro" });
    },
    postLogin: (req, res) => {
        res.json({ message: "user login" });
    },
};
exports.default = userController;

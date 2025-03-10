"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express = require("express");
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const app = express();
app.use((0, morgan_1.default)("dev"));
app.use(express.json());
app.use(indexRouter_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchuser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req["user"] = data.user;
        next();
    }
    catch (error) {
        res.status(models_1.ServerStatusCode.UNAUTHORIZED).send({ error: "Please authenticate using a valid token" });
    }
};
exports.fetchuser = fetchuser;
//# sourceMappingURL=fetchUser.js.map
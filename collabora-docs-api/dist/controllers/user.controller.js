"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getMe = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const userDto = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const secPass = yield bcryptjs_1.default.hash(userDto.password, salt);
    const user = yield prismaClient.user.create({
        data: Object.assign(Object.assign({}, userDto), { password: secPass })
    });
    const payload = {
        user: {
            id: user.id
        }
    };
    const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
    return {
        accessToken: token,
        user: user
    };
});
exports.getMe = getMe;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaClient = new client_1.PrismaClient();
        const userId = req.user.id;
        const user = yield prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
        return {
            accessToken: token,
            user: user
        };
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map
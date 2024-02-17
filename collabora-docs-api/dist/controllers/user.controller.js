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
exports.getUser = exports.loginUser = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const types_1 = require("../types");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.body;
    const prevUser = yield prisma_service_1.default.user.findUnique({
        where: {
            email: userDto.email,
        },
    });
    if (prevUser) {
        return res.json({
            data: null,
            message: "User already exist",
            status: types_1.ServerStatusCode.BAD_REQUEST,
        });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const secPass = yield bcryptjs_1.default.hash(userDto.password, salt);
    const user = yield prisma_service_1.default.user.create({
        data: Object.assign(Object.assign({}, userDto), { password: secPass }),
    });
    const payload = {
        user: {
            id: user.id,
        },
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
    return res.json({
        data: {
            accessToken: token,
            user: user,
        },
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.register = register;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield prisma_service_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
        return res.json({
            data: {
                accessToken: token,
                user: user,
            },
            status: types_1.ServerStatusCode.SUCCESS,
        });
    }
    catch (error) {
        console.error(error.message);
        return res.json({
            data: {},
            status: types_1.ServerStatusCode.SUCCESS,
        });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    return res.json({
        data: user,
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.getUser = getUser;
//# sourceMappingURL=user.controller.js.map
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
exports.getUserByAccessToken = exports.getUserById = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_service_1.default.user.findFirst({
        where: {
            id: id,
        },
    });
    return user;
});
exports.getUserById = getUserById;
const getUserByAccessToken = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET_KEY);
    const userId = parseInt(data.user.id);
    const user = yield prisma_service_1.default.user.findFirst({ where: { id: userId } });
    return user;
});
exports.getUserByAccessToken = getUserByAccessToken;
//# sourceMappingURL=user.js.map
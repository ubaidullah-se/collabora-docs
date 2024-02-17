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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCollboartor = void 0;
const client_1 = require("@prisma/client");
const resolveCollboartor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const collaborator = yield prismaClient.collaborator.findFirst({
        where: {
            id: id,
        },
        include: {
            user: true,
        },
    });
    if (collaborator.permission == client_1.Permission.EDIT) {
        return collaborator.user;
    }
    else {
        return null;
    }
});
exports.resolveCollboartor = resolveCollboartor;
//# sourceMappingURL=collaborator.js.map
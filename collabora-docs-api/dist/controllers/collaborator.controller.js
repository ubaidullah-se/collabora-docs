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
exports.deleteCollaborator = exports.getAllCollaborators = exports.createCollaborator = void 0;
const types_1 = require("../types");
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const createCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const collaborator = yield prisma_service_1.default.collaborator.create({
        data: data,
    });
    return collaborator;
});
exports.createCollaborator = createCollaborator;
const getAllCollaborators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documentId = req.query.documentId;
    if (!documentId) {
        return {
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const getAllDocuments = yield prisma_service_1.default.collaborator.findMany({
        where: {
            documentId: parseInt(documentId),
        },
    });
    return res.json({
        allDocuments: getAllDocuments,
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllCollaborators = getAllCollaborators;
const deleteCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collaboratorId = req.params.id;
    if (!collaboratorId) {
        return res.json({
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
            message: "CollaboratorId is note provided",
        });
    }
    yield prisma_service_1.default.collaborator.delete({
        where: {
            id: parseInt(collaboratorId),
        },
    });
    return res.json({
        data: null,
        message: "Deleted Successfully",
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteCollaborator = deleteCollaborator;
//# sourceMappingURL=collaborator.controller.js.map
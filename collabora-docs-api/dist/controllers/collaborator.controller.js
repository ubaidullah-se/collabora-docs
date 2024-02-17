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
exports.deleteCollaborator = exports.getAllCollaborators = exports.getDocument = exports.createCollaborator = void 0;
const client_1 = require("@prisma/client");
const models_1 = require("../models");
const createCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const prismaClient = new client_1.PrismaClient();
    const collaborator = yield prismaClient.collaborator.create({
        data: data,
    });
    return collaborator;
});
exports.createCollaborator = createCollaborator;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const documentId = req.params.id;
    if (!documentId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const collaborator = yield prismaClient.collaborator.findFirst();
    return res.json({
        data: {
            document: collaborator,
            status: models_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getDocument = getDocument;
const getAllCollaborators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const documentId = req.params.documentId;
    if (!documentId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const getAllDocuments = prismaClient.collaborator.findMany({
        where: {
            documentId: parseInt(documentId)
        }
    });
    return res.json({
        allDocuments: getAllDocuments,
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllCollaborators = getAllCollaborators;
const deleteCollaborator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const collaboratorId = req.params.id;
    if (!collaboratorId) {
        return res.json({
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
            message: "CollaboratorId is note provided",
        });
    }
    const deltedCollaborator = yield prismaClient.collaborator.delete({
        where: {
            id: parseInt(collaboratorId),
        },
    });
    res.json({
        data: null,
        message: "Deleted Successfully",
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteCollaborator = deleteCollaborator;
//# sourceMappingURL=collaborator.controller.js.map
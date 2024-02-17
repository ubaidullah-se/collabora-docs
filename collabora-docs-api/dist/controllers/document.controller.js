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
exports.updateDocument = exports.deleteDocument = exports.getAllDocuments = exports.getLatestDocument = exports.getDocument = exports.createDocument = void 0;
const client_1 = require("@prisma/client");
const models_1 = require("../models");
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const prismaClient = new client_1.PrismaClient();
    const document = yield prismaClient.document.create({
        data: data,
    });
    return res.json({
        data: document,
        status: models_1.ServerStatusCode.SUCCESS
    });
});
exports.createDocument = createDocument;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const documentId = req.params.id;
    if (!documentId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const document = yield prismaClient.document.findFirst();
    return res.json({
        data: {
            document: document,
            status: models_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getDocument = getDocument;
const getLatestDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const documentId = req.params.id;
    if (!documentId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const document = yield prismaClient.documentVersion.findFirst({
        where: {
            documentId: parseInt(documentId)
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return res.json({
        data: {
            document: document,
            status: models_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getLatestDocument = getLatestDocument;
const getAllDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const projectId = req.params.projectId;
    if (!projectId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const getAllDocuments = prismaClient.document.findMany({
        where: {
            projectId: parseInt(projectId),
        },
    });
    return res.json({
        allDocuments: getAllDocuments,
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllDocuments = getAllDocuments;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const documentId = req.params.id;
    if (!documentId) {
        return res.json({
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
            message: "DocumentId is note provided",
        });
    }
    const deltedDocument = yield prismaClient.document.delete({
        where: {
            id: parseInt(documentId),
        },
    });
    res.json({
        data: null,
        message: "Deleted Successfully",
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteDocument = deleteDocument;
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const data = req.body;
    const documentId = req.params.id;
    if (!documentId) {
        return res.json({
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
            message: "DocumentId is note provided",
        });
    }
    const updatedDocumentVersion = yield prismaClient.documentVersion.create({
        data: {
            publishedContent: data.publishedContent,
            documentId: data.documentId,
        },
        include: {
            document: true
        }
    });
    return updatedDocumentVersion;
});
exports.updateDocument = updateDocument;
//# sourceMappingURL=document.controller.js.map
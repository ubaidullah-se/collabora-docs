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
exports.updateDocument = exports.deleteDocument = exports.getAllDocuments = exports.getDocument = exports.createDocument = void 0;
const types_1 = require("../types");
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.user.id;
    const document = yield prisma_service_1.default.document.create({
        data: data,
    });
    yield prisma_service_1.default.collaborator.create({
        data: {
            permission: "EDIT",
            documentId: document.id,
            userId: userId,
        },
    });
    return res.json({
        data: document,
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.createDocument = createDocument;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documentId = req.params.id;
    if (!documentId) {
        return {
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const document = yield prisma_service_1.default.document.findFirst();
    return res.json({
        data: {
            document: document,
            status: types_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getDocument = getDocument;
const getAllDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const documentIds = (yield prisma_service_1.default.collaborator.findMany({ where: { userId: userId } })).map((item) => item.documentId);
    const getAllDocuments = yield prisma_service_1.default.document.findMany({
        where: {
            id: { in: documentIds },
        },
        include: { project: { select: { name: true } } },
    });
    return res.json({
        allDocuments: getAllDocuments,
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllDocuments = getAllDocuments;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documentId = req.params.id;
    if (!documentId) {
        return res.json({
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
            message: "DocumentId is note provided",
        });
    }
    const deltedDocument = yield prisma_service_1.default.document.delete({
        where: {
            id: parseInt(documentId),
        },
    });
    return res.json({
        data: null,
        message: "Deleted Successfully",
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteDocument = deleteDocument;
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const documentId = req.params.id;
    if (!documentId) {
        return res.json({
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
            message: "DocumentId is note provided",
        });
    }
    const updatedDocumentVersion = yield prisma_service_1.default.documentVersion.create({
        data: {
            publishedContent: data.publishedContent,
            documentId: data.documentId,
        },
        include: {
            document: true,
        },
    });
    return updatedDocumentVersion;
});
exports.updateDocument = updateDocument;
//# sourceMappingURL=document.controller.js.map
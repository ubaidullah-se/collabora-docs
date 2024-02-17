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
exports.updateUpdate = exports.deleteProject = exports.getAllProjects = exports.getProject = exports.createProject = void 0;
const client_1 = require("@prisma/client");
const models_1 = require("../models");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const prismaClient = new client_1.PrismaClient();
    const project = yield prismaClient.project.create({
        data: data,
    });
    return res.json({
        data: project,
        status: models_1.ServerStatusCode.SUCCESS
    });
});
exports.createProject = createProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const projectId = req.params.id;
    if (!projectId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const project = yield prismaClient.project.findFirst();
    return res.json({
        data: {
            project: project,
            status: models_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getProject = getProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const userId = req.params.userId;
    if (!userId) {
        return {
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const getAllProjects = prismaClient.project.findMany({
        where: {
            userId: parseInt(userId)
        },
    });
    return res.json({
        allProjects: getAllProjects,
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllProjects = getAllProjects;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const projectId = req.params.id;
    if (!projectId) {
        return res.json({
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
            message: "ProjectId is note provided",
        });
    }
    const deltedProject = yield prismaClient.project.delete({
        where: {
            id: parseInt(projectId),
        },
    });
    res.json({
        data: null,
        message: "Deleted Successfully",
        status: models_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteProject = deleteProject;
const updateUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaClient = new client_1.PrismaClient();
    const data = req.body;
    const projectId = req.params.id;
    if (!projectId) {
        return res.json({
            data: null,
            status: models_1.ServerStatusCode.BAD_REQUEST,
            message: "ProjectId is note provided",
        });
    }
    const udpatedProject = yield prismaClient.project.update({
        where: {
            id: parseInt(projectId)
        },
        data: data
    });
    return udpatedProject;
});
exports.updateUpdate = updateUpdate;
//# sourceMappingURL=project.controller.js.map
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
exports.udpateProject = exports.deleteProject = exports.getAllProjects = exports.getProject = exports.createProject = void 0;
const types_1 = require("../types");
const prisma_service_1 = __importDefault(require("../services/prisma.service"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.user.id;
    const project = yield prisma_service_1.default.project.create({
        data: Object.assign(Object.assign({}, data), { userId: userId }),
    });
    return res.json({
        data: project,
        status: types_1.ServerStatusCode,
    });
});
exports.createProject = createProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    if (!projectId) {
        return {
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
        };
    }
    const project = yield prisma_service_1.default.project.findFirst({
        where: {
            id: parseInt(projectId),
        },
        include: {
            Document: true,
        },
    });
    return res.json({
        data: {
            project: project,
            status: types_1.ServerStatusCode.SUCCESS,
        },
    });
});
exports.getProject = getProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const getAllProjects = yield prisma_service_1.default.project.findMany({
        where: {
            userId: userId,
        },
    });
    return res.json({
        allProjects: getAllProjects,
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.getAllProjects = getAllProjects;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    if (!projectId) {
        return res.json({
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
            message: "ProjectId is note provided",
        });
    }
    const deltedProject = yield prisma_service_1.default.project.delete({
        where: {
            id: parseInt(projectId),
        },
    });
    return res.json({
        data: null,
        message: "Deleted Successfully",
        status: types_1.ServerStatusCode.SUCCESS,
    });
});
exports.deleteProject = deleteProject;
const udpateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const projectId = req.params.id;
    if (!projectId) {
        return res.json({
            data: null,
            status: types_1.ServerStatusCode.BAD_REQUEST,
            message: "ProjectId is note provided",
        });
    }
    const udpatedProject = yield prisma_service_1.default.project.update({
        where: {
            id: parseInt(projectId),
        },
        data: data,
    });
    return udpatedProject;
});
exports.udpateProject = udpateProject;
//# sourceMappingURL=project.controller.js.map
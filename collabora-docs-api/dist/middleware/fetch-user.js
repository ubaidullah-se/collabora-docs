"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const types_1 = require("../types");
const user_1 = require("../helpers/user");
const fetchUser = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        return res
            .status(401)
            .send({ error: "Please authenticate using a valid token" });
    }
    try {
        const user = (0, user_1.getUserByAccessToken)(token);
        req["user"] = user;
        next();
    }
    catch (error) {
        return res
            .status(types_1.ServerStatusCode.UNAUTHORIZED)
            .send({ error: "Please authenticate using a valid token" });
    }
};
exports.fetchUser = fetchUser;
//# sourceMappingURL=fetch-user.js.map
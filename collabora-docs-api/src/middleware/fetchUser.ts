import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { ServerStatusCode } from "../models";


export const fetchuser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req["user"] = data.user;
        next();
    } catch (error) {
        res.status(ServerStatusCode.UNAUTHORIZED).send({ error: "Please authenticate using a valid token" })
    }

}
import express from "express";
const ModelRouter = express.Router();
import { body } from "express-validator";
import { aunthenticateMiddleware } from "../middleware/auth.middleware";
import { generateScript } from "../controller/ModelController";

ModelRouter.post(
    "/generateScript",
    aunthenticateMiddleware,
    generateScript
)

export default ModelRouter
import chalk from "chalk";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";

interface Request2 extends Request {
  user?: any;
}

export const generateScript = async (req: Request2, res: Response) => {
  try {
    const userID = req.user["userID"];

    const user = User.findOne({ where: { id: userID } });
    if (user) {
      return res.status(200).json({
        success: true,
        message: user,
      });
    }
  } catch (error) {
    return res.status(200).json({
        success: false,
        message: "Unauthroized !",
      });
  }
};

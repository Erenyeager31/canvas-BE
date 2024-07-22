import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Request2 extends Request {
  user?: any;
}

export const aunthenticateMiddleware = async (
  req: Request2,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req?.cookies) {
      // obtain the sessionID from the cookies
      const sessionID = req?.cookies["sessionID"];
      // verify if the sessionID is valid by using JWT and secret key
      const verify = jwt.verify(sessionID, process.env.JWT_SECRET as string);
      // attach the obtained data
      req.user = verify;

      return next();
    } else {
      return res.status(201).json({
        success: false,
        message: "Unauthroized !",
      });
    }
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Unauthroized !",
    });
  }
};

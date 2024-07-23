import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import AuthRouter from "./routes/AuthRoutes";
import sequelizeConnection from "./dbconfig";
import User from "./models/user";
import Token from "./models/token";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { cookie } from "express-validator";
import ModelRouter from "./routes/ModelRoutes";
import logger from "./middleware/logger.middleware";

const app: Express = express();
app.use(express.json());
app.use(cookieParser())
app.use(logger)

const port = process.env.PORT || 3000;

// connecting to the database
const syncDatabase = async () => {
  try {
    await sequelizeConnection.sync({ force: false, logging: false }); // Synchronize all models
    await User.sync({ force: false, logging: false }); // Synchronize the User model
    await Token.sync({ force: false, logging: false }); // Synchronize the User model
    console.log(chalk.yellowBright("Database Connected!"));
  } catch (error) {
    console.log(chalk.red(`Some error occurred: ${error}`));
    // console.log(`Some error occurred: ${error}`);
  }
};

app.use("/api/auth", AuthRouter);
app.use("/api/model", ModelRouter);

syncDatabase();

app.listen(port, () => {
  console.log(`Server on : http://localhost:${port}`);
});

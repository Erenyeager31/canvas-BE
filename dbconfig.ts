//? older implementation for a local postgresql server
// import { Dialect, Sequelize } from "sequelize";
// import { config } from "dotenv";
// config()

// const dbName = process.env.DATABASE as string;
// const dbUser = process.env.USER as string;
// const dbHost = process.env.HOST;
// const dbDriver = process.env.DB_DRIVER as "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | "db2" | "snowflake" | "oracle";
// const dbPassword = process.env.PASSWORD as string ;
// const dbport = process.env.DBPORT ? parseInt(process.env.DBPORT) : undefined;

// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   port:dbport,
//   dialect: dbDriver,
// });

// export default sequelizeConnection;

//? new implementation for clever-cloud db
import { Dialect, Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const dbURI = process.env.CLEVER_DB_URI as string;
const dbName = process.env.CLEVER_DATABASE as string;
const dbUser = process.env.CLEVER_USER as string;
const dbHost = process.env.CLEVER_HOST;
const dbDriver = process.env.CLEVER_DB_DRIVER as
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";
const dbPassword = process.env.CLEVER_PASSWORD as string;
const dbport = process.env.CLEVER_DBPORT
  ? parseInt(process.env.CLEVER_DBPORT)
  : undefined;

let sequelizeConnection: Sequelize;

if (dbURI) {
  sequelizeConnection = new Sequelize(dbURI, {
    dialect: dbDriver,
    protocol: dbDriver,
    logging: false,
  });
} else {
  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbport,
    dialect: dbDriver,
  });
}

export default sequelizeConnection;

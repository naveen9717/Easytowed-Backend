import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config()
export const db = mysql.createConnection({
  host: process.env.NODE_APP_SQL_HOST,
  user: process.env.NODE_APP_SQL_USER,
  password: process.env.NODE_APP_SQL_PSWD,
  database: process.env.NODE_APP_SQL_DB
});

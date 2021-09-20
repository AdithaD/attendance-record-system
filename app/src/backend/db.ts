import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const db = new Sequelize({
  dialectModule: sqlite3,
  dialect: "sqlite",
  storage: "db/test.db",
});

export default db;

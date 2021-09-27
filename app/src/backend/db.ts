import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

import { model as student } from "./students/student_model";

export const db = new Sequelize({
  dialectModule: sqlite3,
  dialect: "sqlite",
  storage: "db/test.db",
});

export async function initialise(): Promise<void> {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  student(db);

  await db.sync({ alter: true }).then(() => {
    console.log("db initialized");
    console.log(db.models);
  });
}

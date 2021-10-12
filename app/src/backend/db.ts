import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

import * as student from "./students/student_model";
import * as part from "@/backend/badges/part_model";
import * as topic from "@/backend/badges/topic_model";
import * as test from "@/backend/badges/test_model";

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

  student.model(db);

  part.model(db);
  topic.model(db);
  test.model(db);

  test.relations();
  topic.relations();
  part.relations();

  await db.sync({ alter: true }).then(() => {
    console.log("db initialized. priting all models");
    console.log(db.models);
  });
}

import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

import * as student from "./students/student_model";
import * as test_schedule from "@/backend/badges/test_schedule_model";
import * as badge from "./badges/badge_model";
import * as part from "./badges/part_model";
import * as topic from "./badges/topic_model";
import * as test from "./badges/test_model";
import * as studentBadge from "./students/studentBadge_model";
import * as studentParts from "./students/studentParts_model";
import * as workEvent from "./workEvent/workEvent_model";
import * as testBadge from "./badges/testBadge_model";

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
  badge.model(db);
  workEvent.model(db);

  test_schedule.model(db);
  studentBadge.model(db);
  studentParts.model(db);
  testBadge.model(db);

  test.relations();
  topic.relations();
  part.relations();
  test_schedule.relations();
  badge.relations();
  student.relations();

  await db.sync().then(() => {
    console.log("db initialized. priting all models");
    console.log(db.models);
  });
}

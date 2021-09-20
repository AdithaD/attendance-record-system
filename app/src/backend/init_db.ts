import db from "./db";
import student from "./students/student_model";
async function initialise(): Promise<void> {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  student(db);

  await db.sync({ force: true });
}

export default initialise;

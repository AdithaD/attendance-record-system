import db from "../db";

export default {
  getStudent,
};

function getStudent(id: number): void {
  console.log(db.model("Student").getTableName());
}

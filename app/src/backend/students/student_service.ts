import { Student } from "../students/student_model";

export default {
  getStudent,
};

async function getStudent(id: number): Promise<Student> {
  const student = await Student.findOne({ where: { studentId: id } });
  if (student == null) throw Error("Student not found");
  return student;
}

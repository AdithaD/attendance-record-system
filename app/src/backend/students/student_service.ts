import { Student } from "./student_model";

export async function getStudent(id: number): Promise<Student> {
  const student = await Student.findOne({ where: { studentId: id } });
  if (student == null) throw Error("Student not found");
  return student;
}

export async function createStudent(
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  notes: string | null
): Promise<Student> {
  console.log(Student.sequelize);
  console.log(firstName, lastName, dateOfBirth, notes);
  return Student.create({
    firstName,
    lastName,
    dateOfBirth,
    notes,
  });
}

export async function getAllStudents(): Promise<Student[]> {
  const students = await Student.findAll();
  return students;
}

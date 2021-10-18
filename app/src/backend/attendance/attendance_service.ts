import { Student } from "../students/student_model";
import { TestSchedule } from "../badges/test_schedule_model";

export async function getStudent(id: number): Promise<Student> {
  const student = await Student.findOne({ where: { studentId: id } });
  if (student == null) throw Error("Student not found");
  return student;
}

export async function getStudentAttendance(): Promise<void> {
  const attendance = await TestSchedule.findByPk("completed");
  if (attendance === null) {
    console.log(" Not Found");
  } else {
    console.log(attendance instanceof TestSchedule);
  }
}

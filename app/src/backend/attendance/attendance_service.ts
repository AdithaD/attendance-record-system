import dayjs from "dayjs";
import { Sequelize } from "sequelize";
import { StudentParts } from "../students/studentParts_model";
import { Student } from "../students/student_model";
import { WorkEvent } from "../workEvent/workEvent_model";

export async function getStudent(id: number): Promise<Student> {
  const student = await Student.findOne({ where: { studentId: id } });
  if (student == null) throw Error("Student not found");
  return student;
}

//export async function getStudentAttendance(): Promise<void> {
//  const attendance = await TestSchedule.findByPk("completed");
//  if (attendance === null) {
//    console.log(" Not Found");
//  } else {
//  console.log(attendance instanceof TestSchedule);
//  }
//}

export async function getStudentAttendanceByWeek(
  studentId: number
): Promise<{ date: Date; events: StudentParts[] }[]> {
  const studentAttendance = [] as { date: Date; events: StudentParts[] }[];
  const events = await WorkEvent.findAll({
    include: {
      model: StudentParts,
      where: {
        studentId: studentId,
        workEventId: Sequelize.col("WorkEvent.workEventId"),
      },
    },
  });
  events.forEach((event) => {
    const date = dayjs(event.get("date") as Date);
    const sar = studentAttendance.find((record) => {
      const rd = dayjs(record.date);
      return rd.year == date.year && rd.weekYear == date.weekYear;
    });
    if (sar) {
      sar.events.push(...(event.get("StudentParts") as StudentParts[]));
    } else {
      studentAttendance.push({
        date: date.toDate(),
        events: event.get("StudentParts") as StudentParts[],
      });
    }
  });
  return studentAttendance;
}

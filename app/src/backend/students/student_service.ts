import { Part } from "../badges/part_model";
import { WorkEvent } from "../workEvent/workEvent_model";
import { StudentParts } from "./studentParts_model";
import { Student } from "./student_model";
import { Badge } from "../badges/badge_model";
import sequelize from "sequelize";
import { TestSchedule } from "../badges/test_schedule_model";

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
  return Student.create({
    firstName,
    lastName,
    dateOfBirth,
    notes,
  });
}

export async function recordAttendance(
  parts: Part[],
  students: Student[],
  date: Date
): Promise<void> {
  const event = await WorkEvent.create({
    date,
  });

  parts.forEach(async (part) => {
    students.forEach(async (student) => {
      StudentParts.create({
        partId: part.get("partId") as number,
        studentId: student.get("studentId") as number,
        workEventId: event.get("workEventId") as number,
      });
    });
  });
}

export async function getAllStudents(): Promise<Student[]> {
  const students = await Student.findAll();
  return students;
}

//display each student with total number of badges

//findAndCountAll method for the array

export async function getBadgesForStudents(): Promise<void> {
  const bfs = await Badge.findByPk("studentId");
  if (bfs === null) {
    console.log("StudentId not found");
  } else {
    console.log(bfs instanceof Badge);
  }
}

export async function getSchedule(): Promise<void> {
  const upcomingTests = await TestSchedule.findAll({
    order: [sequelize.fn("max", sequelize.col("date")), "DESC"],
  });
  if (upcomingTests === null) {
    console.log("No upcoming Tests");
  } else {
    console.log(upcomingTests instanceof TestSchedule);
  }
}

import { StudentBadge } from "./studentBadge_model";
import { Student } from "./student_model";
import { Badge } from "../badges/badge_model";
import { Sequelize } from "sequelize/types";
import sequelize from "sequelize/types/lib/sequelize";
import { TestSchedule } from "../badges/test_schedule_model";
import { StudentBadgeCount } from "../badges/badge_service";
import { any } from "sequelize/types/lib/operators";

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

export async function getAllStudents(): Promise<Student[]> {
  const students = await Student.findAll();
  return students;
}

export async function getLeaderboard(
  studentId: number,
  diamond: number,
  platinum: number,
  lithium: number
): Promise<any> {
  const studentLeaderboard = await StudentBadge.findOne({
    where: { studentId: "studentId" },
  });
  if (studentLeaderboard === null) {
    console.log("Not found!");
  } else {
    console.log(studentLeaderboard instanceof StudentBadge);
  }
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

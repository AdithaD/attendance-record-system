import { StudentBadge } from "./studentBadge_model";
import { Student } from "./student_model";
import { Badge } from "../badges/badge_model";
import { Sequelize } from "sequelize/types";
import sequelize from "sequelize/types/lib/sequelize";
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

export async function getAllStudents(): Promise<Student[]> {
  const students = await Student.findAll();
  return students;
}

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
}

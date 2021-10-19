import TopicData from "@/store/Topic";
import { Op } from "sequelize";
import { StudentBadge } from "../students/studentBadge_model";
import { StudentTests } from "../students/studentTests_model";
import { Student } from "../students/student_model";
import { Badge } from "./badge_model";
import { Part } from "./part_model";
import { TestBadge } from "./testBadge_model";
import { Test } from "./test_model";
import { TestSchedule } from "./test_schedule_model";
import { Topic } from "./topic_model";

export async function addTest(
  name: string,
  topics: Array<TopicData>
): Promise<void> {
  console.log("adding test");
  await Test.create({ name }).then((newTest) => {
    const testId: number = newTest.get("testId") as number;
    console.log(topics);

    topics.forEach(async (topic) => {
      const newTopic = await Topic.create({
        name: topic.name,
        testId: testId,
      });
      const topicId = newTopic.get("topicId") as number;
      console.log(topic.parts);
      topic.parts.forEach((part) => {
        Part.create({
          name: part.name,
          topicId: topicId,
        });
      });
    });
  });
}

export async function addBadge(
  badgeName: string,
  type: Type,
  tier: Tier,
  notes: string | null,
  mandatoryTests: Test[],
  optionalTests: Test[]
): Promise<void> {
  const badgeType = type.toString();
  const badgeTier = tier.toString();

  const newBadge = await Badge.create({
    badgeName,
    badgeType,
    badgeTier,
    notes,
  });

  const badgeId = newBadge.get("badgeId") as number;

  mandatoryTests.forEach((test) => {
    const testId = test.get("testId") as number;
    TestBadge.create({
      badgeId,
      testId,
      isOptional: false,
    });
  });

  optionalTests.forEach((test) => {
    const testId = test.get("testId") as number;
    TestBadge.create({
      badgeId,
      testId,
      isOptional: true,
    });
  });

  updateBadgeForAllStudents(badgeId);
}

export async function updateBadgeForAllStudents(
  badgeId: number
): Promise<void> {
  Student.findAll().then((students) =>
    students.forEach((student) =>
      updateBadgeForStudent(student.get("studentId") as number, badgeId)
    )
  );
}

export async function updateBadgeForStudent(
  studentId: number,
  badgeId: number
): Promise<void> {
  if (
    !(await StudentBadge.findOne({
      where: {
        studentId,
        badgeId,
      },
    }))
  ) {
    const badge = await Badge.findByPk(badgeId, {
      include: {
        model: TestBadge,
        include: [Test],
      },
    });

    if (badge) {
      const tb = badge.get("TestBadges") as TestBadge[];

      const oTest = tb
        .filter((tb) => tb.get("isOptional") as boolean)
        .map((tb) => tb.get("Test") as Test);
      const mTest = tb
        .filter((tb) => !tb.get("isOptional") as boolean)
        .map((tb) => tb.get("Test") as Test);

      const oTestDone = (
        await StudentTests.findAndCountAll({
          where: {
            studentId,
            testId: {
              [Op.in]: oTest.map((test) => test.get("testId") as number),
            },
          },
        })
      ).count;

      const mTestDone = (
        await StudentTests.findAndCountAll({
          where: {
            studentId,
            testId: {
              [Op.in]: mTest.map((test) => test.get("testId") as number),
            },
          },
        })
      ).count;

      console.log(studentId);
      console.log(`oTestDone   ${oTestDone} and oTest.length ${oTest.length}`);
      console.log(`mTestDone ${mTestDone} and mTest.length ${mTest.length}`);

      if (oTestDone >= oTest.length && mTestDone == mTest.length)
        StudentBadge.create({
          studentId,
          badgeId,
        });
    } else {
      throw Error("PK not found");
    }
  }
}

export async function completeTest(
  studentId: number,
  testId: number,
  schedID: number | null
): Promise<void> {
  // Add record
  StudentTests.create({
    testId,
    studentId,
  });

  // Update schedule to completed
  if (schedID)
    (await TestSchedule.findByPk(schedID))?.update({ completed: true });

  // Update badge completion
  (
    await TestBadge.findAll({
      where: {
        testId,
      },
      attributes: ["badgeId"],
    })
  ) // get badge ids
    .forEach((tb) =>
      updateBadgeForStudent(studentId, tb.get("badgeId") as number)
    ); //
}

export async function updateBadges(): Promise<void> {
  const students = await Student.findAll({
    include: StudentBadge,
  });

  await students.forEach(async (student) => {
    const bIds = (student.get("StudentBadges") as StudentBadge[]).map(
      (sb) => sb.get("badgeId") as number
    );

    const badgesToCheck = await Badge.findAll({
      where: {
        badgeId: {
          [Op.notIn]: bIds,
        },
      },
    });

    badgesToCheck.forEach((badge) => {
      updateBadgeForStudent(
        student.get("studentId") as number,
        badge.get("badgeId") as number
      );
    });
  });
}

export enum Type {
  A,
  S,
  C,
}

export enum Tier {
  Diamond,
  Platinum,
  Lithium,
}

// export function addBadge(
//   name: String,
//   type: Type,
//   tier: Tier,
//   mandatoryTests: Test[],
//   optionalTests: Test[]
// ) {}
export class StudentBadgeCount {
  public studentId: number;
  public diamond: number;
  public platinum: number;
  public lithium: number;
  public static readonly platinumWeightingNumber: number = 2;
  public static readonly lithiumWeightingNumber: number = 3;

  constructor(
    studentId: number,
    diamond: number,
    platinum: number,
    lithium: number
  ) {
    this.studentId = studentId;
    this.diamond = diamond;
    this.platinum = platinum;
    this.lithium = lithium;
  }
  public getValue(): number {
    return (
      this.diamond +
      this.platinum * StudentBadgeCount.platinumWeightingNumber +
      this.lithium * StudentBadgeCount.lithiumWeightingNumber
    );
  }
}
export async function getLeaderboard(): Promise<StudentBadgeCount[]> {
  const students = await Student.findAll({ include: Badge });
  const sbc = [] as StudentBadgeCount[];
  students.forEach((student) => {
    const badgeCounts = [0, 0, 0];
    const badges = student.get("Badges") as Badge[];
    badges.forEach((badge) => {
      switch (badge.get("badgeTier") as string) {
        //diamond for base value
        case Tier.Diamond.toString():
          badgeCounts[0] += 1;
          break;
        //platinum in middle value of array
        case Tier.Platinum.toString():
          badgeCounts[1] += 1;
          break;
        //lithium as top value within array
        case Tier.Lithium.toString():
          badgeCounts[2] += 1;
          break;

        default:
          break;
      }
    });
    sbc.push(
      new StudentBadgeCount(
        student.get("studentId") as number,
        badgeCounts[0],
        badgeCounts[1],
        badgeCounts[2]
      )
    );
  });
  sbc.sort((a, b) => {
    if (a.getValue() < b.getValue()) return 1;
    else {
      if (a.getValue() > b.getValue()) return -1;
      else {
        return 0;
      }
    }
  });
  return sbc;
}

//display each student with total number of badges

//findAndCountAll method for the array

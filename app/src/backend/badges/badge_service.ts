import TopicData from "@/store/Topic";
import { Op } from "sequelize";
import { StudentBadge } from "../students/studentBadge_model";
import { StudentTests } from "../students/studentTests_model";
import { Student } from "../students/student_model";
import { Badge, Tier, Type } from "./badge_model";
import { Part } from "./part_model";
import { TestBadge } from "./testBadge_model";
import { Test } from "./test_model";
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

  updateBadgesForAllStudents(badgeId);
}

export async function updateBadgesForAllStudents(badgeId: number) {
  const badge = await Badge.findByPk(badgeId, {
    include: {
      model: Test,
      through: { attributes: [] },
    },
  });

  if (badge) {
    const tests = badge.get("Tests") as Test[];
    const testPks = [] as number[];
    tests.forEach((test) => {
      testPks.push(test.get("testId") as number);
    });

    const students = await Student.findAll();

    students.forEach(async (student) => {
      const studentId = student.get("studentId") as number;
      const count = (
        await StudentTests.findAndCountAll({
          where: {
            studentId,
            testId: {
              [Op.in]: testPks,
            },
          },
        })
      ).count;

      if (count == testPks.length) {
        StudentBadge.create({
          studentId,
          badgeId,
        });
      }
    });
  } else {
    throw Error("PK not found");
  }
}

export async function updateBadgesForStudent(
  studentId: number,
  badgeId: number
): Promise<void> {
  const badge = await Badge.findByPk(badgeId, {
    include: {
      model: Test,
      through: { attributes: [] },
    },
  });

  if (badge) {
    const tests = badge.get("Tests") as Test[];
    const testPks = [] as number[];
    tests.forEach((test) => {
      testPks.push(test.get("testId") as number);
    });

    const count = (
      await StudentTests.findAndCountAll({
        where: {
          studentId,
          testId: {
            [Op.in]: testPks,
          },
        },
      })
    ).count;

    if (count == testPks.length) {
      StudentBadge.create({
        studentId,
        badgeId,
      });
    }
  } else {
    throw Error("PK not found");
  }
}

export class StudentBadgeCount {
  public studentId: number;
  public diamond: number;
  public platinum: number;
  public lithium: number;

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
    return 0;
  }
}

import TopicData from "@/store/Topic";
import { Student } from "../students/student_model";
import { Badge } from "./badge_model";
import { Part } from "./part_model";
import { Test } from "./test_model";
import { TestSchedule } from "./test_schedule_model";
import { Topic } from "./topic_model";

export async function addTest(
  name: string,
  schedule: Date | null,
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

    if (schedule)
      TestSchedule.create({ testId, date: schedule, completed: false });
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
export async function getLeaderboard(
  studentId: number,
  diamond: number,
  platinum: number,
  lithium: number
): Promise<StudentBadgeCount[]> {
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

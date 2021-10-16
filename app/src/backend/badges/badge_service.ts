import TopicData from "@/store/Topic";
import { Part } from "./part_model";
import { Test } from "./test_model";
import { Topic } from "./topic_model";

export async function addTest(
  name: string,
  schedule: Date | null,
  topics: Array<TopicData>
): Promise<void> {
  console.log("adding test");
  await Test.create({ name, date: schedule }).then((newTest) => {
    const testId: number = newTest.get("testId") as number;
    console.log(topics);

    topics.forEach(async (topic) => {
      const newTopic = await Topic.create({
        name: topic.name,
        optional: topic.isOptional,
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

import TopicData from "@/store/Topic";
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

// export enum Type {
//   A,
//   S,
//   C,
// }

// export enum Tier {
//   Diamond,
//   Platnium,
//   Lithium,
// }

// export function addBadge(
//   name: String,
//   type: Type,
//   tier: Tier,
//   mandatoryTests: Test[],
//   optionalTests: Test[]
// ) {}

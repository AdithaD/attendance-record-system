import TopicData from "@/store/Topic";
import { Part } from "./part_model";
import { Test } from "./test_model";
import { Topic } from "./topic_model";

export async function addTest(
  name: string,
  schedule: Date | null,
  topics: Array<TopicData>
) {
  const newTest = await Test.create({ name, date: schedule });

  const testId: number = (await newTest.get("testId")) as number;
  topics.forEach(async (topic) => {
    const newTopic = await Topic.create({
      name: topic.name,
      optional: topic.isOptional,
      testId: testId,
    });
    const topicId = newTopic.get("topicId") as number;
    topic.parts.forEach((part) => {
      Part.create({
        name: part.name,
        topicId: topicId,
      });
    });
  });
}

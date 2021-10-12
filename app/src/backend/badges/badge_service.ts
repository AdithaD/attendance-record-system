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

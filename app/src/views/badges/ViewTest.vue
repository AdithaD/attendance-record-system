<template>
  <div class="p-4 space-y-8 w-screen">
    <div v-if="this.test != null" class="space-y-8">
      <div class="flex justify-between items-stretch">
        <h1 class="title">
          {{ this.test.get("name") }}
        </h1>
        <div class="flex space-x-2">
          <button
            class="
              rounded
              shadow-md
              py-2
              px-4
              bg-blue-700
              text-gray-200 text-xl
              font-bold
              self-center
              transition
              transform
              hover:scale-105 hover:bg-blue-500
            "
            type="button"
            @click="edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            class="
              rounded
              shadow-md
              py-2
              px-4
              bg-red-700
              text-gray-200 text-xl
              font-bold
              self-center
              transition
              transform
              hover:scale-105 hover:bg-blue-500
            "
            type="button"
            @click="deleteTest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-gray-200 font-semibold" v-for="s in schedule" :key="s">
          Scheduled on: {{ this.formatDate(s.date) }}
        </h2>
      </div>

      <div class="rounded shadow-md overflow-y-auto">
        <h2 class="text-2xl text-gray-200 font-bold p-2">Topics</h2>
        <div
          v-for="topic in topics"
          :key="topic.get('topicId')"
          class="bg-gray-900 p-4 text-gray-200 font-semibold"
        >
          <h3>{{ topic.get("name") }}</h3>
          <div class="px-4 py-2 ml-6 mt-2 border-l border-blue-600">
            <p v-for="part in topic.Parts" :key="part.get('partId')">
              {{ part.get("name") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="title" v-else>No Student Found</h1>
  </div>
</template>

<script lang="ts">
import { Part } from "@/backend/badges/part_model";
import { Test } from "@/backend/badges/test_model";
import { Topic } from "@/backend/badges/topic_model";
import { computed, ComputedRef, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { TestSchedule } from "@/backend/badges/test_schedule_model";

export default defineComponent({
  async mounted() {
    this.test = await Test.findByPk(+this.testId);

    this.schedule = await TestSchedule.findAll({
      where: {
        testId: +this.testId,
      },
    });

    this.topics = await Topic.findAll({
      where: { testId: this.testId },
      include: Part,
    });

    console.log(this.topics);
  },
  setup() {
    const route = useRoute();
    const testId = route.params.id;

    const test = ref(null as Test | null);
    const schedule = ref([] as TestSchedule[]);
    const topics = ref([] as Topic[]);

    function formatDate(date: Date): string {
      return dayjs(date).format("DD/MM/YYYY");
    }

    return {
      testId,
      test,
      schedule,
      topics,
      formatDate,
    };
  },
});
</script>

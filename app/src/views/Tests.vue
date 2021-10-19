<template>
  <div class="p-4 space-y-12 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Tests</h1>
      <div class="space-x-4 self-center flex">
        <button
          class="
            rounded
            shadow-md
            py-2
            px-4
            bg-blue-700
            text-gray-200 text-xl
            font-bold
            h-1/4
            transition
            transform
            hover:scale-105
          "
          type="button"
          @click="$router.push({ name: 'AddTest' })"
        >
          Add Test
        </button>
      </div>
    </div>
    <div class="">
      <div
        class="
          flex
          rounded
          shadow-md
          w-full
          py-2
          px-4
          bg-gray-900
          text-gray-100
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 mr-4 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          class="bg-gray-900 w-full"
          placeholder="Quick Search.."
          v-model="searchTerms"
          v-on:keydown.enter="search"
        />
      </div>
    </div>
    <div>
      <div class="rounded shadow-md bg-gray-700 py-2 px-4 flex justify-between">
        <h2 class="text-2xl text-gray-200 font-bold self-center">Schedule</h2>
      </div>
      <div class="bg-gray-900 p-4 space-y-4">
        <p v-if="this.schedule.length <= 0" class="text-gray-400 text-center">
          Your schedule is empty!
        </p>
        <div
          v-for="schedule in this.schedule"
          :key="schedule.Test.get('testId')"
          class="flex space-x-2"
          :class="{ 'opacity-30': schedule.get('completed') }"
        >
          <p
            class="
              border border-blue-400
              text-blue-400
              p-2
              w-1/4
              font-semibold
              flex-none
              rounded
              text-center
            "
          >
            {{ getDate(schedule.get("date")) }}
          </p>
          <div
            class="
              bg-gray-700
              py-2
              text-gray-200
              font-semibold
              shadow-md
              px-2
              rounded
              transition-colors
              hover:text-white hover:bg-blue-500
              flex-grow flex
              justify-between
            "
            @click="
              router.push({
                name: 'ViewTest',
                params: { id: schedule.Test.get('testId') },
              })
            "
          >
            <p>
              {{ schedule.Test.name }}
            </p>
            <div class="flex space-x-1 px-2">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <p class="">
                {{ schedule.teacher }}
              </p>
            </div>
          </div>
          <div
            v-if="!schedule.get('completed')"
            class="hover:bg-green-500 transition-colors rounded p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 self-center text-gray-200 hover:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="
                router.push({
                  name: 'CompleteTest',
                  params: {
                    id: schedule.Test.get('testId'),
                    sched_id: schedule.get('testScheduleId'),
                  },
                })
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2
        class="
          p-4
          bg-gray-700
          rounded
          text-2xl text-gray-200
          font-bold
          self-center
        "
      >
        All Tests
      </h2>
      <div class="space-y-4 bg-gray-900 py-4 px-4">
        <div
          v-for="test in this.tests"
          :key="test.get('testId')"
          class="flex space-x-2"
          @click="
            router.push({
              name: 'ViewTest',
              params: { id: test.get('testId') },
            })
          "
        >
          <p
            class="
              bg-gray-700
              py-2
              text-gray-200
              font-semibold
              shadow-md
              px-2
              rounded
              transition-colors
              hover:text-white hover:bg-blue-500
              flex-grow
            "
          >
            {{ test.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Test } from "@/backend/badges/test_model";
import { TestSchedule } from "@/backend/badges/test_schedule_model";
import dayjs from "dayjs";
import { Op } from "sequelize";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const searchTerms = ref("");

    const schedule = ref([] as TestSchedule[]);
    const tests = ref([] as Test[]);

    function search() {
      router
        .push({
          name: "SearchResults",
          query: { type: "test", terms: searchTerms.value },
        })
        .catch((e) => e.printStackTrace());
    }

    function getDate(date: Date): string {
      return dayjs(date).format("DD/MM/YYYY");
    }

    onMounted(async function () {
      schedule.value = await TestSchedule.findAll({
        where: {
          date: {
            [Op.not]: null,
          },
        },
        include: Test,
        order: ["date"],
      });

      tests.value = await Test.findAll();
    });

    return {
      searchTerms,
      search,
      schedule,
      getDate,
      router,
      tests,
    };
  },
});
</script>

<style></style>

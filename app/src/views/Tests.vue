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
        <button
          class="
            rounded
            shadow-md
            py-2
            px-4
            bg-gray-900
            text-gray-200 text-xl
            font-bold
            transition
            transform
            hover:scale-105
          "
          type="button"
        >
          Schedule Test
        </button>
      </div>
      <div class="bg-gray-900 p-4 space-y-4">
        <div
          v-for="test in this.schedule"
          :key="test.get('testId')"
          class="flex space-x-2"
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
            {{ getDate(test.get("date")) }}
          </p>
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
import { Test } from "@/backend/parts/test_model";
import dayjs from "dayjs";
import { Op } from "sequelize";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const searchTerms = ref("");

    const schedule = ref([] as Test[]);

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
      schedule.value = await Test.findAll({
        where: {
          date: {
            [Op.not]: null,
          },
        },
        order: ["date"],
      });
    });

    return {
      searchTerms,
      search,
      schedule,
      getDate,
    };
  },
});
</script>

<style></style>

<template>
  <div class="p-4 space-y-12 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Students</h1>
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
          self-center
          transition
          transform
          hover:scale-105 hover:bg-blue-500
        "
        type="button"
        @click="$router.push({ name: 'AddStudent' })"
      >
        Add Students
      </button>
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
        <button @click="toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-blue-700"
            :class="
              isSearchOptionsOpen
                ? ['transform', 'rotate-180', 'transition-transform']
                : []
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="isSearchOptionsOpen"
        class="
          rounded-b
          shadow-md
          bg-gray-900
          py-2
          px-4
          border-t-2 border-gray-700
          text-gray-400
          space-y-2
        "
      >
        <h3 class="text-gray-400 font-bold">More Options</h3>
        <div class="flex flex-row">
          <div class="flex align-middle space-x-2">
            <h4 class="font-semibold self-center">Age:</h4>
            <input
              :value="modelValue"
              placeholder="min"
              @input="$emit('update:modelValue', $event.target.value)"
              class="
                py-2
                px-2
                rounded
                bg-gray-900
                text-gray-300
                h-8
                w-12
                border border-gray-700
                p-0
              "
            />
            <p class="self-center font-semibold text-xl">-</p>
            <input
              :value="modelValue"
              placeholder="max"
              @input="$emit('update:modelValue', $event.target.value)"
              class="
                py-2
                px-2
                rounded
                bg-gray-900
                text-gray-300
                h-8
                w-12
                border border-gray-700
                p-0
              "
            />
          </div>
        </div>
      </div>
    </div>

    <div class="rounded shadow-md h-3/5 flex flex-col">
      <h2 class="text-2xl text-gray-200 bg-gray-700 p-4 font-bold rounded">
        Top Students
      </h2>
      <div
        v-if="this.leaderboard.length > 0"
        class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll flex-grow"
      >
        <div
          @click="openProfile(sbc.student)"
          v-for="(sbc, i) in this.leaderboard"
          :key="sbc.student.getDataValue('studentId')"
          class="flex space-x-2"
        >
          <p
            class="
              border border-blue-400
              text-blue-400
              p-4
              font-semibold
              flex-none
              w-12
              text-center
              rounded
            "
          >
            {{ i + 1 }}
          </p>
          <div
            class="
              flex
              bg-gray-700
              py-4
              text-gray-200
              font-semibold
              shadow-md
              px-2
              rounded
              transition-colors
              hover:text-white hover:bg-blue-500
              flex-grow
              justify-between
            "
          >
            <p class="">
              {{ sbc.student.getDataValue("firstName") }}
              {{ sbc.student.getDataValue("lastName") }}
            </p>
            <div class="bg-gray-900 rounded px-2 space-x-2">
              <span class="animate-pulse text-yellow-300"
                >L: {{ sbc.lithium }}
              </span>
              <span class="text-blue-400">D: {{ sbc.diamond }} </span>
              <span class="text-gray-400">P: {{ sbc.platinum }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getLeaderboard,
  StudentBadgeCount,
} from "@/backend/badges/badge_service";
import { Student } from "@/backend/students/student_model";
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  components: {},
  data() {
    return {
      leaderboard: [] as StudentBadgeCount[],
      isSearchOptionsOpen: false,
      searchTerms: "",
    };
  },
  async mounted() {
    this.leaderboard = await getLeaderboard();
    console.log(this.leaderboard);
  },
  methods: {
    toggle(): void {
      this.isSearchOptionsOpen = !this.isSearchOptionsOpen;
    },
    openProfile(key: Student) {
      router.push({
        name: "StudentProfile",
        params: { id: key.getDataValue("studentId") },
      });
    },
    search() {
      router
        .push({
          name: "SearchResults",
          query: { type: "student", terms: this.searchTerms },
        })
        .catch((e) => e.printStackTrace());
    },
  },
});
</script>

<style></style>

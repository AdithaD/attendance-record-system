<template>
  <div class="p-4 space-y-12 w-screen">
    <div class="flex justify-between items-stretch">
      <h1
        class="
          rounded
          shadow-md
          py-2
          px-4
          text-4xl text-gray-200
          bg-gray-700
          font-bold
          w-max
        "
      >
        Students
      </h1>
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
        <input class="bg-gray-900 w-full" placeholder="Quick Search.." />
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
        class="bg-gray-900 py-2 px-4 border-t-2 border-gray-700"
      >
        <h3 class="text-gray-400 font-bold">More Options</h3>
      </div>
    </div>

    <div class="rounded shadow-md bg-gray-700 py-2 px-4 h-3/5 flex flex-col">
      <h2 class="text-2xl text-gray-200 font-bold mb-4">Top Students</h2>
      <div
        v-if="this.students.length > 0"
        class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll max-h-full"
      >
        <div
          @click="openProfile(i)"
          v-for="(student, i) in this.students"
          :key="student.getDataValue('studentId')"
          class="flex space-x-2"
        >
          <p
            class="
              bg-blue-500
              text-gray-200
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
          <p
            class="
              bg-gray-700
              py-4
              text-gray-200
              font-semibold
              shadow-md
              px-2
              border border-blue-500
              rounded
              transition-colors
              hover:text-white hover:border-blue-300
              flex-grow
            "
          >
            {{ student.getDataValue("firstName") }}
            {{ student.getDataValue("lastName") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Student } from "@/backend/students/student_model";
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  data() {
    return {
      students: [] as Student[],
      isSearchOptionsOpen: false,
    };
  },
  methods: {
    toggle(): void {
      this.isSearchOptionsOpen = !this.isSearchOptionsOpen;
    },
    openProfile(key: number) {
      router.push({ name: "StudentProfile", params: { id: key + 1 } });
    },
  },
  mounted(): void {
    Student.findAll()
      .then((data) => {
        this.students = data;
      })
      .then(() => {
        this.students.forEach((data) =>
          console.log(data.getDataValue("studentId"))
        );
      });
  },
});
</script>

<style></style>

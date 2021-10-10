<template>
  <div class="p-4 space-y-8 w-screen">
    <div v-if="this.student != null" class="space-y-8">
      <div class="flex justify-between items-stretch">
        <h1 class="title">
          {{ this.student.getDataValue("firstName") }}
          {{ this.student.getDataValue("lastName") }}
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
            @click="deleteStudent"
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

      <div class="bg-gray-900 p-4 text-gray-200 space-y-2">
        <h2 class="font-bold text-xl">Details</h2>
        <div class="flex space-x-4">
          <h3 class="font-semibold">DOB</h3>
          <p>{{ this.getDate() }}</p>
        </div>
        <div class="flex space-x-4">
          <h3 class="font-semibold">Notes</h3>
          <p>{{ this.student.getDataValue("notes") }}</p>
        </div>
      </div>

      <div class="rounded shadow-md bg-gray-700 py-2 px-4">
        <h2 class="text-2xl text-gray-200 font-bold">Badges</h2>
      </div>
      <div class="rounded shadow-md bg-gray-700 py-2 px-4">
        <h2 class="text-2xl text-gray-200 font-bold">Attendance</h2>
      </div>
    </div>
    <h1 class="title" v-else>No Student Found</h1>
  </div>
</template>

<script lang="ts">
import { Student } from "@/backend/students/student_model";
import router from "@/router";
import dayjs from "dayjs";
import { Vue } from "vue-class-component";

export default class StudentProfile extends Vue {
  // Class properties will be component data
  student: Student | null = null;

  mounted(): void {
    Student.findOne({
      where: { studentId: this.$route.params.id },
    }).then((data) => {
      if (data) {
        this.student = data;
      }
    });
  }
  getDate(): string {
    return dayjs(this.student?.getDataValue("dateOfBirth")).format(
      "DD/MM/YYYY"
    );
  }
  // edit(): void {
  //   if (this.student) {
  //   }
  // }
  deleteStudent(): void {
    if (this.student) {
      this.student.destroy();
      router.replace({ name: "Students" });
    }
  }
}
</script>

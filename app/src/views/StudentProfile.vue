<template>
  <div class="p-4 space-y-8 w-screen">
    <div v-if="this.student != null" class="space-y-8">
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
        {{ this.student.getDataValue("firstName") }}
        {{ this.student.getDataValue("lastName") }}
      </h1>
      <div class="bg-gray-900 p-4 text-gray-200 space-y-2">
        <h2 class="font-bold text-xl">Details</h2>
        <div class="flex space-x-4">
          <h3 class="font-semibold">DOB</h3>
          <p>{{ this.student.getDataValue("dateOfBirth") }}</p>
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
      v-else
    >
      No Student Found
    </h1>
  </div>
</template>

<script lang="ts">
import { Student } from "@/backend/students/student_model";
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
        console.log("got student");
      }
    });
  }
}
</script>

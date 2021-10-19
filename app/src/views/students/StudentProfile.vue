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

      <div class="rounded shadow-md">
        <h2
          class="text-2xl text-gray-200 font-bold bg-gray-700 py-2 px-4 rounded"
        >
          Badges
        </h2>
        <div class="bg-gray-900 p-4 rounded">
          <div
            class="text-gray-200 font-semibold flex space-x-2 select-none"
            v-for="sb in this.student.get('Badges')"
            :key="sb"
          >
            <p>
              {{ sb.get("badgeName") }}
            </p>
          </div>
          <p
            class="text-gray-400"
            v-if="this.student.get('Badges').length <= 0"
          >
            No Badges Earned
          </p>
        </div>
      </div>
      <div class="rounded shadow-md">
        <h2
          class="text-2xl text-gray-200 font-bold bg-gray-700 py-2 px-4 rounded"
        >
          Activity
        </h2>
        <div class="bg-gray-900 p-4 rounded">
          <div
            class="text-gray-200 font-semibold flex space-x-2 select-none"
            v-for="event in this.activity"
            :key="event"
          >
            <div class="text-blue-500 w-32">
              {{ printDate(event.date) }}
            </div>
            <p>{{ event.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="title" v-else>No Student Found</h1>
  </div>
</template>

<script lang="ts">
import { getStudentAttendanceByWeek } from "@/backend/attendance/attendance_service";
import { Badge } from "@/backend/badges/badge_model";
import { Part } from "@/backend/badges/part_model";
import { Test } from "@/backend/badges/test_model";
import { StudentBadge } from "@/backend/students/studentBadge_model";
import { StudentParts } from "@/backend/students/studentParts_model";
import { StudentTests } from "@/backend/students/studentTests_model";
import { Student } from "@/backend/students/student_model";
import { WorkEvent } from "@/backend/workEvent/workEvent_model";
import router from "@/router";
import dayjs from "dayjs";
import { Sequelize } from "sequelize";
import { Vue } from "vue-class-component";

export default class StudentProfile extends Vue {
  // Class properties will be component data
  student: Student | null = null;
  activity: { date: Date; message: string }[] = [];

  async mounted(): Promise<void> {
    await Student.findOne({
      where: { studentId: this.$route.params.id },
      include: [
        {
          model: Badge,
        },
        {
          model: StudentParts,
        },
        {
          model: Test,
        },
      ],
    }).then((data) => {
      if (data) {
        this.student = data;
        console.log(this.student);

        (data.get("Tests") as Test[]).forEach((test) => {
          let message = "Completed ";
          message = message.concat(test.get("name") as string, "");

          this.activity.push({
            date: (test.get("StudentTests") as StudentTests).get(
              "createdAt"
            ) as Date,
            message,
          });
        });

        // <div
        //     class="text-gray-200 font-semibold flex space-x-2 select-none"
        //     v-for="sb in this.student.get('Badges')"
        //     :key="sb"
        //   >
        //     <div class="text-blue-500 w-32">
        //       {{ getDate(sb.get("StudentBadge").get("createdAt")) }}
        //     </div>
        //     <p>
        //       {{ sb.get("badgeName") }}
        //     </p>
        //   </div>
        //   <p
        //     class="text-gray-400"
        //     v-if="this.student.get('Badges').length <= 0"
        //   >
        //     No Badges Earned
        //   </p>
        // </div>

        (data.get("Badges") as Badge[]).forEach((badge) => {
          let message = "Earned badge ";
          message = message.concat(badge.get("badgeName") as string, "");

          this.activity.push({
            date: (badge.get("StudentBadge") as StudentBadge).get(
              "createdAt"
            ) as Date,
            message,
          });
        });
      }
    });

    WorkEvent.findAll({
      include: {
        model: StudentParts,
        include: [
          {
            model: Part,
          },
        ],
        where: {
          studentId: this.$route.params.id,
          workEventId: Sequelize.col("WorkEvent.workEventId"),
        },
      },
    }).then((events) => {
      events.forEach((event) => {
        // <div class="text-blue-500 w-32">
        //       {{ getDate(event.get("date")) }}
        //     </div>
        //     <span>Completed parts: </span>
        //     <p v-for="sp in event.get('StudentParts')" :key="sp">
        //       {{ sp.get("Part").get("name") }}
        //     </p>

        let message = "Completed parts: ";

        (event.get("StudentParts") as StudentParts[]).forEach((sp) => {
          message = message.concat(
            (sp.get("Part") as Part).get("name") as string,
            " "
          );
        });

        console.log(message);
        console.log(event.get("date"));

        this.activity.push({
          date: event.get("date") as Date,
          message,
        });
      });
    });

    console.log(this.activity);

    this.activity.sort((a, b) => {
      const aDate = dayjs(a.date);
      const bDate = dayjs(b.date);

      if (aDate.isAfter(bDate)) return -1;
      else {
        if (aDate.isBefore(bDate)) return 1;
        else return 0;
      }
    });
  }

  printDate(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY");
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

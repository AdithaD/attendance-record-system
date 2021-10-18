<template>
  <div class="p-4 space-y-8 w-full">
    <h1 class="title">Dashboard</h1>
    <div class="rounded shadow-md space-y-2">
      <h2
        class="text-2xl text-gray-200 font-bold py-2 px-4 rounded bg-gray-700"
      >
        New Badges
      </h2>
      <div class="bg-gray-900 p-4 rounded">
        <div
          class="text-gray-200 font-semibold flex space-x-2 select-none"
          v-for="sb in newBadges"
          :key="sb"
        >
          <div class="text-blue-500 w-32">{{ getDate(sb) }}</div>
          <p>
            {{ sb.Badge.get("badgeName") }} {{ sb.Student.get("firstName") }}
            {{ sb.Student.get("lastName") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Badge } from "@/backend/badges/badge_model";
import { StudentBadge } from "@/backend/students/studentBadge_model";
import { Student } from "@/backend/students/student_model";
import dayjs from "dayjs";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const newBadges = ref([] as StudentBadge[]);

    onMounted(async () => {
      newBadges.value = await StudentBadge.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [Student, Badge],
      });

      console.log(newBadges.value);
    });

    function getDate(sb: StudentBadge): string {
      return dayjs(sb.get("createdAt") as Date).format("h:mm a DD MMM");
    }

    return {
      newBadges,
      getDate,
    };
  },
});
</script>

<style></style>

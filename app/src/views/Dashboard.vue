<template>
  <div class="p-4 space-y-12 w-full">
    <h1 class="title">Dashboard</h1>
    <div class="rounded shadow-md bg-gray-700 py-2 px-4">
      <h2 class="text-2xl text-gray-200 font-bold">New Badges</h2>
      <div>
        <div v-for="sb in newBadges" :key="sb">
          {{ sb.Badge.get("badgeName") }} {{ sb.Student.get("name") }}
        </div>
      </div>
    </div>
    <div class="rounded shadow-md bg-gray-700 py-2 px-4">
      <h2 class="text-2xl text-gray-200 font-bold">Topics of Concern</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Badge } from "@/backend/badges/badge_model";
import { StudentBadge } from "@/backend/students/studentBadge_model";
import { Student } from "@/backend/students/student_model";
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

    return {
      newBadges,
    };
  },
});
</script>

<style></style>

<template>
  <div class="p-4 space-y-8 w-screen">
    <div v-if="this.badge != null" class="space-y-8">
      <div class="flex justify-between items-stretch">
        <h1 class="title">
          {{ this.badge.get("badgeName") }}
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
            @click="deleteBadge"
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
      <div class="rounded shadow-md overflow-y-auto">
        <h2 class="text-2xl text-gray-200 font-bold p-2 bg-gray-700">Tests</h2>
        <div class="bg-gray-900 p-4 space-y-4">
          <div
            v-for="test in this.badge.Tests"
            :key="test.get('testId')"
            class="
              p-2
              bg-gray-700
              hover:bg-blue-500
              rounded
              text-gray-200
              font-semibold
              justify-between
              flex
            "
            @click="openTest(test)"
          >
            <h3>{{ test.get("name") }}</h3>
            <p
              class="text-gray-900"
              v-if="test.get('TestBadge').get('isOptional')"
            >
              Optional
            </p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="title" v-else>No Badge Found</h1>
  </div>
</template>
<script lang="ts">
import { Badge } from "@/backend/badges/badge_model";
import { Test } from "@/backend/badges/test_model";
import { openTest } from "@/utils/utils";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const badgeId = useRoute().params.id;
    const badge = ref(null as Badge | null);

    onMounted(async () => {
      console.log(await Badge.findAll());

      console.log(badgeId);
      badge.value = await Badge.findByPk(+badgeId, {
        include: {
          model: Test,
          through: { attributes: ["isOptional"] },
        },
      });
    });

    return {
      badge,
      openTest,
    };
  },
});
</script>

<template>
  <div class="p-4 space-y-12 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Badges</h1>
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
          hover:scale-105
        "
        type="button"
        @click="$router.push({ name: 'AddBadge' })"
      >
        Add Badge
      </button>
    </div>
    <div class="">
      <h2
        class="
          text-2xl
          bg-gray-700
          text-gray-200
          font-bold
          py-2
          px-4
          rounded
          shadow-md
        "
      >
        All Badges
      </h2>
      <div class="bg-gray-900 p-4 space-y-4 rounded shadow-md">
        <div
          v-for="badge in this.badges"
          :key="badge"
          class="flex space-x-2"
          @click="openBadge(badge)"
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
            {{ badge.get("badgeName") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Badge } from "@/backend/badges/badge_model";
import { defineComponent, onMounted, ref } from "vue";
import { openBadge } from "@/utils/utils";

export default defineComponent({
  components: {},
  setup() {
    const badges = ref([] as Badge[]);

    onMounted(async function () {
      badges.value = await Badge.findAll();
    });

    return {
      badges,
      openBadge,
    };
  },
});
</script>

<style></style>

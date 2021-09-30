<template>
  <div class="p-4 space-y-8 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Topic Library</h1>
      <button class="large-button" type="button">Add Topic</button>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Topics extends Vue {
  searchTerms = "";
}
</script>

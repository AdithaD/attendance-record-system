<template>
  <div class="p-4 space-y-8 w-screen flex flex-wrap flex-col">
    <h1 class="title">Results for {{ searchTerms }}</h1>
    <StudentSearch v-if="this.type == 'student'" :terms="this.searchTerms" />
    <TestSearch v-else-if="this.type == 'test'" :terms="this.searchTerms" />
    <h1 v-else>hmm</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import StudentSearch from "@/views/search/StudentSearch.vue";
import TestSearch from "@/views/search/TestSearch.vue";
export default defineComponent({
  components: { StudentSearch, TestSearch },
  setup() {
    const route = useRoute();

    const type = route.query.type;
    const searchTerms = route.query.terms as string;

    console.log();

    return {
      type,
      searchTerms,
    };
  },
});
</script>

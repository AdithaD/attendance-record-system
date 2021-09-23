<template>
  <div class="py-2 space-y-2 flex-grow">
    <h3 class="text-gray-300 font-bold">{{ title }}</h3>
    <input class="py-2 px-2 rounded bg-gray-900 text-gray-300 w-full" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style></style>

<template>
  <div class="py-2 space-y-2 flex-grow">
    <h3 class="text-gray-300 font-bold">{{ title }}</h3>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="py-2 px-2 rounded bg-gray-900 text-gray-300 w-full"
      placeholder="dd/mm/yyyy"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    modelValue: { type: String },
  },
  emits: ["update:modelValue"],
};
</script>

<style></style>

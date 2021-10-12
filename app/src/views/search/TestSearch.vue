<template>
  <div
    v-for="(test, i) in this.tests"
    :key="test.getDataValue('testId')"
    class="flex space-x-2"
  >
    <p
      class="
        border border-blue-400
        text-blue-400
        p-4
        font-semibold
        flex-none
        w-12
        text-center
        rounded
      "
    >
      {{ i + 1 }}
    </p>
    <p
      class="
        bg-gray-700
        py-4
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
      {{ test.getDataValue("name") }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { Test } from "@/backend/badges/test_model";
import sequelize from "sequelize";
export default defineComponent({
  props: {
    terms: { type: String, required: true },
  },
  setup(props) {
    const tests = ref([] as Test[]);

    onMounted(async () => {
      tests.value = await Test.findAll({
        where: {
          name: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            "LIKE",
            "%" + props.terms + "%"
          ),
        },
      });
    });

    return {
      tests,
    };
  },
});
</script>

<template>
  <div class="p-4 w-screen h-screen flex flex-col select-none">
    <div v-if="test" class="space-y-6">
      <div class="flex justify-between">
        <h1 class="title">Schedule "{{ test.get("name") }}"</h1>
        <div class="space-x-2">
          <button
            class="
              self-center
              rounded
              shadow-md
              py-2
              px-4
              bg-gray-700
              text-green-500 text-xl
              font-bold
              transition
              transform
              hover:scale-105
            "
            type="button"
            @click="validate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button
            class="
              self-center
              rounded
              shadow-md
              py-2
              px-4
              bg-gray-700
              text-red-500 text-xl
              font-bold
              transition
              transform
              hover:scale-105
            "
            type="button"
            @click="router.back()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="space-y-4">
        <DateField title="Schedule Date" v-model="schedule" />
        <TextField title="Supervising Teacher" v-model="teacher" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Test } from "@/backend/badges/test_model";
import dayjs from "dayjs";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DateField from "@/components/DateField.vue";
import TextField from "@/components/TextField.vue";

import { TestSchedule } from "@/backend/badges/test_schedule_model";

export default defineComponent({
  components: { DateField, TextField },
  setup() {
    const testId = +useRoute().params.id;
    const test = ref(null as Test | null);

    const schedule = ref("");
    const errors = reactive([] as string[]);

    const teacher = ref("");

    onMounted(async () => {
      test.value = await Test.findByPk(testId);
    });

    function validate(): void {
      while (errors.length > 0) {
        errors.pop();
      }

      if (!dayjs(schedule.value, "DD/MM/YYYY").isValid()) {
        errors.push("Date is invalid!");
      }

      if (errors.length > 0) {
        return;
      } else {
        let date = dayjs(schedule.value, "DD/MM/YYYY").toDate();
        let t = teacher.value;
        TestSchedule.create({
          testId,
          date,
          teacher: t,
          completed: false,
        });
        router.back();
      }
    }

    const router = useRouter();

    return {
      test,
      schedule,
      validate,
      errors,
      router,
      teacher,
    };
  },
});
</script>

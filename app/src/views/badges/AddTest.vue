<template>
  <div class="p-4 space-y-8 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Add Test</h1>
      <div class="flex space-x-4">
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
          @click="cancel"
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
      <TextField v-model="testName" title="Test Name" />
      <div v-if="!showSchedule">
        <button
          @click="toggleSchedule"
          class="text-gray-300 font-bold shadow-md rounded bg-gray-700 p-2"
        >
          Add to Schedule?
        </button>
      </div>
      <div v-else class="flex">
        <DateField v-model="schedule" title="Date Scheduled" />
        <button
          class="self-center py-2 px-4 text-red-500 font-bold"
          type="button"
          @click="toggleSchedule"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="space-y-4 text-gray-200 border-t-4 border-gray-700 pt-6">
      <div class="flex justify-between items-stretch">
        <h2 class="text-3xl font-bold">Topics</h2>
        <button @click="this.$router.push({ name: 'AddTopic' })">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div class="bg-gray-900 rounded flex flex-col items-stretch">
        <div class="h-36 overflow-y-auto">
          <div
            v-for="topic in this.$store.state.topics"
            :key="topic"
            class="m-2 p-2 flex justify-between"
          >
            <div class="flex space-x-4">
              <p>{{ topic.name }}</p>
              <p class="text-gray-700" v-if="topic.isOptional">Optional</p>
            </div>
            <button @click="this.$store.commit('deleteTopic', topic)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-500"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { addTest } from "@/backend/parts/badge_service";
import TextField from "@/components/TextField.vue";
import DateField from "@/components/DateField.vue";
import dayjs from "dayjs";

@Options({
  components: {
    TextField,
    DateField,
  },
})
export default class AddTest extends Vue {
  testName = "";
  schedule: string | null = null;
  showSchedule = false;
  errors: Array<string> = [];

  toggleSchedule(): void {
    this.showSchedule = !this.showSchedule;
  }

  validDate(date: string): boolean {
    return dayjs("19/07/2001", "DD/MM/YYYY", false).isValid();
  }
  validate(e: Event): boolean {
    while (this.errors.length > 0) {
      this.errors.pop();
    }

    if (this.schedule && !this.validDate(this.schedule)) {
      this.errors.push("Date is not valid");
    }

    if (this.errors.length == 0) {
      addTest(
        this.testName,
        dayjs(this.schedule, "DD/MM/YYYY").toDate(),
        this.$store.state.topics
      );
      //this.$store.commit("clearTempTest");
      return true;
    } else {
      console.log(this.errors);
      return false;
    }
  }

  cancel(): void {
    this.$store.commit("clearTempTest");
    this.$router.go(-1);
  }
}
</script>

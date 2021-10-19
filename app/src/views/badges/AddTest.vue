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
    <div v-if="this.errors.length > 0" class="rounded bg-gray-900 p-2">
      <p class="text-red-500" v-for="error in this.errors" :key="error">
        {{ error }}
      </p>
    </div>
    <div class="space-y-4">
      <TextField v-model="testName" title="Test Name" />
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
import { addTest } from "@/backend/badges/badge_service";
import TextField from "@/components/TextField.vue";
import DateField from "@/components/DateField.vue";

@Options({
  components: {
    TextField,
    DateField,
  },
})
export default class AddTest extends Vue {
  errors: Array<string> = [];
  get testName(): string {
    return this.$store.state.testName;
  }
  set testName(value: string) {
    this.$store.commit("updateTestName", value);
  }
  async validate(): Promise<boolean> {
    while (this.errors.length > 0) {
      this.errors.pop();
    }

    if (this.$store.state.topics.length <= 0) {
      this.errors.push("Cannot add test without any topics");
    }

    if (this.errors.length == 0) {
      await addTest(this.$store.state.testName, this.$store.state.topics);
      this.$store.commit("clearTempTest");
      this.$router.back();
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

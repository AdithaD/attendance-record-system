<template>
  <div class="p-4 space-y-8 w-screen">
    <div class="flex justify-between items-stretch">
      <h1 class="title">Add Badges</h1>
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
          @click="$router.go(-1)"
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
    <div>
      <TextField v-model="badgeName" title="Name" />
      <div class="flex justify-between space-x-4">
        <div class="flex-grow" style="flex-basis: 0">
          <h3 class="font-semibold text-gray-200">Type</h3>
          <select
            class="p-2 mt-2 flex-grow bg-gray-900 text-gray-200 w-full rounded"
            name="type"
            id="type"
          >
            <option>Achievement</option>
            <option>Special Interest / Skill</option>
            <option>Core Curriculum</option>
          </select>
        </div>
        <div class="flex-grow" style="flex-basis: 0">
          <h3 class="font-semibold text-gray-200">Level</h3>

          <select
            class="p-2 mt-2 flex-grow bg-gray-900 text-gray-200 w-full rounded"
            name="level"
            id="level"
          >
            <option>Diamond</option>
            <option>Platnium</option>
            <option>Lithium</option>
          </select>
        </div>
      </div>
    </div>
    <div class="space-y-4 text-gray-200 h-1/2 flex flex-col">
      <h2 class="text-3xl font-bold">Select Tests</h2>
      <div class="flex space-x-4 flex-grow">
        <div
          class="
            rounded
            shadow-md
            bg-gray-700
            w-1/3
            py-2
            px-2
            space-y-2
            flex flex-col
          "
        >
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
              class="h-4 w-4 mr-4 text-gray-800 self-center"
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
              v-model="testSearchTerms"
            />
          </div>
          <div
            v-if="this.tests.length > 0"
            class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll h-full"
          >
            <div
              v-for="test in this.unselectedTests"
              :key="test.test.getDataValue('testId')"
              class="space-x-2 drag"
              @click="this.switch(test, 1)"
            >
              <p
                class="
                  bg-gray-700
                  text-gray-200
                  font-semibold
                  shadow-md
                  px-2
                  rounded
                  transition-colors
                  hover:text-white hover:bg-green-500
                  select-none
                "
              >
                {{ test.test.getDataValue("name") }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="this.tests.length > 0"
          class="
            border-gray-700
            bg-gray-900
            p-4
            rounded
            border-8
            space-y-4
            flex-grow
            min-h-full
            overflow-y-auto
            w-2/3
          "
        >
          <div
            v-for="entry in this.selectedTests"
            :key="entry.test.getDataValue('testId')"
            class="text-gray-200 font-semibold relative"
          >
            <p
              @click="this.switch(entry, 0)"
              class="
                shadow-md
                transition-colors
                flex-grow
                rounded
                pl-2
                py-2
                select-none
                bg-gray-700
                hover:text-white hover:bg-red-500
              "
            >
              {{ entry.test.getDataValue("name") }}
            </p>
            <div
              class="
                flex
                self-center
                space-x-4
                shadow-md
                transition-colors
                rounded rounded-l-none
                absolute
                top-0
                right-0
                pr-2
                py-2
              "
            >
              <h3 class="text-gray-300 font-bold">Optional?</h3>
              <input
                class="
                  self-center
                  h-6
                  w-6
                  appearance-none
                  rounded
                  bg-gray-900
                  checked:bg-green-400
                "
                :class="{ 'form-tick': entry.isOptional }"
                type="checkbox"
                id="checkbox"
                v-model="entry.isOptional"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TextField from "@/components/TextField.vue";
import { Test } from "@/backend/badges/test_model";

type TestEntry = { test: Test; isOptional: boolean; list: number };

@Options({
  components: {
    TextField,
  },
})
export default class AddTopic extends Vue {
  badgeName = "";
  newPart = "";
  testSearchTerms = "";

  tests: Array<TestEntry> = [];
  errors: Array<string> = [];

  mounted(): void {
    Test.findAll().then((data) => {
      console.log(data);
      data.forEach((test) => {
        this.tests.push({ test, isOptional: false, list: 0 });
      });
    });
  }

  get unselectedTests(): TestEntry[] {
    let searchTerms = this.testSearchTerms.toLowerCase();

    return this.tests.filter((test) => {
      const model = test.test;
      let included = model.getDataValue("name").includes(searchTerms);
      return test.list == 0 && included;
    });
  }

  get selectedTests(): TestEntry[] {
    return this.tests.filter((test) => {
      return test.list == 1;
    });
  }

  switch(test: TestEntry, dest: number): void {
    test.list = dest;
  }

  validate(): boolean {
    while (this.errors.length > 0) {
      this.errors.pop();
    }

    if (this.badgeName == "") {
      this.errors.push("The name must not be empty.");
    }

    if (this.tests.filter((value) => !value.isOptional).length != 10) {
      this.errors.push("There must be 10 mandatory tests.");
    }

    if (this.tests.filter((value) => value.isOptional).length != 11) {
      this.errors.push("There must be 11 optional tests");
    }

    //addBadge()

    return this.errors.length > 0;
  }
}
</script>

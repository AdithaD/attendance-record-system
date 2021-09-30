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
    <div>
      <TextField v-model="name" title="Name" />
    </div>
    <div class="space-y-4 text-gray-200">
      <div class="flex justify-between items-stretch">
        <h2 class="text-3xl font-bold">Parts</h2>
      </div>
      <div class="bg-gray-900 rounded flex flex-col items-stretch">
        <div class="h-36 overflow-y-auto">
          <div
            class="m-2 p-2 flex justify-between"
            v-for="(part, i) in parts"
            :key="i"
          >
            <p>{{ part.name }}</p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="deletePart(i)"
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

        <input
          class="m-2 p-2 rounded bg-gray-900 border-t-2 border-gray-600"
          v-model="newPart"
          placeholder="enter part name"
          @keydown.enter="addPart"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TextField from "@/components/TextField.vue";

@Options({
  components: {
    TextField,
  },
})
export default class AddTopic extends Vue {
  name = "";
  newPart = "";

  parts: Array<{ name: string }> = [];

  validate(): boolean {
    let hasParts = this.parts.length != 0;
    let hasName = this.name != "";
    return false && hasParts && hasName;
  }

  addPart(): void {
    this.parts.push({ name: this.newPart });
    this.newPart = "";
  }

  deletePart(i: number): void {
    this.parts.splice(i, 1);
  }
}
</script>

<template>
  <form
    id="addstudentform"
    class="p-4 space-y-8 w-screen h-screen flex flex-col"
  >
    <div class="flex justify-between items-stretch">
      <h1
        class="
          rounded
          shadow-md
          py-2
          px-4
          text-4xl text-gray-200
          bg-gray-700
          font-bold
          w-max
        "
      >
        Add Student
      </h1>
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
    <div class="flex justify-between space-x-8">
      <TextField v-model="fname" title="First Name" />
      <TextField v-model="lname" title="Last Name" />
      <DateField v-model="dob" title="Date of Birth" />
    </div>

    <div class="py-2 space-y-2 flex-grow flex flex-col">
      <h3 class="text-gray-300 font-bold">Notes</h3>
      <textarea
        v-model="notes"
        class="py-2 px-2 rounded bg-gray-900 text-gray-300 w-full flex-grow"
      />
    </div>
    <div class="bg-gray-900 p-4" v-if="this.errors.length > 0">
      <p class="text-red-600" v-for="err in errors" :key="err">{{ err }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import TextField from "@/components/TextField.vue";
import DateField from "@/components/DateField.vue";
import dayjs from "dayjs";
import { defineComponent } from "vue";
import { createStudent } from "@/backend/students/student_service";
import router from "@/router";
export default defineComponent({
  components: {
    TextField,
    DateField,
  },
  data() {
    return {
      errors: [] as string[],
      fname: "",
      lname: "",
      dob: "",
      notes: "",
    };
  },
  methods: {
    validDate: function (date: string): boolean {
      console.log(date);
      return dayjs("19/07/2001", "DD/MM/YYYY", false).isValid();
    },
    validate: function (e: Event): boolean {
      while (this.errors.length > 0) {
        console.log(this.errors.pop());
      }
      if (this.fname == "") {
        console.log(this.fname);
        this.errors.push("First name may not be empty");
      }

      if (this.lname == "") {
        this.errors.push("Last name may not be empty");
      }

      if (this.dob == "") {
        this.errors.push("DOB may not be empty");
      }

      if (!this.validDate(this.dob)) {
        this.errors.push("DOB is not a valid date");
      }

      if (this.errors.length == 0) {
        createStudent(
          this.fname,
          this.lname,
          dayjs(this.dob, "DD/MM/YYYY").toDate(),
          this.notes
        );
        router.back();
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    },
  },
});
</script>

<style></style>

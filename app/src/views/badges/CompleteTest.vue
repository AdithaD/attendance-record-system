<template>
  <div class="p-4 space-y-8 w-screen">
    <div v-if="test" class="space-y-4">
      <h1 class="title">Recording Completion for: {{ test.get("name") }}</h1>
      <div v-if="this.students.length > 0" class="space-y-4">
        <h2 class="text-2xl text-gray-200 font-bold mb-4">Students</h2>
        <div
          class="
            rounded
            shadow-md
            bg-gray-700
            w-full
            py-2
            px-2
            space-y-2
            max-h-72
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
              v-model="studentSearchTerms"
              v-on:keydown.enter="search"
            />
          </div>
          <div
            v-if="this.students.length > 0"
            class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll h-48"
          >
            <div
              v-for="student in this.unselectedStudents"
              :key="student.getDataValue('studentId')"
              class="space-x-2 drag"
              @click="this.switchStudent(student, 1)"
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
                {{ student.getDataValue("firstName") }}
                {{ student.getDataValue("lastName") }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="this.students.length > 0"
          class="
            bg-gray-900
            p-4
            rounded rounded-r-none
            space-y-4
            overflow-y-auto
            border-gray-700 border-r-2
            h-48
          "
        >
          <div
            v-for="student in this.selectedStudents"
            :key="student.getDataValue('studentId')"
            class="space-x-2 drag"
            @click="this.switchStudent(student, 0)"
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
                hover:text-white hover:bg-red-500
                select-none
              "
            >
              {{ student.getDataValue("firstName") }}
              {{ student.getDataValue("lastName") }}
            </p>
          </div>
        </div>
        <div class="w-full items-center">
          <button
            class="
              rounded
              shadow-md
              py-2
              px-4
              bg-blue-700
              text-gray-200 text-xl
              font-bold
              h-12
              self-center
              transition
              transform
              hover:scale-105 hover:bg-blue-500
            "
            type="button"
            @click="validate"
          >
            Submit
          </button>
        </div>
      </div>
      <div class="h-full w-full" v-else>
        <p class="text-gray-300 self-center">
          Amazing! All students have done this test!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { completeTest } from "@/backend/badges/badge_service";
import { Test } from "@/backend/badges/test_model";
import { StudentTests } from "@/backend/students/studentTests_model";
import { Student } from "@/backend/students/student_model";
import { Op } from "sequelize";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const students = ref([] as { student: Student; list: number }[]);
    const studentSearchTerms = ref("");
    const errors = reactive([] as string[]);

    const router = useRouter();

    const test = ref(null as Test | null);

    const testId = +useRoute().params.id;
    const schedID = useRoute().params.sched_id
      ? +useRoute().params.sched_id
      : null;

    onMounted(async () => {
      test.value = await Test.findByPk(testId);

      // get all students that have completed the test
      const sIds = (
        await StudentTests.findAll({
          where: {
            testId,
          },
        })
      ).map((student) => student.get("studentId") as number);

      // find all students that haven't completed the test
      await Student.findAll({
        where: {
          studentId: {
            [Op.notIn]: sIds,
          },
        },
      }).then((data) => {
        // initialises them for the list swapping UI mechanic
        data.forEach((student) => {
          students.value.push({ student, list: 0 });
        });
      });
    });

    const unselectedStudents = computed(() => {
      let terms = studentSearchTerms.value.split(" ");

      let firstName = "";
      let lastName = ";";
      if (terms.length == 1) {
        firstName = terms[0];
        lastName = terms[0];
      } else if (terms.length == 2) {
        firstName = terms[0];
        lastName = terms[1];
      } else if (terms.length > 2) {
        firstName = terms.slice(0, terms.length - 2).reduce((prev, curr) => {
          curr += prev;
          return curr;
        });
        lastName = terms[terms.length - 1];
      }
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();

      return students.value
        .filter((student) => {
          const model = student.student;
          let hasFirstName = model
            .getDataValue("firstName")
            .toLowerCase()
            .includes(firstName);
          let included =
            hasFirstName ||
            (hasFirstName &&
              model.getDataValue("lastName").toLowerCase().includes(lastName));
          return student.list == 0 && included;
        })
        .map((student) => {
          return student.student;
        });
    });

    const selectedStudents = computed(() => {
      return students.value
        .filter((student) => {
          return student.list == 1;
        })
        .map((student) => {
          return student.student;
        });
    });

    function switchStudent(student: Student, dest: number): void {
      const studentObj = students.value.find((s) => {
        return (
          s.student.getDataValue("studentId") ==
          student.getDataValue("studentId")
        );
      });
      if (studentObj) studentObj.list = dest;
    }

    async function validate(): Promise<void> {
      while (errors.length > 0) {
        errors.pop();
      }

      if (selectedStudents.value.length <= 0) {
        errors.push("Select at least one student");
      }

      if (errors.length > 0) {
        return;
      } else {
        // Submit to database
        selectedStudents.value.forEach((student) => {
          completeTest(student.get("studentId") as number, testId, schedID);

          console.log("adding");
        });

        // Set completed in database

        router.back();
      }
    }

    return {
      test,
      students,
      studentSearchTerms,
      unselectedStudents,
      selectedStudents,
      switchStudent,
      validate,
    };
  },
});
</script>

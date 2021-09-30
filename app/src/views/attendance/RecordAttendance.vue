<template>
  <div class="p-4 space-y-6 w-screen h-screen flex flex-col select-none">
    <h1 class="title">Record Attendance</h1>
    <div class="">
      <DateField v-model="this.date" title="Event Date" />
    </div>
    <div class="mt-4 mb-4 flex justify-between space-x-8">
      <div class="flex flex-col">
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
            class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll"
          >
            <div
              v-for="student in this.unselectedStudents"
              :key="student.getDataValue('studentId')"
              class="space-x-2 drag"
              @click="this.switch(student, 1)"
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
      </div>
      <div class="flex flex-col">
        <h2 class="text-2xl text-gray-200 font-bold mb-4">Parts</h2>
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
              v-model="partSearchTerms"
            />
          </div>
          <div
            v-if="this.parts.length > 0"
            class="bg-gray-900 p-4 rounded space-y-4 overflow-y-scroll"
          >
            <div
              v-for="part in this.unselectedParts"
              :key="part.getDataValue('partId')"
              class="space-x-2 drag"
              @click="this.switch(part, 1)"
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
                {{ part.getDataValue("name") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-2xl text-gray-200 font-bold mb-4">Selected</h2>
      <div
        class="
          rounded rounded-r-none
          shadow-md
          bg-gray-700
          w-full
          py-2
          px-2
          flex
          overflow-y-none
        "
      >
        <!-- selected students -->
        <div
          v-if="this.students.length > 0"
          class="
            bg-gray-900
            p-4
            rounded rounded-r-none
            space-y-4
            flex-grow
            min-h-full
            overflow-y-auto
            border-gray-700 border-r-2
          "
        >
          <div
            v-for="student in this.selectedStudents"
            :key="student.getDataValue('studentId')"
            class="space-x-2 drag"
            @click="this.switch(student, 0)"
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
        <!-- selected parts -->
        <div
          v-if="this.students.length > 0"
          class="
            border-gray-700
            bg-gray-900
            p-4
            rounded rounded-l-none
            border-l-2
            space-y-4
            flex-grow
            min-h-full
            overflow-y-auto
          "
        >
          <div
            v-for="part in this.selectedParts"
            :key="part.getDataValue('partId')"
            class="space-x-2 drag"
            @click="this.switch(student, 0)"
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
              {{ student.getDataValue("name") }}
            </p>
          </div>
        </div>
      </div>
      <!-- Submit -->
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
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DateField from "@/components/DateField.vue";
import { Student } from "@/backend/students/student_model";
import { Part } from "@/backend/parts/part_model";

@Options({
  components: {
    DateField,
  },
})
export default class RecordAttendance extends Vue {
  date = "";
  students: { student: Student; list: number }[] = [];
  parts: { part: Part; list: number }[] = [];
  studentSearchTerms = "";
  partSearchTerms = "";

  mounted(): void {
    Student.findAll().then((data) => {
      data.forEach((student) => {
        this.students.push({ student, list: 0 });
      });
    });
    Part.findAll().then((data) => {
      data.forEach((part) => {
        this.parts.push({ part, list: 0 });
      });
    });
  }

  get unselectedStudents(): Student[] {
    let terms = (this.studentSearchTerms as string).split(" ");

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

    return this.students
      .filter((student) => {
        const model = student.student;
        console.log(`${firstName} , ${lastName}`);
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
  }

  get selectedStudents(): Student[] {
    return this.students
      .filter((student) => {
        return student.list == 1;
      })
      .map((student) => {
        return student.student;
      });
  }

  get unselectedParts(): Part[] {
    let searchTerms = this.partSearchTerms.toLowerCase();

    return this.parts
      .filter((part) => {
        const model = part.part;
        let included = model.getDataValue("name") == searchTerms;
        return part.list == 0 && included;
      })
      .map((part) => {
        return part.part;
      });
  }

  get selectedParts(): Part[] {
    return this.parts
      .filter((part) => {
        return part.list == 1;
      })
      .map((part) => {
        return part.part;
      });
  }

  // startDrag(evt: DragEvent, item: string): void {
  //   if (evt.dataTransfer) {
  //     console.log("dragging");
  //     evt.dataTransfer.dropEffect = "move";
  //     evt.dataTransfer.effectAllowed = "move";
  //     evt.dataTransfer.setData("itemID", item);
  //   }
  // }

  // onDrop(evt: DragEvent, list: number): void {
  //   if (evt.dataTransfer) {
  //     const itemID = evt.dataTransfer.getData("itemID");
  //     const item = this.students.find(
  //       (student) =>
  //         student.student.getDataValue("studentId").toString() == itemID
  //     );

  //     if (item) item.list = list;
  //   }
  // }

  switch(student: Student, dest: number): void {
    console.log(student);
    const studentObj = this.students.find((s) => {
      console.log(
        `${0} == ${1}`,
        s.student.getDataValue("studentId"),
        student.getDataValue("studentId")
      );
      return (
        s.student.getDataValue("studentId") == student.getDataValue("studentId")
      );
    });
    console.log(studentObj);
    if (studentObj) studentObj.list = dest;
  }
}
</script>

<template>
  <div
    v-for="(student, i) in this.students"
    @click="openProfile(student)"
    :key="student.getDataValue('studentId')"
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
      {{ student.getDataValue("firstName") }}
      {{ student.getDataValue("lastName") }}
    </p>
  </div>
</template>

<script lang="ts">
import { Student } from "@/backend/students/student_model";
import { defineComponent, onMounted } from "@vue/runtime-core";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { ref } from "vue";
export default defineComponent({
  props: {
    terms: { type: String, required: true },
  },
  setup(props) {
    const students = ref([] as Student[]);

    onMounted(async () => {
      let split = props.terms.split(" ");

      if (split.length > 0) {
        let firstName = "";
        let lastName = ";";
        if (split.length == 1) {
          firstName = split[0];
          lastName = split[0];
        } else if (split.length == 2) {
          firstName = split[0];
          lastName = split[1];
        } else if (split.length > 2) {
          firstName = split.slice(0, split.length - 2).reduce((prev, curr) => {
            curr += prev;
            return curr;
          });
          lastName = split[split.length - 1];
        }
        students.value = await Student.findAll({
          where: {
            [Op.or]: [
              {
                firstName: sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("firstName")),
                  "LIKE",
                  "%" + firstName + "%"
                ),
              },
              {
                lastName: sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("lastName")),
                  "LIKE",
                  "%" + lastName + "%"
                ),
              },
            ],
          },
        });
      }
    });

    return {
      students,
    };
  },
});
</script>

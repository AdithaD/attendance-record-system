<template>
  <div class="p-4 space-y-8 w-screen flex flex-wrap flex-col">
    <h1 class="title" v-if="this.terms != null">
      Results for {{ this.combineString() }}
    </h1>
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
  </div>
</template>

<script lang="ts">
import { Student } from "@/backend/students/student_model";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { Vue } from "vue-class-component";
import router from "@/router";

export default class SearchResults extends Vue {
  // Class properties will be component data
  students: Student[] | null = null;
  terms: string[] = [];
  openProfile(student: Student): void {
    router.push({
      name: "StudentProfile",
      params: { id: student.getDataValue("studentId") },
    });
  }
  combineString(): string {
    if (this.terms) {
      return this.terms.reduce((prev, curr) => {
        curr += prev;
        return curr;
      }, "");
    } else {
      return "";
    }
  }
  mounted(): void {
    console.log("heloo");
    this.terms = (this.$route.query.terms as string).split(" ");
    if (this.terms.length > 0) {
      let firstName = "";
      let lastName = ";";
      if (this.terms.length == 1) {
        firstName = this.terms[0];
        lastName = this.terms[0];
      } else if (this.terms.length == 2) {
        firstName = this.terms[0];
        lastName = this.terms[1];
      } else if (this.terms.length > 2) {
        firstName = this.terms
          .slice(0, this.terms.length - 2)
          .reduce((prev, curr) => {
            curr += prev;
            return curr;
          });
        lastName = this.terms[this.terms.length - 1];
      }
      Student.findAll({
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
      })
        .then((data) => {
          this.students = data;
        })
        .catch((e) => {
          router.back();
        });
    }
  }
}
</script>

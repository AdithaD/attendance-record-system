import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Badges from "../views/Badges.vue";
import Students from "../views/students/Students.vue";
import Tests from "../views/Tests.vue";
import AddStudent from "../views/students/AddStudent.vue";
import StudentProfile from "../views/students/StudentProfile.vue";
import SearchResults from "../views/students/SearchResults.vue";
import RecordAttendance from "../views/attendance/RecordAttendance.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Badges",
    name: "Badges",
    component: Badges,
  },
  {
    path: "/Students",
    name: "Students",
    component: Students,
  },
  {
    path: "/Tests",
    name: "Tests",
    component: Tests,
  },
  {
    path: "/Students/AddStudent",
    name: "AddStudent",
    component: AddStudent,
  },
  {
    path: "/Students/:id",
    name: "StudentProfile",
    component: StudentProfile,
  },
  {
    path: "/Students?",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/Attendance",
    name: "RecordAttendance",
    component: RecordAttendance,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

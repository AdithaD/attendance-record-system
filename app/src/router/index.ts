import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Badges from "../views/badges/Badges.vue";
import AddBadge from "../views/badges/AddBadge.vue";
import Students from "../views/students/Students.vue";
import Tests from "../views/Tests.vue";
import AddStudent from "../views/students/AddStudent.vue";
import StudentProfile from "../views/students/StudentProfile.vue";
import SearchResults from "../views/students/SearchResults.vue";
import RecordAttendance from "../views/attendance/RecordAttendance.vue";
import AddTopic from "../views/badges/AddTopic.vue";
import AddTest from "../views/badges/AddTest.vue";
import ViewTest from "../views/badges/ViewTest.vue";
import ViewBadge from "../views/badges/ViewBadge.vue";
import CompleteTest from "../views/badges/CompleteTest.vue";
import ScheduleTest from "../views/badges/ScheduleTest.vue";
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
    path: "/Badges/AddBadge",
    name: "AddBadge",
    component: AddBadge,
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
  {
    path: "/Test/AddTopic",
    name: "AddTopic",
    component: AddTopic,
  },
  {
    path: "/Test/AddTest",
    name: "AddTest",
    component: AddTest,
  },
  {
    path: "/Test/:id",
    name: "ViewTest",
    component: ViewTest,
  },
  {
    path: "/Test/:id/:sched_id?",
    name: "ViewTest",
    component: ViewTest,
  },
  {
    path: "/Test/:id/Complete",
    name: "CompleteTest",
    component: CompleteTest,
  },
  {
    path: "/Test/:id/Schedule",
    name: "ScheduleTest",
    component: ScheduleTest,
  },
  {
    path: "/Badge/:id",
    name: "ViewBadge",
    component: ViewBadge,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

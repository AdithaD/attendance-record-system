import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Badges from "../views/Badges.vue";
import Students from "../views/Students.vue";
import Tests from "../views/Tests.vue";
import AddStudent from "../views/AddStudent.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

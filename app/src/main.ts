import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import { initialise } from "./backend/db";

initialise().then(() => {
  createApp(App).use(store).use(router).mount("#app");
});

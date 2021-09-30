import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./assets/tailwind.css";
import { initialise } from "./backend/db";

import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat.default);

initialise().then(() => {
  createApp(App).use(store).use(router).mount("#app");
});

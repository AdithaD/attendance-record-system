import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./assets/tailwind.css";
import { initialise } from "./backend/db";

import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
dayjs.extend(customParseFormat.default);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

initialise().then(() => {
  createApp(App).use(store).use(router).mount("#app");
});

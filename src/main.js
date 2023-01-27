import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/main.css";
import VueFeather from "vue-feather";
const app = createApp(App);

app.use(router);
app.component(VueFeather.name, VueFeather);
app.mount("#app");

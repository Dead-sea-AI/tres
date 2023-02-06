import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/main.css";
import VueFeather from "vue-feather";
import ModalWindow from "@/components/ModalWindow.vue";
const app = createApp(App);

app.use(router);
app.component(VueFeather.name, VueFeather);
app.component("ModalWindow", ModalWindow);
app.mount("#app");

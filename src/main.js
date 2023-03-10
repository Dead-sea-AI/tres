import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store.js";

import "@/assets/main.css";
import VueFeather from "vue-feather";
import ModalWindow from "@/components/ModalWindow.vue";
const app = createApp(App);

app.use(router);
app.use(store);
app.component(VueFeather.name, VueFeather);
app.component("ModalWindow", ModalWindow);
app.mount("#app");

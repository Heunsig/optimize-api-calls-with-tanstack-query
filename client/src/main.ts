import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-noir/theme.css";

createApp(App).use(PrimeVue).use(router).mount("#app");

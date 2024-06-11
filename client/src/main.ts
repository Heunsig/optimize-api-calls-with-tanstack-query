import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import ToastService from 'primevue/toastservice';

import "primevue/resources/themes/aura-dark-noir/theme.css";
import 'primeicons/primeicons.css'

createApp(App).use(PrimeVue).use(VueQueryPlugin).use(ToastService).use(router).mount("#app");

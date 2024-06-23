import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from 'pinia'
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import "primevue/resources/themes/aura-dark-noir/theme.css";
import "primeicons/primeicons.css";


const pinia = createPinia()

createApp(App)
  .use(PrimeVue)
  .use(VueQueryPlugin)
  .use(ConfirmationService)
  .use(ToastService)
  .use(pinia)
  .use(router)
  .mount("#app");

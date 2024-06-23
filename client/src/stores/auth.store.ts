import { defineStore } from "pinia"
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {

  const _email = ref('');
  const _isAuthorized = ref(false);

  function setEmail(newEmail: string) {
    _email.value = newEmail;
  }

  function setAuthorized(authorized: boolean) {
    _isAuthorized.value = authorized;
  }

  return { 
    email: computed(() => _email.value), 
    isAuthorized: computed(() => _isAuthorized.value), 
    setEmail, 
    setAuthorized
  }
})
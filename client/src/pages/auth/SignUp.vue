<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { signUp as signUpApi } from "@/api/auth.api";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const toast = useToast();
const router = useRouter();

const form = reactive<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});

const { mutate: signUp } = useMutation({
  mutationFn: async (payload: { email: string; password: string }) => {
    await signUpApi(payload);
  },
  onSuccess: () => {
    router.push({ name: 'signin'})
  },
  onError: (error: Error) => {
    // TODO: Handle error
    toast.add({
      severity: "error",
      summary: error.name,
      detail: error.message,
      life: 3000,
    });
  },
});
</script>
<template>
  <DefaultLayout>
    <div class="h-full flex flex-col items-center justify-center">
      <h1 class="text-2xl font-semibold">Sign up</h1>
      <form
        class="p-6 rounded-md flex flex-col gap-6 w-96"
        @submit.prevent="
          () =>
          signUp({
            email: form.email,
            password: form.password,
          })
        "
      >
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText
            v-model="form.email"
            type="text"
            placeholder="Email"
            id="email"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <InputText
            v-model="form.password"
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <div>
          <Button type="submit" label="Sign up" severity="secondary" />
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

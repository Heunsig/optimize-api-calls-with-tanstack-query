<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { signIn as signInApi } from "@/api/auth.api";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();

const form = reactive<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});

const { mutate: signIn } = useMutation({
  mutationFn: async (payload: { email: string; password: string }) => {
    await signInApi(payload);
  },
  onSuccess: () => {
    if (route.query.redirect) {
      router.push(route.query.redirect.toString());
    } else {
      router.push("/");
    }
  },
  onError: (error: Error) => {
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
      <h1 class="text-2xl font-semibold">Sign in</h1>
      <form
        class="p-6 rounded-md flex flex-col gap-6 w-96"
        @submit.prevent="
          () =>
            signIn({
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
        <div class="flex items-center justify-between">
          <p class="text-[--surface-400]">
            New here?
            <router-link
              :to="{
                name: 'signup',
              }"
              class="text-[--primary-color] font-semibold hover:underline"
            >Sign up</router-link>
            now!
          </p>
          <Button type="submit" label="Sign in" severity="secondary" />
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

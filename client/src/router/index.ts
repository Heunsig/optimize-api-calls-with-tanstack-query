import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { me } from "@/api/auth.api";

const routes = [
  {
    alias: "/projects",
    path: "/",
    name: "projects",
    component: () => import("@/pages/projects/ProjectList.vue"),
  },
  {
    path: "/create",
    component: () => import("@/pages/posts/CreatePost.vue"),
  },
  {
    path: "/projects/:projectId/posts",
    name: "projects/[projectId]/posts",
    component: () => import("@/pages/posts/PostList.vue"),
  },
  {
    path: '/projects/:projectId/posts/create',
    name: 'projects/[projectId]/posts/create',
    component: () => import('@/pages/posts/CreatePost.vue')
  },
  {
    path: '/projects/:projectId/posts/:postId',
    name: 'projects/[projectId]/posts/[postId]',
    component: () => import('@/pages/posts/PostDetail.vue')
  },
  {
    path: '/projects/:projectId/posts/:postId/edit',
    name: 'projects/[projectId]/posts/[postId]/edit',
    component: () => import('@/pages/posts/EditPost.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/pages/auth/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/auth/SignUp.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();

  if (to.name && ['signin', 'signup'].includes(to.name.toString())) {
    next();
    return;
  }

  try {
    if (authStore.isAuthorized) {
      next();
    } else {
      const data = await me();
      authStore.setEmail(data.email);
      authStore.setAuthorized(true);
      next();
    }
  } catch (error) {
    next({ 
      name: 'signin',
      query: {
        redirect: to.fullPath
      } 
    });
  }
})


export { router };
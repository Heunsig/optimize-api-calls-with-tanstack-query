import { createWebHistory, createRouter } from "vue-router";

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
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

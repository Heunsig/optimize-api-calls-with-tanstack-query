import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    alias: "/projects",
    path: "/",
    name: "projects",
    component: () => import("@/pages/projects/ProjectList.vue"),
  },
  {
    path: '/projects/manage',
    name: 'projects/manage',
    component: () => import('@/pages/projects/ManageProject.vue')
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
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

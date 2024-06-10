import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/', 
    component: () => import('@/pages/projects/ProjectList.vue') 
  },
  {
    path: '/create', 
    component: () => import('../pages/CreatePost.vue') 
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
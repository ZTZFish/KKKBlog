import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      alias: '/', // 允许通过/访问相同内容
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/IndexView.vue'),
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import('../views/PhotosView.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
    },
    {
      path: '/hobbies',
      name: 'hobbies',
      component: () => import('../views/HobbiesView.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/MessagesView.vue'),
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import('../views/ResourceView.vue'),
    },
  ],
})

export default router

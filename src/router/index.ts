import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/essay',
      name: 'essay',
      component: () => import('../views/EssaysViews/EssayView.vue'),
    },
    {
      path: '/hobbies',
      name: 'hobbies',
      component: () => import('../views/HobbiesViews/HobbiesView.vue'),
      meta: { title: '爱好' }, // 一级标题
      children: [
        {
          path: 'novel',
          name: 'novel',
          component: () => import('../views/HobbiesViews/NovelCommonView.vue'),
          meta: {
            type: 'novelList',
            secondTitle: '小说', // 二级标题
          },
        },
        {
          path: 'novel/:novelTitle/chapterList',
          name: 'chapterList',
          component: () => import('../views/HobbiesViews/NovelCommonView.vue'),
          meta: {
            type: 'chapterList',
            secondTitle: '小说', // 继承二级标题
            thirdTitle: 'fromParams', // 三级标题来自参数
          },
        },
        {
          path: 'novel/:novelTitle/chapterList/chapter/:chapterTitle',
          name: 'chapter',
          component: () => import('../views/HobbiesViews/NovelCommonView.vue'),
          meta: {
            type: 'chapterDetail',
            secondTitle: '小说',
            thirdTitle: 'fromParams',
            fourthTitle: 'fromParams', // 四级标题来自参数
          },
        },
        {
          path: 'music',
          name: 'music',
          component: () => import('../views/HobbiesViews/MusicCommonView.vue'),
          meta: {
            type: 'musicList',
            secondTitle: '音乐', // 二级标题
          },
        },
        {
          path: 'life',
          name: 'life',
          component: () => import('../views/HobbiesViews/LifeCommonView.vue'),
          meta: {
            type: 'lifeList',
            secondTitle: '生活', // 二级标题
          },
        },
      ],
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import('../views/ResourceView.vue'),
    },
    {
      path: '/essayDetail/:essayTitle',
      name: 'essayDetail',
      component: () => import('../views/EssaysViews/EssayDetail.vue'),
    },
  ],
})

export default router

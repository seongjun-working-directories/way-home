import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { Routes } from './route.type';

export const routes: Routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
  },
  // 사용자 정보
  {
    path: '/auth/sign-in',
    name: 'Sign in',
    component: () => import('../pages/auth/SignInPage.vue'),
  },
  {
    path: '/auth/sign-up',
    name: 'Sign up',
    component: () => import('../pages/auth/SignUpPage.vue'),
  },
  {
    path: '/auth/find-me',
    name: 'Find Id',
    component: () => import('../pages/auth/FindMePage.vue'),
  },
  {
    path: '/auth/me',
    name: 'My Page',
    component: () => import('../pages/auth/FindMePage.vue'),
  },

  // 페이지
  {
    path: '/qna',
    name: 'Q & A',
    component: () => import('../pages/QnAPages/QaPage.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../pages/QnAPages/PostPage.vue'),
  },
  {
    path: '/resting',
    name: 'Resting',
    component: () => import('../pages/RestingPages/RestingPage.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/SearchPage.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../pages/DetailPage.vue'),
  },
  {
    // https://velog.io/@byungjur_96/vue.js-404-Error-핸들링
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
  {
    path: '/not-found',
    component: import('../pages/NotFoundPage.vue'),
  },
  // {
  //   path: "/road",
  //   name: "Road",
  //   component: () => import("../pages/whatPage.vue"),
  // },
  // {
  //   path: "/benefit",
  //   name: "Rest",
  //   component: () => import("../pages/benefitPage.vue"),
  // },
  // {
  //   path: "/post",
  //   name: "Post",
  //   component: () => import("../pages/postPage.vue"),
  // },
  // {
  //   path: "/menu",
  //   name: "Menu",
  //   component: () => import("../pages/menuPage.vue"),
  // },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../pages//MapPage.vue'),
  },
  // {
  //   path: '/category/:name',
  //   name: ':name',
  //   component: () => import('../pages/CategoryPage.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

export default router;

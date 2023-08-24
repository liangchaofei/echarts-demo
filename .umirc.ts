import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '曲线播放',
      path: '/video',
      component: './Video',
    },
    {
      name: '单标尺',
      path: '/single',
      component: './Single',
    },
    {
      name: '双标尺',
      path: '/double',
      component: './Double',
    },
    {
      name: '缩小放大',
      path: '/scale',
      component: './Scale',
    },
    {
      name: '局部放大',
      path: '/part',
      component: './Part',
    },
    {
      name: '曲线模式',
      path: '/pattern',
      component: './Pattern',
    },
    {
      name: 'x轴间距测试',
      path: '/x',
      component: './Test',
    },
    {
      name: '多视图联动',
      path: '/more',
      component: './More',
    },
    {
      name: '综合',
      path: '/all',
      component: './All',
    },
  ],
  npmClient: 'pnpm',
});


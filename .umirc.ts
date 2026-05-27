import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'X6 流程图编辑器教学',
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
      name: '基础入门',
      routes: [
        {
          name: '画布学习',
          path: '/canvas',
          component: './Xflows/Canvas',
        },
        {
          name: '画布配置',
          path: '/graph-config',
          component: './Xflows/GraphConfig',
        },
        {
          name: '画布配置练习',
          path: '/graph-config-practice',
          component: './Xflows/GraphConfigPractice',
        },
      ],
    },
    {
      name: '节点与边',
      routes: [
        {
          name: '节点学习',
          path: '/node-demo',
          component: './Xflows/NodeDemo',
        },
        {
          name: '边学习',
          path: '/edge-demo',
          component: './Xflows/EdgeDemo',
        },
      ],
    },
    {
      name: '连接桩',
      routes: [
        {
          name: '连接桩学习',
          path: '/port-demo',
          component: './Xflows/PortDemo',
        },
        {
          name: '连接桩练习',
          path: '/port-practice',
          component: './Xflows/PortPractice',
        },
        {
          name: '连接桩完整教学',
          path: '/port-full-demo',
          component: './Xflows/PortFullDemo',
        },
      ],
    },
    {
      name: '工具与交互',
      routes: [
        {
          name: '工具教学',
          path: '/tools-demo',
          component: './Xflows/ToolsDemo',
        },
        {
          name: '对齐线教学',
          path: '/snapline-demo',
          component: './Xflows/SnaplineDemo',
        },
        {
          name: '框选教学',
          path: '/selection-demo',
          component: './Xflows/SelectionDemo',
        },
        {
          name: '复制粘贴教学',
          path: '/clipboard-demo',
          component: './Xflows/ClipboardDemo',
        },
        {
          name: '快捷键教学',
          path: '/keyboard-demo',
          component: './Xflows/KeyboardDemo',
        },
        {
          name: '撤销重做教学',
          path: '/history-demo',
          component: './Xflows/HistoryDemo',
        },
      ],
    },
    {
      name: '进阶功能',
      routes: [
        {
          name: '滚动画布教学',
          path: '/scroller-demo',
          component: './Xflows/ScrollerDemo',
        },
        {
          name: '小地图教学',
          path: '/minimap-demo',
          component: './Xflows/MinimapDemo',
        },
      ],
    },
  ],
  npmClient: 'npm',
  utoopack: {},
});


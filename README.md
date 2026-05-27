# X6 流程图编辑器教学

<p align="center">
  <img src="https://img.shields.io/badge/X6-2.19.2-blue.svg" alt="X6">
  <img src="https://img.shields.io/badge/Umi-4.x-1890ff.svg" alt="Umi">
  <img src="https://img.shields.io/badge/Ant%20Design-5.x-0170fe.svg" alt="Ant Design">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

> 从零开始学习蚂蚁 AntV X6 图编辑引擎，通过 16 个精心设计的教学模块，帮助你快速掌握流程图、DAG、ER 图等可视化编辑器的开发。

## ✨ 特性

- 📚 **系统化教程**：16 个教学模块，从基础到进阶，循序渐进
- 💡 **交互式学习**：每个教程都包含可交互的 X6 画布演示
- 🎯 **实战导向**：50+ 代码示例，覆盖 X6 核心功能
- 🎨 **精美界面**：深色主题 Landing Page + GSAP 滚动动画
- 📦 **开箱即用**：基于 Umi Max 企业级框架，快速启动
- 🔄 **章节导航**：每个页面都有上一章/下一章按钮，流畅学习体验

## 📸 预览

```bash
# 克隆项目后运行
npm install
npm run dev
```

访问 http://localhost:8000 查看效果。

## 🛠️ 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| [AntV X6](https://x6.antv.antgroup.com/) | 图编辑引擎 | 2.19.2 |
| [Umi Max](https://umijs.org/) | 企业级前端框架 | 4.x |
| [Ant Design](https://ant.design/) | UI 组件库 | 5.x |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 | 5.x |
| [GSAP](https://greensock.com/gsap/) | 动画引擎 | 3.x |

## 📁 项目结构

```
├── public/                    # 静态资源
│   └── logo.svg              # 项目 Logo
├── src/
│   ├── assets/               # 静态资源
│   ├── components/           # 公共组件
│   │   └── PageNav/          # 章节导航组件
│   ├── constants/            # 常量定义
│   ├── models/               # 数据模型
│   ├── pages/                # 页面组件
│   │   ├── Home/             # 首页 (Landing Page)
│   │   └── Xflows/           # X6 教程页面
│   │       ├── Canvas.tsx           # 画布学习
│   │       ├── GraphConfig.tsx      # 画布配置
│   │       ├── GraphConfigPractice.tsx  # 画布配置练习
│   │       ├── NodeDemo.tsx         # 节点学习
│   │       ├── EdgeDemo.tsx         # 边学习
│   │       ├── PortDemo.tsx         # 连接桩学习
│   │       ├── PortPractice.tsx     # 连接桩练习
│   │       ├── PortFullDemo.tsx     # 连接桩完整教学
│   │       ├── ToolsDemo.tsx        # 工具教学
│   │       ├── SnaplineDemo.tsx     # 对齐线教学
│   │       ├── SelectionDemo.tsx    # 框选教学
│   │       ├── ClipboardDemo.tsx    # 复制粘贴教学
│   │       ├── KeyboardDemo.tsx     # 快捷键教学
│   │       ├── HistoryDemo.tsx      # 撤销重做教学
│   │       ├── ScrollerDemo.tsx     # 滚动画布教学
│   │       └── MinimapDemo.tsx      # 小地图教学
│   ├── services/             # API 服务
│   └── utils/                # 工具函数
├── .umirc.ts                 # Umi 配置
├── package.json              # 项目依赖
└── tsconfig.json             # TypeScript 配置
```

## 📖 完整教程列表

### 基础入门

| 教程 | 说明 | 路由 |
|------|------|------|
| 画布学习 | X6 画布的创建方式，掌握固定大小、容器大小和自适应三种模式 | `/canvas` |
| 画布配置 | 画布的常用配置项详解 | `/graph-config` |
| 画布配置练习 | 通过练习巩固画布配置知识 | `/graph-config-practice` |

### 节点与边

| 教程 | 说明 | 路由 |
|------|------|------|
| 节点学习 | 节点的创建、配置和自定义 | `/node-demo` |
| 边学习 | 边的连接方式、路径算法和样式配置 | `/edge-demo` |

### 连接桩

| 教程 | 说明 | 路由 |
|------|------|------|
| 连接桩学习 | 连接桩（Port）的概念和用法 | `/port-demo` |
| 连接桩练习 | 连接桩的实战练习 | `/port-practice` |
| 连接桩完整教学 | 连接桩的完整功能演示 | `/port-full-demo` |

### 工具与交互

| 教程 | 说明 | 路由 |
|------|------|------|
| 工具教学 | 节点工具、边工具的使用 | `/tools-demo` |
| 对齐线教学 | 对齐线插件的配置和使用 | `/snapline-demo` |
| 框选教学 | 选择与框选功能 | `/selection-demo` |
| 复制粘贴教学 | 剪切板功能 | `/clipboard-demo` |
| 快捷键教学 | 键盘快捷键绑定 | `/keyboard-demo` |
| 撤销重做教学 | 历史记录功能 | `/history-demo` |

### 进阶功能

| 教程 | 说明 | 路由 |
|------|------|------|
| 滚动画布教学 | 滚动画布插件 | `/scroller-demo` |
| 小地图教学 | 小地图插件 | `/minimap-demo` |

## 🚀 快速开始

### 一键启动（推荐）

```bash
git clone https://gitee.com/zhou-yangyang666/x6-teaching.git && cd x6-teaching && npm install && npm run dev
```

### 分步安装

#### 环境准备

- Node.js >= 16
- npm >= 8

#### 安装依赖

```bash
# 克隆项目
git clone https://gitee.com/zhou-yangyang666/x6-teaching.git

# 进入项目目录
cd x6-teaching

# 安装依赖
npm install
```

#### 启动开发

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:8000 查看效果。

#### 构建部署

```bash
# 构建生产版本
npm run build
```

## 📚 学习建议

1. **按顺序学习**：建议按照侧边栏菜单顺序学习，每个页面底部都有"上一章"和"下一章"导航按钮
2. **动手实践**：每个教程都包含可交互的演示，建议动手操作
3. **查看源码**：教程代码都有详细注释，可以直接查看源码学习

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源。

## 🙏 致谢

- [AntV X6](https://x6.antv.antgroup.com/) - 图编辑引擎
- [Umi Max](https://umijs.org/) - 企业级前端框架
- [Ant Design](https://ant.design/) - UI 组件库

---

如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！

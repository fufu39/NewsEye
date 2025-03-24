# **NewsEye - 新闻之眼伪造检测平台**

> 项目完成时间：2025.4 - 2025.5

NewsEye是一个新闻内容伪造检测与可视化平台。

项目基于 `Vue 2` 和 `Element UI` 构建，集成了 `ECharts` 等可视化库，旨在通过直观、动态的界面，帮助用户检测新闻文本、图片、视频等内容的真伪，并提供历史记录、数据总览、用户管理等全流程服务。



## **✨ 主要功能 (Features)**

- **文本/图片/视频伪造检测**
  - 支持上传新闻文本、图片、视频，对内容真伪进行自动化分析。
  - 采用多种算法模型，确保检测结果的准确性。
- **检测结果可视化**
  - 将复杂的检测结果以图表、标签等直观形式清晰展示。
  - 动态反馈检测进度与状态。
- **历史记录管理**
  - 自动保存每次检测的历史，支持按条件检索。
  - 可查看每条历史的详细检测过程与结果报告。
- **全功能用户系统**
  - 提供用户注册、验证码登录、密码修改及个人信息管理等完整服务。
  - 保障用户操作的安全与便捷。
- **良好的交互体验**
  - 包含进度提示、加载动画、清晰的结果反馈。
  - 采用响应式布局，适配 PC 及移动端等多终端访问。



## **🛠️ 技术栈 (Tools & Tech Stack)**

- **核心框架**：[Vue.js 2.x](https://v2.cn.vuejs.org/)、[Vue Router](https://v3.router.vuejs.org/zh/)
- **状态管理**：[Vuex](https://v3.vuex.vuejs.org/zh/)
- **UI 组件库**：[Element UI](https://www.google.com/search?q=https://element.eleme.cn/%23/zh-CN)
- **可视化**：[ECharts](https://echarts.apache.org/zh/index.html)
- **HTTP 请求**：[Axios](https://axios-http.com/)
- **工程化与工具**：
  - **构建工具**：Vue CLI
  - **代码规范**：ESLint



## **📁 目录结构 (Directory Structure)**

```
├── public/              # 公共资源与入口 HTML
├── src/
│   ├── api/             # 所有后端接口请求封装
│   ├── assets/          # 静态资源（图片、SVG等）
│   ├── components/      # 通用组件
│   ├── router/          # 路由配置
│   ├── store/           # Vuex 状态管理
│   ├── styles/          # 全局样式
│   ├── utils/           # 工具函数与封装
│   └── views/           # 页面视图
├── package.json         # 项目依赖与脚本
├── vue.config.js        # Vue CLI 配置
├── babel.config.js      # Babel 配置
└── README.md            # 项目说明文档
```



## **🚀 快速开始 (Getting Started)**

1. **克隆仓库**

   ```bash
   git clone <项目仓库地址>
   ```

2. **进入项目目录**

   ```bash
   cd NewsEye
   ```

3. **安装依赖**

   ```bash
   npm install
   ```

4. **运行开发服务器**

   ```bash
   npm run serve
   ```

5. **生产环境打包**

   ```bash
   npm run build
   ```

6. **代码规范检查与修复**

   ```bash
   npm run lint
   ```



------

***本项目仅供课程/科研/个人学习用途，禁止用于商业用途。***


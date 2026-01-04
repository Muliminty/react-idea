---
name: effectdetail-fullscreen-feature
overview: 在 EffectDetail 页面特效预览区域的右上角添加全屏功能，使用现有的 useFullscreen hook 实现全屏切换
todos:
  - id: explore-code
    content: 使用[subagent:code-explorer]探索EffectDetail.jsx和useFullscreen hook的现有代码结构
    status: completed
  - id: add-fullscreen-button
    content: 在特效预览区域右上角添加全屏按钮UI元素
    status: completed
    dependencies:
      - explore-code
  - id: integrate-hook
    content: 在EffectDetail组件中导入并使用useFullscreen hook
    status: completed
    dependencies:
      - explore-code
  - id: bind-button-function
    content: 将全屏按钮与useFullscreen hook的功能绑定
    status: completed
    dependencies:
      - add-fullscreen-button
      - integrate-hook
  - id: style-button
    content: 为全屏按钮添加合适的样式，确保与现有设计一致
    status: completed
    dependencies:
      - add-fullscreen-button
  - id: test-functionality
    content: 测试全屏功能的完整性和用户体验
    status: completed
    dependencies:
      - bind-button-function
      - style-button
---

## 产品概述

在特效详情页面的特效预览区域添加全屏功能，提升用户体验

## 核心功能

- 在特效预览区域右上角添加全屏按钮
- 使用现有的 useFullscreen hook 实现全屏切换功能
- 支持进入全屏和退出全屏状态
- 保持现有页面布局和功能的完整性

## 技术栈

- 前端框架：React
- 状态管理：现有的 useFullscreen hook
- 样式：项目现有样式系统

## 技术架构

### 模块划分

- **特效预览模块**：现有的特效预览区域，需要添加全屏功能
- **全屏控制模块**：使用现有的 useFullscreen hook 实现全屏切换逻辑

### 数据流

用户点击全屏按钮 → 调用 useFullscreen hook → 切换全屏状态 → 更新按钮图标和状态

## 实现细节

### 修改文件结构

```
react-idea/
├── src/
│   ├── components/
│   │   └── EffectDetail.jsx    # 需要修改的文件，添加全屏功能
│   ├── hooks/
│   │   └── useFullscreen.js    # 现有的全屏hook，需要引用使用
```

### 关键代码结构

**useFullscreen Hook 接口**：利用现有的全屏hook，提供进入全屏和退出全屏的功能

```javascript
// 现有的useFullscreen hook接口
const { isFullscreen, toggleFullscreen } = useFullscreen();
```

**特效预览组件修改**：在特效预览区域的右上角添加全屏按钮，绑定全屏切换功能

```javascript
// 新增的全屏按钮组件
<button onClick={toggleFullscreen} className="fullscreen-btn">
  {isFullscreen ? '退出全屏' : '全屏'}
</button>
```

## 代理扩展

### SubAgent

- **code-explorer**
- 目的：探索现有代码结构，了解EffectDetail.jsx和useFullscreen hook的具体实现
- 预期结果：获取当前组件结构和hook使用方式，确保修改的准确性
# 组件开发指南

本指南说明如何在项目中添加新的特效组件。

## 📁 目录结构

每个特效组件应该放在 `src/effects/` 目录下，使用以下结构：

```
src/effects/
  └── your-effect-name/          # 组件文件夹（使用 kebab-case）
      ├── index.jsx              # 组件入口文件（必需）
      ├── Component.jsx          # 组件实现文件（必需）
      └── Component.css          # 组件样式文件（可选）
```

## 📝 文件说明

### 1. index.jsx（必需）

这是组件的入口文件，系统会自动扫描这个文件来发现组件。

**必需导出：**
- `default`: React 组件
- `meta`: 组件元数据对象

**代码导出：**
- `code`: 组件代码字符串（使用 `?raw` 导入自动读取）
- `css`: 样式代码字符串（使用 `?raw` 导入自动读取）

**示例：**

```jsx
import Component from './Component'
// 使用 Vite 的 ?raw 导入来读取文件内容
import componentCode from './Component.jsx?raw'
import componentCss from './Component.css?raw'

export const meta = {
  id: 'my-awesome-effect',
  title: '我的特效',
  description: '这是一个很棒的特效',
  tags: ['动画', '交互'],
  category: '按钮',
  author: '你的名字',
  createdAt: new Date().toISOString(),
}

export default Component

// 导出代码（自动从文件读取）
export const code = componentCode
export const css = componentCss
```

### 2. Component.jsx（必需）

组件的实现文件，包含实际的 React 组件代码。

**示例：**

```jsx
import './Component.css'

function MyAwesomeEffect() {
  return (
    <div className="my-effect">
      {/* 你的组件内容 */}
    </div>
  )
}

export default MyAwesomeEffect
```

### 3. Component.css（可选）

组件的样式文件。如果不需要样式，可以省略此文件，但记得在 `index.jsx` 中也要移除对应的导入。

## 🚀 快速开始

### 方法一：复制模板（推荐）

1. 复制 `src/effects/_template/` 文件夹
2. 重命名为你的组件名称（使用 kebab-case，如 `my-awesome-effect`）
3. 修改 `index.jsx` 中的元数据
4. 在 `Component.jsx` 中实现你的组件
5. 在 `Component.css` 中添加样式（如果需要）
6. 刷新页面，你的组件会自动出现在界面上！

### 方法二：手动创建

1. 在 `src/effects/` 下创建新文件夹（使用 kebab-case）
2. 创建 `index.jsx` 文件，参考模板格式
3. 创建 `Component.jsx` 文件，实现组件
4. 创建 `Component.css` 文件（可选），添加样式
5. 确保在 `index.jsx` 中使用 `?raw` 导入代码和样式

## 📋 元数据字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识符，使用 kebab-case，与文件夹名保持一致 |
| `title` | string | ✅ | 组件标题，显示在卡片上 |
| `description` | string | ✅ | 组件描述，说明功能和特点 |
| `tags` | string[] | ✅ | 标签数组，用于搜索和筛选 |
| `category` | string | ❌ | 分类名称，用于分组显示 |
| `author` | string | ❌ | 作者名称 |
| `createdAt` | string | ❌ | 创建时间，ISO 格式 |

## 🎨 最佳实践

1. **命名规范**
   - 文件夹名：使用 kebab-case（如 `my-awesome-effect`）
   - 组件名：使用 PascalCase（如 `MyAwesomeEffect`）
   - ID：使用 kebab-case，与文件夹名保持一致

2. **代码组织**
   - 保持组件简洁，单一职责
   - 添加必要的注释

3. **样式**
   - 使用 CSS 变量（如 `var(--bg-primary)`）
   - 保持响应式设计
   - 避免全局样式污染

4. **元数据**
   - 提供清晰的标题和描述
   - 添加相关的标签
   - 选择合适的分类

## 🔍 标签建议

常用标签：
- `动画` - 包含动画效果
- `交互` - 需要用户交互
- `按钮` - 按钮相关
- `卡片` - 卡片相关
- `文字` - 文字效果
- `背景` - 背景效果
- `Canvas` - 使用 Canvas
- `CSS` - 纯 CSS 实现
- `React` - 使用 React Hooks

## 📦 示例

查看 `src/effects/particle-effect/` 目录下的组件作为参考。

## ❓ 常见问题

**Q: 组件会自动显示在界面上吗？**
A: 是的！只要按照规范创建文件，系统会自动发现并显示。刷新页面即可看到。

**Q: 如何更新组件？**
A: 直接修改组件文件，刷新页面即可看到更新。

**Q: 代码会自动读取吗？**
A: 是的，使用 `?raw` 导入可以自动读取文件内容。确保在 `index.jsx` 中正确导入。

**Q: 可以不使用 CSS 文件吗？**
A: 可以，如果不需要样式，可以不创建 `Component.css` 文件，并在 `index.jsx` 中移除对应的导入。

**Q: 可以添加多个文件吗？**
A: 可以，但建议保持结构简单。如果需要多个文件，可以在组件文件夹内创建子文件夹。

## 🎯 下一步

1. 查看现有组件示例（`src/effects/particle-effect/`）
2. 复制模板文件夹（`src/effects/_template/`）
3. 开始创建你的第一个特效组件！

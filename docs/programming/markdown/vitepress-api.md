---
title: "vitepress API"
order: 6
---
在 VitePress 的 Markdown 文件中，主要有以下几种 API 和特性可以使用：

## 1. **Frontmatter API**

```yaml
---
title: 页面标题
description: 页面描述
sidebar: true
editLink: false
---
```

## 2. **内置组件**

### 主题组件
- `<Badge type="info">` - 徽章
- `<VPTeamMembers>` - 团队成员展示
- `<VPCarbonAds>` - 广告组件

### 布局组件
```vue
<ClientOnly>
  <!-- 只在客户端渲染的内容 -->
</ClientOnly>

<VPButton>按钮</VPButton>
<VPCard>卡片</VPCard>
```

## 3. **内容插槽**

```md
::: slot name
插槽内容
:::
```

## 4. **容器指令**

```md
::: info
这是一个信息容器
:::

::: tip
这是一个提示容器
:::

::: warning
这是一个警告容器
:::

::: danger
这是一个危险警告容器
:::

::: details
这是一个可折叠的细节块
:::
```

## 5. **代码块增强**

````md
```js {1,3-5} [file.js]
// 高亮特定行
console.log('hello')
```

```js:line-numbers
// 显示行号
const a = 1
const b = 2
```
````

## 6. **链接和资源**

```md
<!-- 内部链接 -->
[首页](/)

<!-- 外部链接 -->
[VitePress](https://vitepress.dev)

<!-- 图片 -->
![alt text](/image.png)
```

## 7. **自定义容器样式**

```md
::: custom-container
自定义内容
:::
```

## 8. **Vue 特性**

```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = 'Hello VitePress'
</script>
```

## 9. **全局计算属性**

```md
当前页面路径：{{ $page.relativePath }}
当前页面的标题：{{ $frontmatter.title }}
站点配置：{{ $site }}
```

## 10. **Markdown 扩展**

```md
<!-- 锚点 -->
[标题](#标题)

<!-- 表格 -->
| 列1 | 列2 |
|-----|-----|
| 内容 | 内容 |

<!-- 任务列表 -->
- [x] 已完成
- [ ] 未完成
```

这些 API 可以让你在 Markdown 文件中实现丰富的功能和交互效果。
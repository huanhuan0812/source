---
title: "CSS"    # 显示在侧边栏的文本
order: 1            # 排序位置
collapsed: false     # 默认不折叠
---
# CSS 编写指南

CSS (层叠样式表) 用于控制网页的样式和布局。以下是编写 CSS 的一些基本方法和最佳实践：

## 基本语法结构

```css
selector {
  property: value;
  /* 注释 */
}
```

## 选择器类型

1. **元素选择器**：选择 HTML 元素
   ```css
   p {
     color: blue;
   }
   ```

2. **类选择器**：选择具有特定 class 的元素
   ```css
   .highlight {
     background-color: yellow;
   }
   ```

3. **ID 选择器**：选择具有特定 ID 的元素
   ```css
   #header {
     font-size: 24px;
   }
   ```

4. **属性选择器**：选择具有特定属性的元素
   ```css
   a[target="_blank"] {
     color: red;
   }
   ```

5. **伪类选择器**：选择元素的特定状态
   ```css
   a:hover {
     text-decoration: underline;
   }
   ```

## 常用 CSS 属性

- 文本样式：`color`, `font-size`, `font-family`, `text-align`
- 盒模型：`width`, `height`, `padding`, `margin`, `border`
- 布局：`display`, `position`, `float`, `flex`, `grid`
- 背景：`background-color`, `background-image`
- 动画：`transition`, `animation`

## 最佳实践

1. **组织代码结构**：
   ```css
   /* 重置和全局样式 */
   * { margin: 0; padding: 0; }
   
   /* 布局样式 */
   .container { width: 80%; margin: 0 auto; }
   
   /* 组件样式 */
   .button { padding: 10px 15px; }
   
   /* 页面特定样式 */
   .homepage-header { height: 100vh; }
   ```

2. **使用外部样式表**：
   ```html
   <link rel="stylesheet" href="styles.css">
   ```

3. **避免使用 !important**（除非必要）

4. **使用 CSS 预处理器**（如 Sass/Less）提高效率

5. **响应式设计**：
   ```css
   @media (max-width: 768px) {
     .container {
       width: 95%;
     }
   }
   ```

6. **使用变量（CSS 自定义属性）**：
   ```css
   :root {
     --primary-color: #3498db;
   }
   
   .button {
     background-color: var(--primary-color);
   }
   ```

## 现代 CSS 技术

1. **Flexbox 布局**：
   ```css
   .container {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

2. **Grid 布局**：
   ```css
   .container {
     display: grid;
     grid-template-columns: 1fr 2fr;
     gap: 20px;
   }
   ```

3. **CSS 动画**：
   ```css
   @keyframes slidein {
     from { transform: translateX(100%); }
     to { transform: translateX(0); }
   }
   
   .element {
     animation: slidein 1s ease-in-out;
   }
   ```
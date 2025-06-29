---
title: "markdown尖括号"  # 显示在侧边栏的文本
order: 3            # 排序位置
---

# Markdown 尖括号语法

尖括号 (`< >`) 在 Markdown 中有多种用途，以下是详细的语法说明：

## 1. 自动链接（URL 和邮箱）

用尖括号包裹的 URL 或邮箱地址会自动转换为可点击的链接：

```markdown
<https://example.com>
<user@example.com>
```

渲染效果：
- <https://example.com>
- <user@example.com>

## 2. HTML 标签

Markdown 支持直接使用 HTML 标签：

```markdown
这是 <strong>加粗</strong> 的文本。
<span style="color:red">红色文字</span>
```

## 3. 特殊字符转义

当需要显示字面意义的尖括号时（而非作为 HTML 标签）：

```markdown
使用 &lt; 表示 <，使用 &gt; 表示 >
```

或者在某些解析器中可以直接用反斜杠转义：
```markdown
\<div\>
```

## 4. 行内代码中的尖括号

在代码块或行内代码中，尖括号会按字面显示：

````markdown
`<html>` 标签

```
<div class="container">
</div>
```
````

## 5. 扩展用法（部分解析器支持）

### 锚点链接
```markdown
跳转到[章节1](#section1)

<h2 id="section1">章节1</h2>
```

### 图片尺寸控制（结合 HTML）
```markdown
<img src="image.png" alt="图片" width="200">
```

## 注意事项

1. 在纯 Markdown 内容中，尖括号内的内容会被解析为 HTML
2. 如果内容看起来像 HTML 标签但又不是有效标签，不同解析器处理方式不同
3. 在表格中需要使用尖括号时，建议用代码包裹或 HTML 实体转义

## 示例汇总

```markdown
自动链接：<https://example.com>

HTML 标签：<span style="color:blue">蓝色文字</span>

转义显示：&lt;div&gt; 或 \<div\>

代码中：`<header>` 标签

图片控制：<img src="logo.png" width="100" alt="Logo">
```
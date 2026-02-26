---
title: "HTML"    # 显示在侧边栏的文本
order: 1            # 排序位置
collapsed: false     # 默认不折叠
---

# HTML 基础

HTML（HyperText Markup Language）是用于创建网页的标准标记语言。下面是HTML的基础知识：

## 基本结构

```html
<!DOCTYPE html>
<html>
<head>
    <title>页面标题</title>
</head>
<body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
</body>
</html>
```

## 常用元素

### 标题
```html
<h1>这是标题1</h1>
<h2>这是标题2</h2>
<h3>这是标题3</h3>
```

### 段落
```html
<p>这是一个段落。</p>
```

### 链接
```html
<a href="https://www.example.com">这是一个链接</a>
```

### 图像
```html
<img src="image.jpg" alt="图片描述">
```

### 列表

**无序列表：**
```html
<ul>
    <li>项目1</li>
    <li>项目2</li>
</ul>
```

**有序列表：**
```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
</ol>
```

### 表格
```html
<table>
    <tr>
        <th>表头1</th>
        <th>表头2</th>
    </tr>
    <tr>
        <td>数据1</td>
        <td>数据2</td>
    </tr>
</table>
```

### 表单
```html
<form>
    <label for="fname">名字:</label>
    <input type="text" id="fname" name="fname"><br>
    <input type="submit" value="提交">
</form>
```

## 常用属性

- `class` - 为元素指定类名
- `id` - 为元素指定唯一ID
- `style` - 指定内联CSS样式
- `title` - 指定元素的额外信息（显示为工具提示）

## HTML5新增元素

```html
<header>页眉</header>
<nav>导航栏</nav>
<section>文档中的节</section>
<article>独立的内容</article>
<footer>页脚</footer>
<video>视频</video>
<audio>音频</audio>
```

## 注释
```html
<!-- 这是HTML注释 -->
```

HTML是网页开发的基础，与CSS和JavaScript一起构成了现代网页开发的三大核心技术。
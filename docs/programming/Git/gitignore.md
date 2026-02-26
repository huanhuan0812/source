---
title: ".gitignore用法"
order: 2
---
`.gitignore` 文件用于告诉 Git 哪些文件或目录应该被忽略，不纳入版本控制。以下是如何使用它的详细说明：

## 1. 创建 .gitignore 文件

### 在项目根目录创建：
```bash
touch .gitignore
```

### 或使用命令行：
```bash
echo ".DS_Store" >> .gitignore
```

## 2. 基本语法规则

### 注释：
```
# 这是一个注释
```

### 忽略特定文件：
```
filename.txt
```

### 忽略特定扩展名：
```
*.log
*.tmp
```

### 忽略目录：
```
node_modules/
dist/
```

### 使用通配符：
```
# 忽略所有 .tmp 文件
*.tmp

# 但跟踪 important.tmp
!important.tmp
```

### 忽略特定路径的文件：
```
# 忽略根目录的 config.ini
/config.ini

# 忽略所有目录下的 config.ini
config.ini
```

## 3. 常见配置示例

### Python项目：
```
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*.so
.Python

# Virtual environments
venv/
env/
```

### Node.js项目：
```
# Dependencies
node_modules/

# Build outputs
dist/
build/
*.tgz

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Java项目：
```
# Compiled class files
*.class

# Package Files
*.jar
*.war
*.ear

# IDE files
.idea/
*.iml
```

## 4. 特殊情况和技巧

### 已跟踪文件的处理：
如果文件已经被 Git 跟踪，需要先取消跟踪：
```bash
git rm --cached filename
```

### 全局 .gitignore：
创建全局忽略文件（对所有项目生效）：
```bash
git config --global core.excludesfile ~/.gitignore_global
```

### 检查忽略效果：
```bash
git status --ignored
```

## 5. 最佳实践

1. **尽早创建**：在项目开始时创建 `.gitignore`
2. **保持更新**：随着项目发展更新忽略规则
3. **使用模板**：GitHub 提供了各种语言的 `.gitignore` 模板
4. **不要忽略配置文件**：提供配置示例文件，如 `config.example.ini`
5. **团队统一**：确保团队使用相同的忽略规则

## 6. 获取官方模板

访问 [gitignore.io](https://www.toptal.com/developers/gitignore) 或 GitHub 的 [gitignore 仓库](https://github.com/github/gitignore) 获取各种语言的模板。

记住：`.gitignore` 文件本身应该被提交到仓库，以便团队成员共享相同的忽略规则。
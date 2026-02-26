---
title: "Git回退"
order: 2
---

## 1. **修改最近一次提交** (未推送)

```bash
# 修改提交信息
git commit --amend -m "新的提交信息"

# 添加漏掉的文件到上次提交
git add 漏掉的文件
git commit --amend

# 完全重置最近一次提交
git reset --soft HEAD~1  # 保留修改，重新提交
git reset --hard HEAD~1  # 彻底删除修改
```

## 2. **git reset - 回滚到指定版本** (适合本地)

```bash
# --soft: 保留工作区和暂存区的修改
git reset --soft <commit-hash>

# --mixed: 保留工作区，清空暂存区（默认）
git reset --mixed <commit-hash>
git reset <commit-hash>  # 同上

# --hard: 完全恢复到指定版本（工作区也会变）
git reset --hard <commit-hash>

# 回滚到上一个版本
git reset --hard HEAD^
git reset --hard HEAD~1

# 回滚到上两个版本
git reset --hard HEAD~2
```

## 3. **git revert - 安全回滚** (适合已推送)

```bash
# 撤销某次提交（会生成新的提交）
git revert <commit-hash>

# 撤销连续多个提交
git revert <oldest-commit>..<latest-commit>

# 撤销但不自动提交
git revert -n <commit-hash>
```

## 4. **撤销工作区/暂存区修改**

```bash
# 撤销工作区的修改
git checkout -- <file>
git restore <file>  # Git 2.23+ 推荐

# 撤销暂存区的修改
git reset HEAD <file>
git restore --staged <file>  # Git 2.23+ 推荐

# 撤销所有未提交的修改
git checkout .
git restore .  # Git 2.23+ 推荐
```

## 5. **实际场景示例**

### 场景1：刚提交到本地，还没推送
```bash
# 发现漏了文件或提交信息写错了
git add .
git commit --amend
```

### 场景2：已经推送了，需要撤销
```bash
# 安全方式：生成新的撤销提交
git revert HEAD
git push

# 危险方式：强制推送（团队项目慎用）
git reset --hard HEAD~1
git push --force-with-lease  # 比 --force 更安全
```

### 场景3：撤销多个提交
```bash
# 找到要回滚到的版本
git log --oneline

# 方式1：reset（彻底回滚）
git reset --hard abc1234

# 方式2：revert（逐个撤销）
git revert HEAD~3..HEAD
```

## 6. **查看历史版本**

```bash
# 查看提交历史
git log --oneline
git reflog  # 查看所有操作记录（包括reset后的）
```

## 关键区别：

- **git reset**：移动HEAD指针，可能丢失历史（本地使用）
- **git revert**：创建新提交撤销旧提交，保留历史（公共分支使用）
- **git amend**：修改最近一次提交

**建议**：已推送的提交用 `revert`，本地的用 `reset`。
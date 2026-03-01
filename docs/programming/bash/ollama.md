---
title: "ollama使用方法"
order: 3
---

## 1. 安装Ollama

### Windows/Mac
- 访问 [Ollama官网](https://ollama.ai)
- 下载对应系统的安装包
- 双击安装即可

### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

## 2. 基础命令使用

### 下载和运行模型
```bash
# 下载并运行模型（自动下载）
ollama run llama2
ollama run mistral
ollama run qwen:7b  # 通义千问

# 仅下载模型
ollama pull llama2

# 查看已下载的模型
ollama list
```

### 模型交互
```bash
# 直接对话
ollama run llama2 "你好，请介绍一下自己"

# 进入交互模式
ollama run llama2
>>> 你好
>>> 退出请按 /bye
```

## 3. 模型管理

```bash
# 查看所有模型
ollama list

# 删除模型
ollama rm llama2

# 查看模型详细信息
ollama show llama2

# 复制模型
ollama cp llama2 my-llama2
```

## 4. API服务使用

### 启动服务
```bash
# 默认启动在11434端口
ollama serve
```

### API调用示例
```bash
# 生成文本
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "你好"
}'

# 对话模式
curl http://localhost:11434/api/chat -d '{
  "model": "llama2",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}'
```

## 5. Python使用

```python
import requests
import json

# 生成文本
response = requests.post('http://localhost:11434/api/generate', 
    json={
        "model": "llama2",
        "prompt": "你好",
        "stream": False
    })
print(response.json()['response'])

# 流式输出
response = requests.post('http://localhost:11434/api/generate',
    json={
        "model": "llama2",
        "prompt": "讲个故事"
    },
    stream=True
)
for line in response.iter_lines():
    if line:
        print(json.loads(line)['response'], end='')
```

## 6. 常用模型推荐

- **llama2**: Meta的Llama 2模型
- **mistral**: Mistral AI的模型
- **qwen**: 阿里通义千问
- **codellama**: 代码专用模型
- **vicuna**: 对话优化模型

## 7. 高级用法

### 自定义模型
创建Modelfile:
```dockerfile
FROM llama2

# 设置参数
PARAMETER temperature 0.8
PARAMETER top_p 0.9

# 设置系统提示
SYSTEM You are a helpful AI assistant.
```

创建模型:
```bash
ollama create mymodel -f ./Modelfile
```

### 配置环境变量
```bash
# Windows
set OLLAMA_HOST=0.0.0.0:11434

# Linux/Mac
export OLLAMA_HOST=0.0.0.0:11434
```

## 8. 实用技巧

- **查看运行中的模型**: `ollama ps`
- **停止模型**: `ollama stop llama2`
- **设置并发数**: 环境变量 `OLLAMA_NUM_PARALLEL`
- **修改模型存储位置**: 环境变量 `OLLAMA_MODELS`

Ollama让本地运行大模型变得非常简单，适合开发测试和个人使用。需要我详细解释某个功能吗？

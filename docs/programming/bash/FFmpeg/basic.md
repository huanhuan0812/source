---
title: "FFmpeg基础"
order: 1
---

## 一、基础结构

```bash
ffmpeg [全局选项] {输入选项} -i 输入文件 {输出选项} 输出文件
```

## 二、常用功能示例

### 1. **格式转换**
```bash
# 视频转换
ffmpeg -i input.mp4 output.avi
ffmpeg -i input.mov output.mp4

# 音频转换
ffmpeg -i input.mp3 output.aac
ffmpeg -i input.wav output.mp3
```

### 2. **提取音频/视频**
```bash
# 提取音频
ffmpeg -i video.mp4 -vn audio.mp3

# 提取视频（去掉音频）
ffmpeg -i video.mp4 -an silent_video.mp4

# 从视频中提取图片
ffmpeg -i video.mp4 -r 1 image_%03d.jpg
```

### 3. **调整视频参数**
```bash
# 调整分辨率
ffmpeg -i input.mp4 -s 1280x720 output.mp4

# 调整码率
ffmpeg -i input.mp4 -b:v 1M output.mp4

# 调整帧率
ffmpeg -i input.mp4 -r 30 output.mp4

# 调整视频长度（截取）
ffmpeg -i input.mp4 -ss 00:01:00 -t 00:00:30 output.mp4
```

### 4. **合并音频和视频**
```bash
# 添加音频到视频
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4

# 合并多个视频
ffmpeg -f concat -i filelist.txt -c copy output.mp4
```

### 5. **视频压缩**
```bash
# 压缩视频大小
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4

# 调整音频码率
ffmpeg -i input.mp4 -b:a 128k output.mp4
```

## 三、常用选项说明

### **输入输出选项**
- `-i`：指定输入文件
- `-y`：覆盖输出文件
- `-n`：不覆盖输出文件
- `-f`：强制指定格式

### **视频选项**
- `-c:v` 或 `-vcodec`：视频编码器
  - `copy`：直接复制，不重新编码
  - `libx264`：H.264编码
  - `libx265`：H.265/HEVC编码
- `-b:v`：视频码率（如 1M, 500k）
- `-r`：帧率
- `-s`：分辨率（如 1920x1080）
- `-aspect`：宽高比
- `-vf`：视频过滤器

### **音频选项**
- `-c:a` 或 `-acodec`：音频编码器
- `-b:a`：音频码率
- `-ac`：声道数
- `-ar`：采样率
- `-af`：音频过滤器

### **其他重要选项**
- `-ss`：开始时间（如 00:00:10）
- `-t`：持续时间（如 00:00:30）
- `-to`：结束时间
- `-map`：选择流（如 `-map 0:v:0` 选择第一个输入文件的第一个视频流）

## 四、实用示例

### 1. **屏幕录制**
```bash
# Linux
ffmpeg -f x11grab -s 1920x1080 -i :0.0 output.mp4

# macOS
ffmpeg -f avfoundation -i "1:0" output.mp4
```

### 2. **创建GIF**
```bash
ffmpeg -i video.mp4 -vf "fps=10,scale=320:-1" output.gif
```

### 3. **添加水印**
```bash
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=10:10" output.mp4
```

### 4. **视频分割**
```bash
# 按时间分割
ffmpeg -i input.mp4 -ss 00:00:00 -t 00:10:00 output1.mp4
ffmpeg -i input.mp4 -ss 00:10:00 -t 00:10:00 output2.mp4
```

### 5. **获取媒体信息**
```bash
ffmpeg -i input.mp4
# 或使用专门工具
ffprobe input.mp4
```

## 五、常用编码器

### **视频编码器**
- H.264：`libx264`（最常用）
- H.265：`libx265`（更高压缩率）
- VP9：`libvpx-vp9`（WebM格式）
- AV1：`libaom-av1`（最新高效编码）

### **音频编码器**
- AAC：`aac`（MP4常用）
- MP3：`libmp3lame`
- Opus：`libopus`（高质量低延迟）

## 六、质量控制参数

```bash
# CRF值（0-51，值越小质量越好，23为默认）
ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4

# 预设（编码速度与压缩率平衡）
# ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 22 output.mp4
```

## 七、实用技巧

### 1. **批量处理**
```bash
# Linux/Mac
for file in *.mov; do
    ffmpeg -i "$file" "${file%.*}.mp4"
done

# Windows PowerShell
Get-ChildItem *.mov | ForEach-Object {
    ffmpeg -i $_ "$($_.BaseName).mp4"
}
```

### 2. **查看支持格式**
```bash
ffmpeg -formats
ffmpeg -codecs
```

### 3. **处理常见问题**
```bash
# 修复损坏的视频
ffmpeg -i corrupted.mp4 -c copy repaired.mp4

# 旋转视频
ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
# transpose值：1=顺时针90度，2=逆时针90度
```

## 八、性能优化建议

1. **硬件加速**（如果可用）：
```bash
# NVIDIA GPU
ffmpeg -hwaccel cuda -i input.mp4 output.mp4

# Intel Quick Sync
ffmpeg -hwaccel qsv -i input.mp4 output.mp4
```

2. **多线程处理**：
```bash
ffmpeg -i input.mp4 -threads 4 output.mp4
```

## 学习建议

1. **先测试**：使用小文件测试命令效果
2. **保持源质量**：尽量使用 `-c copy` 避免不必要的重新编码
3. **逐步学习**：从简单转换开始，逐步学习过滤器等高级功能
4. **查看文档**：`ffmpeg -h` 或访问官方文档

需要具体实现某个功能时，可以告诉我你的需求，我会提供详细命令！
---
title: "音视频"
order: 3
---
# FFmpeg 视频和音频选项参数大全

## 一、**视频选项 (Video Options)**

### **1. 视频编码器/解码器**
```bash
# 视频编解码器选择
-c:v <codec>          # 指定视频编码器
-vcodec <codec>       # 同 -c:v
-codec:v <codec>      # 同 -c:v

# 常见视频编码器
libx264               # H.264/AVC
libx265               # H.265/HEVC
libvpx                # VP8
libvpx-vp9            # VP9
libaom-av1            # AV1
mpeg4                 # MPEG-4 Part 2
libxvid               # Xvid
prores                # Apple ProRes
dnxhd                 # Avid DNxHD
```

### **2. 视频质量参数**
```bash
# 码率控制
-b:v <bitrate>        # 目标视频码率 (如 1M, 1500k)
-minrate <bitrate>    # 最小码率
-maxrate <bitrate>    # 最大码率
-bufsize <size>       # 码率控制缓冲区大小

# CRF (恒定质量模式)
-crf <0-51>           # H.264/H.265质量参数，值越小质量越好
                      # H.264: 默认23，建议18-28
                      # H.265: 默认28，建议23-35

# 量化参数
-q:v <value>          # 视频质量 (MPEG编码器)
-qscale:v <value>     # 同 -q:v
-qmin <value>         # 最小量化值
-qmax <value>         # 最大量化值
-qdiff <value>        # 量化值最大差值
```

### **3. 分辨率与缩放**
```bash
# 分辨率设置
-s <size>             # 设置帧大小 (如 1280x720)
-vf scale=W:H         # 使用过滤器缩放
-size <size>          # 帧大小 (已废弃，用-s)

# 缩放过滤器参数
-vf "scale=1280:720"                    # 精确缩放
-vf "scale=1280:-1"                     # 保持宽高比，自动计算高度
-vf "scale=-1:720"                      # 保持宽高比，自动计算宽度
-vf "scale=iw/2:ih/2"                   # 缩小为一半
-vf "scale=iw*2:ih*2"                   # 放大两倍
-vf "scale=1280:720:force_original_aspect_ratio=decrease" # 保持比例不超出
-vf "scale=1280:720:force_original_aspect_ratio=increase" # 保持比例填满
```

### **4. 帧率控制**
```bash
# 帧率设置
-r <fps>              # 设置帧率 (如 24, 25, 29.97, 30, 60)
-framerate <fps>      # 输入帧率
-fpsmax <fps>         # 最大帧率
-fps_mode <mode>      # 帧率模式 (cfr, vfr, passthrough)

# 帧率转换
-vf "fps=30"          # 强制转换为30fps
-vf "minterpolate='fps=60'" # 运动插值到60fps
```

### **5. 视频过滤器 (Video Filters)**
```bash
# 基础过滤器
-vf "<filter>"        # 应用视频过滤器
-filter:v "<filter>"  # 同 -vf

# 常用过滤器组合
-vf "crop=w:h:x:y"                  # 裁剪视频
-vf "transpose=1"                   # 旋转 (1=90°CW, 2=90°CCW, 3=90°CW+垂直翻转)
-vf "hflip"                         # 水平翻转
-vf "vflip"                         # 垂直翻转
-vf "pad=width:height:x:y:color"    # 填充
-vf "drawtext=text='Text':x=10:y=10:fontsize=24:fontcolor=white" # 添加文字
-vf "overlay=x:y"                   # 叠加图像/视频
-vf "colorbalance=rs=-0.2"          # 颜色调整
-vf "eq=brightness=0.1:contrast=1.2:saturation=1.5" # 亮度/对比度/饱和度
```

### **6. GOP结构**
```bash
# GOP (Group of Pictures) 控制
-g <frames>           # GOP大小 (关键帧间隔)
-keyint_min <frames>  # 最小GOP大小
-sc_threshold <value> # 场景切换阈值
```

### **7. 编码速度/质量预设**
```bash
# H.264/H.265预设
-preset <preset>      # 编码速度预设
# 预设值 (从快到慢):
# ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo

# 调优参数
-tune <tune>          # 针对特定内容优化
# tune值:
# film, animation, grain, stillimage, fastdecode, zerolatency

# 档次 (Profile)
-profile:v <profile>  # 编码档次
# H.264: baseline, main, high, high10, high422, high444
# H.265: main, main10, main12
```

### **8. 像素格式**
```bash
# 像素格式设置
-pix_fmt <format>     # 设置像素格式
# 常用格式:
# yuv420p (8-bit 4:2:0), yuvj420p, yuv422p, yuv444p
# yuv420p10le (10-bit 4:2:0), yuv422p10le, yuv444p10le
# rgb24, bgr24, rgba, bgra
```

### **9. 硬件加速**
```bash
# 硬件加速选项
-hwaccel <device>     # 硬件加速方法
# 值: cuda, dxva2, qsv, vaapi, vdpau, videotoolbox, opencl, vulkan

-hwaccel_device <dev> # 硬件加速设备
-hwaccel_output_format <fmt> # 硬件加速输出格式

# 编码器特定
-c:v h264_nvenc       # NVIDIA NVENC H.264
-c:v hevc_nvenc       # NVIDIA NVENC H.265
-c:v h264_qsv         # Intel Quick Sync H.264
-c:v hevc_qsv         # Intel Quick Sync H.265
-c:v h264_amf         # AMD AMF H.264
-c:v hevc_amf         # AMD AMF H.265
```

### **10. 其他视频选项**
```bash
# 编码器特定参数
-x264-params <params> # H.264编码器参数
-x265-params <params> # H.265编码器参数

# 视频流选择
-map 0:v:0            # 选择第一个输入的第一个视频流
-vn                   # 不处理视频流
-vsync <method>       # 视频同步方法 (0,1,2,passthrough,drop)
-aspect <ratio>       # 设置宽高比 (如 16:9, 4:3)
-disposition:v <value> # 流标记 (default, dub, original, comment, lyrics...)

# 时间相关
-t <duration>         # 录制/转换时长
-to <time>            # 停止时间
-ss <time>            # 开始时间
```

---

## 二、**音频选项 (Audio Options)**

### **1. 音频编码器/解码器**
```bash
# 音频编解码器选择
-c:a <codec>          # 指定音频编码器
-acodec <codec>       # 同 -c:a
-codec:a <codec>      # 同 -c:a

# 常见音频编码器
aac                   # AAC (高级音频编码)
libmp3lame            # MP3
libopus               # Opus
libvorbis             # Vorbis
flac                  # FLAC (无损)
pcm_s16le             # 16-bit PCM
pcm_s24le             # 24-bit PCM
pcm_f32le             # 32-bit浮点PCM
ac3                   # Dolby Digital
eac3                  # Dolby Digital Plus
```

### **2. 音频质量参数**
```bash
# 码率控制
-b:a <bitrate>        # 音频码率 (如 128k, 192k, 256k, 320k)
-ab <bitrate>         # 同 -b:a (已废弃)
-minrate:a <bitrate>  # 最小音频码率
-maxrate:a <bitrate>  # 最大音频码率

# 质量参数 (VBR)
-q:a <quality>        # 音频质量 (0-9, 值越小质量越好，libmp3lame: 0-9, libvorbis: -1-10)
-qscale:a <quality>   # 同 -q:a

# 压缩级别
-compression_level <level> # 压缩级别 (FLAC: 0-12, Opus: 0-10)
```

### **3. 声道处理**
```bash
# 声道配置
-ac <channels>        # 设置声道数 (1=单声道, 2=立体声, 6=5.1)
-af "pan=<layout>"    # 声道重映射
-af "channelsplit"    # 声道分离

# 声道布局
-channel_layout <layout> # 设置声道布局
# 常用布局: mono, stereo, 5.1, 7.1, quad, hexagon

# 示例
-ac 2                 # 转换为立体声
-ac 1                 # 转换为单声道
-af "pan=mono|c0=0.5*c0+0.5*c1" # 立体声合并为单声道
-af "pan=stereo|c0=c0|c1=c0"    # 单声道复制为立体声
```

### **4. 采样率**
```bash
# 采样率设置
-ar <rate>            # 设置采样率 (Hz)
# 常用值: 8000, 11025, 16000, 22050, 32000, 44100, 48000, 96000, 192000

# 重采样
-af "aresample=<options>" # 重采样过滤器
```

### **5. 音频过滤器 (Audio Filters)**
```bash
# 基础过滤器
-af "<filter>"        # 应用音频过滤器
-filter:a "<filter>"  # 同 -af

# 音量控制
-af "volume=<value>"  # 音量调整
# 示例:
-af "volume=2.0"      # 音量加倍
-af "volume=-10dB"    # 降低10dB
-af "volume=0.5"      # 音量减半
-af "loudnorm"        # 响度标准化 (EBU R128)

# 均衡器
-af "equalizer=f=1000:width_type=h:width=200:g=-10" # 均衡器

# 动态范围压缩
-af "compand"         # 压缩/扩展动态范围
-af "acompressor"     # 压缩器

# 噪声处理
-af "highpass=f=200"  # 高通滤波器
-af "lowpass=f=3000"  # 低通滤波器
-af "noisereduce"     # 降噪

# 延迟/回声
-af "adelay=1000|1000" # 声道延迟
-af "aecho=0.8:0.88:1000:0.4" # 回声效果

# 其他效果
-af "chorus=0.5:0.9:50|60|40:0.4|0.32|0.3:0.25|0.4|0.3:2|2.3|1.3" # 合唱效果
-af "flanger"         # 镶边效果
-af "phaser"          # 相位效果
```

### **6. 音频格式**
```bash
# 采样格式
-sample_fmt <format>  # 设置采样格式
# 常用格式: s16, s32, flt, dbl, u8, s16p, s32p, fltp, dblp

# 位深度
-bits_per_raw_sample <bits> # 位深度
```

### **7. 音频流选择与处理**
```bash
# 流选择
-map 0:a:0            # 选择第一个输入的第一个音频流
-an                   # 不处理音频流
-disposition:a <value> # 音频流标记

# 多语言音频处理
-metadata:s:a:0 language=eng # 设置第一个音频流语言为英语
-metadata:s:a:1 language=chi # 设置第二个音频流语言为中文
```

### **8. 音频同步**
```bash
# 同步参数
-async <samples>      # 音频同步方法
-af "aresync"         # 重采样同步
```

### **9. 编码器特定参数**
```bash
# AAC编码参数
-aac_coder <coder>    # AAC编码器 (fast, twoloop, anmr)
-aac_is <value>       # 强度立体声 (0=关闭, 1=开启)
-aac_ms <value>       # 中侧立体声 (0=关闭, 1=开启)
-aac_pred <value>     # 预测方法 (0=关闭, 1=开启)

# MP3编码参数
-joint_stereo <value> # 联合立体声模式 (-1=自动, 0=关闭, 1=开启)
```

### **10. 其他音频选项**
```bash
# 时间相关
-ss <time>            # 音频开始时间
-t <duration>         # 音频时长
-to <time>            # 音频结束时间

# 流复制
-c:a copy             # 复制音频流，不重新编码

# 音量检测
-af "volumedetect"    # 检测音量信息
```

---

## 三、**高级组合示例**

### **1. 完整视频处理命令**
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 22 \
  -x264-params "keyint=60:min-keyint=60:scenecut=0" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -pix_fmt yuv420p \
  -profile:v high -level 4.1 \
  -c:a aac -b:a 192k -ac 2 -ar 44100 \
  -af "loudnorm=I=-16:LRA=11:TP=-1.5" \
  -movflags +faststart \
  output.mp4
```

### **2. 专业音频提取与处理**
```bash
ffmpeg -i video.mp4 \
  -c:a libmp3lame -q:a 2 \
  -af "highpass=f=80,lowpass=f=15000,compand=attacks=0.1:decays=0.1:points=-80/-80|-60/-20|-20/-15|0/0" \
  -metadata title="Extracted Audio" \
  -metadata artist="Artist Name" \
  audio.mp3
```

### **3. 多流输出**
```bash
ffmpeg -i input.mov \
  -map 0:v:0 -map 0:a:0 -c:v libx264 -c:a aac video_audio.mp4 \
  -map 0:v:0 -c:v libx264 video_only.mp4 \
  -map 0:a:0 -c:a libmp3lame audio_only.mp3
```

### **4. 硬件加速转码**
```bash
# NVIDIA GPU加速
ffmpeg -hwaccel cuda -i input.mp4 \
  -c:v h264_nvenc -preset p5 -tune hq \
  -b:v 5M -maxrate 10M -bufsize 20M \
  -c:a aac -b:a 192k \
  output.mp4

# Intel Quick Sync
ffmpeg -hwaccel qsv -i input.mp4 \
  -c:v h264_qsv -global_quality 23 \
  -c:a copy \
  output.mp4
```

### **5. 批量处理脚本示例**
```bash
#!/bin/bash
for file in *.mov *.avi; do
  ffmpeg -i "$file" \
    -c:v libx264 -preset medium -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "${file%.*}.mp4"
done
```

---

## 四、**重要提示**

1. **编码器兼容性**：不同编码器支持的参数不同，使用前查看 `ffmpeg -h encoder=<encoder_name>`
2. **参数顺序**：输入参数要在 `-i` 之前，输出参数要在 `-i` 之后
3. **流映射**：使用 `-map` 精确控制哪些流被输出
4. **性能测试**：复杂命令先用短片段测试
5. **质量控制**：CRF值是最常用的质量控制方法


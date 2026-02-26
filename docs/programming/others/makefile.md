---
title: "makefile"
order: 2
---

## 1. 基本结构

```makefile
target: prerequisites
    recipe
```

- **target**: 要生成的目标文件或执行的操作名称
- **prerequisites**: 生成目标所依赖的文件或目标
- **recipe**: 生成目标需要执行的命令（必须以 Tab 开头）

## 2. 基本示例

```makefile
# 简单示例
hello: hello.c
    gcc -o hello hello.c

clean:
    rm -f hello
```

## 3. 变量

```makefile
# 定义变量
CC = gcc
CFLAGS = -Wall -O2
TARGET = program
SOURCES = main.c utils.c
OBJECTS = $(SOURCES:.c=.o)

# 使用变量
$(TARGET): $(OBJECTS)
    $(CC) $(CFLAGS) -o $(TARGET) $(OBJECTS)

# 自动变量
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
# $@ 表示目标文件
# $< 表示第一个依赖文件
# $^ 表示所有依赖文件
```

## 4. 模式规则

```makefile
# 将所有的 .c 文件编译为 .o 文件
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@

# 多个目标的规则
all: program1 program2

program1: obj1.o obj2.o
    $(CC) -o $@ $^

program2: obj3.o obj4.o
    $(CC) -o $@ $^
```

## 5. 伪目标

```makefile
.PHONY: all clean install

all: program

clean:
    rm -f *.o program

install:
    cp program /usr/local/bin/
```

## 6. 函数

```makefile
# 常用函数
SOURCES := $(wildcard src/*.c)      # 获取所有.c文件
OBJECTS := $(patsubst %.c,%.o,$(SOURCES))  # 替换后缀
DIRS := $(dir $(SOURCES))           # 获取目录名
BASENAMES := $(notdir $(SOURCES))   # 获取文件名

# 条件判断
ifeq ($(OS),Windows_NT)
    RM = del
else
    RM = rm -f
endif
```

## 7. 自动推导规则

```makefile
# Make 已经有内置规则，可以简写
program: main.o utils.o
    $(CC) $(CFLAGS) -o program main.o utils.o

# 不需要写如何从 .c 生成 .o
# Make 会自动使用 $(CC) -c
```

## 8. 包含其他 Makefile

```makefile
# 包含配置
include config.mk

# 条件包含
ifneq ($(MAKECMDGOALS),clean)
    include .depend
endif
```

## 9. 完整示例

```makefile
# Makefile 示例
CC = gcc
CFLAGS = -Wall -g
LDFLAGS = 
SOURCES = main.c utils.c
OBJECTS = $(SOURCES:.c=.o)
EXECUTABLE = myprogram

.PHONY: all clean

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(EXECUTABLE)

# 生成依赖关系
depend: .depend

.depend: $(SOURCES)
	$(CC) -MM $^ > $@

include .depend
```

## 10. 常用命令选项

```bash
# 基本使用
make              # 执行第一个目标
make target      # 执行指定目标
make -j4         # 使用4个并行任务
make -n          # 显示但不执行命令（干运行）
make -B          # 强制重新构建所有目标
make -f MyMakefile # 指定Makefile文件
make -C dir      # 进入目录执行make
```

## 11. 高级特性

```makefile
# 多行命令（用 \ 续行）
target:
    @echo "开始构建..." && \
    gcc -c file1.c && \
    gcc -c file2.c

# 错误处理（忽略错误）
clean:
    -rm -f *.o

# 命令回显控制
quiet_target:
    @echo "这条命令不会显示"
```

## 12. 目录创建

```makefile
OBJDIR = obj
BINDIR = bin

$(OBJDIR)/%.o: %.c | $(OBJDIR)
    $(CC) $(CFLAGS) -c $< -o $@

$(OBJDIR) $(BINDIR):
    mkdir -p $@
```

## 最佳实践建议

1. **使用变量** 提高可维护性
2. **声明伪目标** 避免与文件名冲突
3. **使用模式规则** 减少重复代码
4. **考虑并行构建** 使用 `-j` 选项
5. **保持向后兼容** 提供 `all`、`clean` 等常用目标

这是 Makefile 的核心语法，掌握了这些就能应对大多数构建场景。
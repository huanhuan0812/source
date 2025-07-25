---
title: "变量"
order: 2
---
# Java 数组详解

数组是Java中用来存储固定大小的同类型元素的数据结构。下面我将全面介绍Java数组的相关知识。

## 一、数组的基本概念

### 1. 数组特点
- **固定长度**：一旦创建，长度不可改变
- **相同类型**：所有元素必须是同一数据类型
- **有序集合**：元素按顺序存储，通过索引访问
- **内存连续**：数组元素在内存中是连续存储的

### 2. 数组分类
- 一维数组
- 多维数组（如二维数组）

## 二、数组的声明与初始化

### 1. 数组声明
```java
// 方式1：数据类型[] 数组名;
int[] arr1;

// 方式2：数据类型 数组名[];
int arr2[];
```
*推荐使用第一种方式，更符合Java规范*

### 2. 数组初始化

#### (1) 静态初始化
```java
// 完整格式
int[] arr1 = new int[]{1, 2, 3, 4, 5};

// 简化格式
int[] arr2 = {1, 2, 3, 4, 5};
```

#### (2) 动态初始化
```java
// 指定数组长度，系统分配默认值
int[] arr = new int[5]; // 5个元素，默认值0

// 默认值规则：
// 整型：0
// 浮点型：0.0
// 布尔型：false
// 字符型：'\u0000'
// 引用类型：null
```

## 三、数组的基本操作

### 1. 访问数组元素
```java
int[] arr = {10, 20, 30, 40, 50};

// 获取元素
int first = arr[0]; // 10
int third = arr[2]; // 30

// 修改元素
arr[1] = 200; // 数组变为 {10, 200, 30, 40, 50}
```

### 2. 获取数组长度
```java
int length = arr.length; // 注意不是length()
```

### 3. 遍历数组
```java
// 方式1：for循环
for(int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// 方式2：增强for循环
for(int num : arr) {
    System.out.println(num);
}

// 方式3：使用Arrays.toString()
System.out.println(Arrays.toString(arr));
```

## 四、多维数组

### 1. 二维数组声明与初始化
```java
// 静态初始化
int[][] arr1 = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

// 动态初始化
int[][] arr2 = new int[3][4]; // 3行4列
```

### 2. 二维数组访问
```java
int[][] arr = {{1, 2}, {3, 4, 5}, {6}};

// 获取元素
int val1 = arr[0][1]; // 2
int val2 = arr[1][2]; // 5

// 获取行数
int rows = arr.length; // 3

// 获取每行的列数
int cols1 = arr[0].length; // 2
int cols2 = arr[1].length; // 3
```

### 3. 二维数组遍历
```java
for(int i = 0; i < arr.length; i++) {
    for(int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
    System.out.println();
}
```

## 五、数组常见操作

### 1. 数组排序
```java
int[] arr = {5, 3, 8, 1, 2};

// 升序排序
Arrays.sort(arr); // arr变为 [1, 2, 3, 5, 8]

// 降序排序（需要转换为包装类）
Integer[] arr2 = {5, 3, 8, 1, 2};
Arrays.sort(arr2, Collections.reverseOrder());
```

### 2. 数组复制
```java
// 方式1：System.arraycopy()
int[] src = {1, 2, 3, 4, 5};
int[] dest = new int[5];
System.arraycopy(src, 0, dest, 0, src.length);

// 方式2：Arrays.copyOf()
int[] copied = Arrays.copyOf(src, src.length);

// 方式3：clone()
int[] cloned = src.clone();
```

### 3. 数组查找
```java
int[] arr = {10, 20, 30, 40, 50};

// 二分查找（数组必须已排序）
int index = Arrays.binarySearch(arr, 30); // 2

// 线性查找（自定义方法）
public static int linearSearch(int[] arr, int key) {
    for(int i = 0; i < arr.length; i++) {
        if(arr[i] == key) {
            return i;
        }
    }
    return -1;
}
```

## 六、Arrays工具类常用方法

```java
import java.util.Arrays;

int[] arr = {3, 1, 4, 1, 5, 9};

// 1. 排序
Arrays.sort(arr); // [1, 1, 3, 4, 5, 9]

// 2. 二分查找
int index = Arrays.binarySearch(arr, 4); // 3

// 3. 比较数组
int[] arr2 = {1, 1, 3, 4, 5, 9};
boolean equal = Arrays.equals(arr, arr2); // true

// 4. 填充数组
Arrays.fill(arr, 0); // [0, 0, 0, 0, 0, 0]

// 5. 转换为字符串
String str = Arrays.toString(arr); // "[0, 0, 0, 0, 0, 0]"
```

## 七、数组的注意事项

1. **数组越界**：访问不存在的索引会抛出`ArrayIndexOutOfBoundsException`
   ```java
   int[] arr = new int[3];
   arr[3] = 10; // 运行时错误
   ```

2. **空指针异常**：数组未初始化就使用会抛出`NullPointerException`
   ```java
   int[] arr;
   System.out.println(arr[0]); // 编译错误
   ```

3. **长度固定**：数组一旦创建，长度不能改变。需要动态大小考虑使用`ArrayList`

4. **内存分配**：大数组可能引发内存问题，需谨慎使用

5. **性能考虑**：数组在内存中是连续存储的，访问速度快，适合频繁访问的场景

## 八、数组与集合的转换

### 1. 数组转List
```java
String[] arr = {"a", "b", "c"};
List<String> list = Arrays.asList(arr); // 固定长度List
List<String> realList = new ArrayList<>(Arrays.asList(arr)); // 可变List
```

### 2. List转数组
```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");

// 方式1：转换为Object数组
Object[] arr1 = list.toArray();

// 方式2：转换为指定类型数组
String[] arr2 = list.toArray(new String[0]);
```

数组是Java中非常基础且重要的数据结构，掌握数组的使用对学习更复杂的数据结构和算法至关重要。
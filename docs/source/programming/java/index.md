---
title: "java"
order: 1
---
# Java 编程
- [mod](./mod/)

#基础知识
# Java 基础知识概览

## Java 语言特点
- **面向对象**：支持封装、继承、多态
- **平台无关性**：通过JVM实现"一次编写，到处运行"
- **健壮性**：强类型、异常处理、垃圾回收机制
- **多线程支持**：内置多线程功能
- **安全性**：提供安全管理机制

## 基本语法

### 数据类型
1. **基本数据类型**
   - 整型：byte(1), short(2), int(4), long(8)
   - 浮点型：float(4), double(8)
   - 字符型：char(2)
   - 布尔型：boolean(1)

2. **引用数据类型**
   - 类(class)
   - 接口(interface)
   - 数组

### 变量与常量
```java
int age = 25; // 变量
final double PI = 3.14159; // 常量
```

### 运算符
- 算术运算符：+ - * / % ++ --
- 关系运算符：== != > < >= <=
- 逻辑运算符：&& || !
- 位运算符：& | ^ ~ << >> >>>
- 赋值运算符：= += -= *= /= %=
- 三目运算符：? :

### 控制结构
1. **条件语句**
```java
if (condition) {
    // 代码块
} else if (condition) {
    // 代码块
} else {
    // 代码块
}
```

2. **循环语句**
```java
// for循环
for (int i = 0; i < 10; i++) {
    // 代码块
}

// while循环
while (condition) {
    // 代码块
}

// do-while循环
do {
    // 代码块
} while (condition);
```

3. **switch语句**
```java
switch (expression) {
    case value1:
        // 代码块
        break;
    case value2:
        // 代码块
        break;
    default:
        // 代码块
}
```

## 面向对象编程

### 类与对象
```java
// 定义类
public class Person {
    // 属性(成员变量)
    String name;
    int age;
    
    // 方法
    void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}

// 创建对象
Person person = new Person();
person.name = "Alice";
person.age = 20;
person.sayHello();
```

### 构造方法
```java
public class Person {
    String name;
    int age;
    
    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// 使用构造方法创建对象
Person person = new Person("Bob", 25);
```

### 继承
```java
public class Student extends Person {
    String school;
    
    public Student(String name, int age, String school) {
        super(name, age); // 调用父类构造方法
        this.school = school;
    }
}
```

### 多态
```java
// 父类
class Animal {
    void makeSound() {
        System.out.println("Animal sound");
    }
}

// 子类
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}

// 使用多态
Animal myAnimal = new Dog();
myAnimal.makeSound(); // 输出"Bark"
```

### 接口
```java
interface Drawable {
    void draw(); // 抽象方法
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}
```

## 异常处理
```java
try {
    // 可能抛出异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 处理异常
    System.out.println("Cannot divide by zero");
} finally {
    // 无论是否发生异常都会执行的代码
    System.out.println("This will always execute");
}
```

## 集合框架
- **List**：有序可重复
  - ArrayList
  - LinkedList
- **Set**：无序不重复
  - HashSet
  - TreeSet
- **Map**：键值对
  - HashMap
  - TreeMap

```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");

Map<String, Integer> map = new HashMap<>();
map.put("Apple", 10);
map.put("Banana", 20);
```

## 常用类

### String类
```java
String str = "Hello";
int length = str.length(); // 5
String substr = str.substring(0, 3); // "Hel"
boolean contains = str.contains("ell"); // true
```

### 包装类
```java
Integer num = Integer.valueOf("10"); // 字符串转Integer
int value = num.intValue(); // Integer转int
```

## 输入输出
```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
System.out.print("Enter your name: ");
String name = scanner.nextLine();
System.out.println("Hello, " + name);
```

## 多线程
```java
// 继承Thread类
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running");
    }
}

// 实现Runnable接口
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable is running");
    }
}

// 使用
Thread thread1 = new MyThread();
thread1.start();

Thread thread2 = new Thread(new MyRunnable());
thread2.start();
```

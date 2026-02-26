# Java Enum 用法详解

Enum (枚举) 是 Java 中一种特殊的类，用于表示一组固定的常量。以下是 enum 的主要用法：

## 1. 基本定义

```java
public enum Day {
    MONDAY, 
    TUESDAY, 
    WEDNESDAY,
    THURSDAY, 
    FRIDAY, 
    SATURDAY, 
    SUNDAY
}
```

## 2. 基本使用

```java
Day today = Day.MONDAY;

if (today == Day.SATURDAY || today == Day.SUNDAY) {
    System.out.println("It's weekend!");
} else {
    System.out.println("It's a weekday");
}
```

## 3. 带属性和方法的枚举

```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);
    
    private final double mass;   // 质量(kg)
    private final double radius; // 半径(m)
    
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    public double surfaceGravity() {
        return 6.67300E-11 * mass / (radius * radius);
    }
    
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}
```

## 4. 使用示例

```java
double earthWeight = 70; // kg
double mass = earthWeight / Planet.EARTH.surfaceGravity();

for (Planet p : Planet.values()) {
    System.out.printf("Your weight on %s is %f%n", 
                     p, p.surfaceWeight(mass));
}
```

## 5. 实现接口

枚举可以实现接口：

```java
public interface Command {
    void execute();
}

public enum Color implements Command {
    RED {
        public void execute() {
            System.out.println("Selected Red");
        }
    },
    GREEN {
        public void execute() {
            System.out.println("Selected Green");
        }
    },
    BLUE {
        public void execute() {
            System.out.println("Selected Blue");
        }
    };
}
```

## 6. 常用方法

- `values()`: 返回枚举的所有值
- `valueOf(String name)`: 根据名称返回枚举常量
- `ordinal()`: 返回枚举常量的序数(位置)
- `name()`: 返回枚举常量的名称

```java
Day[] days = Day.values();
Day monday = Day.valueOf("MONDAY");
int position = Day.MONDAY.ordinal(); // 0
String name = Day.MONDAY.name(); // "MONDAY"
```

## 7. 枚举与 switch 语句

```java
Day day = Day.MONDAY;

switch (day) {
    case MONDAY:
        System.out.println("星期一");
        break;
    case TUESDAY:
        System.out.println("星期二");
        break;
    // ...
    default:
        System.out.println("其他");
}
```

枚举是类型安全的，编译器会检查所有可能的值，避免传入无效值。

## 8. 单例模式实现

枚举是实现单例模式的最佳方式：

```java
public enum Singleton {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("Doing something");
    }
}

// 使用
Singleton.INSTANCE.doSomething();
```

枚举提供了线程安全的单例实现，并且能防止反序列化创建新对象。

希望这些示例能帮助你理解 Java 中 enum 的用法！
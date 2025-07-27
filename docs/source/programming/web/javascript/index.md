---
title: "javascript"    # 显示在侧边栏的文本
order: 3            # 排序位置
collapsed: false     # 默认不折叠
---

# JavaScript 基础

JavaScript 是一种轻量级的解释型编程语言，主要用于网页开发，为网页添加交互功能。以下是 JavaScript 的基础知识：

## 变量和数据类型

```javascript
// 变量声明 (ES6+)
let name = "Alice"; // 可重新赋值
const age = 25;     // 常量，不可重新赋值
var oldWay = "deprecated"; // 旧方式，不推荐

// 基本数据类型
let string = "Hello";
let number = 42;
let boolean = true;
let nullValue = null;
let undefinedValue;
let symbol = Symbol('unique');
let bigInt = 1234567890123456789012345678901234567890n;

// 引用类型
let object = { key: "value" };
let array = [1, 2, 3];
let func = function() {};
```

## 运算符

```javascript
// 算术运算符
let sum = 5 + 3; // 8
let difference = 5 - 3; // 2
let product = 5 * 3; // 15
let quotient = 5 / 3; // 1.666...
let remainder = 5 % 3; // 2
let exponent = 5 ** 3; // 125 (ES6)

// 比较运算符
5 == "5"; // true (宽松相等)
5 === "5"; // false (严格相等)
5 != "5"; // false
5 !== "5"; // true
5 > 3; // true
5 < 3; // false

// 逻辑运算符
true && false; // false (AND)
true || false; // true (OR)
!true; // false (NOT)
```

## 控制结构

```javascript
// 条件语句
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}

// 三元运算符
let status = (age >= 18) ? "Adult" : "Minor";

// switch语句
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("Weekend is coming");
        break;
    default:
        console.log("Midweek day");
}

// 循环
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}

let k = 0;
do {
    console.log(k);
    k++;
} while (k < 5);

// for...of 循环 (ES6)
for (let item of array) {
    console.log(item);
}

// for...in 循环 (用于对象)
for (let key in object) {
    console.log(key, object[key]);
}
```

## 函数

```javascript
// 函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 函数表达式
const greet = function(name) {
    return `Hello, ${name}!`;
};

// 箭头函数 (ES6)
const greet = (name) => `Hello, ${name}!`;

// 默认参数 (ES6)
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

// 剩余参数 (ES6)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// 立即调用函数表达式 (IIFE)
(function() {
    console.log("This runs immediately");
})();
```

## 对象和数组

```javascript
// 对象
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

// 访问属性
person.firstName; // "John"
person["lastName"]; // "Doe"
person.fullName(); // "John Doe"

// 数组
let fruits = ["Apple", "Banana", "Orange"];

// 数组方法
fruits.push("Mango"); // 添加元素
fruits.pop(); // 移除最后一个元素
fruits.length; // 3
fruits.indexOf("Banana"); // 1
fruits.slice(1, 3); // ["Banana", "Orange"]
fruits.map(fruit => fruit.toUpperCase()); // ["APPLE", "BANANA", "ORANGE"]
fruits.filter(fruit => fruit.length > 5); // ["Banana", "Orange"]
```

## 异步编程

```javascript
// 回调函数
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

fetchData(data => console.log(data));

// Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data received");
            // 或 reject("Error occurred");
        }, 1000);
    });
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// async/await (ES8)
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getData();
```

## DOM 操作

```javascript
// 选择元素
document.getElementById("myId");
document.querySelector(".myClass"); // 第一个匹配的元素
document.querySelectorAll("div"); // 所有匹配的元素

// 修改内容
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";

// 修改样式
element.style.color = "red";
element.classList.add("highlight");
element.classList.remove("highlight");
element.classList.toggle("active");

// 事件监听
element.addEventListener("click", function(event) {
    console.log("Clicked!", event.target);
});

// 创建元素
let newElement = document.createElement("div");
newElement.textContent = "New element";
document.body.appendChild(newElement);
```

## ES6+ 特性

```javascript
// 解构赋值
let [a, b] = [1, 2]; // a=1, b=2
let {x, y} = {x: 10, y: 20}; // x=10, y=20

// 展开运算符
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// 模板字符串
let message = `Hello, ${name}! 
Welcome to our website.`;

// 类
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
}

// 模块 (ES6)
// math.js
export const PI = 3.14159;
export function square(x) { return x * x; }

// app.js
import { PI, square } from './math.js';
```
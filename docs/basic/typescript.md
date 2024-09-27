---
title: typescript
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /logo.svg
---

# Typescript

## Typescript 起步
> TypeScript 是 JavaScript 的一个超集，支持 ES 6 标准。<br>
> TypeScript 由微软开发的自由和开源的编程语言。<br>
> TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上。

![TypeScript & JavaScript](/ts&js.png)

:::info TypeScript增加的功能：
- 类型批注和编译时类型检查
- 类型推断
- 类型擦除
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await
:::

### 安装 TypeScript
1. 安装 typescript：
``` bash
# npm 安装
npm i -g typescript
# yarn 安装
yarn global add typescript
# 部分mac电脑安装需要sudo权限
# sudo npm i -g typescript
# sudo yarn global add typescript
```

2. 查看 typescript 版本：
``` bash
tsc -v
```

3. 创建 `hello.ts` 文件，代码如下：
```typescript
var message:string = "Hello World" 
console.log(message)
```

4. 编译 typescript 文件：

``` bash
tsc hello.ts
```

这时候在当前目录下（与 `hello.ts` 同一目录）就会生成一个 `hello.js` 文件，代码如下：

```javascript
var message = "Hello World";
console.log(message);
```

5. 运行 js 文件：

``` bash
node hello.js
```

输出：Hello World

### tsc常用编译参数

 - `--help` 显示帮助信息
 - `--declaration` 生成.d.ts 文件
    - `tsc ts-hw.ts --declaration` 命令会同时生成 `ts-hw.js` 和 `ts-hw.d.ts` 文件
 - `--removeComments` 删除注释


## TypeScript 基础语法

### 基础类型

1. 任意类型 `any`：声明为 any 的变量可以赋予任意类型的值

```typescript
let myVariable: any = 123;
myVariable = "Hello World";
```

2. 数字类型 `number`：双精度 64 位浮点值。它可以用来表示整数和分数。

```typescript
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
```

3. 字符串类型 `string`：字符串类型用来表示文本数据。

```typescript
let name: string = "Runoob";
let years: number = 5;
let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;
```

4. 布尔类型 `boolean`：布尔类型只有两个值：true 和 false。

```typescript
let isDone: boolean = false;
```

5. 数组类型：数组类型用来表示一组有序的元素。

```typescript
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
```

6. 元组类型：用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

```typescript
let a: [string, number] = ['Runoob', 1];    // 运行正常
let b: [string, number] = [1, 'Runoob'];    // 报错

console.log(a[0]);    // 输出 Runoob

let c: [id: number, name: string] = [1, "Runoob"];
console.log(c[0]);    // 输出 1
```

7. 枚举类型 `enum`：枚举类型是一组命名常量的集合。

```typescript
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
console.log(c);    // 输出 1

enum Color {Red = 3, Green, Blue};
let c: Color = Color.Green;
console.log(c);    // 输出 4

enum Color {Red = '红色', Green = '绿色', Blue = '蓝色'};
let c: Color = Color.Green;
console.log(c);    // 输出 绿色
```

8. `void` 类型：用于标识方法返回值的类型，表示该方法没有返回值。

```typescript
function hello(): void {
    alert("Hello Runoob");
}
```

9. `null`：表示对象值缺失

10. `undefined`：用于初始化变量为一个未定义的值

11. `never` 类型：表示永不存在的值的类型，是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。

### 变量声明
以 let 来声明变量举例：

- 声明变量的类型及初始值：

```typescript
let num: number = 123;
let str: string = "Hello World";
let bool: boolean = true;
```

- 声明变量的类型，但没有初始值，变量值会设置为 `undefined`：

```typescript
let num: number;
let str: string;
let bool: boolean;
```

- 声明变量并初始值，但不设置类型，该变量可以是任意类型 `any`：

```typescript
let myVariable = 123;
myVariable = "Hello World";
```

- 声明变量没有设置类型和初始值，类型可以是任意类型 `any`，默认初始值为 `undefined`：

```typescript
let myVariable;
```

### 函数

1. 函数声明：

```typescript
// 1. 普通函数声明
function function_name(param1: type1, param2: type2,...): returnType {
  // 执行代码

  return returnValue;
}

// 2. 函数表达式（Lambda 表达式函数）
let myFunc = (param1: type1, param2: type2,...): returnType => {
  // 执行代码

  return returnValue;
}

type AddFn = (param1: type1, param2: type2,...) => returnType
const add: AddFn = (param1, param2) => {
  return param1 + param2
}
```

2. 带参数的函数声明：

```typescript
// 1. 普通函数声明
function function_name(param1: type1, param2: type2,...) {
  // 执行代码
}

// 2. 函数表达式（Lambda 表达式函数）
let myFunc = (param1: type1, param2: type2,...) => {
  // 执行代码
}
```
  - 可选参数：
  > 在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 `?`。
  ```typescript
  function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
  }
  
  let result1 = buildName("Bob");                  // 错误，缺少参数
  let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
  let result3 = buildName("Bob", "Adams");         // 正确

  function buildName(firstName: string, lastName?: string) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
    }
    
  let result1 = buildName("Bob");  // 正确
  let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
  let result3 = buildName("Bob", "Adams");  // 正确
  ```

  - 默认参数：
  我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数，语法格式为：

  ```typescript
  function function_name(param1: type1 = defaultValue1, param2: type2 = defaultValue2,...) {
    // 执行代码
  }
  ```

  **注意：** 参数不能同时设置为 `可选` 和 `默认`。

  ```typescript
  function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
  } 
  calculate_discount(1000) 
  calculate_discount(1000,0.30)
  ```

  - 剩余参数：
  > 有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。<br>
  > 剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。<br>
  > 函数的最后一个命名参数以 `...` 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到这个数组的长度（不包括）。

  ```typescript
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }
    
  let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
  ```

3. 函数返回值：
  - 有返回值的函数：
  ```typescript
  // 1. 普通函数
  function add(x: number, y: number): number {
    return x + y;
  }

  // 2. 函数表达式
  let myFunc = (x: number, y: number): number => {
    return x + y;
  }
  ```

  - 无返回值的函数：
  ```typescript
  // 1. 普通函数
  function log(message: string): void {
    console.log(message);
  }

  // 2. 函数表达式
  let myFunc = (message: string): void => {
    console.log(message);
  }
  ```

4. 函数重载：
  > 函数重载是定义了多个函数，但它们具有相同的名称，只不过它们的参数类型或个数不同。

  - 参数类型不同：
  ```typescript
  function disp(param: string): void { }

  function disp(param: number): void { }
  ```

  - 参数个数不同：
  ```typescript
  function disp(param1: string, param2: string): void { }

  function disp(param1: string): void { }
  ```

  - 参数类型顺序不同：
  ```typescript
  function disp(param1: string, param2: number): void { }

  function disp(param2: number, param1: string): void { }
  ```

### 字面量类型
TypeScript 允许我们使用字面量类型来定义一个变量的类型，字面量类型可以是数字、字符串、布尔值、数组、元组、枚举值等。

```typescript
let decimal: 10 = 10;
let name: "Runoob" = "Runoob";
let isDone: true = true;
```

### 联合类型
通过管道 `|` 将变量设置多种类型，赋值时可以根据设置的类型来赋值。

- 语法：
```typescript
let myVariable: type1 | type2 |...;
```

- 举例：
```typescript
let myVariable: string | number;
myVariable = "Hello World";
myVariable = 123;
myVariable = true;    // 报错
```

### 类型别名
类型别名用来给一个类型起一个新的名字，类型别名可以用来简化复杂的类型，增强代码的可读性。

- 语法：
```typescript
type type_name = type;
```

- 举例：
```typescript
type Name = string;
type Age = number;
type Person = {
  name: Name;
  age: Age;
  sayHello(): void;
}
```

### 接口
接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

- 语法：
```typescript
interface interface_name {
  // 方法声明
}
```

- 举例：
```typescript
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

let person: Person = {
  name: "John",
  age: 30,
  sayHello(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
};
person.sayHello();
```

- 接口继承：
    > Typescript 允许接口继承多个接口。<br>
    > 继承使用关键字 `extends`。
    ```typescript
    interface A {
      a: number;
      b: string;
    }

    // 1. 单接口继承
    interface B extends A {
      c: boolean;
    }

    // 2. 多接口继承
    interface C extends A, B {
      d: any;
    }
    ```

- & 交叉类型
    > 交叉类型是将多个类型合并为一个类型。<br>
    > 语法：`type intersection_type = type1 & type2;`
    ```typescript
    interface A {
      a: number;
      b: string;
    }

    interface B {
      c: boolean;
      d: any;
    }

    // 交叉类型
    type C = A & B;
    ```

- interface 和 type 的区别
  > interface 用来描述一个对象，而 type 用来描述一个类型。<br>
  > interface 可重复定义（类型累加），而 type 不可重复定义。<br>
  > interface 用 `extends` 关键字来继承达到复用，而 type 用 `&` 来合并达到复用。<br>

  ```typescript
  // interface 重复定义
  interface Person {
    name: string
  }
  interface Person {
    age: number
  }
  // 类型会合并，注意：属性类型和方法类型不能重复定义
  const p: Person = {
    name: 'jack',
    age: 18
  }

  // type 不可重复定义
  type Person = {
    name: string
  }
  // 标识符“Person”重复  Error
  type Person = {
    age: number
  }

  ```


### 类
TypeScript 支持面向对象编程，允许创建类、继承、实现接口、访问修饰符等。

- 语法：
```typescript
class class_name { 
  // 类作用域
}
```

- 举例：
```typescript
class Car { 
   // 字段
   engine:string; 
   
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
} 
 
// 创建一个对象
var obj = new Car("XXSY1")
 
// 访问字段
console.log("读取发动机型号 :  "+obj.engine)  
 
// 访问方法
obj.disp()
```

- 类的继承
  > 类继承使用关键字 `extends`，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。<br>
  > TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为`父类`，继承它的类称为`子类`。<br>
  > TypeScript 一次只能继承一个类，不支持继承多个类，但支持多重继承。

  ```typescript
  class Shape { 
    Area:number 
   
    constructor(a:number) { 
      this.Area = a 
    } 
  } 
  
  class Circle extends Shape { 
    disp():void { 
      console.log("圆的面积:  "+this.Area) 
    } 
  }
    
  var obj = new Circle(223); 
  obj.disp()


  // 多重继承
  class Root { 
    str:string; 
  } 
  
  class Child extends Root {} 
  class Leaf extends Child {} // 多重继承，继承了 Child 和 Root 类
  
  var obj = new Leaf(); 
  obj.str ="hello" 
  console.log(obj.str)
  ```

  继承类的方法重写：
  > 类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。
  > 其中 `super` 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

  ```typescript
  class PrinterClass { 
    doPrint():void {
      console.log("父类的 doPrint() 方法。") 
    } 
  } 
  
  class StringPrinter extends PrinterClass { 
    doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
    } 
  }
  ```

  访问控制修饰符：
  > TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。

  TypeScript 支持 3 种不同的访问权限：
    - public（默认） : 公有，可以在任何地方被访问。
    - protected : 受保护，可以被其自身以及其子类访问。
    - private : 私有，只能被其定义所在的类访问。

- 类使用关键字 `implements` 实现接口：

  ```typescript
  interface Person {
    name: string;
    age: number;
    sayHello(): void;
  }

  class Student implements Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    sayHello(): void {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }

  let student: Person = new Student("Runoob", 18);
  student.sayHello();
  ```

### 类型断言
> 类型断言（Type assertion）是一种强制类型转换，它允许你告诉编译器，你相信某个值的类型。
> 使用 `as` 关键字来进行类型断言。

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

**解析：** 类型断言告诉编译器，`someValue` 是一个 `string` 类型的值，因此我们可以使用 `as` 关键字将其转换为 `string` 类型。

### 泛型
> 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候再指定类型的一种特性。

泛型的优势包括：

- 代码重用： 可以编写与特定类型无关的通用代码，提高代码的复用性。
- 类型安全： 在编译时进行类型检查，避免在运行时出现类型错误。
- 抽象性： 允许编写更抽象和通用的代码，适应不同的数据类型和数据结构。

1. 泛型标识符：
在泛型中，通常使用一些约定俗成的标识符，比如常见的 `T`（表示 Type）、`U`、`V` 等，但实际上你可以使用任何标识符。<br>
  
`T`: 代表 "Type"，是最常见的泛型类型参数名。

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

2. 泛型函数
使用泛型来创建一个可以处理不同类型的函数：

```typescript
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let result = identity<string>("Hello");
console.log(result); // 输出: Hello

let numberResult = identity<number>(42);
console.log(numberResult); // 输出: 42
```

3. 泛型接口
使用泛型来创建一个可以处理不同类型的接口：

```typescript
// 基本语法
interface Pair<T, U> {
    first: T;
    second: U;
}

// 使用泛型接口
let pair1: Pair<string, number> = { first: "hello", second: 42 };
console.log(pair1); // 输出: { first: 'hello', second: 42 }

let pair2: Pair<number, string> = { first: 123, second: "world" };
console.log(pair2); // 输出: { first: 123, second: 'world' }
```

4. 泛型类
使用泛型来创建一个可以处理不同类型的类：

```typescript
// 基本语法
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

// 使用泛型类
let stringBox = new Box<string>("TypeScript");
console.log(stringBox.getValue()); // 输出: TypeScript

let numberBox = new Box<number>(42);
console.log(numberBox.getValue()); // 输出: 42
```

5. 泛型约束
> 泛型约束是指对泛型类型参数的约束，它可以指定类型参数必须是某种类型或其子类型。

示例1：

```typescript
function copyArray<T extends number | string>(arr: T[]): T[] {
  return arr.slice();
}

let arr1 = [1, 2, 3];
let arr2 = copyArray(arr1);
console.log(arr2); // 输出: [1, 2, 3]


let arr3 = ["a", "b", "c"];
let arr4 = copyArray(arr3);
console.log(arr4); // 输出: ["a", "b", "c"]

// 报错
let arr5 = [true, false];
let arr6 = copyArray(arr5);
console.log(arr6); // 输出: 报错
```

示例2：
```typescript
// 基本语法
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

// 正确的使用
logLength("hello"); // 输出: 5

// 错误的使用，因为数字没有 length 属性
logLength(42); // 错误
```
**解析：** 在这个例子中，定义了一个泛型函数 logLength，它接受一个类型为 T 的参数，但有一个约束条件，即 T 必须实现 Lengthwise 接口，该接口要求有 length 属性。因此，可以正确调用 logLength("hello")，但不能调用 logLength(42)，因为数字没有 length 属性。

6. 泛型与默认值
可以给泛型设置默认值，使得在不指定类型参数时能够使用默认类型：

```typescript
// 基本语法
function defaultValue<T = string>(arg: T): T {
    return arg;
}

// 使用带默认值的泛型函数
let result1 = defaultValue<string>("hello"); 
let result2 = defaultValue(42);               // 推断为 number 类型
```
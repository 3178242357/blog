---
title: javascript
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /assets/logo.svg
---

## JavaScript 基础

### 变量
存储数据的容器，JavaScript 中变量的声明和使用方式与其他语言类似，但也有一些不同之处。
 - 变量名必须以字母、数字、下划线或美元符号开头。
 - 变量名区分大小写。
 - 变量名不能包含空格。
 - 变量名不能使用关键字。
 - 变量名不能与 JavaScript 保留字冲突。
 - 变量名最好使用有意义的名字。

**声明变量的方式有 3 种：**
   - `var` 声明一个全局变量。
   - `let` 声明一个块级作用域的局部变量。（ES6 新增）
   - `const` 声明一个常量，不能被修改。（ES6 新增）

语法：
  ```javascript
    var variableName1  // 值为 undefined
    var variableName2 = value;  // 值为 value
    var variableName3 = value, variableName4 = value;  // 同时声明多个变量

    let letiableName1  // 值为 undefined
    let letiableName2 = value;  // 值为 value
    let letiableName3 = value, letiableName4 = value;  // 同时声明多个变量

    const constantName = value;  // 值为 value
    const constantName1 = value, constantName2 = value;  // 同时声明多个常量并初始化
  ```

**var、let 和 const 的区别：**
  1. 变量作用域:
      - `var`:
      在全局作用域中声明的 `var` 变量将成为全局变量。
      具有函数作用域，即在函数内部声明的变量在整个函数内部都是可见的。
      - `let` 和 `const`:
      具有块作用域，即在 `{ }` 包围的代码块内部声明的变量只在该代码块内可见。
      这意味着在 `if 语句` 或 `循环` 等代码块内部声明的变量不会泄漏到外部作用域。
  2. 变量提升 
      - `var`:
      变量声明会被提升到作用域的顶部，但初始化不会。
      这意味着你可以先使用变量再声明它，但它的值将是 `undefined`。
      `let` 和 `const`:
      不会被提升，必须在使用前声明。
      在声明之前使用这些变量会导致引用错误（ReferenceError）。
  3. 重新赋值
      - `var` 和 `let`:
      可以重新赋值。
      例如，`let x = 10; x = 20;` 是有效的。
      - `const`:
      一旦被赋值就不能重新赋值。
      例如，`const y = 10; y = 20;` 会导致类型错误（TypeError）。
  4. 初始化
      - `var` 和 `let`:
      可以在声明时不初始化。
      例如，let z; 是合法的。
      - `const`:
      必须在声明时初始化。
      例如，`const w;` 会导致语法错误（SyntaxError）。

### 作用域
> 在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。

JavaScript 有两种作用域：
- 全局作用域：全局作用域中的变量可以在整个程序中访问。
- 函数作用域：函数作用域中的变量只能在函数内部访问。

**注意：** 
> 局部变量在函数开始执行时创建，函数执行完后局部变量会自动销毁。<br>
> 如果变量在函数内没有声明（没有使用 var 关键字），该变量为全局变量。<br>
> 函数参数只在函数内起作用，是局部变量。

JavaScript 变量生命周期：
> JavaScript 变量生命周期在它声明时初始化。<br>
> 局部变量在函数执行完毕后销毁。<br>
> 全局变量在页面关闭后销毁

✍️你知道吗?
> 在 JavaScript 中，函数内部的局部变量通常不可以直接被外部作用域访问，但有几种方式可以将函数内的局部变量暴露给外部作用域，具体如下：

  - 通过全局对象：在函数内部，可以通过将局部变量赋值给 window 对象的属性来使其成为全局可访问的。例如，使用 `window.a = a;` 语句，可以在函数外部通过 `window.a` 访问到这个局部变量的值。
  - 定义全局变量：在函数内部不使用 `var`、`let` 或 `const` 等关键字声明变量时，该变量会被视为全局变量，从而可以在函数外部访问。但这种做法通常不推荐，因为它可能导致意外的副作用和代码难以维护。
  - 返回值：可以通过在函数内部使用 `return` 语句返回局部变量的值，然后在函数外部接收这个返回值。这样，虽然局部变量本身不会被暴露，但其值可以通过函数调用传递到外部。
  - 闭包：JavaScript 中的闭包特性允许内部函数访问外部函数的局部变量。即使外部函数执行完毕后，其局部变量仍然可以被内部函数引用。
  - 属性和方法：定义在全局作用域中的变量和函数都会变成 `window` 对象的属性和方法，因此可以在调用时省略 `window`，直接使用变量名或函数名。

### 数据类型
1. 值类型：
  - 字符串（String）
  - 数值（Number）
  - 布尔值（Boolean）
  - 空（Null）
  - 未定义（Undefined）
  - Symbol（ES6 新增）
2. 引用类型：
  - 对象（Object）
  - 数组（Array）
  - 函数（Function）
  - 日期（Date）
  - 正则（RegExp）

### 检测变量的数据类型。

- `typeof` 操作符

语法：
  ```javascript
  typeof "John"                // 返回 string 
  typeof 3.14                  // 返回 number
  typeof NaN                   // 返回 number
  typeof false                 // 返回 boolean
  typeof [1,2,3,4]             // 返回 object
  typeof {name:'John', age:34} // 返回 object
  typeof new Date()            // 返回 object
  typeof null                  // 返回 object
  typeof undefined             // 返回 undefined
  typeof myCar                 // 返回 undefined (如果 myCar 没有声明)
  typeof function() {}         // 返回 function
  ```

**undefined 和 null 的区别：**
- `undefined` 是一个表示“未定义”的值，表示变量没有被赋值。
- `null` 是一个表示“空”的值，表示一个空对象指针。

`null` 和 `undefined` 的值相等，但类型不等：

```javascript
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```

- `constructor` 属性
  `typeof` 操作符无法检测对象类型，可以使用 `constructor` 属性来检测：

语法：
  ```javascript
  "John".constructor                  // 返回函数 String()  { [native code] }
  (3.14).constructor                  // 返回函数 Number()  { [native code] }
  false.constructor                   // 返回函数 Boolean() { [native code] }
  [1,2,3,4].constructor               // 返回函数 Array()   { [native code] }
  {name:'John', age:34}.constructor   // 返回函数 Object()  { [native code] }
  new Date().constructor              // 返回函数 Date()    { [native code] }
  function () {}.constructor          // 返回函数 Function(){ [native code] }
  ```

### 类型转换
> Number() 转换为数字， String() 转换为字符串， Boolean() 转换为布尔值。

|       原始值           |  转换为数字       |	    转换为字符串     |  转换为布尔值  |
| --------------------- |:-----------------:|:--------------------:|:-------------:|
|  false                |	      0           |	     "false"         |  	false      |
|  true	                |		    1	          |      "true"	         |    true	     |
|    0	                |		    0	          |        "0"	         |    false	     |
|    1	                |		    1	          |        "1"	         |    true	     |
|   "0"   	            |		    0	          |        "0"	         |    true	     |
|  "000"	              |		    0	          |       "000"	         |    true	     |
|   "1"	                |		    1	          |        "1"	         |    true	     |
|   NaN	                |		   NaN	        |       "NaN"	         |    false	     |
|  Infinity	            |		 Infinity       |     "Infinity"	     |    true	     |
|  -Infinity	          |		-Infinity       |     "-Infinity"      |   	true	     |
|  ""	                  |		    0	          |        ""	           |    false	     |
|  "20"	                |		    20	        |        "20"	         |    true	     |
|  "Runoob"	            |		   NaN	        |      "Runoob"	       |    true	     |
|   [ ]	                |		    0	          |        ""	           |    true	     |
|   [20]	              |		    20	        |        "20"	         |    true	     |
|  [10,20]	            |		   NaN	        |      "10,20"	       |    true	     |
|  ["Runoob"]	          |		   NaN	        |      "Runoob"	       |    true	     |
|  ["Runoob","Google"]	|      NaN	        |    "Runoob,Google"   |    true	     |
|  function(){}	        |      NaN	        |     "function(){}"   |    true	     |
|  \{ \}	                |      NaN	        |   "[object Object]"	 |    true	     |
|  null	                |       0           |       "null"	       |    false	     |
|  undefined	          |      NaN	        |     "undefined"	     |    false	     |

### 运算符
 - 算术运算符：`+`、`-`、`*`、`/`、`%`、`++`、`--`
 - 赋值运算符：`=`、`+=`、`-=`、`*=`、`/=`、`%=`
 - 关系运算符：`==`、`===`、`!=`、`!==`、`>`、`>=`、`<=`
 - 逻辑运算符：`!`、`&&`、`||`
 - 位运算符：`&`、`|`、`^`、`~`、`<<`、`>>`、`>>>`

### 字符串
JavaScript 字符串用于存储和处理文本。

> 字符串可以存储一系列字符，如 "John Doe"。<br>
> 字符串可以是插入到引号中的任何字符。你可以使用单引号 `'` 或 双引号 `"` ：

- 使用索引位置来访问字符串中的每个字符：
> 字符串的索引从 0 开始，这意味着第一个字符索引值为 [0]，第二个为 [1]，以此类推。

```javascript{2}
var carname = 'Volvo XC60';
var character = carname[7];

console.log(character);  // 输出: X
```

- 在字符串中使用引号，字符串中的引号不要与字符串的引号相同:
```javascript
var answer = "It's alright";
var answer = "He is called 'Johnny'";
var answer = 'He is called "Johnny"';
```

- 也可以在字符串添加转义字符 `\` 来使用引号：
```javascript{2}
var x = 'It\'s alright';
var y = "He is called \"Johnny\"";
```

::: details 特殊字符转义
  - `\'`	单引号
  - `\"`	双引号
  - `\\`	反斜杠
  - `\n`	换行
  - `\r`	回车
  - `\t`	tab(制表符)
  - `\b`	退格符
  - `\f`	换页符
:::

- 使用内置属性 `length` 来计算字符串的长度：
```javascript{2}
var carname = "Volvo XC60";
var length = carname.length;

console.log(length);  // 输出: 10
```

- 字符串的拼接：
```javascript{3}
var carname = "Volvo";
var model = "XC60";
var car = carname + " " + model;

console.log(car);  // 输出: Volvo XC60
```

- 模板字符串🐚 
  > 模板字符串使用反引号 （``） 作为字符串的定界符分隔的字面量。<br>
  > 模板字面量是用反引号（`）分隔的字面量，允许多行字符串、带嵌入表达式的字符串插值和一种叫带标签的模板的特殊结构。

  语法：
  ```javascript
    `string text`

    `string text line 1
    string text line 2`

    `string text ${expression} string text`

    tagFunction`string text ${expression} string text`
  ```

### 函数
函数就是包裹在花括号中的代码块，前面使用了关键词 `function`：

```javascript
function myFunction() {
  // 函数体
}
```

函数可以有参数：

```javascript
function myFunction(parameter1, parameter2) {
  // 函数体
}
```

函数可以返回值：（默认返回 `undefined`）

```javascript
function myFunction() {
  return "Hello World";
}
```


### 对象
JavaScript 对象是拥有属性和方法的数据。

- 创建对象：
```javascript
// 方式1：使用对象字面量
var person = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

// 方式2：使用构造函数
function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

var person1 = new Person("John Doe", 30, "New York");

// 方式3：使用 new 关键字
var person2 = new Object({
  name: "John Doe",
  age: 30,
  city: "New York"
});
```


- 访问对象属性：
```javascript
var person = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

console.log(person.age);  // 输出: 30
```

- 修改对象属性：
```javascript
var person = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

person.age = 35;

console.log(person.age);  // 输出: 35
```

- 删除对象属性：
```javascript
var person = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

delete person.age;

console.log(person.name);  // 输出: John Doe
console.log(person.age);  // 输出: undefined
console.log(person.city);  // 输出: New York
```

- 对象的方法：
```javascript
var person = {
  name: "John Doe",
  age: 30,
  city: "New York",
  greet: function() {
    console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
  }
};

person.greet();  // 输出: Hello, my name is John Doe and I am 30 years old.
```
 
### 正则表达式
使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。

语法：`/正则表达式主体/修饰符(可选)`

- 修饰符：
  - `i`：忽略大小写。
  - `g`：全局匹配模式，所有匹配的子串，而不是只匹配第一个。
  - `m`：多行模式，在每一行匹配。
- 常用匹配模式：
  - `\d`：匹配数字。
  - `\D`：匹配非数字。
  - `\w`：匹配字母、数字、下划线。
  - `\W`：匹配非字母、数字、下划线。
  - `\s`：匹配空白字符。
  - `\S`：匹配非空白字符。
  - `.`：匹配任意字符。
  - `[]`：匹配字符集。
  - `^`：匹配字符串开始。
  - `$`：匹配字符串结束。
  - `[abc]`：	匹配方括号之间的任何字符。
  - `[0-9]`：	匹配任何从 0 至 9 的数字。
  - `(x|y)`：	匹配任何以 | 分隔的选项。

### 语句

1. 条件语句：
```javascript
var i;

if (i >= 5) {
  // 代码块
} else if (i < 5 && i > 2) {
  // 代码块
} else {
  // 代码块
}
```

2. 循环语句：
```javascript
var i;

// 1. for 循环
for (i = 0; i < 5; i++) {
  console.log(i);
}

// 2. while 循环
while (i < 5) {
  // 代码块
}

// 3. do-while 循环
do {
  // 代码块
} while (i < 5);
```

3. 跳转语句：
 - `break` 语句：跳出当前循环。
 - `continue` 语句：跳过当前循环的剩余语句，开始下一次循环。
 - `return` 语句：退出函数，并返回一个值。

```javascript
// 1. break 语句
for (i = 0; i < 5; i++) {
  if (i == 3) {
    break;
  }
  console.log(i);
}

// 2. continue 语句
for (i = 0; i < 5; i++) {
  if (i == 3) {
    continue;
  }
  console.log(i);
}

// 3. return 语句
function myFunction(num) {
  if (num > 10) {
    return "The number is greater than 10";
  } else {
    return "The number is less than or equal to 10";
  }
}

console.log(myFunction(5));  // 输出: The number is less than or equal to 10
console.log(myFunction(15));  // 输出: The number is greater than 10
```


### 严格模式 `"use strict"`
> `"use strict"` 指令在 JavaScript 1.8.5 (ECMAScript5) 中新增。<br>
> 它不是一条语句，但是是一个字面量表达式，在 JavaScript 旧版本中会被忽略。<br>
> `"use strict"` 的目的是指定代码在严格条件下执行。<br>
> 严格模式下你不能使用未声明的变量、函数、属性、以及不能使用一些不安全的操作。


## JavaScript 进阶

### 字符串（String） 对象
1. 属性：
  - `length`：返回字符串的长度。
  - `prototype`：返回字符串对象的原型。
  - `constructor`：返回字符串对象的构造函数。
2. 方法：
  - `charAt(index)`：返回指定索引处的字符。
  ```javascript
  var str = "Hello World";

  console.log(str.charAt(0));  // 输出: H
  console.log(str.charAt(1));  // 输出: e
  ```

  - `charCodeAt(index)`：返回指定索引处的字符的 Unicode 编码。
  ```javascript
  var str = "Hello World";

  console.log(str.charCodeAt(0));  // 输出: 72
  console.log(str.charCodeAt(1));  // 输出: 101
  ```

  - `concat(str1, str2,...)`：返回两个或多个字符串的连接。
  ```javascript
  var str1 = "Hello";
  var str2 = " World";

  console.log(str1.concat(str2));  // 输出: Hello World
  ```

  - `indexOf(str, startIndex)`：返回指定字符串第一次出现的索引位置。
  ```javascript
  var str = "Hello World";

  console.log(str.indexOf("l"));  // 输出: 2
  console.log(str.indexOf("l", 3));  // 输出: 9
  ```

  - `includes()`：判断字符串是否包含指定字符串。
  ```javascript
  var str = "Hello World";

  console.log(str.includes("l"));  // 输出: true
  console.log(str.includes("l", 3));  // 输出: true
  console.log(str.includes("l", 4));  // 输出: false
  ```

  - `lastIndexOf(str, startIndex)`：返回指定字符串最后一次出现的索引位置。
  ```javascript
  var str = "Hello World";

  console.log(str.lastIndexOf("l"));  // 输出: 9
  console.log(str.lastIndexOf("l", 3));  // 输出: 2
  ```

  - `match(regExp)`：使用正则表达式匹配字符串。
  ```javascript
  var str = "Hello World";
  var regExp = /l/g;

  console.log(str.match(regExp));  // 输出: ["l", "l"]
  ```

  - `repeat()`：返回字符串重复指定次数后的结果。
  ```javascript
  var str = "Hello";

  console.log(str.repeat(3));  // 输出: HelloHelloHello
  ```

  - `replace(regExp, newStr)`：使用正则表达式替换字符串。
  ```javascript
  var str = "Hello World";
  var regExp = /l/g;
  var newStr = "X";

  console.log(str.replace(regExp, newStr));  // 输出: HeXXo WorXd
  ```

  - `replaceAll()`：使用正则表达式替换所有匹配的字符串。
  ```javascript
  var str = "Hello World";
  var regExp = /l/g;
  var newStr = "X";

  console.log(str.replaceAll(regExp, newStr));  // 输出: HeXXo WorXd
  ```

  - `search(regExp)`：使用正则表达式搜索字符串。
  ```javascript
  var str = "Hello World";
  var regExp = /l/g;

  console.log(str.search(regExp));  // 输出: 2
  ```

  - `slice(start, end)`：返回字符串的子串。
  ```javascript
  var str = "Hello World";

  console.log(str.slice(0, 5));  // 输出: Hello
  console.log(str.slice(6));  // 输出: World
  ```

  - `split(separator, limit)`：使用分隔符分割字符串。
  ```javascript
  var str = "Hello,World";


  console.log(str.split(","));  // 输出: ["Hello", "World"]
  ```

  - `startsWith()`：判断字符串是否以指定字符串开头。
  ```javascript
  var str = "Hello World";

  console.log(str.startsWith("He"));  // 输出: true
  console.log(str.startsWith("He", 1));  // 输出: false
  ```
  
  - `endsWith()`：判断字符串是否以指定字符串结尾。
  ```javascript
  var str = "Hello World";

  console.log(str.endsWith("ld"));  // 输出: true
  console.log(str.endsWith("ld", 5));  // 输出: false
  ```

  - `substr(start, length)`：返回字符串的子串。
  ```javascript
  var str = "Hello World";

  console.log(str.substr(0, 5));  // 输出: Hello
  console.log(str.substr(6));  // 输出: World
  ```

  - `substring(start, end)`：返回字符串的子串。
  ```javascript
  var str = "Hello World";

  console.log(str.substring(0, 5));  // 输出: Hello
  console.log(str.substring(6));  // 输出: World
  ```

  - `tolowerCase()`：返回字符串的小写版本。
  ```javascript
  var str = "Hello World";

  console.log(str.toLowerCase());  // 输出: hello world
  ```

  - `toUpperCase()`：返回字符串的大写版本。
  ```javascript
  var str = "Hello World";

  console.log(str.toUpperCase());  // 输出: HELLO WORLD
  ```

  - `trim()`：返回字符串的副本，删除开头和结尾的空白字符。
  ```javascript
  var str = "  Hello World  ";

  console.log(str.trim());  // 输出: Hello World
  ```

  - `toLocaleLowerCase()`：返回字符串的小写版本。
  ```javascript
  var str = "Hello World";

  console.log(str.toLocaleLowerCase());  // 输出: hello world
  ```

  - `toLocaleUpperCase()`：返回字符串的大写版本。
  ```javascript
  var str = "Hello World";

  console.log(str.toLocaleUpperCase());  // 输出: HELLO WORLD
  ```

  - `valueOf()`：返回字符串的原始值。
  ```javascript
  var str = "Hello World";

  console.log(str.valueOf());  // 输出: Hello World
  ```

  - `toString()`：返回字符串的字符串形式。
  ```javascript
  var str = "Hello World";

  console.log(str.toString());  // 输出: Hello World
  ```

### 数字（Number） 对象
1. 属性：
  - `MAX_VALUE`：最大正数值。
  - `MIN_VALUE`：最小正数值。
  - `NaN`：非数值。
  - `NEGATIVE_INFINITY`：负无穷大。
  - `POSITIVE_INFINITY`：正无穷大。
  - `prototype`：返回 Number 对象的原型。
  - `constructor`：返回 Number 对象的构造函数。
2. 方法：
  - `toParseInt(str, radix)`：将字符串转换为整数。
  ```javascript
  var str = "123";

  console.log(Number.parseInt(str));  // 输出: 123
  ```

  - `parseFloat(str)`：将字符串转换为浮点数。
  ```javascript
  var str = "123.456";

  console.log(Number.parseFloat(str));  // 输出: 123.456
  ```

  - `isFinite(num)`：判断是否为有限数值。
  ```javascript
  console.log(Number.isFinite(123));  // 输出: true
  console.log(Number.isFinite(Infinity));  // 输出: false
  console.log(Number.isFinite(NaN));  // 输出: false
  ```

  - `isInteger(num)`：判断是否为整数。
  ```javascript
  console.log(Number.isInteger(123));  // 输出: true
  console.log(Number.isInteger(123.456));  // 输出: false
  console.log(Number.isInteger(Infinity));  // 输出: false
  console.log(Number.isInteger(NaN));  // 输出: false
  ```

  - `isNaN(num)`：判断是否为 NaN。
  ```javascript
  console.log(Number.isNaN(123));  // 输出: false
  console.log(Number.isNaN(NaN));  // 输出: true
  ```

  - `isSafeInteger(num)`：判断是否为安全整数。
  ```javascript
  console.log(Number.isSafeInteger(123));  // 输出: true
  console.log(Number.isSafeInteger(123.456));  // 输出: false
  console.log(Number.isSafeInteger(Infinity));  // 输出: false
  console.log(Number.isSafeInteger(NaN));  // 输出: false
  ```

  - `toExponential(num)`：返回数字的指数表示。
  ```javascript
  console.log(Number.toExponential(123));  // 输出: 1.23e+2
  ```

  - `toFixed(digits)`：返回数字的字符串表示，四舍五入到指定位数。
  ```javascript
  var num = 123.456;

  console.log(num.toFixed(2));  // 输出: 123.46
  ```

  - `toLocaleString(locales, options)`：返回数字的本地化字符串表示。
  ```javascript
  var num = 123.456;

  console.log(num.toLocaleString());  // 输出: 123.456
  ```

  - `toPrecision(digits)`：返回数字的指定长度的字符串表示。
  ```javascript
  var num = 123.456;

  console.log(num.toPrecision(2));  // 输出: 12
  ```

  - `toString(radix)`：返回数字的字符串表示。
  ```javascript
  var num = 123.456;

  console.log(num.toString(2));  // 输出: 1111011.001
  ```

  - `valueOf()`：返回数字的原始值。
  ```javascript
  var num = 123.456;

  console.log(num.valueOf());  // 输出: 123.456
  ```

### 布尔（Boolean） 对象
1. 属性：
  - `prototype`：返回 Boolean 对象的原型。
  - `constructor`：返回 Boolean 对象的构造函数。
2. 方法：
  - `toString()`：返回布尔值的字符串形式。
  ```javascript
  var bool = true;

  console.log(bool.toString());  // 输出: true
  ```

  - `valueOf()`：返回布尔值的原始值。
  ```javascript
  var bool = true;

  console.log(bool.valueOf());  // 输出: true
  ```

### 数组（Array） 对象
1. 属性：
  - `length`：返回数组的长度。
  - `prototype`：返回数组对象的原型。
  - `constructor`：返回数组对象的构造函数。
2. 方法：
  - `concat()`：返回两个或多个数组的连接。
  ```javascript
  var arr1 = [1, 2, 3];
  var arr2 = [4, 5, 6];

  console.log(arr1.concat(arr2));  // 输出: [1, 2, 3, 4, 5, 6]
  ```

  - `copyWithin()`：复制数组的一部分到同一数组中的另一个位置。
  ```javascript
  var arr = [1, 2, 3, 4, 5];

  console.log(arr.copyWithin(0, 3));  // 输出: [4, 5, 3, 4, 5]
  ```

  - `entries()`：返回一个新的迭代器对象，它包含数组中每个索引的键值对。
  ```javascript
  var arr = [1, 2, 3];

  for (var [index, value] of arr.entries()) {
    console.log(index, value);
  }
  // 输出:
  // 0 1
  // 1 2
  // 2 3
  ```

  - `every()`：测试数组的所有元素是否都通过了指定函数的测试。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.every(function(value) {
    return value > 0;
  }));  // 输出: true
  ```

  - `fill()`：用指定值填充数组中的元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.fill(0, 1, 2));  // 输出: [1, 0, 3]
  ```

  - `filter()`：创建一个新数组，其包含通过指定函数测试的元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.filter(function(value) {
    return value > 1;
  }));  // 输出: [2, 3]
  ```

  - `find()`：返回数组中满足指定函数的第一个元素的值。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.find(function(value) {
    return value > 1;
  }));  // 输出: 2
  ```

  - `findIndex()`：返回数组中满足指定函数的第一个元素的索引。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.findIndex(function(value) {
    return value > 1;
  }));  // 输出: 1
  ```

  - `forEach()`：对数组的每个元素执行一次指定函数。
  ```javascript
  var arr = [1, 2, 3];

  arr.forEach(function(value) {
    console.log(value);
  });
  // 输出:
  // 1
  // 2
  // 3
  ```

  - `from()`：创建一个新数组，其包含通过指定函数测试的元素。
  ```javascript
  var arr = Array.from({length: 3}, function(value, index) {
    return index * 2;
  });

  console.log(arr);  // 输出: [0, 2, 4]
  ```

  - `includes()`：判断数组是否包含指定元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.includes(2));  // 输出: true
  console.log(arr.includes(4));  // 输出: false
  ```

  - `indexOf()`：返回数组中第一个指定元素的索引。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.indexOf(2));  // 输出: 1
  console.log(arr.indexOf(4));  // 输出: -1
  ```

  - `isArray()`：判断一个值是否为数组。
  ```javascript
  console.log(Array.isArray([1, 2, 3]));  // 输出: true
  console.log(Array.isArray({length: 3}));  // 输出: false
  ```

  - `join()`：将数组转换为字符串，并用指定分隔符连接。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.join());  // 输出: 1,2,3
  console.log(arr.join(" "));  // 输出: 1 2 3
  ```

  - `keys()`：返回一个新的迭代器对象，它包含数组中每个索引的键。
  ```javascript
  var arr = [1, 2, 3];

  for (var index of arr.keys()) {
    console.log(index);
  }
  // 输出:
  // 0
  // 1
  // 2
  ```

  - `lastIndexOf()`：返回数组中最后一个指定元素的索引。
  ```javascript
  var arr = [1, 2, 3, 2, 1];

  console.log(arr.lastIndexOf(2));  // 输出: 3
  console.log(arr.lastIndexOf(4));  // 输出: -1
  ```

  - `map()`：创建一个新数组，其包含每个元素都调用指定函数后的返回值。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.map(function(value) {
    return value * 2;
  }));  // 输出: [2, 4, 6]
  ```

  - `pop()`：删除并返回数组的最后一个元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.pop());  // 输出: 3
  console.log(arr);  // 输出: [1, 2]
  ```

  - `push()`：在数组的末尾添加一个或多个元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.push(4, 5));  // 输出: 5
  console.log(arr);  // 输出: [1, 2, 3, 4, 5]
  ```

  - `reduce()`：对数组中的元素进行累计操作，得到一个单一值。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }));  // 输出: 6
  ```

  - `reduceRight()`：对数组中的元素进行从右到左的累计操作，得到一个单一值。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.reduceRight(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }));  // 输出: 6
  ```

  - `reverse()`：反转数组元素的顺序。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.reverse());  // 输出: [3, 2, 1]
  console.log(arr);  // 输出: [3, 2, 1]
  ```

  - `shift()`：删除并返回数组的第一个元素。 
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.shift());  // 输出: 1 
  console.log(arr);  // 输出: [2, 3]
  ```

  - `slice()`：返回数组的子数组。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.slice(1));  // 输出: [2, 3]
  console.log(arr.slice(1, 2));  // 输出: [2]
  ```

  - `some()`：测试数组中是否至少有一个元素通过指定函数的测试。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.some(function(value) {
    return value > 1;
  }));  // 输出: true
  ```

  - `sort()`：对数组元素进行排序。
  ```javascript
  var arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

  console.log(arr.sort());  // 输出: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
  ```

  - `splice()`：修改数组的长度，并从指定位置添加或删除元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.splice(1, 1));  // 输出: [2]
  console.log(arr);  // 输出: [1, 3]
  ```

  - `toString()`：返回数组的字符串形式。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.toString());  // 输出: 1,2,3  
  ```

  - `unshift()`：在数组的开头添加一个或多个元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.unshift(0, -1));  // 输出: 5  
  console.log(arr);  // 输出: [0, -1, 1, 2, 3]
  ```

  - `valueOf()`：返回数组的原始值。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.valueOf());  // 输出: [1, 2, 3]
  ```

  - `of()`：创建一个新数组，并初始化其元素。
  ```javascript
  var arr = Array.of(1, 2, 3);

  console.log(arr);  // 输出: [1, 2, 3]
  ```

  - `at()`：返回数组中指定位置的元素。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.at(1));  // 输出: 2
  ```

  - `flat()`：将数组拍平。
  ```javascript
  var arr = [1, [2, 3], [4, [5, 6]]];

  console.log(arr.flat());  // 输出: [1, 2, 3, 4, 5, 6]
  ```

  - `flatMap()`：将数组中的每个元素转换为一个新数组，然后将所有新数组连接成一个新数组。
  ```javascript
  var arr = [1, 2, 3];

  console.log(arr.flatMap(function(value) {
    return [value, value * 2];
  }));  // 输出: [1, 2, 2, 4, 3, 6]
  ```


### （Object） 对象
1. 属性：
  - `prototype`：返回对象原型。
  - `constructor`：返回对象构造函数。

2. 方法：
  - `hasOwnProperty()`：判断对象是否包含指定属性。
  ```javascript
  var obj = {name: "John", age: 30};

  console.log(obj.hasOwnProperty("name"));  // 输出: true
  console.log(obj.hasOwnProperty("gender"));  // 输出: false
  ```

  - `isPrototypeOf()`：判断对象是否为指定对象的原型。
  ```javascript
  var obj1 = {name: "John"};
  var obj2 = Object.create(obj1);

  console.log(obj2.isPrototypeOf(obj1));  // 输出: true
  ```

  - `propertyIsEnumerable()`：判断对象属性是否可枚举。
  ```javascript
  var obj = {name: "John", age: 30};

  console.log(obj.propertyIsEnumerable("name"));  // 输出: true
  console.log(obj.propertyIsEnumerable("age"));  // 输出: true
  console.log(obj.propertyIsEnumerable("gender"));  // 输出: false
  ```

  - `toLocaleString()`：返回对象的本地化字符串表示。
  ```javascript
  var obj = {name: "John", age: 30};

  console.log(obj.toLocaleString());  // 输出: [object Object]
  ```

  - `toString()`：返回对象的字符串形式。
  ```javascript
  var obj = {name: "John", age: 30};

  console.log(obj.toString());  // 输出: [object Object]
  ```

  - `valueOf()`：返回对象的原始值。
  ```javascript
  var obj = {name: "John", age: 30};

  console.log(obj.valueOf());  // 输出: [object Object]
  ```

  - `entries()`：返回一个新的迭代器对象，它包含对象中每个属性的键值对。
  ```javascript
  var obj = {name: "John", age: 30};

  for (var [key, value] of obj.entries()) {
    console.log(key, value);
  }
  // 输出:
  // name John
  // age 30
  ```

   - `fromEntries()`：创建一个新对象，并将键值对数组转换为属性。
  ```javascript
  var arr = [["name", "John"], ["age", 30]];

  console.log(Object.fromEntries(arr));  // 输出: {name: "John", age: 30}
  ```


  - `keys()`：返回一个新的迭代器对象，它包含对象中每个属性的键。
  ```javascript
  var obj = {name: "John", age: 30};

  for (var key of obj.keys()) {
    console.log(key);
  }
  // 输出:
  // name
  // age
  ```

  - `values()`：返回一个新的迭代器对象，它包含对象中每个属性的值。
  ```javascript
  var obj = {name: "John", age: 30};

  for (var value of obj.values()) {
    console.log(value);
  }
  // 输出:
  // John
  // 30
  ```

  - `assign()`：将所有可枚举属性的值从一个或多个源对象复制到目标对象。
  ```javascript
  var obj1 = {name: "John"};
  var obj2 = {age: 30};

  Object.assign(obj1, obj2);

  console.log(obj1);  // 输出: {name: "John", age: 30}
  ```

  - `create()`：创建一个新对象，并设置其原型。
  ```javascript 
  var obj1 = {name: "John"};
  var obj2 = Object.create(obj1);

  console.log(obj2.name);  // 输出: John
  ```

  - `defineProperties()`：定义多个属性。
  ```javascript
  var obj = {};

  Object.defineProperties(obj, {
    name: {
      value: "John",
      writable: true,
      enumerable: true,
      configurable: true
    },
    age: {
      value: 30,
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  console.log(obj);  // 输出: {name: "John", age: 30}
  ```

  - `defineProperty()`：定义单个属性。
  ```javascript
  var obj = {};

  Object.defineProperty(obj, "name", {
    value: "John",
    writable: true,
    enumerable: true,
    configurable: true
  });

  console.log(obj);  // 输出: {name: "John"}
  ```

  - `freeze()`：冻结对象，使其属性不可枚举、不可配置、不可修改。
  ```javascript
  var obj = {name: "John", age: 30};

  Object.freeze(obj);

  obj.name = "Mary";
  obj.age = 35;

  console.log(obj.name);  // 输出: John
  console.log(obj.age);  // 输出: 30
  ```

  - `getPrototypeOf()`：返回对象的原型。
  ```javascript
  var obj1 = {name: "John"};
  var obj2 = Object.create(obj1);

  console.log(Object.getPrototypeOf(obj2));  // 输出: {name: "John"}
  ```

  - `is()`：判断两个值是否相同。
  ```javascript
  var obj1 = {name: "John"};
  var obj2 = {name: "John"};

  console.log(Object.is(obj1, obj2));  // 输出: true
  ```


### 日期（Date）对象
1. 属性：
  - `constructor`：返回日期构造函数。
  - `prototype`：返回日期原型。
2. 方法：
  - `getFullYear()`：返回日期的年份（四位数）。
  ```javascript
  var date = new Date("2021-07-01");

  console.log(date.getFullYear());  // 输出: 2021
  ```

  - `getMonth()`：返回日期的月份（0-11）。
  ```javascript
  var date = new Date("2021-07-01");

  console.log(date.getMonth());  // 输出: 6
  ```

  - `getDay()`：返回日期的星期（0-6）。
  ```javascript
  var date = new Date("2021-07-01");

  console.log(date.getDay());  // 输出: 0
  ```

  - `getDate()`：返回日期的日（1-31）。
  ```javascript
  var date = new Date("2021-07-01");

  console.log(date.getDate());  // 输出: 1
  ```

  - `getHours()`：返回日期的小时（0-23）。
  ```javascript
  var date = new Date("2021-07-01 12:00:00");

  console.log(date.getHours());  // 输出: 12
  ```

  - `getMinutes()`：返回日期的分钟（0-59）。
  ```javascript
  var date = new Date("2021-07-01 12:30:00");

  console.log(date.getMinutes());  // 输出: 30
  ```

  - `getSeconds()`：返回日期的秒（0-59）。
  ```javascript
  var date = new Date("2021-07-01 12:00:30");

  console.log(date.getSeconds());  // 输出: 30
  ```

  - `getTime()`：返回日期的毫秒表示。
  ```javascript
  var date = new Date("2021-07-01 12:00:00");

  console.log(date.getTime());  // 输出: 1625116800000
  ```

### 正则（RegExp）对象
1. 属性：
  - `constructor`：返回正则构造函数。
  - `global`：返回是否全局匹配。
  - `ignoreCase`：返回是否忽略大小写。
  - `lastIndex`：返回上次匹配的索引。
  - `multiline`：返回是否多行匹配。
  - `source`：返回正则表达式的字符串形式。
2. 方法：
  - `exec()`：执行正则表达式匹配。
  ```javascript
  var regex = /hello/i;
  var str = "Hello, world!";

  var match = regex.exec(str);

  console.log(match);  // 输出: ["Hello"]
  ```

  - `test()`：测试字符串是否匹配正则表达式。
  ```javascript
  var regex = /hello/i;
  var str = "Hello, world!";

  console.log(regex.test(str));  // 输出: true
  ```

  - `compile()`：编译正则表达式。
  ```javascript
  var regex = /hello/i;

  console.log(regex.compile());  // 输出: /hello/i
  ```

  - `toString()`：返回正则表达式的字符串形式。
  ```javascript
  var regex = /hello/i;

  console.log(regex.toString());  // 输出: /hello/i
  ```

### Math 对象
1. 属性：
  - `E`：返回欧拉数。
  - `LN10`：返回以 10 为底的自然对数。
  - `LN2`：返回以 2 为底的自然对数。
  - `LOG2E`：返回以 2 为底的 E 值的对数。
  - `LOG10E`：返回以 10 为底的 E 值的对数。
  - `PI`：返回圆周率。
  - `SQRT1_2`：返回 1/2 的平方根。
  - `SQRT2`：返回 2 的平方根。
2. 方法：
  - `abs()`：返回绝对值。
  ```javascript
  console.log(Math.abs(-5));  // 输出: 5

  ```

  - `ceil(x)`：返回大于或等于 x 的最小整数。
  ```javascript
  console.log(Math.ceil(3.2));  // 输出: 4
  console.log(Math.ceil(-3.2));  // 输出: -3
  ```

  - `floor(x)`：返回小于或等于 x 的最大整数。
  ```javascript
  console.log(Math.floor(3.2));  // 输出: 3
  console.log(Math.floor(-3.2));  // 输出: -4
  ```

  - `max(x,y,z,...,n)`：返回参数中最大的值。
  ```javascript
  console.log(Math.max(3, 5, 1, 4, 2));  // 输出: 5
  ```

  - `min(x,y,z,...,n)`：返回参数中最小的值。
  ```javascript
  console.log(Math.min(3, 5, 1, 4, 2));  // 输出: 1
  ```

  - `pow(x,y)`：返回 x 的 y 次幂。
  ```javascript
  console.log(Math.pow(2, 3));  // 输出: 8
  ```

  - `random()`：返回 0 到 1 之间的随机数。
  ```javascript
  console.log(Math.random());  // 输出: 0.123456789
  ```

  - `round(x)`：返回 x 四舍五入后的整数。
  ```javascript
  console.log(Math.round(3.2));  // 输出: 3
  console.log(Math.round(3.7));  // 输出: 4
  ```

  - `sqrt(x)`：返回 x 的平方根。
  ```javascript
  console.log(Math.sqrt(9));  // 输出: 3
  ```

  - `trunc(x)`：返回 x 的整数部分。
  ```javascript
  console.log(Math.trunc(3.2));  // 输出: 3
  console.log(Math.trunc(-3.2));  // 输出: -3
  ```

### 函数

1. 函数表达式（匿名函数）：
  ```javascript
  var add = function(x, y) {
    return x + y;
  };

  console.log(add(2, 3));  // 输出: 5
  ```

2. `Function()` 构造函数
  ```javascript
  var add = new Function("x", "y", "return x + y;");

  console.log(add(2, 3));  // 输出: 5
  ```

3. 箭头函数（ES6 新增）：
  ```javascript
  var add = (x, y) => x + y;

  console.log(add(2, 3));  // 输出: 5
  ```

4. 立即执行函数
  ```javascript
  (function() {
    console.log("Hello, world!");
  })();
  ```

5. 函数参数
  - 实参（arguments）：函数调用时传入的参数。
  - 形参（parameters）：函数定义时定义的参数。
  - 默认参数：函数定义时指定默认值。

  ```javascript
  function add(x, y) {
    if (typeof x === "undefined") {
      x = 0;
    }
    if (typeof y === "undefined") {
      y = 0;
    }
    return x + y;
  }

  console.log(add(2, 3));  // 输出: 5
  console.log(add(2));  // 输出: 2
  console.log(add());  // 输出: 0
  ```

6. `arguments` 对象
  - `arguments` 对象是一个类数组对象，包含函数调用时传入的所有参数。
  ```javascript
  function add() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }

  console.log(add(2, 3));  // 输出: 5
  console.log(add(2, 3, 4));  // 输出: 9
  ```

### this 关键字
> 面向对象语言中 `this` 表示当前对象的一个引用。<br>
> 但在 JavaScript 中 `this` 不是固定不变的，它会随着执行环境的改变而改变。

- 在方法中，`this` 表示该方法所属的对象，谁调用指向谁。
- 如果单独使用，`this` 表示全局对象。
- 在函数中，`this` 表示全局对象。
- 在函数中，在严格模式下，`this` 是未定义的(undefined)。
- 在事件中，`this` 表示接收事件的元素。
- 类似 `call()` 和 `apply()` 方法可以将 `this` 引用到任何对象。


### 类(class)
> 类是用于创建对象的模板。使用 `class` 关键字来创建一个类，类体在一对大括号 `{}` 中，可以在大括号 `{}` 中定义类成员的位置，如方法或构造函数。每个类中包含了一个特殊的方法 `constructor()`，它是类的构造函数，这种方法用于创建和初始化一个由 `class` 创建的对象。

语法格式如下：
```javascript
class ClassName {
  constructor() { ... }
}
```

::: info 示例
```javascript
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
 
let site = new Dog("土狗",  5);
```
:::

- 类表达式
```javascript
// 1. 未命名/匿名类
let MyClass1 = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

console.log(MyClass.name); // 输出: "MyClass1"

// 2. 命名类
let MyClass2 = class MyClass {
  constructor(name, age) {
    this.name = "John";
    this.age = age;
  }
};

console.log(MyClass2.name); // 输出: "MyClass"
```

- 构造方法
    - 构造方法名为 `constructor()`。
    - 构造方法在创建新对象时会自动执行。
    - 构造方法用于初始化对象属性。
    - 如果不定义构造方法，JavaScript 会自动添加一个空的构造方法。

- 类关键字
    - `static` 关键字：静态方法，可以直接通过类名调用，不需要实例化对象。
    - `extends` 关键字：用于创建子类，子类可以继承父类的属性和方法。
    - `super` 关键字：用于调用父类的方法。

- 类继承
  > JavaScript 类继承使用 `extends` 关键字。<br>
  > 子类可以继承父类的属性和方法，也可以添加自己的属性和方法。<br>
  > 子类可以调用父类的构造函数，通过 `super()` 方法调用父类的构造函数，并传入子类构造函数的参数。<br>
  > 当创建一个类时，您不需要重新编写新的数据成员和成员函数，只需指定新建的类继承了一个已有的类的成员即可。这个已有的类称为**基类（父类）**，新建的类称为**派生类（子类）**。

  ```javascript
  // 基类
  class Animal {
      // eat() 函数
      // sleep() 函数
  };

  //派生类
  class Dog extends Animal {
      // bark() 函数
  };
  ```

  ES6 引入了类和 `class` 关键字，但底层机制仍然基于**原型继承**。

  ```javascript
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.eat = function() {
    console.log(this.name + " is eating.");
  };
  
  function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
  }
  
  // 建立原型链，让 Dog 继承 Animal
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;
  
  Dog.prototype.bark = function() {
    console.log(this.name + " is barking.");
  };
  
  var dog = new Dog("Buddy", "Labrador");
  dog.eat();  // 调用从 Animal 继承的方法
  dog.bark(); // 调用 Dog 的方法
  ```

  使用 ES6 类继承

  ```javascript
  class Animal {
    constructor(name) {
      this.name = name;
    }
  
    eat() {
      console.log(this.name + " is eating.");
    }
  }
  
  class Dog extends Animal {
    constructor(name, breed) {
      super(name);
      this.breed = breed;
    }
  
    bark() {
      console.log(this.name + " is barking.");
    }
  }
  
  const dog = new Dog("Buddy", "Labrador");
  dog.eat();
  dog.bark();
  ```

- getter 和 setter
  > 类中我们可以使用 `getter` 和 `setter` 来获取和设置值，`getter` 和 `setter` 都需要在严格模式下执行。<br>
  > 在 JavaScript 中，可以使用 `get` 和 `set` 关键字来定义对象的属性，这两个关键字被称为**存取器（accessor）**。

  ```javascript
  class Dog {
    constructor(name) {
      this.sitename = name;
    }
    get s_name() {
      return this.sitename;
    }
    set s_name(x) {
      this.sitename = x;
    }
  }

  let dog = new Dog("旺财");
  console.log(dog.s_name);   // 输出: "旺财"
  ```

  **注意：**即使 `getter/setter` 是一个方法，当你想获取属性值或设置属性值也不要使用**括号**。`getter/setter` 方法的名称不能与属性的名称相同。很多开发者在属性名称前使用下划线字符 `_` 将 `getter/setter` 与实际属性分开：

  ```javascript
  class Dog {
    constructor(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    set name(x) {
      this._name = x;
    }
  }

  let dog = new Dog("旺财");
  console.log(dog.name);   // 输出: "旺财"
  ```

- 静态方法
  > 静态方法是使用 `static` 关键字修饰的方法，又叫类方法，属于类的，但不属于对象，在实例化对象之前可以通过 `类名.方法名` 调用静态方法。<br>
  > 静态方法不能在对象上调用，只能在类中调用

  ```javascript
  class Dog {
    constructor(name) {
      this.name = name;
    }
    static sayHello() {
      console.log("Hello, I am a dog.");
    }
  }

  Dog.sayHello(); // 输出: "Hello, I am a dog."

  let dog = new Dog();
  dog.sayHello(); // 报错: TypeError: dog.sayHello is not a function
  ```

  如果想在对象 dog 中使用静态方法，可以作为一个参数传递给它:

  ```javascript

  class Dog {
    constructor(name) {
      this.name = name;
    }
    static sayHello(obj) {
      console.log(`Hello, I am a dog. My name is ${obj.name}.`);
    }
  }

  let dog = new Dog("旺财");
  Dog.sayHello(dog); // 输出: "Hello, I am a dog. My name is 旺财."
  ```

- 提升
  > 函数声明和类声明之间的一个重要区别在于, 函数声明会提升，类声明不会。

  ```javascript
  // 这里不能这样使用类，因为还没有声明
  // dog = new Dog("哈士奇")
  // 报错
  
  class Dog {
    constructor(name) {
      this.sitename = name;
    }
  }
  
  // 这里可以使用类了
  let dog = new Dog("哈士奇")
  ```


### 继承方式

1. 原型链继承
  - 实现:
    > 将子类的原型设置为父类的一个实例。<br>
    > 子类可以访问父类的原型上的方法和属性。
  - 优点:
    > 简单易懂。<br>
    > 可以复用父类的方法。
  - 缺点:
    > 每次创建子类的实例时，父类的构造函数都会被执行一次，即使这些属性在所有实例中都是相同的。<br>
    > 父类构造函数中定义的属性会被所有子类实例共享。<br>
    > 不能向父类构造函数传递参数。
  - 代码:
    ```javascript{11}
    function Parent() {
      this.name = 'Alice';
    }

    Parent.prototype.sayHello = function() {
      console.log(`Hello, my name is ${this.name}!`);
    };

    function Child() {}

    Child.prototype = new Parent(); // 设置 Child 的原型为 Parent 的实例

    const child = new Child();
    child.sayHello(); // 输出: Hello, my name is Alice!
    ```
2. 构造函数继承
  - 实现:
    > 在子类构造函数内部使用 `call` 或 `apply` 方法调用父类构造函数。<br>
    > 可以在子类构造函数中定义自己的属性。
  - 优点:
    > 可以为子类实例创建独立的属性副本。<br>
    > 可以向父类构造函数传递参数。
  - 缺点:
    > 只能继承属性，不能继承方法。<br>
    > 需要手动设置原型来继承方法。
  - 代码:
    ```javascript{6}
    function Parent() {
      this.name = 'Alice';
    }

    function Child() {
      Parent.call(this); // 在 Child 构造函数内部调用 Parent 构造函数
    }

    const child = new Child();
    console.log(child.name); // 输出: Alice
    ```
3. 组合继承（经典继承）
  - 实现:
    > 结合原型链继承和构造函数继承的优点。<br>
    > 使用 `call` 或 `apply` 方法调用父类构造函数以继承属性。<br>
    > 将子类的原型设置为父类的一个实例以继承方法。
  - 优点:
    > 可以继承属性和方法。<br>
    > 可以向父类构造函数传递参数。
  - 缺点:
    > 父类构造函数会被调用两次（一次在构造函数继承中，一次在原型链继承中）。
  - 代码:
    ```javascript{10,14,15}
    function Parent(name) {
      this.name = name;
    }

    Parent.prototype.sayHello = function() {
      console.log(`Hello, my name is ${this.name}!`);
    };

    function Child(name, age) {
      Parent.call(this, name); // 调用父类构造函数
      this.age = age;
    }

    Child.prototype = Object.create(Parent.prototype); // 设置原型链
    Child.prototype.constructor = Child; // 设置构造函数

    Child.prototype.sayAge = function() {
      console.log(`I am ${this.age} years old.`);
    };

    const child = new Child('Bob', 2);
    child.sayHello(); // 输出: Hello, my name is Bob!
    child.sayAge(); // 输出: I am 2 years old.
    ```
4. 寄生式继承
  - 实现:
    > 创建一个仅用于继承目的的函数，该函数会在创建新对象的同时增强（或“寄生”）新对象。
  - 优点:
    > 无需构造函数: 寄生式继承不需要使用构造函数，因此可以避免构造函数的开销。<br>
    > 不使用原型链: 不依赖于原型链，这意味着新对象不会影响原始对象的原型链。<br>
    > 易于控制: 你可以完全控制新对象的创建过程，包括添加哪些属性或方法。<br>
    > 灵活: 你可以根据需要添加任意数量的新属性或方法，而不受构造函数或原型链的限制。
  - 缺点:
    > 不适用于类继承: 寄生式继承主要用于创建单一对象的继承，而不是类级别的继承。<br>
    > 缺乏结构: 与构造函数或类继承相比，寄生式继承缺乏一定的结构和组织性。<br>
    > 不直观: 对于习惯于使用构造函数或类继承的开发者来说，寄生式继承可能不太直观。
  - 代码:
    ```javascript{1-12,25}
    function createAnother(original) {
      // 1. 创建新对象
      const clone = Object.create(original);

      // 2. 增强新对象
      clone.sayGoodbye = function() {
        console.log("Goodbye!");
      };

      // 3. 返回新对象
      return clone;
    }

    function Parent(name) {
      this.name = name;
    }

    Parent.prototype.sayHello = function() {
      console.log(`Hello, my name is ${this.name}!`);
    };

    const parent = new Parent('Alice');

    // 使用寄生式继承创建新对象
    const child = createAnother(parent);

    child.sayHello(); // 输出: Hello, my name is Alice!
    child.sayGoodbye(); // 输出: Goodbye!
    ```
5. 寄生组合继承
  - 实现:
    > 改进组合继承，避免父类构造函数被调用两次。<br>
    > 使用 Object.create 创建一个新的对象，该对象继承自父类的原型，然后将其作为子类的原型。
  - 优点:
    > 避免了父类构造函数被调用两次的问题。<br>
    > 可以继承属性和方法。<br>
    > 可以向父类构造函数传递参数。
  - 缺点:
    > 实现稍微复杂一些。
  - 代码:
    ```javascript{1-5,16,19}
    function createPrototype(parentPrototype) {
      const prototype = Object.create(parentPrototype);
      prototype.constructor = this;
      return prototype;
    }

    function Parent() {
      this.name = 'Alice';
    }

    Parent.prototype.sayHello = function() {
      console.log(`Hello, my name is ${this.name}!`);
    };

    function Child() {
      Parent.call(this); // 构造函数继承
    }

    Child.prototype = createPrototype(Parent.prototype); // 使用 createPrototype 函数创建新的原型

    const child = new Child();
    child.sayHello(); // 输出: Hello, my name is Alice!
    ```
5. ES6 类继承
  - 实现:
    > 使用 class 和 extends 关键字实现继承。<br>
    > 使用 super 关键字调用父类构造函数。
  - 优点:
    > 语法简洁。<br>
    > 易于理解和维护。<br>
    > 支持新的特性，如静态方法、类字段等。
  - 缺点:
    > 仅在支持ES6的环境中可用。
    > 在旧版本浏览器中需要使用转译工具（如Babel）。
  - 代码:
    ```javascript
    class Parent {
      constructor() {
        this.name = 'Alice';
      }

      sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
      }
    }

    class Child extends Parent {}

    const child = new Child();
    child.sayHello(); // 输出: Hello, my name is Alice!
    ```


### Promise
1. 基本概念
  - `Promise` 是异步编程的一种解决方案，它代表了一个异步操作的最终完成或失败。
  - Promise 的三种状态：
    - `Pending（等待）`：初始状态，既不是成功也不是失败状态。
    - `Fulfilled（已完成）`：操作成功完成。
    - `Rejected（已失败）`：操作失败。
  - Promise 的状态变化：
    - 一旦 Promise 的状态变为 `fulfilled` 或 `rejected`，这个状态就不会再改变
    - Promise 只能从 `pending -> fulfilled` 或 `pending -> rejected`。
  
2. 基本用法
  - 创建 Promise 对象
    ```javascript
    const promise = new Promise(function(resolve, reject) {
      // 异步操作成功时调用 resolve
      // 异步操作失败时调用 reject
    });
    ```
  - 链式调用
    ```javascript
      promise.then(function(value) {
        // 成功时调用
        return value;
      }, function(error) {
        // 失败时调用
        return error;
      }).then(function(value) {
        // 成功时调用的回调函数
      }, function(error) {
        // 失败时调用的回调函数
      });
    ```
  - 错误处理
    ```javascript
    promise.catch(function(error) {
      // 捕获错误
    });
    ```
  - 示例
    ```javascript
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('成功');
      }, 1000);
    });

    promise.then(function(value) {
      console.log(value); // 输出: 成功
    });

    promise.catch(function(error) {
      console.log(error); // 不会被调用
    });
    ```
    
3. 高级用法
  - 静态方法
    - `Promise.resolve()`：将现有对象转为 Promise 对象。
      ```javascript
      Promise.resolve("Success").then(
        (value) => {
          console.log(value); // "Success"
        },
        (reason) => {
          // not called
        },
      );
      ```

    - `Promise.reject()`：返回一个失败的 Promise 对象。
      ```javascript
      Promise.reject(new Error("fail")).then(
        () => {
          // not called
        },
        (error) => {
          console.error(error); // Stacktrace
        },
      );
      ```

    - `Promise.all()`：用于将多个 Promise 实例，包装成一个新的 Promise 实例。该 Promise 在所有给定的 Promise 都`fulfilled` 时 `fulfilled`，或在任何一个 Promise `rejected` 时 `rejected`。
      ```javascript
      const p1 = new Promise((resolve) => {
        setTimeout(() => {
          resolve("p1");
        }, 1000);
      });
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve("p2");
          reject(new Error("p2"));
        }, 500);
      });
      const p3 = new Promise((resolve) => {
        setTimeout(() => {
          resolve("p3");
        }, 1500);
      });

      Promise.all([p1, p2, p3]).then(
        (values) => {
          console.log(values); // ["p1", "p2", "p3"]
        },
        (error) => {
          console.error(error); // Error: p2
        },
      );
      ```

    - `Promise.race()`：用于将多个 Promise 实例，包装成一个新的 Promise 实例，用于等待一组 Promise 中的第一个完成（无论是 `fulfilled` 还是 `rejected` ），并返回那个 Promise。
      ```javascript
      function sleep(time, value, state) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (state === "fulfill") {
              return resolve(value);
            } else {
              return reject(new Error(value));
            }
          }, time);
        });
      }

      const p1 = sleep(500, "one", "fulfill");
      const p2 = sleep(100, "two", "fulfill");

      Promise.race([p1, p2]).then((value) => {
        console.log(value); // "two"
        // 两者都满足，但 p2 更快
      });

      const p3 = sleep(100, "three", "fulfill");
      const p4 = sleep(500, "four", "reject");

      Promise.race([p3, p4]).then(
        (value) => {
          console.log(value); // "three"
          // P3 更快，因此它满足
        },
        (error) => {
          // Not called
        },
      );

      const p5 = sleep(500, "five", "fulfill");
      const p6 = sleep(100, "six", "reject");

      Promise.race([p5, p6]).then(
        (value) => {
          // Not called
        },
        (error) => {
          console.error(error.message); // "six"
          // P6 更快，因此它会拒绝
        },
      );
      ```

    - `Promise.any()`：用于将多个 Promise 实例，包装成一个新的 Promise 实例。用于等待多个 Promise 中的任意一个或多个 `fulfilled` ，并返回第一个 `fulfilled` 的 Promise。如果所有的 Promise 都失败，则返回一个 `rejected` 的 Promise，并且会抛出一个 AggregateError，该错误包含了所有失败的 Promise 的原因。
      ```javascript
      const pErr = new Promise((resolve, reject) => {
        reject("Always fails");
      });

      const pSlow = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, "Done eventually");
      });

      const pFast = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "Done quick");
      });

      Promise.any([pErr, pSlow, pFast]).then((value) => {
        // pFast首先实现
        console.log(value); // Done quick
      });
      ```

  - 实例方法
    - `Promise.prototype.then()`：添加成功和失败回调函数。
      ```javascript
      const p1 = new Promise((resolve, reject) => {
        resolve("Success!");
        // or
        // reject(new Error("Error!"));
      });

      p1.then(
        (value) => {
          console.log(value); // Success!
        },
        (reason) => {
          console.error(reason); // Error!
        },
      );
      ```

    - `Promise.prototype.catch()`：添加一个失败回调函数。
      ```javascript
      const p1 = new Promise((resolve, reject) => {
        resolve("Success");
      });

      p1.then((value) => {
        console.log(value); // "Success!"
        throw new Error("oh, no!");
      })
        .catch((e) => {
          console.error(e.message); // "oh, no!"
        })
        .then(
          () => console.log("捕获后，链条恢复"), // 捕获后，链条恢复
          () => console.log("由于捕获而未被解雇"),
        );

      // 以下行为与上述相同
      p1.then((value) => {
        console.log(value); // "Success!"
        return Promise.reject("oh, no!");
      })
        .catch((e) => {
          console.error(e); // "oh, no!"
        })
        .then(
          () => console.log("捕获后，链条恢复"), // 捕获后，链条恢复
          () => console.log("由于捕获而未被解雇"),
        );
      ```

    - `Promise.prototype.finally()`：添加一个最终的回调函数，无论 Promise 成功或失败都会执行。
      ```javascript
      const p1 = new Promise((resolve, reject) => {
        resolve("Success");
      });

      p1.then((value) => {
        console.log(value); // "Success"
        return "oh, no!";
      })
        .finally(() => {
          console.log("Promise 结束"); // Promise 结束
        })
        .then(
          (value) => console.log(value), // "oh, no!"
          (error) => console.error(error),
        );
      ```


## ES6

### 解构赋值

1. 数组模型的解构（Array）
  
  - 基本：
  ```javascript
  let [a, b, c] = [1, 2, 3];
  // a = 1
  // b = 2
  // c = 3
  ```

  - 可嵌套：
  ```javascript
  let [a, [[b], c]] = [1, [[2], 3]];
  // a = 1
  // b = 2
  // c = 3
  ```

  - 可忽略：
  ```javascript
  let [a, , b] = [1, 2, 3];
  // a = 1
  // b = 3
  ```

  - 不完全解构：
  ```javascript
  let [a = 1, b] = []; // a = 1, b = undefined
  ```

  - 剩余运算符：
  ```javascript
  let [a, ...b] = [1, 2, 3];
  //a = 1
  //b = [2, 3]
  ```

  - 字符串等:
  > 在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 `Iterator` 接口的数据。
  ```javascript
  let [a, b, c, d, e] = 'hello';
  // a = 'h'
  // b = 'e'
  // c = 'l'
  // d = 'l'
  // e = 'o'
  ```

  - 解构默认值：
  ```javascript
  let [a = 2] = [undefined]; // a = 2
  ```
  当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。
  ```javascript
  let [a = 3, b = a] = [];     // a = 3, b = 3
  let [a = 3, b = a] = [1];    // a = 1, b = 1
  let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
  ```

2. 对象模型的解构（Object）
  
  - 基本：
  ```javascript
  let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
  // foo = 'aaa'
  // bar = 'bbb'
  
  let { baz : foo } = { baz : 'ddd' };
  // foo = 'ddd'
  ```

  - 可嵌套可忽略：
  ```javascript
  let obj = {p: ['hello', {y: 'world'}] };
  let {p: [x, { y }] } = obj;
  // x = 'hello'
  // y = 'world'

  let obj = {p: ['hello', {y: 'world'}] };
  let {p: [x, {  }] } = obj;
  // x = 'hello'
  ```

  - 不完全解构：
  ```javascript
  let obj = {p: [{y: 'world'}] };
  let {p: [{ y }, x ] } = obj;
  // x = undefined
  // y = 'world'
  ```

  - 剩余运算符：
  ```javascript
  let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
  // a = 10
  // b = 20
  // rest = {c: 30, d: 40}
  ```

  - 解构默认值：
  ```javascript
  let {a = 10, b = 5} = {a: 3};
  // a = 3; b = 5;
  let {a: aa = 10, b: bb = 5} = {a: 3};
  // aa = 3; bb = 5;
  ```
 
### Symbol
ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。

- 基本用法：
> Symbol 函数栈不能用 `new` 命令，因为 Symbol 是原始数据类型，不是对象。可以接受一个字符串作为参数，为新创建的 Symbol 提供描述，用来显示在控制台或者作为字符串的时候使用，便于区分。

```javascript
let sy = Symbol("KK");
console.log(sy);   // Symbol(KK)
typeof(sy);        // "symbol"
 
// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("kk"); 
sy === sy1;       // false
```

- 使用场景：
    - 作为对象的属性名：

    ```javascript
    let sy = Symbol("key1");
 
    // 写法1
    let syObject = {};
    syObject[sy] = "kk";
    console.log(syObject);    // {Symbol(key1): "kk"}
    
    // 写法2
    let syObject = {
      [sy]: "kk"
    };
    console.log(syObject);    // {Symbol(key1): "kk"}
    
    // 写法3
    let syObject = {};
    Object.defineProperty(syObject, sy, {value: "kk"});
    console.log(syObject);   // {Symbol(key1): "kk"}
    ```
    **注意点：**
    > Symbol 作为对象属性名时不能用.运算符，要用方括号。因为.运算符后面是字符串，所以取到的是字符串 sy 属性，而不是 Symbol 值 sy 属性。<br>
    > Symbol 值作为属性名时，该属性是公有属性不是私有属性，可以在类的外部访问。<br>
    > 不会出现在 `for...in` 、 `for...of` 的循环中，也不会被 `Object.keys()` 、 `Object.getOwnPropertyNames()` 返回。<br>
    > 要读取到一个对象的 Symbol 属性，可以通过 `Object.getOwnPropertySymbols()` 和 `Reflect.ownKeys()` 取到。

    ```javascript
    // 1.不能用.运算符
    let syObject = {};
    syObject[sy] = "kk";
    
    syObject[sy];  // "kk"
    syObject.sy;   // undefined


    // 2.读取到一个对象的 Symbol 属性
    let syObject = {};
    syObject[sy] = "kk";
    console.log(syObject);
    
    for (let i in syObject) {
      console.log(i);
    }    // 无输出
    
    Object.keys(syObject);                     // []
    Object.getOwnPropertySymbols(syObject);    // [Symbol(key1)]
    Reflect.ownKeys(syObject);                 // [Symbol(key1)]
    ```

    - 定义常量：
    ```javascript

    const MY_CONST = Symbol();
    const obj = {
      [MY_CONST]: "kk"
    };
    console.log(obj[MY_CONST]);   // "kk"
    ```

- `Symbol.for()` 和 `Symbol.keyFor()`：
    - `Symbol.for()`：全局注册 Symbol，可以重复调用，返回同一个 Symbol。
    ```javascript
    let yellow = Symbol("Yellow");
    let yellow1 = Symbol.for("Yellow");
    yellow === yellow1;      // false
    
    let yellow2 = Symbol.for("Yellow");
    yellow1 === yellow2;     // true
    ```

    - `Symbol.keyFor()`：返回已注册的 Symbol 类型值的 `key`。
    ```javascript
    let yellow1 = Symbol.for("Yellow");
    let key = Symbol.keyFor(yellow1);    
    console.log(key);    // "Yellow"
    ```

### Map 与 Set

1. Map对象
  > Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

  Maps 和 Objects 的区别：
  - 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
  - Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
  - Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
  - Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

  ![Maps & Objects](/assets/maps&objects.png)

  - Map 中的 key
    - key 是字符串：
    ```javascript
    let map = new Map();
    map.set("key1", "value1");
    console.log(map.get("key1"));    // "value1"
    ```
    
    - key 是 Symbol：
    ```javascript
    let key = Symbol("key");
    let map = new Map();
    map.set(key, "value");
    console.log(map.get(key));    // "value"
    ```
    
    - key 是对象：
    ```javascript
    let obj = {name: "John"};
    let map = new Map();
    map.set(obj, "value");
    console.log(map.get(obj));    // "value"
    ```
    
    - key 都可以是任意值：
    ```javascript
    let map = new Map();
    map.set(1, "value1");
    map.set(true, "value2");
    map.set(null, "value3");
    console.log(map.get(1));    // "value1"
    console.log(map.get(true));    // "value2"
    console.log(map.get(null));    // "value3"
    ```
  
  - Map 的迭代
    - `for...of` 循环：
    ```javascript
    let map = new Map([
      [1, "value1"],
      [2, "value2"],
      [3, "value3"]
    ]);
    for (let [key, value] of map) {
      console.log(key + " : " + value);
    }
    ```

    - `forEach()` 方法：
    ```javascript
    let map = new Map([
      [1, "value1"],
      [2, "value2"],
      [3, "value3"]
    ]);

    map.forEach(function(value, key) {
      console.log(key + " : " + value);
    });
    ```
  
  - Map 对象的操作
    - Map 与 Array的转换
    ```javascript
    var kvArray = [["key1", "value1"], ["key2", "value2"]];
 
    // Map 构造函数可以将一个 二维 键值对数组转换成一个 Map 对象
    var myMap = new Map(kvArray);
    
    // 使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组
    var outArray = Array.from(myMap);
    ```

    - Map 的克隆
    ```javascript
    let map1 = new Map([
      [1, "value1"],
      [2, "value2"],
      [3, "value3"]
    ]);

    let map2 = new Map(map1);
    console.log(map2.get(2));    // "value2"
    console.log(map1 === map2);    // false
    ```

    - Map 的合并
    ```javascript
    let map1 = new Map([
      [1, "value1"],
      [2, "value2"]
    ]);

    let map2 = new Map([
      [2, "value22"],
      [3, "value3"]
    ]);

    let map3 = new Map([...map1,...map2]);
    console.log(map3.get(2));    // "value22"  合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的
    console.log(map3.get(3));    // "value3"
    ```

2. Set 对象
> Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

  Set 中的特殊值：
  - `+0` 与 `-0` 在存储判断唯一性的时候是恒等的，所以不重复；
  - `undefined` 与 `undefined` 是恒等的，所以不重复；
  - `NaN` 与 `NaN` 是不恒等的，但是在 Set 中只能存一个，不重复。

  ```javascript
  let set = new Set();
  
  let mySet = new Set();
 
  mySet.add(1);             // Set(1) {1}
  mySet.add(5);             // Set(2) {1, 5}
  mySet.add(5);             // Set(2) {1, 5} 这里体现了值的唯一性
  mySet.add("some text");   // Set(3) {1, 5, "some text"} 这里体现了类型的多样性

  var o = {a: 1, b: 2}; 
  mySet.add(o);
  mySet.add({a: 1, b: 2});  
  // Set(5) {1, 5, "some text", {…}, {…}} 这里体现了对象之间引用不同不恒等，即使值相同，Set 也能存储
  ```

  - 类型转换
    ```javascript
    // Array 转 Set
    var mySet = new Set(["value1", "value2", "value3"]);
    // 用...操作符，将 Set 转 Array
    var myArray = [...mySet];

    // String 转 Set
    var mySet = new Set('hello');  // Set(4) {"h", "e", "l", "o"}
    // 注：Set 中 toString 方法是不能将 Set 转换成 String
    ```

  - Set 对象作用
    - 数组去重:
    ```javascript
    let arr = [1, 2, 3, 2, 1, 4, 5, 4];
    let set = new Set(arr);
    let newArr = [...set];
    console.log(newArr);    // [1, 2, 3, 4, 5]
    ```
  
    - 并集
    ```javascript
    let set1 = new Set([1, 2, 3]);
    let set2 = new Set([4, 3, 5]);
    let unionSet = new Set([...set1,...set2]);
    console.log(unionSet);    // Set(5) {1, 2, 3, 4, 5}
    ```

    - 交集
    ```javascript
    let set1 = new Set([1, 2, 3]);
    let set2 = new Set([2, 3, 4]);
    let intersectionSet = new Set([...set1].filter(x => set2.has(x)));
    console.log(intersectionSet);    // Set(2) {2, 3}
    ```

    - 差集
    ```javascript
    let set1 = new Set([1, 2, 3]);
    let set2 = new Set([2, 3, 4]);
    let differenceSet = new Set([...set1].filter(x => !set2.has(x)));
    console.log(differenceSet);    // Set(1) {1}
    ```

### 模块

ES6 的模块化分为导出（export） 与导入（import）两个模块。

特点:
- ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。
- 模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。
- 每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。
- 每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。

#### export 与 import

1. 基本用法:
  - 模块导入导出各种类型的变量，如字符串，数值，函数，类。
  - 导出的函数声明与类声明必须要有名称（`export default` 命令另外考虑）。 
  - 不仅能导出声明还能导出引用（例如函数）。
  - `export` 命令可以出现在模块的任何位置，但必需处于模块顶层。
  - `import` 命令会提升到整个模块的头部，首先执行。

  ```javascript
  /*-----export [test.js]-----*/
  let myName = "Tom";
  let myAge = 20;
  let myfn = function(){
      return "My name is" + myName + "! I'm '" + myAge + "years old."
  }
  let myClass =  class myClass {
      static a = "yeah!";
  }
  export { myName, myAge, myfn, myClass }
  
  /*-----import [xxx.js]-----*/
  import { myName, myAge, myfn, myClass } from "./test.js";
  console.log(myfn());// My name is Tom! I'm 20 years old.
  console.log(myAge);// 20
  console.log(myName);// Tom
  console.log(myClass.a );// yeah!
  ```

2. as 的用法
  - `as` 关键字可以给导入的变量指定别名。

  ```javascript
  /*-----export [test.js]-----*/
  let myName = "Tom";
  export { myName as exportName }
  
  /*-----import [xxx.js]-----*/
  import { exportName } from "./test.js";
  console.log(exportName);// Tom



  // 使用 as 重新定义导出的接口名称，隐藏模块内部的变量
  /*-----export [test1.js]-----*/
  let myName = "Tom";
  export { myName }
  /*-----export [test2.js]-----*/
  let myName = "Jerry";
  export { myName }

  /*-----import [xxx.js]-----*/
  import { myName as name1 } from "./test1.js";
  import { myName as name2 } from "./test2.js";
  console.log(name1);// Tom
  console.log(name2);// Jerry
  ```

3. import 命令的特点
  - 只读属性：`import` 不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 `import` 变量类型为对象的属性值，不能改写 `import` 变量类型为基本类型的值。
    ```javascript
    import {a} from "./xxx.js"
    a = {}; // error
    
    import {a} from "./xxx.js"
    a.foo = "hello"; // a = { foo : 'hello' }
    ```
  
  - 单例模式：多次重复执行同一句 `import` 语句，那么只会执行一次，而不会执行多次。`import` 同一模块，声明不同接口引用，会声明对应变量，但只执行一次 `import` 。
    ```javascript
    import { a } "./xxx.js";
    import { a } "./xxx.js";
    // 相当于 import { a } "./xxx.js";
    
    import { a } from "./xxx.js";
    import { b } from "./xxx.js";
    // 相当于 import { a, b } from "./xxx.js";
    ```

4. export default 命令
- 在一个文件或模块中，`export`、`import` 可以有多个，`export default` 仅有一个。
- `export default` 中的 `default` 是对应的导出接口变量。
- 通过 `export` 方式导出，在导入时要加 `{ }`，`export default` 则不需要。
- `export default` 向外暴露的成员，可以使用任意变量来接收。

```javascript
var a = "My name is Tom!";
export default a; // 仅有一个
 
import b from "./xxx.js"; // 不需要加{}， 使用任意变量接收
```

#### 复合使用
`export` 与 `import` 可以在同一模块使用，使用特点：

- 可以将导出接口改名，包括 `default`。
- 复合使用 `export` 与 `import` ，也可以导出全部，当前模块导出的接口会覆盖继承导出的。

```javascript
export { foo, bar } from "methods";
 
// 约等于下面两段语句，不过上面导入导出方式该模块没有导入 foo 与 bar
import { foo, bar } from "methods";
export { foo, bar };
 
/* ------- 特点 1 --------*/
// 普通改名
export { foo as bar } from "methods";
// 将 foo 转导成 default
export { foo as default } from "methods";
// 将 default 转导成 foo
export { default as foo } from "methods";
 
/* ------- 特点 2 --------*/
export * from "methods";
```

### Generator 函数

ES6 新引入了 Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。

1. Generator 函数组成
  Generator 有两个区分于普通函数的部分：
  - 一是在 `function` 后面，函数名之前有个 `*` ；
  - 函数内部有 `yield` 表达式。
  其中 `*` 用来表示函数为 Generator 函数，`yield` 用来定义函数内部的状态。


  ```javascript
  function* func(){
    console.log("one");
    yield '1';
    console.log("two");
    yield '2'; 
    console.log("three");
    return '3';
  }
  ```

2. 执行机制
> 调用 Generator 函数和调用普通函数一样，在函数名后面加上 `()` 即可，但是 Generator 函数不会像普通函数一样立即执行，而是返回一个指向内部状态对象的指针，所以要调用遍历器对象的 `next` 方法，指针就会从函数头部或者上一次停下来的地方开始执行。

- 执行 Generator 函数，返回的是一个遍历器对象，也就是说，Generator 函数除了可以返回值，还可以用来迭代值。
- 每次调用 Generator 函数，都会返回一个遍历器对象，即使函数内部没有 `return` 语句。
- 遍历器对象，可以用 `next()` 方法，将指针移动到下一个状态。

```javascript
f.next();
// one
// {value: "1", done: false}
 
f.next();
// two
// {value: "2", done: false}
 
f.next();
// three
// {value: "3", done: true}
 
f.next();
// {value: undefined, done: true}
```

3. 函数返回的遍历器对象的方法
  - `next()` 方法：一般情况下，`next` 方法不传入参数的时候，`yield` 表达式的返回值是 `undefined` 。当 `next` 传入参数的时候，该参数会作为上一步 `yield` 的返回值。
    ```javascript
    function* sendParameter(){
      console.log("start");
      var x = yield '2';
      console.log("one:" + x);
      var y = yield '3';
      console.log("two:" + y);
      console.log("total:" + (x + y));
    }

    // next不传参
    var sendp1 = sendParameter();
    sendp1.next();
    // start
    // {value: "2", done: false}
    sendp1.next();
    // one:undefined
    // {value: "3", done: false}
    sendp1.next();
    // two:undefined
    // total:NaN
    // {value: undefined, done: true}

    // next传参
    var sendp2 = sendParameter();
    sendp2.next(10);
    // start
    // {value: "2", done: false}
    sendp2.next(20);
    // one:20
    // {value: "3", done: false}
    sendp2.next(30);
    // two:30
    // total:50
    // {value: undefined, done: true}
    ```

  - `return()` 方法：返回给定值，并结束遍历 Generator 函数。`return` 方法提供参数时，返回该参数；不提供参数时，返回 `undefined` 。
    ```javascript
    function* foo(){
      yield 1;
      yield 2;
      yield 3;
    }
    var f = foo();
    f.next();
    // {value: 1, done: false}
    f.return("foo");
    // {value: "foo", done: true}
    f.next();
    // {value: undefined, done: true}
    ```

  - `throw()` 方法：在Generator 函数体外面抛出异常，再函数体内部捕获。
    ```javascript
    var g = function* () {
      try {
        yield;
      } catch (e) {
        console.log('catch inner', e);
      }
    };
    
    var i = g();
    i.next();
    
    try {
      i.throw('a');
      i.throw('b');
    } catch (e) {
      console.log('catch outside', e);
    }
    // catch inner a
    // catch outside b
    ```

4. yield* 表达式
> `yield*` 表达式表示 `yield` 返回一个遍历器对象，用于在 Generator 函数内部，调用另一个 Generator 函数。

  ```javascript
  function* callee() {
    console.log('callee: ' + (yield));
  }
  function* caller() {
    while (true) {
      yield* callee();
    }
  }
  const callerObj = caller();
  callerObj.next();
  // {value: undefined, done: false}
  callerObj.next("a");
  // callee: a
  // {value: undefined, done: false}
  callerObj.next("b");
  // callee: b
  // {value: undefined, done: false}
  
  // 等同于
  function* caller() {
    while (true) {
        for (var value of callee) {
          yield value;
        }
    }
  }
  ```


### async 与 await

1. async
async 是 ES7 才有的与异步操作有关的关键字，和 Promise ， Generator 有很大关联的。

语法: `async function name([param[, param[, ... param]]]) { statements }`
- `name`: 函数名称。
- `param`: 要传递给函数的参数的名称。
- `statements`: 函数体语句。

返回值：async 函数返回一个 Promise 对象，可以使用 `then` 方法添加回调函数。

```javascript
async function helloAsync(){
  return "helloAsync";
}
  
console.log(helloAsync());  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
  console.log(v);         // helloAsync
});
```

async 函数中可能会有 `await` 表达式，async 函数执行时，如果遇到 `await` 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。`await` 关键字仅在 `async function` 中有效。

```javascript
function testAwait(){
    return new Promise((resolve) => {
      setTimeout(function(){
        console.log("testAwait");
        resolve();
      }, 1000);
   });
}
 
async function helloAsync(){
  await testAwait();
  console.log("helloAsync");
}
helloAsync();
// testAwait
// helloAsync
```

2. await
`await` 操作符用于等待一个 Promise 对象, 它只能在异步函数 `async function` 内部使用。

语法：`[return_value] = await expression;`
- `expression`: 一个 Promise 对象或者任何要等待的值。

返回值：返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。如果一个 Promise 被传递给一个 `await` 操作符，`await` 将等待 Promise 正常处理完成并返回其处理结果。

```javascript
function testAwait (x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
 
async function helloAsync() {
  var x = await testAwait ("hello world");
  console.log(x); 
}
helloAsync ();
// hello world
```

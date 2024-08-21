---
title: javascript
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /logo.svg
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
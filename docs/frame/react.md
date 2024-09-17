---
title: html
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /logo.svg
---

# react

## 安装
:::code-group
```bash [npx]
  npx create-react-app my-app
```

```bash [npm]
  npm init react-app my-app
```

```bash [yarn]
  yarn create react-app my-app
```
:::

## 入门

### 创建和嵌套组件
React 应用程序是由 `组件` 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

React 组件是返回标签的 JavaScript 函数：

```jsx
  function MyButton() {
    return (
      <button>I'm a button</button>
    );
  }
```

至此，你已经声明了 `MyButton`，现在把它嵌套到另一个组件中：

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

你可能已经注意到 `<MyButton />` 是以大写字母开头的。你可以据此识别 React 组件。React **组件必须以大写字母开头**，而 HTML 标签则必须是小写字母。

JSX 比 HTML 更加严格。你**必须闭合标签**，如 `<br />`。你的组件也不能返回多个 JSX 标签。你必须将它们**包裹到一个共享的父级中**，比如 `<div>...</div>` 或使用空的 `<>...</>` 包裹：

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

如果你有大量的 HTML 需要移植到 JSX 中，你可以使用 [在线转换器](https://transform.tools/html-to-jsx)。

### 添加样式 

在 React 中，你可以使用 `className` 来指定一个 CSS 的 `class`。它与 HTML 的 `class` 属性的工作方式相同：

```html
  <img className="avatar" />
```

当你的样式依赖于 JavaScript 变量时，你可以使用 `style` 属性:

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

`style={ { } }` 并不是一个特殊的语法，而是 `style={ }` JSX 大括号内的一个普通 `{ }` 对象。

### 显示数据
JSX 会让你把标签放到 JavaScript 中。而大括号会让你 “回到” JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。例如，这将显示 `user.name`：

```jsx
  return (
    <h1>
      {user.name}
    </h1>
  );
```

你还可以将 JSX 属性 “转义到 JavaScript”，但你必须使用大括号 而非 引号。例如，`className="avatar"` 是将 `"avatar"` 字符串传递给 `className`，作为 CSS 的 `class`。但 `src={user.imageUrl}` 会读取 JavaScript 的 `user.imageUrl` 变量，然后将该值作为 `src` 属性传递：

```jsx
  return (
    <img
      className="avatar"
      src={user.imageUrl}
    />
  );
```

你也可以把更为复杂的表达式放入 JSX 的大括号内，例如 *字符串拼接*：

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
      />
    </>
  );
}
```

### 条件渲染 
React 没有特殊的语法来编写条件语句，因此你使用的就是普通的 JavaScript 代码。例如使用 `if` 语句根据条件引入 JSX：

```jsx
  let content;
  
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }
  
  return (
    <div>
      {content}
    </div>
  );
```

如果你喜欢更为紧凑的代码，可以使用 `条件 ? 表达式 : 表达式`。与 `if` 不同的是，它工作于 JSX 内部：

```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

当你不需要 `else` 分支时，你也可以使用更简短的逻辑 `&&` 语法：

```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

### 列表渲染
你将依赖 JavaScript 的特性，例如 `for 循环` 和 `array 的 map() 函数` 来渲染组件列表。

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

注意， `<li>` 有一个 `key` 属性。对于列表中的每一个元素，你都应该传递一个字符串或者数字给 `key`，用于在其兄弟节点中唯一标识该元素。通常 `key` 来自你的数据，比如数据库中的 ID。如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 `key` 来思考发生了什么。

### 响应事件

你可以通过在组件中声明 **事件处理** 函数来响应事件：

```jsx{7}
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

注意，`onClick={handleClick}` 的结尾没有小括号！不要 **调用** 事件处理函数：你只需 **把函数传递给事件** 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。

### React 状态
通常你会希望你的组件 “记住” 一些信息并展示出来，比如一个按钮被点击的次数。

首先，从 React 引入 `useState`：

```jsx
import { useState } from 'react';
```

现在你可以在你的组件中声明一个 state 变量：

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

你将从 `useState` 中获得两样东西：当前的 `state（count）`，以及用于更新它的函数`（setCount）`。你可以给它们起任何名字，但按照惯例会像 `[something, setSomething] `这样为它们命名。

### React Hook
以 `use` 开头的函数被称为 Hook。`useState` 是 React 提供的一个内置 Hook。你可以在 [React API 参考](https://zh-hans.react.dev/reference/react) 中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。如果你想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它。

### 组件间共享数据
当每个按钮被点击时，只有被点击按钮的 `count` 才会发生改变：
![数据共享](/react-component-data-sharing-1.png)

然而，你经常需要组件 共享数据并一起更新。你需要将各个按钮的 state “向上” 移动到最接近包含所有按钮的组件之中。
![数据共享](/react-component-data-sharing-2.png)

此刻，当你点击任何一个按钮时，`MyApp` 中的 `count` 都将改变，同时会改变 `MyButton` 中的两个 `count`。具体代码如下：

```jsx{2-6,11-12,17,19-20}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

## 


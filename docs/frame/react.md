---
title: react
titleTemplate: frame
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

## React 组件
### 函数组件
  > 使用 JS 的函数（或箭头函数）创建的组件，就叫做函数组件

  - 组件的名称必须**首字母大写**，react内部会根据这个来判断是组件还是普通的HTML标签
  - 函数组件必须**有返回值**，表示该组件的 UI 结构，如果不需要渲染任何内容，则返回 null
  - 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的返回值就是对应的内容
  - 使用函数名称作为组件标签名称，可以成对出现也可以自闭合

  ```jsx
    // 定义函数组件
    function HelloFn () {
      return <div>这是我的第一个函数组件!</div>
    }

    function App () {
      return (
        <div className="App">
          {/* 渲染函数组件 */}
          <HelloFn />
          <HelloFn></HelloFn>
        </div>
      )
    }

    export default App
  ```

  1. 事件绑定
  ```jsx
    // 函数组件
    function HelloFn () {

      // 定义事件回调函数
      function handleClick () {
        console.log('按钮被点击了')
      }
      // or
      //  const handleClick = () => {
      //    console.log('按钮被点击了')
      //  }

      // 绑定事件
      return <button onClick={handleClick}>点我</button>
    }
  ```

  2. 获取事件对象
  ```jsx
    // 函数组件
    function HelloFn () {

      // 定义事件回调函数
      function handleClick (event) {
        console.log('事件对象：', event)
      }
      // or
      //  const handleClick = (event) => {
      //    console.log('事件对象：', event)
      //  }

      // 绑定事件
      return <button onClick={handleClick}>点我</button>
    }
  ```

  3. 传递额外参数
  ```jsx
    // 函数组件
    function HelloFn () {

      const list = [
        {
          id: 1001,
          name: 'react'
        },
        {
          id: 1002,
          name: 'vue'
        }
      ]

      // 定义事件回调函数
      function handleClick (event, id) {
        console.log(event, id)
      }
      // or
      //  const handleClick = (event, id) => {
      //    console.log(event, id)
      //  }

      // 绑定事件
      return <ul>
        {list.map(item => <li key={item.id}>
          {item.name}
          <button onClick={(e) => handleClick(e, item.id)}>点我</button>
        </li>)}
      </ul>
    }
  ```


### 类组件
  > 使用 ES6 的 `class` 创建的组件，叫做类（class）组件

  - 类名称也必须以**大写字母开头**
  - 类组件应该继承 `React.Component` 父类，从而使用父类中提供的方法或属性
  - 类组件必须**提供 `render` 方法**，`render` 方法必须**有返回值**，表示该组件的 UI 结构

  ```jsx
    // 引入React
    import React from 'react'

    // 定义类组件
    class HelloC extends React.Component {
      render () {
        return <div>这是我的第一个类组件!</div>
      }
    }

    function App () {
      return (
        <div className="App">
          {/* 渲染类组件 */}
          <HelloC />
          <HelloC></HelloC>
        </div>
      )
    }
    export default App
  ```

  1. 事件绑定
  ```jsx
    // 定义类组件
    class HelloC extends React.Component {

      // 定义事件回调函数
      handleClick () {
        console.log('按钮被点击了')
      }
      // or
      //  handleClick = () => {
      //    console.log('按钮被点击了')
      //  }

      // 绑定事件
      render () {
        return <button onClick={() => this.handleClick()}>点我</button>
      }
    }
  ```

  2. 获取事件对象
  ```jsx
    // 定义类组件
    class HelloC extends React.Component {

      // 定义事件回调函数
      handleClick (event) {
        console.log('事件对象：', event)
      }
      // or
      //  handleClick = (event) => {
      //    console.log('事件对象：', event)
      //  }

      // 绑定事件
      render () {
        return <button onClick={this.handleClick}>点我</button>
      }
    }
  ```

  3. 传递额外参数
  ```jsx
    // 定义类组件
    class HelloC extends React.Component {

      state = {
        list: [
          {
            id: 1001,
            name: 'react'
          },
          {
            id: 1002,
            name: 'vue'
          }
        ]
      }

      // 定义事件回调函数
      handleClick (event, id) {
        console.log(event, id)
      }
      // or
      //  handleClick = (event, id) => {
      //    console.log(event, id)
      //  }

      // 绑定事件
      render () {
        const { list } = this.state
        return <ul>
          {list.map(item => <li key={item.id}>
            {item.name}
            <button onClick={(e) => this.handleClick(e, item.id)}>点我</button>
          </li>)}
        </ul>
      }
    }
  ```

  4. this问题说明
  ![this问题说明](/react-this.png)
    
  ```jsx
    class App extends React.Component {

      // constructor () {
      //   super()
      //   this.undefinedClick = this.undefinedClick.bind(this)  // this -> App组件 （this）
      // }
      
      state = {
        msg: 'hello react'
      }

      undefinedClick() {
        console.log(this.state.msg)  // this -> undefined
      }

      this1Click() {
        console.log(this.state.msg)  // this -> App组件 （this）
      }

      this2Click = () => {
        console.log(this.state.msg)  // this -> App组件 （this）
      }

      this3Click() {
        console.log(this.state.msg)  // this -> App组件 （this）
      }

      render() {
        return (
          <div>
            <button onClick={this.undefinedClick}>点我</button>
            <button onClick={() => this.this1Click()}>点我</button>
            <button onClick={this.this2Click}>点我</button>
            <button onClick={this.this3Click.bind(this)}>点我</button>
          </div>
        )
      }
    }
  ```
  
  随着js标准的发展，主流的写法已经变成了 `class fields`，无需考虑太多 `this` 问题



## React 组件状态

:::tip 提示
一个前提：在React hook出来之前，函数式组件是没有自己的状态的，所以我们统一通过类组件来讲解
:::

![react-class-state](/react-class-state.png)

**说明：**
  1. 函数组件：
    - 无状态组件【前提：不考虑 `hooks` 的情况下】
    - 没有自己的状态，只负责页面的展示（静态，不会发生变化），性能比较高
  2. 类组件
    - 有状态组件
    - 当组件的状态发生了改变，页面结构也就发生了改变（数据驱动视图）
    - 状态可以是任何数据类型，包括对象、数组、字符串、数字等

### 初始化状态
  - 通过 `class` 的实例属性 `state` 来初始化 
  - `state` 的值是一个对象结构，表示一个组件可以有多个数据状态 

  ```jsx
    class Counter extends React.Component {
      // 初始化状态
      state = {
        count: 0
      }
      render() {
        return <button>计数器</button>
      }
    }
  ```

### 读取状态
  - 通过 `this.state` 来获取状态 

  ```jsx
    class Counter extends React.Component {
      // 初始化状态
      state = {
        count: 0
      }
      render() {
        // 读取状态
        return <button>计数器{this.state.count}</button>
      }
    }
  ```

### 修改状态
  - 语法
    - `this.setState({ 要修改的部分数据 })`
  - `setState` 方法作用 
    - 修改 `state` 中的数据状态
    - 更新UI
  - 注意事项
	  - 不要直接修改 `state` 中的值，必须通过 `setState` 方法进行修改 
  
  ```jsx
    class Counter extends React.Component {
      // 初始化状态
      state = {
        count: 0
      }

      setCount = () => {
        // 修改状态
        this.setState({
          count: this.state.count + 1
        })
      }

      render() {
        // 读取状态
        return <button onClick={this.setCount}>计数器{this.state.count}</button>
      }
    }
  ```

  1. `setState` 进阶 - 更新数据的说明
    - `setState` 方法更新状态是同步的，但是表现为延迟更新状态（注意：非异步更新状态！！！）
    - 延迟更新状态：
      - 调用 `setState` 时，将要更新的状态对象，放到一个更新队列中暂存起来（没有立即更新）
      - 如果多次调用 `setState` 更新状态，状态会进行合并，后面覆盖前面
      - 等到所有的操作都执行完毕，React 会拿到最终的状态，然后触发组件更新
    - 优势：
      - 多次调用 `setState` 不会造成性能问题，只会合并更新，最后一次更新 `setState()` ，只会触发一次重新渲染，提升性能


  2. `setState` 进阶 - 推荐语法
    - 问题：多次调用 `setState` 同时修改相同的状态，只有一个会起到作用？
    - 原因：由于 `setState` 是延迟更新，在多次调用 `setState` 情况下，后续的 `setState` 无法依赖于前面 `setState` 中的值
    - 解决方案：使用 `setState((prevState) => {})` 语法
      - `prevState`：表示上一次 `setState` 更新后的状态
    
    ```jsx
      this.setState((prevState) => {
        return {
          count: prevState.count + 1
        }
      })
    ```

  3. `setState` 进阶 - 第二个参数
    - 语法：`setState(updater[, callback])`
    - `setState` 中的第二个参数为可选参数 
      - 它是一个回调函数
      - 会在状态更新（页面完成重新渲染）后立即执行某个操作
    
    ```jsx
      this.setState({
        count: this.state.count + 1
      }, () => {
        console.log('状态更新后并且 DOM 更新后执行')
      })
    ```

### React的状态不可变

> 不要直接修改状态的值，而是基于当前状态创建新的状态值

1. 错误的直接修改
  ```jsx
    state = {
      count : 0,
      list: [1,2,3],
      person: {
        name:'jack',
        age:18
      }
    }

    // 直接修改简单类型Number
    this.state.count++
    ++this.state.count
    this.state.count += 1
    this.state.count = 1

    // 直接修改数组
    this.state.list.push(123)
    this.state.list.spice(1,1)

    // 直接修改对象
    this.state.person.name = 'rose'
  ```

2. 基于当前状态创建新值
  ```jsx
    state = {
      count : 0,
      list: [1,2,3],
      person: {
        name:'jack',
        age:18
      }
    }

    this.setState({
      count: this.state.count + 1
      list: [...this.state.list, 4],
      person: {
        ...this.state.person,
        // 覆盖原来的属性 就可以达到修改对象中属性的目的
        name: 'rose'
      }
    })
  ```


## React 组件通信

### 父子组件通信
  - 父组件通过 `props` 向子组件传递数据
  - 子组件通过回调函数向父组件传递数据

  ```jsx
    import React from 'react'

    // 函数式子组件
    function FSon(props) {
      // props是只读对象，不能直接修改
      // props可以传递任意数据（数字、字符串、布尔值、数组、对象、函数、JSX）
      console.log(props)

      function handleClick() {
        // 调用父组件传递过来的回调函数 并注入参数
        props.changeMsg('this is newMessage')
      }

      return (
        <div>
          子组件1
          {props.msg}
          <button onClick={handleClick}>change</button>
        </div>
      )
    }

    // 类子组件
    class CSon extends React.Component {

      handleClick = () => {
        // 调用父组件传递过来的回调函数 并注入参数
        props.changeMsg('this is newMessage')
      }

      render() {
        return (
          <div>
            子组件2
            {this.props.msg}
            <button onClick={this.handleClick}>change</button>
          </div>
        )
      }
    }

    // 父组件
    class App extends React.Component {
      state = {
        message: 'this is message'
      }

      // 提供回调函数
      changeMessage = (newMsg) => {
        console.log('子组件传过来的数据:',newMsg)
        this.setState({
          message: newMsg
        })
      }

      render() {
        return (
          <div>
            <div>父组件{this.state.message}</div>
            <FSon msg={this.state.message} changeMsg={this.changeMessage} />
            <CSon msg={this.state.message} changeMsg={this.changeMessage} />
          </div>
        )
      }
    }

    export default App
  ```

#### props校验
实现步骤：
1. 安装属性校验包：`yarn add prop-types`
2. 导入 `prop-types` 包
3. 使用 `组件名.propTypes = {}` 给组件添加校验规则

:::code-group
```jsx [函数式组件]
  import { Component } from 'react'
  import PropTypes from 'prop-types'

  class App extends Component {
    state = {
      colors: 'red',
    }
    render() {
      return (
        <div>
          <h1>props 校验</h1>
          <Child colors={this.state.colors} />
        </div>
      )
    }
  }

  // 函数组件
  function Child({ colors }) {
    return (
      <div>
        <h2>子组件</h2>
        {colors.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    )
  }

  Child.propTypes = {
    colors: PropTypes.array,
  }
```

```jsx [类组件]
  import { Component } from 'react'
  import PropTypes from 'prop-types'

  class App extends Component {
    state = {
      colors: 'red',
    }
    render() {
      return (
        <div>
          <h1>props 校验</h1>
          <Child colors={this.state.colors} />
        </div>
      )
    }
  }

  // 类组件
  class Child extends Component {
    // 类组件：约束方式二
    static propTypes = {
      colors: PropTypes.array,
    }
    render() {
      const { colors } = this.props
      return (
        <div>
          <h2>子组件</h2>
          {colors.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      )
    }
  }

  // // 类组件: 约束方式一：
  // //  约束传入的属性类型
  // Child.propTypes = {
  //   colors: PropTypes.array,
  // }

  export default App
```
:::

1. 规则说明
  - 常见类型：`array`、`bool`、`func`、`number`、`object`、`string`
  - React元素类型：`element`
  - 必填项：`isRequired`
  - 特定的结构对象：`shape({})`

  ```jsx
    // 常见类型
    optionalFunc: PropTypes.func,
    // 必填 只需要在类型后面串联一个isRequired
    requiredFunc: PropTypes.func.isRequired,
    // 特定结构的对象
    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    })
  ```

2. 默认值
  - 函数组件：直接使用函数参数默认值
    ```jsx
      function List({pageSize = 10}) {
        return (
          <div>
            此处展示props的默认值：{ pageSize }
          </div>
        )
      }

      // 设置默认值    			//新版 React 已经不再推荐使用 defaultProps 来添加默认值
                            //而是推荐使用函数参数的默认值来实现：
      // List.defaultProps = {
      //   pageSize: 10
      // }

      // 不传入pageSize属性
      <List />
    ```

  - 类组件：使用类静态属性声明默认值，`static defaultProps = {}`
    ```jsx
      class List extends Component {
        // 方式二：使用类静态属性声明默认值 （推荐）
        static defaultProps = {
          pageSize: 10
        }

        render() {
          return (
            <div>
              此处展示props的默认值：{this.props.pageSize}
            </div>
          )
        }
      }

      // 方式一：设置默认值  
      // List.defaultProps = {
      //   pageSize: 10
      // }
      <List />
    ```

### 兄弟组件通信
  - 利用共同的父组件实现兄弟通信

  ```jsx
    import React from 'react'

    // 子组件A
    function SonA(props) {
      return (
        <div>
          SonA
          {props.msg}
        </div>
      )
    }

    // 子组件B
    function SonB(props) {
      return (
        <div>
          SonB
          <button onClick={() => props.changeMsg('new message')}>changeMsg</button>
        </div>
      )
    }

    // 父组件
    class App extends React.Component {
      // 父组件提供状态数据
      state = {
        message: 'this is message'
      }
      // 父组件提供修改数据的方法
      changeMsg = (newMsg) => {
        this.setState({
          message: newMsg
        })
      }

      render() {
        return (
          <>
            {/* 接收数据的组件 */}
            <SonA msg={this.state.message} />
            {/* 修改数据的组件 */}
            <SonB changeMsg={this.changeMsg} />
          </>
        )
      }
    }

    export default App
  ```

### 跨层级组件通信
  - 利用 `context` API 实现跨层级通信

  ```jsx
    import React, { createContext }  from 'react'

    // 1. 创建 Context 对象 导出 Provider 和 Consumer对象  
    const { Provider, Consumer } = createContext()

    // 3. 需要用到数据的组件使用 Consumer 包裹获取数据 
    function ComC() {
      return (
        <Consumer >
          {value => <div>{value}</div>}
        </Consumer>
      )
    }

    function ComA() {
      return (
        <ComC/>
      )
    }

    // 2. 使用 Provider 包裹上层组件提供数据
    class App extends React.Component {
      state = {
        message: 'this is message'
      }
      render() {
        return (
          <Provider value={this.state.message}>
            <div className="app">
              <ComA />
            </div>
          </Provider>
        )
      }
    }

    export default App
  ```

  说明：
    - `createContext`：可以传入默认值
    - 使用 `Provider` 时，`Consumer` 获取到的就是 `value` 的值
    - 不使用 `Provider` 时，`Consumer` 获取到的就是默认值

  ```jsx
    // 有默认值的情况：
    const { Provider, Consumer } = createContext('pink')

    // 父组件：
    <Provider value="blue"></Provider>

    // 子组件（使用 Provider 组件）：
    <Consumer>
      {color => <span style={{ color }}>文字</span>}  // 蓝色
    </Consumer>

    // 子组件（不使用 Provider 组件）：
    <Consumer>
      {color => <span style={{ color }}>文字</span>}  // 粉色
    </Consumer>
  ```

## React 生命周期
> 组件的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程。
**注意：**只有类组件才有生命周期（类组件 实例化  函数组件 不需要实例化）
![react-lifecycle](/react-lifecycle.png)

[React 生命周期图示](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram)

### 生命周期 - 挂载阶段
在组件实例被创建并插入到dom中时
![componentDidMount](/lifecycle-didMount.png)

| 钩子函数 | 触发时机	| 作用 |
| ------- | ------- | ---- |
| `constructor` |	创建组件时，最先执行，初始化的时候只执行一次 | `初始化state`  `创建 Ref`  `使用 bind 解决 this 指向`等 |
| `render` | 每次组件渲染都会触发 | `渲染UI`（注意： **不能在里面调用 `setState()`**）|
| `componentDidMount` |	组件挂载（完成DOM渲染）后执行，初始化的时候执行一次 |	`发送网络请求`  `DOM操作` |

`constructor` 说明
  - 作用：类的构造器，当创建类实例时，会自动执行这个函数
  - 特点：由于类组件都是继承自 Component，在 Component 中已经帮我们实现了 constructor 中的内容，所以一般我们不会使用

  ```jsx
    export default class App extends Component {
      constructor (props) {
        super(props)
      }
      render () {
        return (
          <div>
            <h3>App</h3>
          </div>
        )
      }
    }
  ```

**注意：**
- `class` 类的限制：如果继承了父类，并且在 `class` 中手动写了 `constructor`，那么，必须手动调用 `super`
- `React` 组件限制：如果写了 `constructor`，必须将 `props` 传递给 `super`，这样，才能保证在 `constructor` 中通过 `this.props` 来拿到 `props` 值


### 生命周期 - 更新阶段
当组件的 `props` 或 `state` 发生变化时
![componentDidUpdate](/lifecycle-didUpdate.png)

| 钩子函数 | 触发时机	| 作用 |
| ------- | ------- | ---- |
| `render` | 每次组件渲染都会触发 | `渲染UI`（与 **挂载阶段** 是同一个`render`）|
| `componentDidUpdate` | 组件更新后（DOM渲染完毕） | `DOM操作` 可以获取到更新后的DOM内容，不要直接调用 `setState()` 需包裹在一个条件语句里 |

**强制更新：** `this.forceUpdate()`

### 生命周期 - 卸载阶段
当组件从 DOM中移除时

| 钩子函数 | 触发时机	| 作用 |
| ------- | ------- | ---- |
| `componentWillUnmount` | 组件卸载（从页面中消失） |	`执行清理工作`（比如：清理定时器等）|


## React Hooks

> 一套能够使函数组件更强大，更灵活的“钩子”

React体系里组件分为 `类组件` 和 `函数组件`
经过多年的实战，函数组件是一个更加匹配React的设计理念 UI = f(data)，也更有利于逻辑拆分与重用的组件表达形式，而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从react v16.8开始，Hooks应运而生

注意点：
1. 有了hooks之后，为了兼容老版本，class类组件并没有被移除，俩者都可以使用
2. 有了hooks之后，不能在把函数成为无状态组件了，因为hooks为函数组件提供了状态
3. hooks只能在函数组件中使用

Hooks解决了什么问题：
1. 组件的逻辑复用：
  在hooks出现之前，react先后尝试了 `mixins混入`，`HOC高阶组件`，`render-props`等模式。但是都有各自的问题，比如mixin的数据来源不清晰，高阶组件的嵌套问题等等 
2. class组件自身的问题：
class组件就像一个厚重的‘战舰’ 一样，大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this指向问题等等，而我们更多时候需要的是一个轻快灵活的‘快艇’ 

### useState
> `useState` 为函数组件提供状态（`state`）

```jsx
  import { useState } from 'react'

  function App() {
    // 参数：状态初始值比如,传入 0 表示该状态的初始值为 0
    // 返回值：数组,包含两个值：1 状态值（state） 2 修改该状态的函数（setState）
    const [count, setCount] = useState(0)
    return (
      <button onClick={() => setCount(count + 1)}>{count}</button>
    )
  }
  export default App
```

**注意：**
  - 修改状态的时候，一定要**使用新的状态替换旧的状态**，不能直接修改旧的状态，尤其是引用类型
  - `useState` 只能出现在 函数组件 或者其他 hook函数 中 
  - `useState` 不能嵌套在 if/for/其它函数中（react按照hooks的调用顺序识别每一个hook） 

  ```js
    let num = 1
    function List(){
      num++
      if(num / 2 === 0){
        const [name, setName] = useState('cp') 
      }
      const [list,setList] = useState([])
    }
    // 俩个hook的顺序不是固定的，这是不可以的！！！
  ```

#### useState - 回调函数的参数
- 使用场景
  > 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 `state` 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 `state`，此函数只在初始渲染时被调用

  ```jsx
    const [name, setName] = useState(()=>{   
      // 编写计算逻辑    

      return '计算之后的初始值'
    })
  ```

- 语法规则
  1. 回调函数 `return` 出去的值将作为 `name` 的初始值
  2. 回调函数中的逻辑只会在组件初始化的时候执行一次

- 语法选择
  1. 如果就是初始化一个普通的数据 直接使用 `useState(普通数据)` 即可
  2. 如果要初始化的数据无法直接得到需要通过计算才能获取到，使用 `useState(()=>{})`

### useEffect
> `useEffect` 用于处理副作用（side effect）

什么是副作用
  > 副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）

常见的副作用
  - 数据请求 ajax 发送
  - 手动修改 dom
  - localstorage 操作

```jsx
  import { useEffect, useState } from 'react'

  function App() {
    const [count, setCount] = useState(0)
  
    useEffect(()=>{
      // dom操作
      document.title = `当前已点击了${count}次`
    })
    return (
      <button onClick={() => setCount(count + 1)}>{count}</button>
    )
  }

  export default App
```

1. 依赖项控制执行时机
  - 不添加依赖项
    > 组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行
    > 1. 组件初始渲染
    > 2. 组件更新 （不管是哪个状态引起的更新）

    ```jsx
      useEffect(()=>{
          console.log('副作用执行了')
      })
    ```

  - 添加空数组
    > 组件只在首次渲染时执行一次

    ```jsx
      useEffect(()=>{
        console.log('副作用执行了')
      },[])
    ```

  - 添加特定依赖项
    > 副作用函数在首次渲染时执行，在依赖项发生变化时重新执行

    ```jsx
      function App() {  
        const [count, setCount] = useState(0)  
        const [name, setName] = useState('zs') 
        
        useEffect(() => {    
            console.log('副作用执行了')  
        }, [count])  
        
        return (    
          <>      
            <button onClick={() => { setCount(count + 1) }}>{count}</button>      
            <button onClick={() => { setName('cp') }}>{name}</button>    
          </>  
        )
      }
    ```
**注意事项：**
`useEffect` 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有bug出现

2. 清理副作用
> 如果想要清理副作用 可以在副作用函数中的末尾返回一个新的函数，在新的函数中编写清理副作用的逻辑
> 注意执行时机为：
> 1. 组件卸载时自动执行
> 2. 组件更新时，下一个 `useEffect` 副作用函数执行之前自动执行

```jsx
  import { useEffect, useState } from "react"

  const App = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      const timerId = setInterval(() => {
        setCount(count + 1)
      }, 1000)

      return () => {
        // 用来清理副作用的事情
        clearInterval(timerId)
      }
    }, [count])

    return (
      <div>
        {count}
      </div>
    )
  }

  export default App
```

3. useEffect - 异步操作
> 如何在 `useEffect` 中发送网络请求，并且封装同步 `async await` 操作

说明：
  - 在组件中，可以使用 `useEffect Hook` 来发送请求获取数据
  - `effect` 只能是一个同步函数，不能使用 `async` 
  - 如果 `effect` 是 `async` 的，此时返回值是 `Promise` 对象。这样的话，就无法保证清理函数被立即调用
  - 为了使用 `async/await` 语法，可以在 `effect` 内部创建 `async` 函数，并调用

```jsx  
  // 错误演示：不要给 effect 添加 async
  useEffect(async () => {
    const res = await axios.get('http://xxx')
    return () => {}
  }, [])

  // 正确使用 在内部单独定义一个函数，然后把这个函数包装成同步
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get('http://xxx')
    }
    loadData()

    return () => {}
  }, [])
```

语法总结：
```jsx
  // 1
  // 触发时机：1 第一次渲染会执行 2 每次组件重新渲染都会再次执行
  // componentDidMount + ComponentDidUpdate
  useEffect(() => {})

  // 2（使用频率最高）
  // 触发时机：只在组件第一次渲染时执行
  // componentDidMount
  useEffect(() => {}, [])

  // 3（使用频率最高）
  // 触发时机：1 第一次渲染会执行 2 当 count 变化时会再次执行
  // componentDidMount + componentDidUpdate（判断 count 有没有改变）
  useEffect(() => {}, [count])

  // 4
  useEffect(() => {
    // 返回值函数的执行时机：组件卸载时
    // 在返回的函数中，清理工作
    return () => {
      // 相当于 componentWillUnmount
    }
  }, [])
```

### useRef
> `useRef` 用于获取真实的dom元素对象或者是组件对象

- 获取dom元素对象
  ```jsx
    import { useEffect, useRef } from 'react'

    function App() {  
        const h1Ref = useRef(null) 

        useEffect(() => {   
            // 通过 h1Ref.current 来访问对应的 DOM
            console.log(h1Ref.current)  
        },[])  

        return (    
            <div>      
                <h1 ref={ h1Ref }>this is h1</h1>    
            </div>  
        )
    }

    export default App
  ```

- 获取组件对象
  > 函数组件由于没有实例，不能使用ref获取，如果想获取组件实例，必须是类组件

  :::code-group
  ```jsx [Foo.js]
    class Foo extends React.Component {  
      sayHi = () => {    
        console.log('say hi')  
      }  

      render(){    
        return <div>Foo</div>  
      }
    }
        
    export default Foo
  ```

  ```jsx [App.js]
    import { useEffect, useRef } from 'react'
    import Foo from './Foo'

    function App() {  
      const h1Foo = useRef(null)  

      useEffect(() => {    
        console.log(h1Foo.current)  
      }, [])  

      return (    
        <div> 
          <Foo ref={ h1Foo } />
        </div>  
      )
    }

    export default App
  ```
  :::

### useContext
> `useContext` 用于跨层级组件通信

```jsx
  import { createContext, useContext } from 'react'

  // 1. 使用 createContext 创建 Context 对象
  const Context = createContext()

  function Foo() {  
    return <div>Foo <Bar/></div>
  }

  function Bar() {  
    // 3. 在底层组件通过 useContext 函数获取数据  
    const name = useContext(Context)  
    return <div>Bar {name}</div>
  }

  function App() {  
    return (    
      // 2. 在顶层组件通过 Provider 提供数据   
      <Context.Provider value={'this is name'}>     
        <div><Foo/></div>    
      </Context.Provider>  
    )
  }

  export default App
```

`useContext Hook` 与 `<Context.Consumer>` 的异同：
  - 相同点： 
    都可以获取 `Context.Provider` 中提供的 `value` 数据
  - 不同点： 
    `<Context.Consumer>`：在 JSX 中获取 `Context` 共享的数据 <br>
    `useContext`：在 JS 代码 或者 JSX 中获取 `Context` 的数据

```jsx
  function Bar() {  
    // 在普通的 JS 代码中：
    const name = useContext(Context) 
    console.log(name)

    return (
      <div>
        <div>Bar useContext 获取到的 name 值： {name}</div>
        {/* 在 JSX 中： */}
        <Context.Consumer>
          {name => <span>共享的数据为：{name}</span>}
        </Context.Consumer>
      </div>
    )
  }
```

#### useContext - 跨文件使用

说明：
1. 在开发中，多个组件文件往往会被管理在不同的文件夹中： 
  - App 单独一个文件
  - Node 单独一个文件
  - SubNode 单独一个文件
2. `useContext` 获取要获取数据， 
  - 必须保证传入的 `Context` 对象与传入数据的对象是同一个

解决方案：
1. 单独创建一个 `Context` 文件，将 `Context` 对象导出
  ```jsx [Context.js] 
    // 用来创建一个公共的 context 实例
    import { createContext } from 'react'
    const myContext = createContext()

    export default myContext
  ```

2. 在需要传参的组件导入 `Context` 对象，并传入参数
  ```jsx [App.js]
    import Node from './Node.js'
    import { useState } from 'react'

    import myContext from './myContext'  ////////// 自定义名字实现/////////////

    export default function App() {
      const [color, setColor] = useState('blue')

      return (
        <myContext.Provider value={{ color, setColor }}>
          <div className="App">
            <h2>App</h2>
            <Node />
          </div>
        </myContext.Provider>
      )
    }
  ```

3. 在需要获取数据的组件导入 `Context` 对象，并使用 `useContext` 获取数据
  ```jsx [Node.js]
    import { useContext } from 'react'

    import myContext from './myContext'  ////////// 自定义名字实现/////////////

    export default function Node() {
      // 接收数据
      const { color, setColor } = useContext(myContext)

      return (
        <div className="Node">
          <h2>Node</h2>
          <div style={{ color: color }}>color: {color}</div>
          <button onClick={() => setColor('red')}>点我修改 color</button>
        </div>
      )
    }
  ```

[更多 API 介绍](https://zh-hans.react.dev/reference/react)

# React Router
## 基础使用
  1. 导入必要的路由 router 内置组件
  2. 准备俩个 React 组件
  3. 按照路由的规则进行路由配置

```jsx
// 引入必要的内置组件
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 准备俩个路由组件
const Home = () => <div>this is home</div>
const About = () => <div>this is about</div>

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

## 核心内置组件说明
1. BrowerRouter
> 作用: 包裹整个应用，一个React应用只需要使用一次

| 模式 | 实现方式	| 路由url表现 |
| ----- | ------- | ------ |
| `HashRouter` | hash值实现	| `http://localhost:3000/#/about` |
| `BrowerRouter` | h5的 `history.pushState` API实现 |	`http://localhost:3000/about` |

2. Link
> 作用: 用于指定导航链接，完成声明式的路由跳转  类似于 `<router-link/>`

```jsx
  <Link to="/path">页面 一</Link>
```

这里to属性用于指定路由地址，表示要跳转到哪里去，Link组件最终会被渲染为原生的a链接

3. Routes
> 作用: 提供一个路由出口，组件内部会存在多个内置的Route组件，满足条件的路由会被渲染到组件内部
> 类比 `<router-view/>`

```jsx
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
  </Routes>
```

4. Route
> 作用: 用于定义路由路径和渲染组件的对应关系  [element：因为react体系内 把组件叫做react element]

```jsx
  <Route path="/" element={<Home />}></Route>
```

其中 `path` 属性用来指定匹配的路径地址，`element` 属性指定要渲染的组件，图中配置的意思为: 当url上访问的地址为 `/` 时，当前路由发生匹配，对应的 `Home` 组件渲染

## 编程式导航
实现步骤：
1. 导入一个 `useNavigate` 钩子函数
2. 执行 `useNavigate` 函数 得到 跳转函数
3. 在事件中执行跳转函数完成路由跳转

```jsx
// 导入useNavigate函数
import { useNavigate } from 'react-router-dom'
const Home = () => {
  // 执行函数
  const navigate = useNavigate()
  return (
    <div>
      Home
      <button onClick={ ()=> navigate('/about') }> 跳转关于页 </button>
    </div>
  )
}

export default Home
```

注: 如果在跳转时不想添加历史记录，可以添加额外参数 `replace` 为 `true`
```jsx
  navigate('/about', { replace: true } )
```

## 路由传参

1. searchParams传参
  - 路由传参
    ```jsx
      navigate('/about?id=123')
    ```
  - 路由取参
    ```jsx
      import { useSearchParams } from'react-router-dom'

      const [ params ] = useSearchParams()
      const id = params.get('id')
    ```

2. params传参
  - 路由传参
    ```jsx
      navigate('/article/123')
    ```
  - 路由取参
    ```jsx
      import { useParams } from'react-router-dom'

      const { id } = useParams()
    ```

## 嵌套路由

实现步骤：
1. App.js中定义嵌套路由声明
2. Layout组件内部通过 `<Outlet/>` 指定二级路由出口

:::code-group
```jsx [App.js]
  import { BrowserRouter, Routes, Route, Link } from'react-router-dom'

  <Routes>
    <Route path="/"  element={<Layout/>}>
      <Route path="board" element={ <Board/> } />
      <Route path="article" element={ <Article/> } />
    </Route>
    { /* 省略部分  */ }
  </Routes>
```

```jsx [Layout.js]
  import { Outlet } from 'react-router-dom'

  const Layout = () => {
    return (
      <div>
        layout
        { /* 二级路由的path等于 一级path + 二级path  */ }
        <Link to="/board">board</Link>
        <Link to="/article">article</Link>
        { /* 二级路由出口 */ }
        <Outlet/>
      </div>
    )
  }

  export default Layout
```
:::

## 默认二级路由
> 场景: 应用首次渲染完毕就需要显示的二级路由

实现步骤:
1. 给默认二级路由标记index属性
2. 把原本的路径path属性去掉

:::code-group
```jsx [App.js]
import { BrowserRouter, Routes, Route, Link } from'react-router-dom'

<Routes>
  <Route path="/"  element={<Layout/>}>
    <Route index element={ <Board/> } />
    <Route path="article" element={ <Article/> } />
  </Route>
</Routes>
```

```jsx [Layout.js]
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      layout
      { /* 默认二级不再具有自己的路径  */ }
      <Link to="/">board</Link>
      <Link to="/article">article</Link>
      { /* 二级路由出口 */ }
      <Outlet/>
    </div>
  )
}
```
:::

## 404路由配置
> 场景：当url的路径在整个路由配置中都找不到对应的path，使用404兜底组件进行渲染

:::code-group
```jsx [NotFound.jsx]
  // 准备一个NotFound组件

  const NotFound = () => {
    return <div>this is NotFound</div>
  }

  export default NotFound
```

```jsx [App.js]
  import { BrowserRouter, Routes, Route, Link } from'react-router-dom'
  import NotFound from './NotFound.jsx'

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Board />} />
        <Route path="article" element={<Article />} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
```
:::


## 集中式路由配置
> 场景: 当我们需要路由权限控制点时候, 对路由数组做一些权限的筛选过滤，所谓的集中式路由配置就是用一个数组统一把所有的路由对应关系写好替换 本来的 Roues 组件

```jsx [App.js]
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'

import Layout from './pages/Layout'
import Board from './pages/Board'
import Article from './pages/Article'
import NotFound from './pages/NotFound'

// 1. 准备一个路由数组 数组中定义所有的路由对应关系
const routesList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: 'article',
        element: <Article />,
      },
    ],
  },
  // 增加n个路由对应关系
  {
    path: '*',
    element: <NotFound />,
  },
]

// 2. 使用 useRoutes 方法传入 routesList 生成 Routes 组件
function WrapperRoutes() {
  let element = useRoutes(routesList)
  return element
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 3. 替换之前的Routes组件 */}
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
```

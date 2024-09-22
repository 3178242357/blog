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


## React组件通信

1. 父子组件通信
  - 父组件通过 props 向子组件传递数据
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

  2. 兄弟组件通信
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

  3. 跨层级组件通信
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
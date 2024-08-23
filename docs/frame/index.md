---
title: frame
---

# Vue 

<div class="introduce">
  <a href="https://cn.vuejs.org" target="_blank"><img src="/vue.svg" alt="vue" width="100" height="100"></a>
  <ul>
    <li> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的<strong>渐进式框架</strong>。</li>
    <li> <a href="/frame/vue">Vue</a> 只关注视图层， 采用自底向上增量开发的设计。</li>
    <li> <a href="/frame/vue">Vue</a> 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。</li>
  </ul>
</div>

一个简单的 Vue 实例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello Vue.js!</title>
    <script src="https://cdn.staticfile.net/vue/2.7.0/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      <p>{{ message }}</p>
    </div>

    <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    })
    </script>
  </body>
</html>
```

# React

<div class="introduce">
  <a href="https://zh-hans.react.dev" target="_blank"><img src="/react.png" alt="react" width="100" height="100"></a>
  <ul>
    <li> React 是一个用于构建用户界面的 JavaScript 库。</li>
    <li> <a href="/frame/react">React</a> 主要用于构建 UI，很多人认为 <a href="/frame/react">React</a> 是 MVC 中的 V（视图）。</li>
    <li> <a href="/frame/react">React</a> 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</li>
  </ul>
</div>

一个简单的 React 实例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js" ></script>
    <script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/babel-standalone/6.26.0/babel.min.js" ></script>
  </head>
  <body>

  <div id="example"></div>

  <script type="text/babel">
    // 简单的 React 组件
    function App() {
      return <h1>Hello, React!</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById("example"));
    // 渲染 React 组件到 DOM
    root.render(<App />);
  </script>
  </body>
</html>
```



<style>
.introduce {
  display: flex;

  img {
    margin-right: 20px;
    border: 0 !important;
  }
}
</style>
---
title: basic
---

# HTML

- HTML 指的是超文本标记语言 (HyperText Markup Language)
- [HTML5](/basic/html) 是 HTML 最新的修订版本，2014 年 10 月由万维网联盟（W3C）完成标准制定，目的是为了在移动设备上支持多媒体。
- `<!DOCTYPE html>` 声明为 [HTML5](/basic/html) 文档

下面是一个简单的 HTML5 文档：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>文档标题</title>
  </head>

  <body>
    文档内容......
  </body>
</html>
```

# CSS

- CSS 指的是层叠样式表 (Cascading Style Sheets)
- [CSS3](/basic/css) 是 CSS 最新的修订版本，2011 年 12 月由万维网联盟（W3C）完成标准制定，目的是为了增强整个 Web 的表现力和功能。

```css
div {
  transform: rotate(30deg);
}
```

# JavaScript

- [JavaScript](/basic/javascript) 是互联网上最流行的脚本语言，这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。
- [JavaScript](/basic/javascript) 是一种动态类型、弱类型、基于原型的语言。

**🫵 将学到什么?**

  1. JavaScript 直接写入 HTML 输出流
```javascript
document.write('<h1>这是一个标题</h1>')
document.write('<p>这是一个段落。</p>')
```

  2. JavaScript 对事件的反应
```javascript
<button onclick="alert('欢迎!')">点我!</button>
```
<button class="btn" onclick="alert('欢迎!')">点我!</button>

  3. JavaScript 改变 HTML 内容
```javascript
  // count + 1
  function countAdd() {
    count++
  }

  // count - 1
  function countMinus() {
    count--
  }
```
<div class="counter">
  <button class="btn" @click="count--">count - 1</button> 
  <div class="count">count的值:  <span class="count-value">{{ count }}</span></div> 
  <button class="btn" @click="count++">count + 1</button>
</div>

<script setup>
  import { ref } from 'vue'
  const count = ref(0)

  // count + 1
  function countAdd() {
    count++
  }

  // count - 1
  function countMinus() {
    count--
  }
</script>

<style>
  .counter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .count {
    font-size: 16px;
    margin: 0 24px;
  }

  .count-value {
    color: #ff495e;
    font-size: 24px;
    font-weight: bold;
  }

  .btn {
    display: inline-block;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-image: linear-gradient(to right, #3498db, #2980b9); /* 渐变背景 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-image 0.3s, box-shadow 0.3s;
  }

  .btn:hover {
    background-image: linear-gradient(to right, #2980b9, #3498db); /* 反转渐变方向 */
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }

  .btn:active {
    background-image: linear-gradient(to right, #2c3e50, #34495e); /* 更深的色调 */
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
</style>

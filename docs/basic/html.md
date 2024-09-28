---
title: html
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /assets/logo.svg
---

## HTNL 基础

### HTML 标题
  标题（Heading）是通过 `<h1> - <h6>` 标签进行定义的。<br>
  `<h1>` 定义最大的标题。 `<h6>` 定义最小的标题。
::: info 示例
  ```html
  <h1>这是一个h1标题。</h1>
  ```
  <h1>这是一个h1标题。</h1>
<hr>

  ```html
  <h1>这是一个h2标题。</h1>
  ```
  <h2>这是一个h2标题。</h2>
<hr>

  ```html
  <h1>这是一个h3标题。</h1>
  ```
  <h3>这是一个h3标题。</h3>
:::

### HTML 段落
  段落（Paragraph）是通过 `<p>` 标签进行定义的。<br>

::: info 示例
  ```html
  <p>这是一个段落。</p>
  ```
  <p>这是一个段落。</p>
:::

### HTML 文本格式化
  HTML 文本格式化是通过 `<strong>`、`<b>`、`<em>`、`<i>`、`<sup>`、`<sub>`、`<ins>`、`<del>` 等标签进行定义的。

::: info 示例
  ```html
  <strong>加重语气</strong>
  <b>加粗</b>
  <em>着重文字</em>
  <i>斜体</i>
  <sup>上标</sup>
  <sub>下标</sub>
  <ins>插入字</ins>
  <del>删除线</del>
  ```

  <strong>加重语气</strong><br>
  <b>加粗</b><br>
  <em>着重文字</em><br>
  <i>斜体</i><br>
  上标<sup>上标</sup><br>
  下标<sub>下标</sub><br>
  <ins>插入字</ins><br>
  <del>删除线</del><br>
:::

### HTML 链接
  链接（Link）是通过 `<a>` 标签进行定义的。<br>
  链接的属性有 `href`、`target`、`rel`、`type`、`name`、`title`、`download` 等。

::: info 示例
  ```html
  <a href="https://www.baidu.com">百度</a>
  <a href="https://www.baidu.com" target="_blank">新窗口打开百度</a>
  <a href="https://www.baidu.com" title="百度一下，你就知道">百度一下</a>
  <a href="https://www.baidu.com" download>下载百度</a>
  ```

  <a href="https://www.baidu.com">百度</a><br>
  <a href="https://www.baidu.com" target="_blank">新窗口打开百度</a><br>
  <a href="https://www.baidu.com" title="百度一下，你就知道">百度一下</a><br>
  <a href="https://www.baidu.com" download>下载百度</a><br>
:::

  链接- id 属性
::: info 示例
  ```html
  <a href="#tips">访问有用的提示部分</a>
  <a id="tips">有用的提示部分</a>
  <a href="#">置顶</a>
  ```
  <a href="#tips">访问有用的提示部分</a> <br>
  <a id="tips">有用的提示部分</a> <br>
  <a href="#">置顶</a>
:::

### HTML 头部
  在 `<head>`元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。<br>
  可以添加在头部区域的元素标签为: `<title>`, `<style>`, `<meta>`, `<link>`, `<script>`, `<noscript>` 和 `<base>`。
  
::: info 示例
  ```html
  <head>
    <title>我的网页</title> <!-- 网页标题 -->
    <meta charset="UTF-8">
    <meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">  <!-- 网页关键字 -->
    <meta name="description" content="免费 Web & 编程 教程"> <!-- 网页描述 -->
    <meta name="author" content="xiofei"> <!-- 网页作者 -->
    <meta http-equiv="refresh" content="30"> <!-- 页面每 30s 自动刷新 -->

    <base href="https://codecompass.cn/" target="_blank"> <!-- 设置页面的基本 URL 和默认目标 -->
    <link rel="stylesheet" type="text/css" href="mystyle.css"> <!-- 链接外部样式表 -->
    <script src="myscript.js"></script> <!-- 链接外部脚本文件 -->

    <style>
      /* 内部样式 */

    </style>

    <script>
      // 脚本

    </script>
  </head>
  ```
:::

### HTML 图片
  图片（Image）是通过 `<img>` 标签进行定义的。<br>
  图片的属性有 `src`、`alt`、`width`、`height` 等。


::: info 示例
  ```html
  <img src="https://codecompass.cn/assets/background.png" alt="logo" width="100" height="100">
  ```
  <img src="https://codecompass.cn/assets/background.png" alt="logo" width="100" height="100">

:::

### HTML 列表
  支持有序、无序和自定义列表。
1. 有序列表（Ordered List）
有序列表（Ordered List）是通过 `<ol>`，`<li>` 标签进行定义的。<br>

::: info 示例
  ```html
  <ol> 
    <li>第一项</li>
    <li>第二项</li>
  </ol>

  <ol reversed> 
    <li>第一项</li>
    <li>第二项</li>
  </ol>
  ```
  <ol> 
    <li>第一项</li>
    <li>第二项</li>
  </ol>

  <ol reversed> 
    <li>第一项</li>
    <li>第二项</li>
  </ol>
:::

2. 无序列表（Unordered List）
  无序列表（Unordered List）是通过 `<ul>`，`<li>` 标签进行定义的。<br>

::: info 示例
  ```html
  <ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橘子</li>
  </ul>
  ```
  <ul>
    <li>苹果</li> 
    <li>香蕉</li> 
    <li>橘子</li> 
  </ul>
:::

3. 自定义列表（Custom List）
  自定义列表（Custom List）是通过 `<dl>`，`<dt>`，`<dd>` 标签进行定义的。<br>

::: info 示例
  ```html
  <dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
  </dl>
  ```
  <dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
  </dl>
:::

### HTML 表格
  表格（Table）是通过 `<caption>`，`<table>`，`<th>`，`<tr>`，`<td>` 标签进行定义的。<br>
- th：th 是 table header的缩写，表示表格的表头单元格。
- tr：tr 是 table row 的缩写，表示表格的一行。
- td：td 是 table data 的缩写，表示表格的数据单元格。


::: info 示例
  ```html
  <table>
    <caption>表格标题</caption>
    <thead>
      <tr>
        <th>列标题1</th>
        <th>列标题2</th>
        <th>列标题3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>行1，列1</td>
        <td>行1，列2</td>
        <td>行1，列3</td>
      </tr>
      <tr>
        <td>行2，列1</td>
        <td>行2，列2</td>
        <td>行2，列3</td>
      </tr>
    </tbody>
  </table>
  ```
  <table>
    <caption>表格标题</caption>
    <thead>
      <tr>
        <th>列标题1</th>
        <th>列标题2</th>
        <th>列标题3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>行1，列1</td>
        <td>行1，列2</td>
        <td>行1，列3</td>
      </tr>
      <tr>
        <td>行2，列1</td>
        <td>行2，列2</td>
        <td>行2，列3</td>
      </tr>
    </tbody>
  </table>
:::

### HTML 表单
  HTML 表单用于收集用户的输入信息，将用户收集到的信息发送到 Web 服务器。<br>
  HTML 表单通常包含各种输入字段、复选框、单选按钮、下拉列表等元素。<br>
  表单（Form）是通过 `<form>`，`<input>`，`<select>`，`<option>`，`<textarea>`，`<button>` 标签进行定义的。<br>

::: info 示例
  ```html
  <form action="" method="post">
    <label for="name">姓名：<input type="text" id="name" name="name" required></label> <br>
    <label for="email">邮箱：<input type="email" id="email" name="email" required></label> <br>
    <label for="gender">性别：
      <input type="radio" id="male" name="gender" value="male" required><label for="male">男</label>
      <input type="radio" id="female" name="gender" value="female" required><label for="female">女</label>
    </label> <br>
    <label for="gender">喜欢的车：
      <input type="checkbox" id="Bike" name="vehicle[]" value="Bike"><label for="Bike">我喜欢自行车</label>
      <input type="checkbox" id="Car" name="vehicle[]" value="Car"><label for="Car">我喜欢小汽车</label>
    </label> <br>
    <label for="message">留言：<textarea id="message" name="message" rows="5" cols="30" required></textarea></label> <br>
    <label for="interest">兴趣：
      <select id="interest" name="interest" required>
        <option value="">--请选择兴趣--</option>
        <option value="reading">阅读</option>
        <option value="swimming">游泳</option>
        <option value="hiking">登山</option>
      </select>
    </label> <br>
    <button type="submit">提交</button>
  </form>
  ```
  <form action="" method="post">
    <label for="name">姓名：<input class="input" type="text" id="name" name="name" required></label> <br>
    <label for="email">邮箱：<input class="input" type="email" id="email" name="email" required></label> <br>
    <label for="gender">性别：
      <input type="radio" id="male" name="gender" value="male" required><label for="male">男</label>
      <input type="radio" id="female" name="gender" value="female" required><label for="female">女</label>
    </label> <br>
    <label for="gender">喜欢的车：
      <input type="checkbox" id="Bike" name="vehicle[]" value="Bike"><label for="Bike">我喜欢自行车</label>
      <input type="checkbox" id="Car" name="vehicle[]" value="Car"><label for="Car">我喜欢小汽车</label>
    </label> <br>
    <label for="message">留言：<textarea id="message" name="message" rows="5" cols="30" required></textarea></label> <br>
    <label for="interest">兴趣：
      <select id="interest" name="interest" required>
        <option value="">--请选择兴趣--</option>
        <option value="reading">阅读</option>
        <option value="swimming">游泳</option>
        <option value="hiking">登山</option>
      </select>
    </label> <br>
    <button class="btn" type="submit">提交</button>
  </form>
:::


::: details form 标签常用属性
- `action`：表单提交的目标 URL。
- `autocomplete`：自动完成，可以设置为 on 或 off。
- `enctype`：表单数据编码类型，可以设置为 application/x-www-form-urlencoded、multipart/form-data 或 text/plain。
- `method`：表单提交的方法，可以设置为 get 或 post。
- `novalidate`：禁用表单的验证。
:::


::: details input 标签常用属性
- `type`：输入字段的类型，比如 text | password | number | email | radio | checkbox | search | file | button | reset | submit | color | tel | time | date | datetime | image | range。
- `value`：输入字段的值。
- `accept`：接受的文件类型，audio/* video/* image/*，比如 accept="image/jpeg,image/png"，(只针对type="file") 。
- `src`：指向图像的 URL。(只针对type="image") 
- `alt`：输入字段的替代文本。(只针对type="image") 
- `width`：图片宽度。(只针对type="image") 
- `height`：图片高度。(只针对type="image")
- `autocomplete`：自动完成，可以设置为 on 或 off。
- `autofocus`：自动聚焦，可以设置为 autofocus。
- `checked`：默认选中，可以设置为 checked。
- `disabled`：禁用输入字段，可以设置为 disabled。
- `readonly`：只读，可以设置为 readonly。
- `max`：最大值。number | date
- `maxlength`：最大字符数。	number
- `min`：最小值。number | date
- `multiple`：多选，可以设置为 multiple。
- `name`：规定 `<input>` 元素的名称。。
- `pattern`：验证值的正则表达式。
- `placeholder`：提示文本。
- `required`：必填项，可以设置为 required。
- `step`：步长。number
:::


::: details textarea 标签常用属性
- `autofocus`：自动聚焦，可以设置为 autofocus。
- `rows`：行数。
- `cols`：列数。
- `placeholder`：提示文本。
- `readonly`：只读，可以设置为 readonly。
- `disabled`：禁用输入字段，可以设置为 disabled。
- `required`：必填项，可以设置为 required。
- `maxlength`：最大字符数。
- `name`：规定 `<textarea>` 元素的名称。
- `wrap`：文本换行，可以设置为 hard | soft。
:::


::: details label 标签常用属性
- `for`：规定 label 与哪个表单元素绑定。
:::


::: details select 标签常用属性
- `autofocus`：自动聚焦，可以设置为 autofocus。
- `disabled`：禁用选择框，可以设置为 disabled。
- `multiple`：多选，可以设置为 multiple。
- `name`：规定 `<select>` 元素的名称。
- `required`：必填项，可以设置为 required。
- `size`：选择框的可见行数。
:::


::: details option 标签常用属性
- `value`：定义送往服务器的选项值。
- `selected`：默认选中，可以设置为 selected。
- `disabled`：禁用选项，可以设置为 disabled。
:::


::: details button 标签常用属性
- `type`：按钮类型，可以设置为 button | reset | submit。
- `value`：按钮显示的文本。
- `disabled`：禁用按钮，可以设置为 disabled。
- `name`：规定 `<button>` 元素的名称。
:::


::: details html5 新表单元素 - `datalist`
预先定义的输入控件选项列表
```html {1-2,8}
<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```
<input class="input" list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer" />
  <option value="Firefox" />
  <option value="Chrome" />
  <option value="Opera" />
  <option value="Safari" />
</datalist>
:::

::: details html5 新表单元素 - `output`
显示计算结果的元素
```html {4}
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  0<input type="range" id="a" value="50">100
  +<input type="number" id="b" value="50" readonly>=
  <output name="result" for="a b"></output>
</form>
```
<form style="display: flex; align-items: center;" oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  0<input class="output-range" type="range" id="a" value="50">100
  +<input class="output-number input" type="number" id="b" value="50" readonly>=
  <output name="result" for="a b"></output>
</form>
:::


### HTML 框架
  使用框架，你可以在同一个浏览器窗口中显示不止一个页面

::: info 示例
```html
<iframe src="https://vitejs.cn/vite3-cn" width="100%" height="300px"></iframe>
```
<iframe src="https://vitejs.cn/vite3-cn" width="100%" height="300px"></iframe>
:::


### HTML字符实体
::: warning 字符实体
- ` ` 空格：`&nbsp;`
- `<` 小于号：`&lt;`
- `>` 大于号：`&gt;`
- `&` 与号：`&amp;`
- `"` 双引号：`&quot;`
- `'` 单引号：`&apos;`
- `©` 版权符号：`&copy;`
- `®` 注册商标符号：`&reg;`
- `™` 商标符号：`&trade;`
- `×` 乘号：`&times;`
- `÷` 除号：`&divide;`
- `½` 1/2 符号：`&frac12;`
- `¼` 1/4 符号：`&frac14;`
- `¾` 3/4 符号：`&frac34;`
- `§` 章节符号：`&sect;`
- `¶` 段落符号：`&para;`
- `¥` 円符号：`&yen;`
- `£` 英镑符号：`&pound;`
- `€` 欧元符号：`&euro;`
- `¢` 盎司符号：`&curren;`
- `¤` 货币符号：`&cent;`
- `¥` 日元符号：`&yen;`
- `©` 版权符号：`&copy;`
- `®` 注册商标符号：`&reg;`
- `™` 商标符号：`&trade;`
- `±` 正负号：`&plusmn;`
- `¬` 否定符号：`&not;`
- `∞` 无穷符号：`&infin;`
- `µ` 微符号：`&micro;`
- `°` 度符号：`&deg;`
- `²` 平方符号：`&sup2;`
- `³` 立方符号：`&sup3;`
:::

## HTML5 
  HTML5 的新特性：
  - 新元素，新属性，支持 CSS3
  - `audio` 和 `video`，2D/3D `<canvas>` 制图，内联 SVG
  - 本地存储，SQL 数据

### HTML5 新元素

#### `<canvas>` 新元素
  - 定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API
  - **注意:** 标签通常需要指定一个id属性 (脚本中经常引用), `width` 和 `height` 属性定义的画布的大小.
  - **提示:** 你可以在HTML页面中使用多个 `<canvas>` 元素.

::: info 示例

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
 
<script type="text/javascript">
  // 1.找到 <canvas> 元素:
  var canvas = document.getElementById('myCanvas');

  // 2.创建 context 对象
  var ctx = canvas.getContext('2d');

  // 3.绘制图形 （一个红色的矩形）
  ctx.fillStyle='#FF0000';
  ctx.fillRect(0,0,80,100);
</script>
```
:::

[更多关于 canvas 的使用](/canvas/)

::: details canvas 与 SVG 
1. 什么是SVG？
  - SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
  - SVG 用于定义用于网络的基于矢量的图形
  - SVG 使用 XML 格式定义图形
  - SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
  - SVG 是万维网联盟的标准

2. SVG优势
与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：

  - SVG 图像可通过文本编辑器来创建和修改
  - SVG 图像可被搜索、索引、脚本化或压缩
  - SVG 是可伸缩的
  - SVG 图像可在任何的分辨率下被高质量地打印
  - SVG 可在图像质量不下降的情况下被放大

3. SVG 与 Canvas两者间的区别
  - SVG 是一种使用 XML 描述 2D 图形的语言。Canvas 通过 JavaScript 来绘制 2D 图形。
  - SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
  - 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
  - Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。
:::

####  `<audio>`、`<video>` 媒体元素
::: info 示例
```html
<audio controls src=""></audio>
<video controls src=""></video>
```
audio 属性有：
- `controls`：添加播放、暂停、音量控制等控件
- `src`：指定音频文件的 URL
- `autoplay`：自动播放
- `loop`：循环播放
- `muted`：静音播放
- `preload`：预加载视频，可选值有 `auto`、`metadata`、`none`

video 属性在 audio 的基础上增加了：
- `poster`：视频封面的 URL
- `width`：视频宽度
- `height`：视频高度
:::

#### 新语义元素如下

| 标签           | 描述                                                           |
| -------------- | :------------------------------------------------------------- |
| `<article>`    | 定义页面独立的内容区域。                                       |
| `<aside>`      | 定义页面的侧边栏内容。                                         |
| `<bdi>`        | 允许您设置一段文本，使其脱离其父元素的文本方向设置。           |
| `<command>`    | 定义命令按钮，比如单选按钮、复选框或按钮                       |
| `<details>`    | 用于描述文档或文档某个部分的细节                               |
| `<dialog>`     | 定义对话框，比如提示框                                         |
| `<summary>`    | 标签包含 details 元素的标题                                    |
| `<figure>`     | 规定独立的流内容（图像、图表、照片、代码等等）。               |
| `<figcaption>` | 定义 `<figure>` 元素的标题                                     |
| `<footer>`     | 定义 section 或 document 的页脚。                              |
| `<header>`     | 定义了文档的头部区域                                           |
| `<mark>`       | 定义带有记号的文本。                                           |
| `<meter>`      | 定义度量衡。仅用于已知最大和最小值的度量。                     |
| `<nav>`        | 定义导航链接的部分。                                           |
| `<progress>`   | 定义任何类型的任务的进度。                                     |
| `<ruby>`       | 定义 ruby 注释（中文注音或字符）。                             |
| `<rt>`         | 定义字符（中文注音或字符）的解释或发音。                       |
| `<rp>`         | 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。 |
| `<section>`    | 定义文档中的节（section、区段）。                              |
| `<time>`       | 定义日期或时间。                                               |
| `<wbr>`        | 规定在文本中的何处适合添加换行符。                             |
![示例](/assets/h5-new-element.png)

### HTML5 Web 存储
> 使用HTML5可以在本地存储用户的浏览数据。早些时候,本地存储使用的是 cookie。但是Web 存储需要更加的安全与快速. 这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能.

**localStorage 和 sessionStorage**
- `localStorage` - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。
- `sessionStorage` - 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：

- 保存数据：`localStorage.setItem(key,value)`;
- 读取数据：`localStorage.getItem(key)`;
- 删除单个数据：`localStorage.removeItem(key)`;
- 删除所有数据：`localStorage.clear()`;
- 得到某个索引的key：`localStorage.key(index)`;

**提示:** 键/值对通常以字符串存储，你可以按自己的需要转换该格式。

### HTML5 Web SQL 数据库
> Web SQL 数据库 API 并不是 HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用 SQL 操作客户端数据库的 APIs。

**三个核心方法：**
- `openDatabase` 这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
- `transaction` 这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
- `executeSql` 这个方法用于执行实际的 SQL 查询。

::: info 示例
```javascript
var e_id = 3;
var e_log = "王五";

// 1. 打开数据库
// mydb为数据库名称， 1.0为版本号，Test DB为描述文本，2*1024*1024为数据库的最大容量为2M。
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
 
// 2.执行查询操作
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS NAMES (id unique, name)');

  // 3.插入数据
  tx.executeSql('INSERT INTO NAMES (id, name) VALUES (1, "张三")');
  tx.executeSql('INSERT INTO NAMES (id, name) VALUES (2, "李四")');
  // 动态插入数据
  tx.executeSql('INSERT INTO NAMES (id, name) VALUES (?, ?)', [e_id, e_log]);
});
 
db.transaction(function (tx) {
  // 5.读取数据
  tx.executeSql('SELECT * FROM NAMES', [], function (tx, results) {
    
    // 得到查询条数
    var len = results.rows.length; 
    
  }, null);
});
```
:::

### HTML5 WebSocket
> WebSocket 是一种在单个 TCP 连接上进行全双工通讯的协议，使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输

::: tip 
**轮询**是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP请求，然后由服务器返回最新的数据给客户端的浏览器。
:::

1. 创建 WebSocket 对象
```javascript
var ws = new WebSocket(url, [protocol]); // url: 指定连接的 URL  protocol: 是可选的，指定了可接受的子协议
```

2. WebSocket 属性
- `readyState`：表示 WebSocket 连接的状态，可以是以下值：
  - `WebSocket.CONNECTING` (0)：正在连接
  - `WebSocket.OPEN` (1)：已连接
  - `WebSocket.CLOSING` (2)：正在关闭
  - `WebSocket.CLOSED` (3)：已关闭
- `bufferedAmount`：表示已被存储在缓冲区中的数据量（字节）。

3. WebSocket 事件
- `open`：当连接成功时触发
- `message`：当接收到服务器数据时触发
- `error`：当发生错误时触发
- `close`：当连接关闭时触发

4. WebSocket 方法
- `send`：发送数据到服务器
- `close`：关闭 WebSocket 连接

::: info 示例
```javascript
  function WebSocketTest() {
    if ("WebSocket" in window) {
      alert("您的浏览器支持 WebSocket!");
      
      // 1. 创建一个 WebSocket
      var ws = new WebSocket("http://localhost:8080");
                
      ws.onopen = function() {
        // 2. WebSocket 已连接上，使用 send() 方法发送数据
        ws.send("发送数据");
        alert("数据发送中...");
      };
                
      ws.onmessage = function (evt) { 
        var received_msg = evt.data;

        // 3. 接收到服务器数据
        alert("数据已接收...");
      };
      
      ws.onclose = function() { 
        // 4. 关闭 websocket
        alert("连接已关闭..."); 
      };
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
    }
```
:::

<style>
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

  .input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
  }

  .output-number {
    max-width: 50px;
  }
</style>


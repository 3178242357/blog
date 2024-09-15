# Vue3

## 两种 API 风格

> Vue3 引入了两种 API 风格：`Composition API` 和 `Options API`。


- 选项式 API (Options API)​
  > 使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。<br>
  > 选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

```vue
  <script>
  export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
      return {
        count: 0
      }
    },

    // methods 是一些用来更改状态与触发更新的函数
    // 它们可以在模板中作为事件处理器绑定
    methods: {
      increment() {
        this.count++
      }
    },

    // 生命周期钩子会在组件生命周期的各个不同阶段被调用
    // 例如这个函数就会在组件挂载完成后被调用
    mounted() {
      console.log(`The initial count is ${this.count}.`)
    }
  }
  </script>

  <template>
    <button @click="increment">Count is: {{ count }}</button>
  </template>
```

- 组合式 API (Composition API)​

  > 通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。<br>
  > 在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。<br>
  > 这个 `setup` 属性是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。<br>
  > 比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

下面是使用了组合式 API 与 `<script setup>` 改造后和上面的模板完全一样的组件：

```vue
<script setup>
  import { ref, onMounted } from 'vue'

  // 响应式状态
  const count = ref(0)

  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
  })
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## 创建一个 Vue3 应用

::: code-group
```bash [npm]
npm create vue@latest
```

```bash [pnpm]
pnpm create vue@latest
```

```bash [yarn]
yarn create vue@latest
```
:::

## 基础语法

### 文本插值
最基本的数据绑定形式是文本插值，它使用的是 “Mustache” 语法 (即双大括号 `{ { } }`)：
```html
<span>Message: {{ msg }}</span>
```

### 原始 HTML
双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 `v-html` [指令](#指令)：
```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
::: info
使用文本插值: <code>&lt;span style="color: red"&gt;This is red text&lt;/span&gt;</code><br>
使用 `v-html` 指令: <span style="color: red">This is red text</span>
:::


### 属性绑定
双大括号不能在 HTML 属性中使用。想要响应式地绑定一个属性，应该使用 `v-bind` [指令](#指令)：
```html
<div v-bind:id="dynamicId"></div>
```
如果绑定的值是 `null` 或者 `undefined`，那么该属性将会从渲染的元素上移除。

**简写：**
```html
<div :id="dynamicId"></div>
```

**同名简写：**
> 如果属性的名称与绑定的值的名称相同，那么可以进一步简化语法，省略属性值，这与在 JavaScript 中声明对象时使用的属性简写语法类似。
```html
<!-- 与 :id="id" 相同 -->
<div :id></div>

<!-- 这也同样有效 -->
<div v-bind:id></div>
```


**动态绑定多个值：** <br>
如果你有像这样的一个包含多个属性的 JavaScript 对象：
```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```

通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上：
```html
<div v-bind="objectOfAttrs"></div>
```

### 受限的全局访问​
模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 `Math` 和 `Date`。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 `window` 上的属性。然而，你也可以自行在 [app.config.globalProperties](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 上显式地添加它们，供所有的 Vue 表达式使用。


### Class 与 Style 绑定

1. 绑定 HTML class
  - 绑定对象​
    我们可以给 `:class` (`v-bind:class` 的缩写) 传递一个对象来动态切换 `class`：

    ```html
    <div :class="{ active: isActive }"></div>
    ```
    上面的语法表示 `active` 是否存在取决于数据属性 `isActive` 的真假值。
    你可以在对象中写多个字段来操作多个 `class`。此外，`:class` 指令也可以和一般的 class 属性共存。举例来说，下面这样的状态：

    ```javascript
    const isActive = ref(true)
    const hasError = ref(false)
    ```

    配合以下模板：

    ```html
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
    ```

    渲染的结果会是：

    ```html
    <div class="static active"></div>
    ```
    当 `isActive` 或者 `hasError` 改变时，`class` 列表会随之更新。举例来说，如果 `hasError` 变为 `true`，`class` 列表也会变成 `"static active text-danger"`。

    绑定的对象并不一定需要写成内联字面量的形式，也可以直接绑定一个对象：

    ```javascript
    const classObject = reactive({
      active: true,
      'text-danger': false
    })
    ```

    ```html
    <div :class="classObject"></div>
    ```
    
    这将渲染：

    ```html
    <div class="active"></div>
    ```

    我们也可以绑定一个返回对象的[计算属性](#计算属性-computed)。这是一个常见且很有用的技巧：

    ```javascript
    const isActive = ref(true)
    const error = ref(null)

    const classObject = computed(() => ({
      active: isActive.value && !error.value,
      'text-danger': error.value && error.value.type === 'fatal'
    }))
    ```

  - 绑定数组​
    我们可以给 `:class` 绑定一个数组来渲染多个 `class`：

    ```javascript
    const activeClass = ref('active')
    const errorClass = ref('text-danger')
    ```
    ```html
    <div :class="[activeClass, errorClass]"></div>
    ```

    渲染的结果是：

    ```html
    <div class="active text-danger"></div>
    ```

    如果你也想在数组中有条件地渲染某个 `class`，你可以使用三元表达式：

    ```html
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
    ```
    
    `errorClass` 会一直存在，但 `activeClass` 只会在 `isActive` 为真时才存在。<br>
    然而，这可能在有多个依赖条件的 `class` 时会有些冗长。因此也可以在数组中嵌套对象：

    ```html
    <div :class="[{ [activeClass]: isActive }, errorClass]"></div>
    ```

  - 在组件上使用​
    对于只有一个根元素的组件，当你使用了 `class` 属性时，这些 `class` 会被添加到根元素上并与该元素上已有的 `class` 合并。

    如果你声明了一个组件名叫 `MyComponent`，模板如下：

    ```html
    <!-- 子组件模板 -->
    <p class="foo bar">Hi!</p>
    ```

    在使用时添加一些 `class`：

    ```vue
    <!-- 在使用组件时 -->
    <MyComponent class="baz boo" />
    ```

    渲染出的 HTML 为：

    ```html
    <p class="foo bar baz boo">Hi!</p>
    ```
    
    Class 的绑定也是同样的：

    ```vue
    <MyComponent :class="{ active: isActive }" />
    ```

    当 `isActive` 为真时，被渲染的 HTML 会是：

    ```html
    <p class="foo bar active">Hi!</p>
    ```
    
    如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 `class`。你可以通过组件的 `$attrs` 属性来指定接收的元素：

    ```vue
    <!-- MyComponent 模板使用 $attrs 时 -->
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
    ```
    ```vue
    <MyComponent class="baz" />
    ```
    
    这将被渲染为：

    ```html
    <p class="baz">Hi!</p>
    <span>This is a child component</span>
    ```

2. 绑定内联样式

  - 绑定对象​
    `:style` 支持绑定 JavaScript 对象值，对应的是 HTML 元素的 `style` 属性：

    ```javascript
    const activeColor = ref('red')
    const fontSize = ref(30)
    ```
    ```html
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    ```

    尽管推荐使用 `camelCase`，但 `:style` 也支持 `kebab-cased` 形式的 CSS 属性 key (对应其 CSS 中的实际名称)，例如：

    ```html
    <div :style="{ 'font-size': fontSize + 'px' }"></div>
    ```
    
    直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁：

    ```javascript
    const styleObject = reactive({
      color: 'red',
      fontSize: '30px'
    })
    ```
    ```html
    <div :style="styleObject"></div>
    ```

    同样的，如果样式对象需要更复杂的逻辑，也可以使用返回样式对象的[计算属性](#计算属性-computed)。

  - 绑定数组​
    我们还可以给 `:style` 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

    ```html
    <div :style="[baseStyles, overridingStyles]"></div>
    ```

  - 自动前缀​
    > 当你在 `:style` 中使用了需要浏览器特殊前缀的 CSS 属性时，Vue 会自动为他们加上相应的前缀。Vue 是在运行时检查该属性是否支持在当前浏览器中使用。如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的。

  - 样式多值​
    你可以对一个样式属性提供多个 (不同前缀的) 值，举例来说：

    ```html
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
    ```
    数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为` display: flex`。


### 条件渲染

1. v-if​
  `v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

  ```html
  <h1 v-if="awesome">Vue is awesome!</h1>
  ```

2. v-else​
  你也可以使用 `v-else` 为 `v-if` 添加一个“else 区块”。

  ```html
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
  ```

  一个 `v-else` 元素必须跟在一个 `v-if` 或者 `v-else-if` 元素后面，否则它将不会被识别。

3. v-else-if​
  顾名思义，`v-else-if` 提供的是相应于 `v-if` 的“else if 区块”。它可以连续多次重复使用：

  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```
  和 `v-else` 类似，一个使用 `v-else-if` 的元素必须紧跟在一个 `v-if` 或一个 `v-else-if` 元素后面。

4. v-show​
  另一个可以用来按条件显示一个元素的指令是 `v-show`。其用法基本一样：

  ```html
  <h1 v-show="ok">Hello!</h1>
  ```
  
  不同之处在于 `v-show` 会在 DOM 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性。

  `v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用。

5. &lt;template&gt; 上的 v-if​

  因为 `v-if` 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 `<template>` 元素上使用 `v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

  ```html
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```
  `v-else` 和 `v-else-if` 也可以在 `<template>` 上使用。

6. v-if vs v-show​
  - `v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
  - `v-if` 也是惰性的：如果在初次渲染时条件值为 `false`，则不会做任何事。条件区块只有当条件首次变为 `true` 时才被渲染。
  - 相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换。
  - 总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。

7. v-if 和 v-for​
  当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行。


### 列表渲染

1. `v-for`

我们可以使用 `v-for` 指令来呈现基于数组的项目列表， `v-for` 指令需要 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，`item` 是被迭代的数组元素的 **别名**：

```javascript
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```vue
<li v-for="item in items">
  {{ item.message }}
</li>
```

在 `v-for` 块中可以完整地访问父作用域内的属性和变量。`v-for` 也支持使用可选的第二个参数表示当前项的位置索引。

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```vue
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

实际上，你也可以在定义 v-for 的变量别名时使用解构，和解构函数参数类似：

```vue
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

你也可以使用 `of` 作为分隔符来替代 `in`，这更接近 JavaScript 的迭代器语法：

```vue
<div v-for="item of items"></div>
```

2. v-for 与对象

你也可以使用 `v-for` 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 `Object.values()` 的返回值来决定。

```javascript
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```html
<ul>
  <li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
  </li>
</ul>
```

3. 在 v-for 里使用范围值

`v-for` 可以直接接受一个整数值。在这种用例中，会将该模板基于 `1...n` 的取值范围重复多次。

```html
<span v-for="n in 10">{{ n }}</span>
```
注意此处 n 的初值是从 1 开始而非 0。


4. &lt;template&gt; 上的 v-for

与模板上的 `v-if` 类似，你也可以在 `<template>` 标签上使用 `v-for` 来渲染一个包含多个元素的块。例如：

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

5. v-for 与 v-if

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

```html
<!-- 这会抛出一个错误，因为属性 todo 此时没有在该实例上定义 -->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

在外先包装一层 `<template>` 再在其上使用 `v-for` 可以解决这个问题 (这也更加明显易读)：

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

6. 通过 key 管理状态

Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。

为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 `key` 属性：

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

推荐在任何可行的时候为 · 提供一个 key 属性，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。

`key` 绑定的值期望是一个基础类型的值，例如字符串或 `number` 类型。不要用对象作为 `v-for` 的 `key`。关于 `key` 属性的更多用途细节，请参阅 [`key` API 文档](https://cn.vuejs.org/api/built-in-special-attributes.html#key)。


7. 组件上使用 v-for
  我们可以直接在组件上使用 v-for，和在一般的元素上使用没有区别 (别忘记提供一个 key)：

```html
<MyComponent v-for="item in items" :key="item.id" />
```

但是，这不会自动将任何数据传递给组件，因为组件有自己独立的作用域。为了将迭代后的数据传递到组件中，我们还需要传递 `props`：

```html
  <MyComponent
    v-for="(item, index) in items"
    :item="item"
    :index="index"
    :key="item.id"
  />
```
不自动将 item 注入组件的原因是，这会使组件与 v-for 的工作方式紧密耦合。明确其数据的来源可以使组件在其他情况下重用。


8. 数组变化侦测​
- 变更方法​
    Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：
    - `push()`
    - `pop()`
    - `shift()`
    - `unshift()`
    - `splice()`
    - `sort()`
    - `reverse()`

- 替换一个数组
  变更方法，顾名思义，就是会对调用它们的原数组进行变更。相对地，也有一些不可变 (immutable) 方法，例如 `filter()`，`concat()` 和 `slice()`，这些都不会更改原数组，而总是返回一个新数组。当遇到的是非变更方法时，我们需要将旧的数组替换为新的：

  ```javascript
  // `items` 是一个数组的 ref
  items.value = items.value.filter((item) => item.message.match(/Foo/))
  ```

  你可能认为这将导致 Vue 丢弃现有的 DOM 并重新渲染整个列表——幸运的是，情况并非如此。Vue 实现了一些巧妙的方法来最大化对 DOM 元素的重用，因此用另一个包含部分重叠对象的数组来做替换，仍会是一种非常高效的操作。


### 事件处理
我们可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：`v-on:click="handler"` 或 `@click="handler"`。

事件处理器 (handler) 的值可以是：

1. 内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。
  ```vue
  <script steup>
    const count = ref(0)
  </script>

  <template>
    <p>Count is: {{ count }}</p>
    <button @click="count++">count++</button>
  </template>
  ```
2. 方法事件处理器：一个指向组件上定义的方法的属性名或是路径。
  ```vue
  <script steup>
    const name = ref('Vue.js')

    function greet(event) {
      alert(`Hello ${name.value}!`)
      // `event` 是 DOM 原生事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  </script>

  <template>
    <!-- `greet` 是上面定义过的方法名 -->
    <button @click="greet">Greet</button>
  </template>
  ```
  
在内联处理器中调用方法，允许我们向方法传入自定义参数以代替原生事件:
```vue
  <script steup>
    function say(message) {
      alert(message)
    }
  </script>

  <template>
    <button @click="say('hello')">Say hello</button>
    <button @click="say('bye')">Say bye</button>
  </template>
  ```

在内联事件处理器中访问事件参数，可以用 `$event` 特殊变量或者使用内联箭头函数：
```vue
  <script steup>
    function warn(message, event) {
      // 这里可以访问原生事件
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
  </script>

  <template>
    <!-- 使用特殊的 $event 变量 -->
    <button @click="warn('Form cannot be submitted yet.', $event)">
      Submit
    </button>

    <!-- 使用内联箭头函数 -->
    <button @click="(event) => warn('Form cannot be submitted yet.', event)">
      Submit
    </button>
  </template>
```

#### 事件修饰符

我们可以给事件绑定修饰符，以控制事件的行为。例如，我们可以使用 `.stop` 修饰符来阻止事件冒泡。

修饰符是用 `.` 表示的指令后缀，包含以下这些：
- `.stop` 阻止事件冒泡。
- `.prevent` 阻止默认行为。
- `.self` 只当事件在该元素本身 (而不是子元素) 触发时触发回调。
- `.capture` 使用事件捕获模式。
- `.once` 只触发一次回调。
- `.passive` 使用“触底”模式，提高事件响应性能。


```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

::: tip
使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此:
- `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为，而 
- `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
- 请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。
:::

#### 按键修饰符
在监听键盘事件时，我们经常需要检查特定的按键。
```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```
- 按键别名​
Vue 为一些常用的按键提供了别名：
  - `.enter`
  - `.tab`
  - `.delete` (捕获“Delete”和“Backspace”两个按键)
  - `.esc`
  - `.space`
  - `.up`
  - `.down`
  - `.left`
  - `.right`

- 系统按键修饰符​
你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。
  - `.ctrl`
  - `.alt`
  - `.shift`
  - `.meta`

举例来说：
```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

#### 鼠标按键修饰符
- `.left`
- `.right`
- `.middle`


### 表单输入绑定
在处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手动连接值绑定和更改事件监听器可能会很麻烦：

```html
<input :value="text" @input="event => text = event.target.value">
```

v-model 指令帮我们简化了这一步骤：

```html
<input v-model="text">
```

`v-model` 还可以用于各种不同类型的输入，`<textarea>`、`<select>` 元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合：

- 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` 属性并侦听 `input` 事件；
- 复选框 `<input type="checkbox">` 和单选框 `<input type="radio">` 会绑定 `checked` 属性并侦听 `change` 事件；
- 下拉框 `<select>` 会绑定 `value` 属性并侦听 `change` 事件。

#### 基本用法
<script setup>
import { ref } from 'vue'
import Count from './components/count.vue'
import Message from './components/message.vue'

const inputValue = ref('')
const textareaValue = ref('')
const checked = ref(true)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const selecteds = ref([])
const currentComponent = ref('A')

const focus = ref(false)
const vFocus = {
  mounted: (el) => el.focus()
}
</script>
1. 文本
```html
<p>输入框的值为: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```
::: info 示例
<p>输入框的值为: {{ inputValue }}</p>
<input 
  style="width: 200px;border: 1px solid #666;border-radius: 4px;padding: 4px 2px;" 
  v-model="inputValue" 
  placeholder="请输入" 
/>
:::

2. 文本域
```html
<span>文本域的值为:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
::: info 示例
<span>文本域的值为:</span>
<p style="white-space: pre-line;">{{ textareaValue }}</p>
<textarea style="width: 200px;border: 1px solid #666;border-radius: 4px;padding: 4px; 2px;background-color: #272a2f;" v-model="textareaValue" placeholder="请输入"></textarea>
:::

3. 复选框
单一的复选框，绑定布尔类型值：
```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```
::: info 示例
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
:::

我们也可以将多个复选框绑定到同一个数组或集合的值：
```html
<div>选中的名字有: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```
::: info 示例
<div>选中的名字有: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
:::

4. 单选框
```html
<div>选中的值为: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```
::: info 示例
<div>选中的值为: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
:::

5. 下拉框
单个选择器的示例如下：
```html
<div>选择的值为: {{ selected }}</div>

<select v-model="selected" placeholder="请选择">
  <option disabled value="">请选择</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```
::: info 示例
<div>选择的值为: {{ selected }}</div>

<select v-model="selected" placeholder="请选择" style="width: 200px;border: 1px solid #0000ff;border-radius: 4px;padding: 4px; 0px;background-color: #272a2f;">
  <option disabled value="">请选择</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
:::

多选 (值绑定到一个数组)：
```html
<div>选择的值有: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```
::: info 示例
<div>选择的值有: {{ selecteds }}</div>

<select v-model="selecteds" multiple style="width: 200px;border: 1px solid #0000ff;border-radius: 4px;padding: 4px; 0px;background-color: #272a2f;">
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
:::

#### 动态数据绑定
通过使用 `v-bind` 来实现。此外，使用 `v-bind` 还使我们可以将选项值绑定为非字符串的数据类型。

1. 复选框
  ```html
  <input
    type="checkbox"
    v-model="toggle"
    true-value="yes"
    false-value="no" />
  ```
  `true-value` 和 `false-value` 是 Vue 特有的属性，仅支持和 `v-model` 配套使用。这里 `toggle` 属性的值会在选中时被设为 `'yes'`，取消选择时设为 `'no'`。你同样可以通过 `v-bind` 将其绑定为其他动态值：

  ```html
  <input
    type="checkbox"
    v-model="toggle"
    :true-value="dynamicTrueValue"
    :false-value="dynamicFalseValue" 
  />
  ```

::: tip
  `true-value` 和 `false-value` 属性不会影响 `value` 属性，因为浏览器在表单提交时，并不会包含未选择的复选框。为了保证这两个值 (例如：“yes”和“no”) 的其中之一被表单提交，请使用单选按钮作为替代。
:::

2. 单选按钮
```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```
`pick` 会在第一个按钮选中时被设为 `first`，在第二个按钮选中时被设为 `second`

3. 下拉框
```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```
`v-model` 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，`selected` 会被设为该对象字面量值 `{ number: 123 }`。

#### 修饰符
- `.lazy​`
  默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据：

  ```html
  <!-- 在 "change" 事件后同步更新而不是 "input" -->
  <input v-model.lazy="msg" />
  ```

- `.number​`
  如果你想让用户输入自动转换为数字，你可以在 `v-model` 后添加 `.number` 修饰符来管理输入：

  ```html
  <input v-model.number="age" />
  ```

  如果该值无法被 `parseFloat()` 处理，那么将返回原始值。
  `number` 修饰符会在输入框有 `type="number"` 时自动启用。

  - `.trim​`
  如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim` 修饰符：

  ```html
  <input v-model.trim="msg" />
  ```

## 指令
> 指令是带有 `v-` 前缀的特殊属性。Vue 提供了许多[内置指令](https://cn.vuejs.org/api/built-in-directives.html)，包括上面我们所介绍的 `v-bind` 和 `v-html`。<br>
> 指令属性的期望值为一个 JavaScript 表达式 (除了少数几个例外，即 `v-for`、`v-on` 和 `v-slot`)。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。

以 `v-if` 为例：
```html
<p v-if="seen">Now you see me</p>
```
这里，`v-if` 指令会基于表达式 `seen` 的值的 **真假** 来 **移除/插入** 该 `<p>` 元素。

- 参数 Arguments
  某些指令会需要一个“参数”，在指令名后通过一个 `:` 隔开做标识。

  ```html
  <!-- v-bind 指令来响应式地更新一个 HTML 属性 -->
  <a v-bind:href="url"> ... </a>
  <!-- 简写 -->
  <a :href="url"> ... </a>

  <!-- v-on 指令，它将监听 DOM 事件 -->
  <a v-on:click="doSomething"> ... </a>
  <!-- 简写 -->
  <a @click="doSomething"> ... </a>
  ```

- 动态参数

  ```html
  <a v-bind:[attributeName]="url"> ... </a>
  <!-- 简写 -->
  <a :[attributeName]="url"> ... </a>

  <a v-on:[eventName]="doSomething"> ... </a>
  <!-- 简写 -->
  <a @[eventName]="doSomething"> ... </a>
  ```
  这里，`[attributeName]` 和 `[eventName]` 被称为动态参数，它们会在运行时被 Vue 解析为实际的属性名和事件名。这在你需要根据运行时变量来动态绑定属性或事件时很有用。

  - **动态参数值的限制​**
    > 动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。

  - **动态参数语法的限制​**
    > 动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML 属性名称中都是不合法的。例如下面的示例：
    ```html
    <!-- 这会触发一个编译器警告 -->
    <a :['foo' + bar]="value"> ... </a>
    ```
    如果你需要传入一个复杂的动态参数，我们推荐使用[计算属性](#计算属性-computed)替换复杂的表达式。

  当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：
  ```html
  <a :[someAttr]="value"> ... </a>
  ```
  上面的例子将会在 DOM 内嵌模板中被转换为 `:[someattr]`。如果你的组件拥有 “someAttr” 属性而非 “someattr”，这段代码将不会工作。单文件组件内的模板不受此限制。


- 修饰符 Modifiers
  修饰符是以 `.` 开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 `.prevent` 修饰符会告知 `v-on` 指令对触发的事件调用 `event.preventDefault()`：
  ```html
  <form @submit.prevent="onSubmit">...</form>
  ```

**完整的指令语法：**
![指令语法](/directives.png)

### 自定义指令
  > 除了 Vue 内置的一系列指令 (比如 `v-model` 或 `v-show`) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令的例子，当一个 `input` 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template> 
  <input v-focus />
</template>
```
::: info 示例
  <input 
    style="width: 200px;border: 1px solid #666;border-radius: 4px;padding: 4px 2px;" 
    :style="{borderColor: focus ? '#0000ff' : '#666'}"
    v-focus
    @focus="() => focus = true"
    @blur="() => focus = false"
    placeholder="请输入" 
  />
:::

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。在上面的例子中，`vFocus` 即可以在模板中以 `v-focus` 的形式使用。

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```javascript
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
  const app = createApp({})

  // 使 v-focus 在所有组件中都可用
  app.directive('focus', {
    /* ... */
  })
```

#### 指令钩子
  一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

  ```javascript
  const myDirective = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode) {
      // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode) {},
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode) {},
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode) {}
  }
  ```

#### 钩子参数
指令的钩子会传递以下几种参数：

  - `el` 指令绑定到的元素。这可以用于直接操作 DOM。
  - `binding` 一个对象，包含以下属性： 
    - `value` 传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
    - `oldValue` 之前的值，仅在 `beforeUpdate` 和 `updated` 钩子中可用。无论值是否更改，它都可用。
    - `arg` 传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
    - `modifiers` 一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
    - `instance` 使用该指令的组件实例。
    - `dir` 指令的定义对象。
  - `vnode` 代表绑定元素的底层 VNode。
  - `prevVnode` 代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

举例来说，像下面这样使用指令：

```html
<div v-example:foo.bar="baz">
```

binding 参数会是一个这样的对象：

```javascript
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：

```html
<div v-example:[arg]="value"></div>
```

这里指令的参数会基于组件的 `arg` 数据属性响应式地更新。

#### 简化形式​
对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<div v-color="color"></div>
```

```javascript
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

#### 对象字面量​
如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```javascript
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

:::warning 注意
不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为。
:::


## 响应式基础

### ref()
> 在组合式 API 中，推荐使用 `ref()` 函数来声明响应式状态：

```javascript
import { ref } from 'vue'

const count = ref(0)
```
`ref()` 接收参数，并将其包裹在一个带有 `.value` 属性的 `ref 对象` 返回：

```javascript
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```
模板中访问 ref，请从组件的 `setup()` 函数中声明并返回它们：

```html{12,20-23}
<template>
  <div>{{ count }}</div>

  <button @click="increment"> count++ </button>
</template>

<script>
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}
</>
```
**注意：**在模板中使用 ref 时，我们不需要附加 `.value`，在 JavaScript 中需要 `.value`

在 `setup()` 函数中手动暴露大量的状态和方法非常繁琐。我们可以使用 `<script setup>` 来大幅度地简化代码：
```html
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div>{{ count }}</div>

  <button @click="increment"> count++ </button>
</template>
```

1. 深层响应性
  > Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 `Map`。<br>
  > Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到

```javascript
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```
非原始值将通过 [reactive()](#reactive()) 转换为响应式代理，该函数将在后面讨论。

也可以通过 `shallow ref` 来放弃深层响应性。对于浅层 ref，只有 `.value` 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

**阅读更多：** 
  - [减少大型不可变数据的响应性开销](https://cn.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)
  - [与外部状态系统集成](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems)

2. DOM 更新时机​
  > 当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。<br>
  > Vue 会在 “next tick” 更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。

要等待 DOM 更新完成后再执行额外的代码，可以使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 全局 API：

```javascript
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```


### reactive()
另一种声明响应式状态的方式，即使用 `reactive()` API。与将内部值包装在特殊对象中的 ref 不同，`reactive()` 将使对象本身具有响应性。

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

`reactive()` 将深层地转换对象：当访问嵌套对象时，它们也会被 `reactive()` 包装。当 ref 的值是一个对象时，ref() 也会在内部调用它。与浅层 ref 类似，这里也有一个 `shallowReactive()` API 可以选择退出深层响应性。


1. Reactive Proxy vs Original​
> reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。<br>
> 只有代理对象是响应式的，更改原始对象不会触发更新。<br>

```javascript
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

为保证访问代理的一致性，对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象，而对一个已存在的代理对象调用 `reactive()` 会返回其本身：

```javascript
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```javascript
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

2. 局限性​
  - 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
  - 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：
    ```javascript
    let state = reactive({ count: 0 })

    // 上面的 ({ count: 0 }) 引用将不再被追踪
    // (响应性连接已丢失！)
    state = reactive({ count: 1 })
    ```
  - 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：
    ```javascript
    const state = reactive({ count: 0 })

    // 当解构时，count 已经与 state.count 断开连接
    let { count } = state
    // 不会影响原始的 state
    count++

    // 该函数接收到的是一个普通的数字
    // 并且无法追踪 state.count 的变化
    // 我们必须传入整个对象以保持响应性
    callSomeFunction(state.count)
    ```

由于这些限制，我们建议使用 `ref()` 作为声明响应式状态的主要 API💪。


### ref 解包细节

- 作为 reactive 对象的属性
  一个 `ref` 会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：
  ```javascript
  const count = ref(0)
  const state = reactive({
    count
  })

  console.log(state.count) // 0

  state.count = 1
  console.log(count.value) // 1
  ```

- 数组和集合的注意事项
  与 `reactive` 对象不同的是，当 `ref` 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包：
  ```javascript
  const books = reactive([ref('Vue 3 Guide')])
  // 这里需要 .value
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // 这里需要 .value
  console.log(map.get('count').value)
  ```

- 在模板中解包的注意事项
  在模板渲染上下文中，只有顶级的 `ref` 属性才会被解包：
  
  在下面的例子中，`count` 和 `object` 是顶级属性，但 `object.id` 不是：
  ```javascript
  const count = ref(0)
  const object = { id: ref(1) }
  ```

  因此，这个表达式按预期工作：

  ```html
  {{ count + 1 }}
  ```

  ...但这个不会：

  ```html
  {{ object.id + 1 }}
  ```

  渲染的结果将是 `[object Object]1`，因为在计算表达式时 `object.id` 没有被解包，仍然是一个 `ref` 对象。为了解决这个问题，我们可以将 `id` 解构为一个顶级属性：

  ```javascript
  const { id } = object
  ```
  ```html
  {{ id + 1 }}
  ```
  现在渲染的结果将是 2。<br>

  另一个需要注意的点是，如果 `ref` 是文本插值的最终计算值 (即 `{ { } }` 标签)，那么它将被解包，因此以下内容将渲染为 1：
  ```html
  {{ object.id }}
  ```
  该特性仅仅是文本插值的一个便利特性，等价于 `{ { object.id.value } }`。


## 计算属性 Computed
示例：

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

我们在这里定义了一个计算属性 `publishedBooksMessage`。`computed()` 方法期望接收一个 `getter` 函数，返回值为一个计算属性 `ref`。和其他一般的 `ref` 类似，你可以通过 `.value` 访问计算结果。计算属性 `ref` 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`。

1. 计算属性缓存 vs 方法

  若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的。
  ```vue
  <script setup>
    function calculateBooksMessage() {
      return author.books.length > 0 ? 'Yes' : 'No'
    }
  </script>

  <template>
    <p>{{ calculateBooksMessage() }}</p>
  </template>
  ```

  然而，不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果，而不用重复执行 `getter` 函数。

  这也解释了为什么下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖：
  ```javascript
  const now = computed(() => Date.now())
  ```

  相比之下，方法调用总是会在重渲染发生时再次执行函数。

2. 可写计算属性
  > 计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 `getter` 和 `setter` 来创建：
  ```vue
  <script setup>
  import { ref, computed } from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')

  const fullName = computed({
    // getter
    get() {
      return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
      // 注意：我们这里使用的是解构赋值语法
      [firstName.value, lastName.value] = newValue.split(' ')
    }
  })
  </script>
  ```
  现在当你再运行 `fullName.value = 'John Doe'` 时，`setter` 会被调用而 `firstName` 和 `lastName` 会随之更新。

3. 最佳实践
  - Getter 不应有副作用
    > 计算属性的 `getter` 应只做计算而没有任何其他的副作用，这一点非常重要。举例来说，不要改变其他状态、在 `getter` 中做异步请求或者更改 DOM！`getter` 的职责应该仅为计算和返回该值。
  - 避免直接修改计算属性值
    > 计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

## 侦听器 Watcher

> 计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

在组合式 API 中，我们可以使用[ `watch` 函数](https://cn.vuejs.org/api/reactivity-core.html#watch)在每次响应式状态发生变化时触发回调函数：

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

1. 侦听数据源类型
  `watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 `ref` (包括计算属性)、一个响应式对象、一个 `getter` 函数、或多个数据源组成的数组：

  ```javascript
  const x = ref(0)
  const y = ref(0)

  // 单个 ref
  watch(x, (newX) => {
    console.log(`x is ${newX}`)
  })

  // getter 函数
  watch(() => x.value + y.value, (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  })

  // 多个来源组成的数组
  watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
  })
  ```
  注意，你不能直接侦听响应式对象的属性值，例如:

  ```javascript
  const obj = reactive({ count: 0 })

  // 错误，因为 watch() 得到的参数是一个 number
  watch(obj.count, (count) => {
    console.log(`Count is: ${count}`)
  })
  ```
  这里需要用一个返回该属性的 `getter` 函数：

  ```javascript
  // 提供一个 getter 函数
  watch(() => obj.count, (count) => {
    console.log(`Count is: ${count}`)
  })
  ```

2. 侦听配重选项
  - `deep` 选项：默认情况下，`watch` 只会监听源数据的“浅层”变化。如果需要监听深层嵌套的变化，可以设置 `deep: true` 选项：
    ```javascript
    watch(() => state.someObject, (newValue, oldValue) => {
      // 注意：`newValue` 此处和 `oldValue` 是相等的
      // *除非* state.someObject 被整个替换了
    }, { 
      deep: true 
    })
    ```

  - `immediate` 选项：默认情况下，`watch` 只会在首次被侦听时执行回调函数。如果需要在创建侦听器时立即执行回调函数，可以设置 `immediate: true` 选项：
    ```javascript
    watch(source, (newValue, oldValue) => {
      // 立即执行，且当 `source` 改变时再次执行
    },{ 
      immediate: true 
    })
    ```

  - `once` 选项：每当被侦听源发生变化时，侦听器的回调就会执行。如果希望回调只在源变化时触发一次，请使用 once: true 选项。：
    ```javascript
    watch(source, (newValue, oldValue) => {
      // 当 `source` 变化时，仅触发一次
    },{ 
      once: true 
    })
    ```
  
3. watchEffect() <br>

  `watchEffect()` 允许我们自动跟踪回调的响应式依赖：

  ```javascript
  const todoId = ref(1)
  const data = ref(null)

  watchEffect(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  })
  ```

  这个例子中，回调会立即执行，不需要指定 `immediate: true`。在执行期间，它会自动追踪 `todoId.value` 作为依赖（和计算属性类似）。每当 `todoId.value` 变化时，回调会再次执行。有了 `watchEffect()`，我们不再需要明确传递 `todoId` 作为源值。

::: tip 
  - 对于这种只有一个依赖项的例子来说，`watchEffect()` 的好处相对较小。但是对于有多个依赖项的侦听器来说，使用 `watchEffect()` 可以消除手动维护依赖列表的负担。此外，如果你需要侦听一个嵌套数据结构中的几个属性，`watchEffect()` 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。

  - `watchEffect()` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。
:::

4. Post Watchers
  如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明 `flush: 'post'` 选项：

  ```javascript{2,6}
  watch(source, callback, {
    flush: 'post'
  })

  watchEffect(callback, {
    flush: 'post'
  })
  ```

  后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

  ```javascript
  import { watchPostEffect } from 'vue'

  watchPostEffect(() => {
    /* 在 Vue 更新后执行 */
  })
  ```

  你还可以创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：

  ```javascript
  watch(source, callback, {
    flush: 'sync'
  })

  watchEffect(callback, {
    flush: 'sync'
  })
  ```

  同步触发的 `watchEffect()` 有个更方便的别名 `watchSyncEffect()`：

  ```javascript
  import { watchSyncEffect } from 'vue'

  watchSyncEffect(() => {
    /* 在响应式数据变化时同步执行 */
  })
  ```

::: warning
同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。
:::


5. watch vs watchEffect <br>

  watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

  - `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
  - `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。


6. 停止侦听器

  > 在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用**同步语句**创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```javascript
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

**注意：**需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```javascript
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

## 模版引用
需要直接访问底层 DOM 元素，我们可以使用特殊的 `ref` 属性：
```html
<input ref="input">
```

1. 访问模板引用
  通过组合式 API 获得该模板引用，我们需要声明一个匹配模板 `ref` 属性值的 `ref`：
  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  // 声明一个 ref 来存放该元素的引用
  // 必须和模板里的 ref 同名
  const input = ref(null)

  onMounted(() => {
    input.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

  如果不使用 `<script setup>`，需确保从 `setup()` 返回 `ref`：

  ```javascript{6}
  export default {
    setup() {
      const input = ref(null)
      // ...
      return {
        input
      }
    }
  }
  ```

  注意，你只可以在组件挂载后才能访问模板引用。如果你想在模板中的表达式上访问 `input`，在初次渲染时会是 `null`。

  如果你需要侦听一个模板引用 `ref` 的变化，确保考虑到其值为 `null` 的情况：

  ```javascript
  watchEffect(() => {
    if (input.value) {
      input.value.focus()
    } else {
      // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
    }
  })
  ```

2. 函数模板引用
  除了使用字符串值作名字，`ref` 属性还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

  ```html
  <input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
  ```
  
  注意我们这里需要使用动态的 `:ref` 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 `el` 参数会是 `null`。


3. 组件上的 ref
  模板引用也可以被用在一个子组件上。这种情况下引用中获得的值是组件实例：

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'
  import Child from './Child.vue'

  const child = ref(null)

  onMounted(() => {
    // child.value 是 <Child /> 组件的实例
  })
  </script>

  <template>
    <Child ref="child" />
  </template>
  ```

::: tip
如果一个子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 `props` 和 `emit` 接口来实现父子组件交互。
:::
  
使用了 `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```
当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 `{ a: number, b: number }` (`ref` 都会自动解包，和一般的实例一样)


## 组件

### 组件基础
一个单独的 `.vue` 文件
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
当不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JavaScript 对象来定义：

```javascript
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
}
```
这里的模板是一个内联的 JavaScript 字符串，Vue 将会在运行时编译它。你也可以使用 ID 选择器来指向一个元素 (通常是原生的 `<template>` 元素)，Vue 将会使用其内容作为模板来源。

#### 使用组件
  要使用一个子组件，我们需要在父组件中导入它。假设我们把计数器组件放在了一个叫做 `ButtonCounter.vue` 的文件中，这个组件将会以默认导出的形式被暴露给外部。
  ```vue
  <script setup>
    import ButtonCounter from './ButtonCounter.vue'
  </script>

  <template>
    <h1>Here is a child component!</h1>
    <ButtonCounter />
  </template>
  ```

#### 传递 props
`Props` 是一种特别的属性，你可以在组件上声明注册。这里要用到 `defineProps` 宏：
```vue
<!-- ChildComponent.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 `props` `会自动暴露给模板。defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 `props`：

```javascript
const props = defineProps(['title'])
console.log(props.title)
```

如果你没有使用 `<script setup>`，`props` 必须以 `props` 选项的方式声明，`props` 对象会作为 `setup()` 函数的第一个参数被传入：

```javascript{2,3}
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```
一个组件可以有任意多的 `props`，默认情况下，所有 `prop` 都接受任意类型的值。

当一个 `prop` 被注册后，可以像这样以自定义属性的形式传递数据给它：

```vue
<template>
  <ChildComponent title="My journey with Vue" />
  <ChildComponent title="Blogging with Vue" />
  <ChildComponent title="Why Vue is so fun" />
</template>
```

#### 监听事件
父组件可以通过 `v-on` 或 `@` 来选择性地监听子组件上抛的事件，就像监听原生 DOM 事件那样：

```vue
<template>
  <ChildComponent @event-name="handleEvent" />
</template>
```
子组件可以通过调用内置的[ `$emit` 方法](https://cn.vuejs.org/api/component-instance.html#emit)，通过传入事件名称来抛出一个事件：

```vue
<!-- ChildComponent.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('event-name')">Enlarge text</button>
  </div>
</template>
```
我们可以通过 `defineEmits` 宏来声明需要抛出的事件：
```vue{4}
<!-- ChildComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['event-name'])
</script>
```
和 `defineProps` 类似，`defineEmits` 仅可用于 `<script setup>` 之中，并且不需要导入，它返回一个等同于 `$emit` 方法的 `emit` 函数。它可以被用于在组件的 `<script setup>` 中抛出事件，因为此处无法直接访问 `$emit`：

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

如果你没有在使用 `<script setup>`，你可以通过 `emits` 选项定义组件会抛出的事件。你可以从 `setup()` 函数的第二个参数，即 `setup` 上下文对象上访问到 `emit` 函数：

```javascript
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

#### 通过插槽来分配内容
一些情况下我们会希望能和 HTML 元素一样向组件中传递内容，通过 Vue 的自定义 `<slot>` 元素来实现：
```vue
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```
如上所示，我们使用 `<slot>` 作为一个占位符，父组件传递进来的内容就会渲染在这里。

#### 动态组件
通过 Vue 的 `<component>` 元素和特殊的 `is` 属性实现：
```vue
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

`:is` 的值可以是以下几种：
  - 被注册的组件名
  - 导入的组件对象

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

::: info 示例
<div style="width: 150px; display: flex; justify-content: space-evenly; align-items: center;">
  <label for="curA"><input type="radio" id="curA" value="A" v-model="currentComponent" />A</label>
  <label for="curB"><input type="radio" id="curB" value="B" v-model="currentComponent" />B</label>
</div>
<div>当前组件为: {{ currentComponent }}</div>
<component :is="currentComponent === 'A' ? Count : Message"></component>
:::

你会发现在切回来之后，之前已更改的状态都被重置了。
要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来：

```vue
<template>
<!-- 非活跃的组件将会被缓存！ -->
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

现在，在组件切换时状态也能被保留了：
::: info 示例
<div style="width: 150px; display: flex; justify-content: space-evenly; align-items: center;">
  <label for="curAA"><input type="radio" id="curAA" value="A" v-model="currentComponent" />A</label>
  <label for="curBB"><input type="radio" id="curBB" value="B" v-model="currentComponent" />B</label>
</div>
<div>当前组件为: {{ currentComponent }}</div>
<KeepAlive>
  <component :is="currentComponent === 'A' ? Count : Message"></component>
</KeepAlive>
:::

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` 属性来定制该行为。这两个属性的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```vue
<template>
  <!-- 以英文逗号分隔的字符串 -->
  <KeepAlive include="a,b">
    <component :is="view" />
  </KeepAlive>

  <!-- 正则表达式 (需使用 `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view" />
  </KeepAlive>

  <!-- 数组 (需使用 `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view" />
  </KeepAlive>
</template>
```
它会根据组件的 `name` 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

最大缓存实例数：我们可以通过传入 `max` 属性来限制可被缓存的最大组件实例数。`<KeepAlive>` 的行为在指定了 `max` 后类似一个 LRU 缓存（如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间）：

```vue
<template>
  <KeepAlive :max="10">
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

缓存实例的生命周期：一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子：

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

**注意：**
  - `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
  - 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。


### 深入组件

#### 全局注册
我们可以使用 Vue 应用实例的 `.component()` 方法，让组件在当前 Vue 应用中全局可用。
```javascript
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
```
如果使用单文件组件，你可以注册被导入的 .vue 文件：

```javascript
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

`.component()` 方法可以被链式调用：

```javascript
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

#### 局部注册
全局注册虽然很方便，但有以下几个问题：

  - 全局注册，但并没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中。
  - 全局注册在大型项目中使项目的依赖关系变得不那么明确。在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性。

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：
```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

如果没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册：

```javascript
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

#### 使用一个对象绑定多个 prop
如果你想要将一个对象的所有属性都当作 `props` 传入，你可以使用没有参数的 `v-bind`，即只使用 `v-bind` 而非 `:prop-name`。例如，这里有一个 `post` 对象：
```javascript
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

以及下面的模板：
```vue
<template>  
  <Component v-bind="post" />
</template>
```

而这实际上等价于：
```vue
<template>
  <Component :id="post.id" :title="post.title" />
</template>
```

#### 单向数据流
所有的 `props` 都遵循着单向绑定原则，`props` 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

```javascript
const props = defineProps(['foo'])

// ❌ 警告！prop 是只读的！
props.foo = 'bar'
```
导致你想要更改一个 `prop` 的需求通常来源于以下两种场景：

  - `prop` 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 `props` 上获取初始值即可：

  ```javascript
  const props = defineProps(['initialCounter'])

  // 计数器只是将 props.initialCounter 作为初始值
  // 像下面这样做就使 prop 和后续更新无关了
  const counter = ref(props.initialCounter)
  ```
  - 需要对传入的 `prop` 值做进一步的转换。在这种情况中，最好是基于该 `prop` 值定义一个计算属性：

  ```javascript
  const props = defineProps(['size'])

  // 该 prop 变更时计算属性也会自动更新
  const normalizedSize = computed(() => props.size.trim().toLowerCase())
  ```

#### 更改对象 / 数组类型的 props
> 当对象或数组作为 `props` 被传入时，虽然子组件无法更改 `props` 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，对 Vue 来说，阻止这种更改需要付出的代价异常昂贵。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。


#### Prop 校验​
Vue 组件可以更细致地声明对传入的 `props` 的校验要求。比如我们上面已经看到过的类型声明，如果传入的值不满足类型要求，Vue 会在浏览器控制台中抛出警告来提醒使用者。这在开发给其他开发者使用的组件时非常有用。

要声明对 `props` 的校验，你可以向 `defineProps()` 宏提供一个带有 `props` 校验选项的对象，例如：

```javascript 
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // 必传但可为 null 的字符串
  propD: {
    type: [String, null],
    required: true
  },
  // Number 类型的默认值
  propE: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propF: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propG: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propH: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

::: tip
`defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。
:::


一些补充细节：

  - 所有 `prop` 默认都是可选的，除非声明了 `required: true`。

  - 除 `Boolean` 外的未传递的可选 `prop` 将会有一个默认值 `undefined`。

  - `Boolean` 类型的未传递 `prop` 将被转换为 `false`。这可以通过为它设置 `default` 来更改——例如：设置为 `default: undefined` 将与非布尔类型的 `prop` 的行为保持一致。

  - 如果声明了 `default` 值，那么在 `prop` 的值被解析为 `undefined` 时，无论 `prop` 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。


#### 组件 v-model
v-model 可以在组件上使用以实现双向绑定。

从 Vue 3.4 开始，推荐的实现方式是使用 `defineModel()` 宏：
```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

父组件可以用 v-model 绑定一个值：

```vue
<!-- Parent.vue -->
<Child v-model="countModel" />
```

`defineModel()` 返回的值是一个 `ref`。它可以像其他 `ref` 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

  - 它的 `.value` 和父组件的 `v-model` 的值同步；
  - 当它被子组件变更了，会触发父组件绑定的值一起更新。

这意味着你也可以用 `v-model` 把这个 `ref` 绑定到一个原生 `input` 元素上，在提供相同的 `v-model` 用法的同时轻松包装原生 `input` 元素：

```vue
<script setup>
  const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

##### 底层机制​
`defineModel` 是一个便利宏。编译器将其展开为以下内容：

  - 一个名为 `modelValue` 的 `prop`，本地 `ref` 的值与其同步；
  - 一个名为 `update:modelValue` 的事件，当本地 `ref` 的值发生变更时触发。

在 3.4 版本之前，你一般会按照如下的方式来实现上述相同的子组件：

```vue
<!-- Child.vue -->
<script setup>
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

然后，父组件中的 `v-model="foo"` 将被编译为：

```vue
<template>
  <!-- Parent.vue -->
  <Child
    :modelValue="foo"
    @update:modelValue="$event => (foo = $event)"
  />
</template>
```

如你所见，这显得冗长得多。然而，这样写有助于理解其底层机制。

因为 `defineModel` 声明了一个 prop，你可以通过给 `defineModel` 传递选项，来声明底层 `prop` 的选项：

```javascript
// 使 v-model 必填
const model = defineModel({ required: true })

// 提供一个默认值
const model = defineModel({ default: 0 })
```

:::warning
如果为 `defineModel` 属性设置了一个 `default` 值且父组件没有为该属性提供任何值，会导致父组件与子组件之间不同步。在下面的示例中，父组件的 `myRef` 是 `undefined`，而子组件的 `model` 是 `1`：

```javascript
// 子组件：
const model = defineModel({ default: 1 })

// 父组件
const myRef = ref()
```

```vue
<Child v-model="myRef"></Child>
``` 
:::

##### v-model 的参数​
组件上的 `v-model` 也可以接受一个参数：

```vue
<MyComponent v-model:title="bookTitle" />
```
在子组件中，我们可以通过将字符串作为第一个参数传递给 `defineModel()` 来支持相应的参数：

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```
如果需要额外的 `prop` 选项，应该在 `model` 名称之后传递：

```javascript
const title = defineModel('title', { required: true })
```

:::details 3.4 之前的用法
```vue
<!-- MyComponent.vue -->
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```
:::

##### 多个 v-model 绑定​
利用刚才在 `v-model` 的参数小节中学到的指定参数与事件名的技巧，我们可以在单个组件实例上创建多个 `v-model` 双向绑定。

组件上的每一个 `v-model` 都会同步不同的 `prop`，而无需额外的选项：

```vue
<template>
  <UserName
    v-model:first-name="first"
    v-model:last-name="last"
  />
</template>
```

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

:::details 3.4 之前的用法

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
:::


##### 处理 v-model 修饰符​
在学习输入绑定时，我们知道了 `v-model` 有一些内置的修饰符，例如 `.trim`，`.number` 和 `.lazy`。在某些场景下，你可能想要一个自定义组件的 `v-model` 支持自定义的修饰符。

我们来创建一个自定义的修饰符 `capitalize`，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写：

```vue
<template>
  <MyComponent v-model.capitalize="myText" />
</template>
```

通过像这样解构 `defineModel()` 的返回值，可以在子组件中访问添加到组件 `v-model` 的修饰符：

```vue
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

为了能够基于修饰符选择性地调节值的读取和写入方式，我们可以给 `defineModel()` 传入 `get` 和 `set` 这两个选项。这两个选项在从模型引用中读取或设置值时会接收到当前的值，并且它们都应该返回一个经过处理的新值。下面是一个例子，展示了如何利用 `set` 选项来应用 `capitalize` (首字母大写) 修饰符：

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

:::details 3.4 之前的用法
```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

##### 带参数的 v-model 修饰符​
这里是另一个例子，展示了如何在使用多个不同参数的 `v-model` 时使用修饰符：

```vue
<template>
  <UserName
    v-model:first-name.capitalize="first"
    v-model:last-name.uppercase="last"
  />
</template>
```

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

:::details 3.4 之前的用法
```vue
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```
:::


#### 插槽
##### 插槽内容与出口
在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。

举例来说，这里有一个 `<FancyButton>` 组件，可以像这样使用：

```vue
<template>
  <FancyButton>
    Click me! <!-- 插槽内容 -->
  </FancyButton>
</template>
```
而 `<FancyButton>` 的模板是这样的：

```vue
<template>
  <button class="fancy-btn">
    <slot></slot> <!-- 插槽出口 -->
  </button>
</template>
```
`<slot>` 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。

##### 默认内容
在外部没有提供任何内容的情况下，可以为插槽指定默认内容。比如有这样一个 `<SubmitButton>` 组件：

```vue
<template>
  <button type="submit">
    <slot></slot>
  </button>
</template>
```
如果我们想在父组件没有提供任何插槽内容时在 `<button>` 内渲染“Submit”，只需要将“Submit”写在 `<slot>` 标签之间来作为默认内容：

```vue
<template>
  <button type="submit">
    <slot>
      Submit <!-- 默认内容 -->
    </slot>
  </button>
</template>
```

“Submit”将会被作为默认内容渲染：

```html
<button type="submit">Submit</button>
```

但如果我们提供了插槽内容：

```vue
<template>
  <SubmitButton>Save</SubmitButton>
</template>
```

那么被显式提供的内容会取代默认内容：

```html
<button type="submit">Save</button>
```

##### 具名插槽
`<slot>` 元素可以有一个特殊的属性 `name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
这类带 `name` 的插槽被称为具名插槽 (named slots)。没有提供 `name` 的 `<slot>` 出口会隐式地命名为“default”。

要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：

```vue
<template>
  <BaseLayout>
    <template v-slot:header>
      <!-- header 插槽的内容放这里 -->
    </template>
  </BaseLayout>
</template>
```

`v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 `header` 插槽中”。

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```vue
<template>
  <BaseLayout>
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <!-- 隐式的默认插槽 -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </BaseLayout>
</template>
```

现在 `<template>` 元素中的所有内容都将被传递到相应的插槽。最终渲染出的 HTML 如下：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

##### 条件插槽
有时你需要根据插槽是否存在来渲染某些内容。

你可以结合使用 `$slots` 属性与 `v-if` 来实现。

在下面的示例中，我们定义了一个卡片组件，它拥有三个条件插槽：`header`、`footer` 和 `default`。 当 `header`、`footer` 或 `default` 存在时，我们希望包装它们以提供额外的样式：

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

##### 动态插槽名
动态指令参数在 `v-slot` 上也是有效的，即可以定义下面这样的动态插槽名：

```vue
<template>
  <base-layout>
    <template v-slot:[dynamicSlotName]>
      ...
    </template>

    <!-- 缩写为 -->
    <template #[dynamicSlotName]>
      ...
    </template>
  </base-layout>
</template>
```

##### 作用域插槽
在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。
```vue
<template>
  <!-- <MyComponent> 的模板 -->
  <div>
    <slot :text="greetingMessage" :count="1"></slot>
  </div>
</template>
```

当需要接收插槽 `props` 时，默认插槽和具名插槽的使用方式有一些小区别。
  - 默认插槽：通过子组件标签上的 `v-slot` 指令，直接接收到了一个插槽 `props` 对象：

  ```vue
  <template>
    <MyComponent v-slot="slotProps">
      {{ slotProps.text }} {{ slotProps.count }}
    </MyComponent>

    <!-- 使用解构 -->
    <MyComponent v-slot="{ text, count }">
      {{ text }} {{ count }}
    </MyComponent>
  </template>
  ```

  - 具名作用域插槽：具名作用域插槽的工作方式也是类似的，插槽 `props` 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`。当使用缩写时是这样：

  ```html
    <MyComponent>
      <template #header="headerProps">
        {{ headerProps }}
      </template>

      <template #default="defaultProps">
        {{ defaultProps }}
      </template>

      <template #footer="footerProps">
        {{ footerProps }}
      </template>
    </MyComponent>
  ```

  向具名插槽中传入 props：

  ```html
  <slot name="header" message="hello"></slot>
  ```

  注意插槽上的 `name` 是一个 Vue 特别保留的属性，不会作为 `props` 传递给插槽。因此最终 `headerProps` 的结果是 `{ message: 'hello' }`。

#### 依赖注入

1. Provide (提供)
  要为组件后代提供数据，需要使用到 `provide()` 函数：

  ```vue
  <script setup>
    import { provide } from 'vue'

    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  </script>
  ```

  如果不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的：

  ```javascript
    import { provide } from 'vue'

    export default {
      setup() {
        provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
      }
    }
  ```
  
  `provide()` 函数接收两个参数。
    - 第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。
    - 第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 `ref`：

    ```javascript
      import { ref, provide } from 'vue'

      const count = ref(0)
      provide('key', count)
    ```
  
2. 应用层 Provide
  除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

  ```javascript
    import { createApp } from 'vue'

    const app = createApp({})

    app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  ```

  在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。

3. Inject (注入)
  要注入上层组件提供的数据，需使用 `inject()` 函数：

  ```vue
  <script setup>
    import { inject } from 'vue'

    const message = inject('message')
  </script>
  ```

  如果提供的值是一个 `ref`，注入进来的会是该 `ref` 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 `ref` 对象保持了和供给方的响应性链接。

  同样的，如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 内同步调用：

  ```javascript
    import { inject } from 'vue'

    export default {
      setup() {
        const message = inject('message')
        return { message }
      }
    }
  ```

4. 注入默认值
  默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

  如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和 props 类似：

  ```javascript
    // 如果没有祖先组件提供 "message"
    // `value` 会是 "这是默认值"
    const value = inject('message', '这是默认值')
  ```

  在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

  ```javascript
    const value = inject('key', () => new ExpensiveClass(), true)
  ```

  第三个参数表示默认值应该被当作一个工厂函数。

5. 和响应式数据配合使用​
  当提供 / 注入响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在供给方组件中。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

  有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：

  ```vue
    <!-- 在供给方组件内 -->
    <script setup>
      import { provide, ref } from 'vue'

      const location = ref('North Pole')

      function updateLocation() {
        location.value = 'South Pole'
      }

      provide('location', {
        location,
        updateLocation
      })
    </script>
  ```

  ```vue
    <!-- 在注入方组件 -->
    <script setup>
      import { inject } from 'vue'

      const { location, updateLocation } = inject('location')
    </script>

    <template>
      <button @click="updateLocation">{{ location }}</button>
    </template>
  ```

  最后，如果你想确保提供的数据不能被注入方的组件更改，你可以使用 `readonly()` 来包装提供的值。

  ```vue
  <script setup>
    import { ref, provide, readonly } from 'vue'

    const count = ref(0)
    provide('read-only-count', readonly(count))
  </script>
  ```

6. 使用 Symbol 作注入名​
  如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，建议最好使用 `Symbol` 来作为注入名以避免潜在的冲突。

  我们通常推荐在一个单独的文件中导出这些注入名 `Symbol`：

  ::: code-group
  ```javascript [keys.js]
    export const myInjectionKey = Symbol()
  ```

  ```javascript [供给方组件]
    import { provide } from 'vue'
    import { myInjectionKey } from './keys.js'

    provide(myInjectionKey, { /*
      要提供的数据
    */ });
  ```

  ```javascript [注入方组件]
    import { inject } from 'vue'
    import { myInjectionKey } from './keys.js'

    const injected = inject(myInjectionKey)
  ```
  :::


#### 异步组件
1. 基本用法​
  在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 `defineAsyncComponent` 方法来实现此功能：

  ```javascript
  import { defineAsyncComponent } from 'vue'

  const AsyncComp = defineAsyncComponent(() => {
    return new Promise((resolve, reject) => {
      // ...从服务器获取组件
      resolve(/* 获取到的组件 */)
    })
  })
  // ... 像使用其他一般组件一样使用 `AsyncComp`
  ```

  如你所见，`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

  我们也可以用它来导入 Vue 单文件组件：

  ```javascript
  import { defineAsyncComponent } from 'vue'

  const AsyncComp = defineAsyncComponent(() =>
    import('./components/MyComponent.vue')
  )
  ```
  
  最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。它会将接收到的 `props` 和插槽传给内部组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载。

  与普通组件一样，异步组件可以使用 `app.component()` 全局注册：

  ```javascript
  app.component('MyComponent', defineAsyncComponent(() =>
    import('./components/MyComponent.vue')
  ))
  ```
  也可以直接在父组件中直接定义它们：

  ```vue
  <script setup>
  import { defineAsyncComponent } from 'vue'

  const AdminPage = defineAsyncComponent(() =>
    import('./components/AdminPageComponent.vue')
  )
  </script>

  <template>
    <AdminPage />
  </template>
  ```

2. 加载与错误状态​
  异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

  ```javascript
  const AsyncComp = defineAsyncComponent({
    // 加载函数
    loader: () => import('./Foo.vue'),

    // 加载异步组件时使用的组件
    loadingComponent: LoadingComponent,
    // 展示加载组件前的延迟时间，默认为 200ms
    delay: 200,

    // 加载失败后展示的组件
    errorComponent: ErrorComponent,
    // 如果提供了一个 timeout 时间限制，并超时了
    // 也会显示这里配置的报错组件，默认值是：Infinity
    timeout: 3000
  })
  ```

  如果提供了一个加载组件，它将在内部组件加载时先行显示。在加载组件显示之前有一个默认的 200ms 延迟——这是因为在网络状况较好时，加载完成得很快，加载组件和最终组件之间的替换太快可能产生闪烁，反而影响用户感受。

  如果提供了一个报错组件，则它会在加载器函数返回的 Promise 抛错时被渲染。你还可以指定一个超时时间，在请求耗时超过指定时间时也会渲染报错组件。

## 生命周期

1. 注册周期钩子
  举例来说，`onMounted` 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：
  ```vue
  <script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    console.log(`the component is now mounted.`)
  })
  </script>
  ```

  还有其他一些钩子，会在实例生命周期的不同阶段被调用，最常用的是 `onMounted`、`onUpdated` 和 `onUnmounted`。所有生命周期钩子的完整参考及其用法请参考[ API 索引](https://cn.vuejs.org/api/composition-api-lifecycle.html)。

2. 生命周期图示

  ![生命周期图示](/lifecycle_3.png)


## TypeScript

### TypeScript 与组合式 API

#### 为组件的 props 标注类型

- 使用 `<script setup>​`
  ::: code-group
  ```vue [基本]
    <script setup lang="ts">
      const props = defineProps({
        foo: { type: String, required: true },
        bar: Number
      })

      props.foo // string
      props.bar // number | undefined
    </script>
  ```

  ```vue [泛型参数]
    <script setup lang="ts">
      const props = defineProps<{
        foo: string
        bar?: number
      }>()
    </script>
  ```

  ```vue [接口]
    <script setup lang="ts">
      interface Props {
        foo: string
        bar?: number
      }
      const props = defineProps<Props>()
    </script>
  ```

  ```vue [导入]
    <script setup lang="ts">
      import type { Props } from './props'
      const props = defineProps<Props>()
    </script>
  ```

  ```vue [PropType 工具]
    <script setup lang="ts">
      import type { PropType } from 'vue'

      interface Book {
        title: string
        author: string
        year: number
      }

      const props = defineProps({
        book: Object as PropType<Book>
      })
    </script>
  :::

  解构默认值：通过 `withDefaults` 编译器宏解决：

  ```typescript
    export interface Props {
      msg?: string
      labels?: string[]
    }

    const props = withDefaults(defineProps<Props>(), {
      msg: 'hello',
      labels: () => ['one', 'two']
    })
  ```

- 非 `<script setup>`
  如果没有使用 `<script setup>`，那么为了开启 `props` 的类型推导，必须使用 `defineComponent()`。传入 `setup()` 的 `props` 对象类型是从 `props` 选项中推导而来。

  ::: code-group
  ```typescript [基本]
    import { defineComponent } from 'vue'

    export default defineComponent({
      props: {
        message: String
      },
      setup(props) {
        props.message // <-- 类型：string
      }
    })
  ```

  ```typescript [PropType 工具]
    import { defineComponent } from 'vue'
    import type { PropType } from 'vue'

    interface Book {
      title: string
      author: string
      year: number
    }

    export default defineComponent({
      props: {
        book: Object as PropType<Book>
      }
    })
  ```
  :::

#### 为组件的 emits 标注类型
- 使用 `<script setup>​`
  ::: code-group
  ```vue [运行时]
    <script setup lang="ts">
      const emit = defineEmits(['change', 'update'])
    </script>
  ```

  ```vue [基于选项]
    <script setup lang="ts">
      const emit = defineEmits({
        change: (id: number) => {
          // 返回 `true` 或 `false`
          // 表明验证通过或失败
        },
        update: (value: string) => {
          // 返回 `true` 或 `false`
          // 表明验证通过或失败
        }
      })
    </script>
  ```

  ```vue [基于类型]
    <script setup lang="ts">
      const emit = defineEmits<{
        (e: 'change', id: number): void
        (e: 'update', value: string): void
      }>()
    </script>
  ```

  ```vue [3.3+: 可选的、更简洁的语法]
    <script setup lang="ts">
      const emit = defineEmits<{
        change: [id: number]
        update: [value: string]
      }>()
    </script>
  ```
  :::

  类型参数可以是以下的一种：

    - 一个可调用的函数类型，但是写作一个包含调用签名的类型字面量。它将被用作返回的 `emit` 函数的类型。
    - 一个类型字面量，其中键是事件名称，值是数组或元组类型，表示事件的附加接受参数。上面的示例使用了具名元组，因此每个参数都可以有一个显式的名称。

- 非 `<script setup>`
  ```typescript
    import { defineComponent } from 'vue'

    export default defineComponent({
      emits: ['change'],
      setup(props, { emit }) {
        emit('change') // <-- 类型检查 / 自动补全
      }
    })
  ```

#### 为 ref() 标注类型
::: code-group
```vue [类型推导]
  <script setup lang="ts">
    import { ref } from 'vue'

    // 推导出的类型：Ref<number>
    const year = ref(2020)

    // => TS Error: Type 'string' is not assignable to type 'number'.
    year.value = '2020'
  </script>
```

```vue [使用 Ref 类型]
  <script setup lang="ts">
    import { ref } from 'vue'
    import type { Ref } from 'vue'

    const year: Ref<string | number> = ref('2020')

    year.value = 2020 // 成功！
  </script>
```

```vue [泛型参数]
  <script setup lang="ts">
    import { ref } from 'vue'

    // 得到的类型：Ref<string | number>
    const year = ref<string | number>('2020')

    year.value = 2020 // 成功！
  </script>
```
:::

如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 `undefined` 的联合类型：

```vue
  <script setup lang="ts">
    import { ref } from 'vue'

    // 推导得到的类型：Ref<number | undefined>
    const n = ref<number>()
  </script>
```

#### 为 reactive() 标注类型
::: code-group
```vue [类型推导]
  <script setup lang="ts">
    import { reactive } from 'vue'

    // 推导得到的类型：{ title: string }
    const book = reactive({ title: 'Vue 3 指引' })
  </script>
```

```vue [使用接口]
  <script setup lang="ts">
    import { reactive } from 'vue'

    interface Book {
      title: string
      year?: number
    }

    const book: Book = reactive({ title: 'Vue 3 指引' })
  </script>
```
:::

::: tip 提示
不推荐使用 `reactive()` 的泛型参数，因为处理了深层次 `ref` 解包的返回值与泛型参数的类型不同。
:::

#### 为 computed() 标注类型
::: code-group
```vue [类型推导]
  <script setup lang="ts">
    import { ref, computed } from 'vue'

    const count = ref(0)

    // 推导得到的类型：ComputedRef<number>
    const double = computed(() => count.value * 2)

    // => TS Error: Property 'split' does not exist on type 'number'
    const result = double.value.split('')
  </script>
```

```vue [泛型参数]
  <script setup lang="ts">
    const double = computed<number>(() => {
      // 若返回值不是 number 类型则会报错
    })
  </script>
```
:::

#### 为事件处理函数标注类型
在处理原生 DOM 事件时，应该为我们传递给事件处理函数的参数正确地标注类型。让我们看一下这个例子：

```vue
  <script setup lang="ts">
    function handleChange(event) {
      // `event` 隐式地标注为 `any` 类型
      console.log(event.target.value)
    }
  </script>

  <template>
    <input type="text" @change="handleChange" />
  </template>
```
  
没有类型标注时，这个 `event` 参数会隐式地标注为 `any` 类型。这也会在 `tsconfig.json` 中配置了 `"strict": true` 或 `"noImplicitAny": true` 时报出一个 TS 错误。因此，建议显式地为事件处理函数的参数标注类型。此外，你在访问 `event` 上的属性时可能需要使用类型断言：

```typescript
  function handleChange(event: Event) {
    console.log((event.target as HTMLInputElement).value)
  }
```

#### 为 provide / inject 标注类型
Vue 提供了一个 `InjectionKey` 接口，它是一个继承自 `Symbol` 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：

```typescript
  import { provide, inject } from 'vue'
  import type { InjectionKey } from 'vue'

  const key = Symbol() as InjectionKey<string>

  provide(key, 'foo') // 若提供的是非字符串值会导致错误

  const foo = inject(key) // foo 的类型：string | undefined
```
建议将注入 `key` 的类型放在一个单独的文件中，这样它就可以被多个组件导入。

当使用字符串注入 `key` 时，注入值的类型是 `unknown`，需要通过泛型参数显式声明：

```typescript
  const foo = inject<string>('foo') // 类型：string | undefined
```

注意注入的值仍然可以是 `undefined`，因为无法保证提供者一定会在运行时 `provide` 这个值。

当提供了一个默认值后，这个 `undefined` 类型就可以被移除：

```typescript
  const foo = inject<string>('foo', 'bar') // 类型：string
```

如果你确定该值将始终被提供，则还可以强制转换该值：

```typescript
  const foo = inject('foo') as string
```

#### 为模板引用标注类型
模板引用需要通过一个显式指定的泛型参数和一个初始值 `null` 来创建：

```vue
  <script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const el = ref<HTMLInputElement | null>(null)

    onMounted(() => {
      el.value?.focus()
    })
  </script>

  <template>
    <input ref="el" />
  </template>
```
::: tip 提示
注意为了严格的类型安全，有必要在访问 `el.value` 时使用可选链或类型守卫。这是因为直到组件被挂载前，这个 `ref` 的值都是初始的 `null`，并且在由于 `v-if` 的行为将引用的元素卸载时也可以被设置为 `null`。
:::


#### 为组件模板引用标注类型
有时，你可能需要为一个子组件添加一个模板引用，以便调用它公开的方法。举例来说，我们有一个 `MyModal` 子组件，它有一个打开模态框的方法：

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

为了获取 `MyModal` 的类型，我们首先需要通过 `typeof` 得到其类型，再使用 TypeScript 内置的 `InstanceType` 工具类型来获取其实例类型：

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

如果组件的具体类型无法获得，或者你并不关心组件的具体类型，那么可以使用 `ComponentPublicInstance`。这只会包含所有组件都共享的属性，比如 `$el`。

```typescript
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = ref<ComponentPublicInstance | null>(null)
```

如果引用的组件是一个泛型组件，例如 `MyGenericModal`：

```vue
<!-- MyGenericModal.vue -->
<script setup lang="ts" generic="ContentType extends string | number">
import { ref } from 'vue'

const content = ref<ContentType | null>(null)

const open = (newContent: ContentType) => (content.value = newContent)

defineExpose({
  open
})
</script>
```

则需要使用 [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) 库中的 `ComponentExposed` 来引用组件类型，因为 `InstanceType` 在这种场景下不起作用。

```vue
<!-- App.vue -->
<script setup lang="ts">
import MyGenericModal from './MyGenericModal.vue'

import type { ComponentExposed } from 'vue-component-type-helpers';

const modal = ref<ComponentExposed<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open('newValue')
}
</script>
```

### TypeScript 与选项式 API

#### 为组件的 props 标注类型
选项式 API 中对 `props` 的类型推导需要用 `defineComponent()` 来包装组件。有了它，Vue 才可以通过 `props` 以及一些额外的选项，比如 `required: true` 和 `default` 来推导出 `props` 的类型：

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 启用了类型推导
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // 类型：string | undefined
    this.id // 类型：number | string | undefined
    this.msg // 类型：string
    this.metadata // 类型：any
  }
})
</script>
```

然而，这种运行时 `props` 选项仅支持使用构造函数来作为一个 `prop` 的类型——没有办法指定多层级对象或函数签名之类的复杂类型。

我们可以使用 `PropType` 这个工具类型来标记更复杂的 `props` 类型：

```typescript
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // 提供相对 `Object` 更确定的类型
      type: Object as PropType<Book>,
      required: true
    },
    // 也可以标记函数
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    this.callback?.('123')
  }
})
```
**注意事项​：** <br>

如果你的 TypeScript 版本低于 4.7，在使用函数作为 `prop` 的 `validator` 和 `default` 选项值时需要格外小心——确保使用箭头函数：

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // 如果你的 TypeScript 版本低于 4.7，确保使用箭头函数
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

#### 为组件的 emits 标注类型
```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // 执行运行时校验
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // 类型错误
      })

      this.$emit('non-declared-event') // 类型错误
    }
  }
})
</script>
```


#### 为计算属性标记类型
::: code-group
```typescript [类型推导]
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // 类型：string
  }
})
```

```typescript [显式标记]
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // 显式标注返回类型
    greeting(): string {
      return this.message + '!'
    },

    // 标注一个可写的计算属性
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```
:::


#### 为事件处理函数标注类型
在处理原生 DOM 事件时，应该为我们传递给事件处理函数的参数正确地标注类型。让我们看一下这个例子：

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` 隐式地标注为 `any` 类型
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

没有类型标注时，这个 `event` 参数会隐式地标注为 `any` 类型。这也会在 `tsconfig.json` 中配置了 `"strict": true` 或 `"noImplicitAny": true` 时抛出一个 TS 错误。因此，建议显式地为事件处理函数的参数标注类型。此外，在访问 `event` 上的属性时你可能需要使用类型断言：

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

### 第三方库类型声明文件
- 情况1：库本身自带类型声明文件
  - 比如：axios，安装后可查看 node_modules/axios 可发现对应的类型声明文件。
  - 导入 axios 后就会加载对应的类型文件，提供该库的类型声明。

- 情况2：由 `DefinitelyTyped` 提供
  - 比如：jquery，安装后导入，提示：需要安装 `@types/jquery` 类型声明包
  - `DefinitelyTyped` 是一个 github 仓库，用来提供高质量 TypeScript 类型声明
  - 当安装 `@types/*` 类型声明包后，TS 也会自动加载该类声明包，以提供该库的类型声明



[https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) 可以搜索是否有对应的 `@types/*`


## Pinia
### 安装并注册
1. 安装 Pinia
::: code-group
```bash [npm]
npm install pinia
```

```bash [pnpm]
pnpm install pinia
```

```bash [yarn]
yarn add pinia
```
:::

2. 注册 Pinia
```javascript [main.js]
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

### 核心概念

#### 定义 Store
Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个独一无二的名字：

```javascript
import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

`defineStore()` 的第二个参数可接受两类值：`Setup` 函数或 `Option` 对象。

  - `Setup Store`：与 Vue 组合式 API 的 `setup` 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。
    ```javascript
      export const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        const doubleCount = computed(() => count.value * 2)
        function increment() {
          count.value++
        }

        return { count, doubleCount, increment }
      })
    ```

    在 `Setup Store` 中：

      - `ref()` 就是 `state` 属性
      - `computed()` 就是 `getters`
      - `function()` 就是 `actions`
    
    注意，要让 `pinia` 正确识别 `state`，你必须在 `setup store` 中返回 `state` 的所有属性。这意味着，你不能在 `store` 中使用私有属性。不完整返回会影响 `SSR` ，开发工具和其他插件的正常运行。

    `Setup store` 也可以依赖于全局提供的属性，比如路由。任何应用层面提供的属性都可以在 `store` 中使用 `inject()` 访问，就像在组件中一样：

    ```javascript
      import { inject } from 'vue'
      import { useRoute } from 'vue-router'
      import { defineStore } from 'pinia'

      export const useSearchFilters = defineStore('search-filters', () => {
        const route = useRoute()
        // 这里假定 `app.provide('appProvided', 'value')` 已经调用过
        const appProvided = inject('appProvided')

        // ...

        return {
          // ...
        }
      })
    ```
:::warning 注意
不要返回像 `route` 或 `appProvided` (上例中)之类的属性，因为它们不属于 `store`，而且你可以在组件中直接用 `useRoute()` 和 `inject('appProvided')` 访问。
:::

  - `Option Store`：与 Vue 的选项式 API 类似，我们也可以传入一个带有 `state`、`actions` 与 `getters` 属性的 Option 对象。
    ```javascript
      export const useCounterStore = defineStore('counter', {
        state: () => ({ count: 0, name: 'Eduardo' }),
        getters: {
          doubleCount: (state) => state.count * 2,
        },
        actions: {
          increment() {
            this.count++
          },
        },
      })
    ```

    你可以认为 `state` 是 store 的数据 (data)，`getters` 是 store 的计算属性 (computed)，而 `actions` 则是方法 (methods)。

#### 使用 Store
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>
```

请注意，`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 `getters` 后面写 `.value`。就像 `setup` 中的 `props` 一样，我们**不能对它进行解构**：

```vue{8-10}
<script setup>
  import { useCounterStore } from '@/stores/counter'
  import { computed } from 'vue'

  const store = useCounterStore()
  // ❌ 这将不起作用，因为它破坏了响应性
  // 这就和直接解构 `props` 一样
  const { name, doubleCount } = store
  name // 将始终是 "Eduardo"
  doubleCount // 将始终是 0

  setTimeout(() => {
    store.increment()
  }, 1000)
  // ✅ 这样写是响应式的
  // 💡 当然你也可以直接使用 `store.doubleCount`
  const doubleValue = computed(() => store.doubleCount)
</script>
```

**从 Store 解构：**
  > 为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 `action` 时，它会非常有用。请注意，你可以直接从 store 中解构 `action`，因为它们也被绑定到 store 上：

  ```vue
    <script setup>
      import { storeToRefs } from 'pinia'
      const store = useCounterStore()
      // `name` 和 `doubleCount` 是响应式的 ref
      // 同时通过插件添加的属性也会被提取为 ref
      // 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
      const { name, doubleCount } = storeToRefs(store)
      // 作为 action 的 increment 可以直接解构
      const { increment } = store
    </script>
  ```

#### State

在大多数情况下，`state` 都是你的 store 的核心。人们通常会先定义能代表他们 APP 的 `state`。在 Pinia 中，`state` 被定义为一个返回初始状态的函数。这使得 Pinia 可以同时支持服务端和客户端。

```javascript
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

- 使用 TypeScript
::: code-group
```typescript [基础]
const useStore = defineStore('storeId', {
  state: () => {
    return {
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

```typescript [接口]
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```
:::

1. 访问 state
默认情况下，你可以通过 store 实例访问 `state`，直接对其进行读写。

```javascript
const store = useStore()

store.count++
```

注意，新的属性如果没有在 `state()` 中被定义，则不能被添加。它必须包含初始状态。例如：如果 `secondCount` 没有在 `state()` 中定义，我们无法执行 `store.secondCount = 2`。

2. 重置 state
使用选项式 API 时，你可以通过调用 store 的 `$reset()` 方法将 `state` 重置为初始值。

```js
const store = useStore()

store.$reset()
```
在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态。

在 Setup Stores 中，您需要创建自己的 `$reset()` 方法：

```typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

3. 变更 state
除了用 `store.count++` 直接改变 store，你还可以调用 `$patch` 方法。它允许你用一个 `state` 的补丁对象在同一时间更改多个属性：

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```
不过，用这种语法的话，有些变更真的很难实现或者很耗时：任何集合的修改（例如，向数组中添加、移除一个元素或是做 `splice` 操作）都需要你创建一个新的集合。因此，`$patch` 方法也接受一个函数来组合这种难以用补丁对象实现的变更。

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```
两种变更 store 方法的主要区别是，`$patch()` 允许你将多个变更归入 `devtools` 的同一个条目中。同时请注意，直接修改 `state`，`$patch()` 也会出现在 `devtools` 中，而且可以进行 `time travel` (在 Vue 3 中还没有)。

4. 替换 state
你不能完全替换掉 store 的 `state`，因为那样会破坏其响应性。但是，你可以 `patch` 它。

```javascript
// 这实际上并没有替换`$state`
store.$state = { count: 24 }
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 })
```
你也可以通过变更 pinia 实例的 `state` 来设置整个应用的初始 `state`。这常用于 `SSR` 中的激活过程。

```javascript
pinia.state.value = {}
```

5. 订阅 state
类似于 Vuex 的 `subscribe` 方法，你可以通过 store 的 `$subscribe()` 方法侦听 `state` 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 `subscriptions` 在 `patch` 后只触发一次 (例如，当使用上面的函数版本时)。

```javascript
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

默认情况下，`state subscription` 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 `state subscription` 从当前组件中分离：

```vue
<script setup>
  const someStore = useSomeStore()
  // 此订阅器即便在组件卸载之后仍会被保留
  someStore.$subscribe(callback, { detached: true })
</script>
```
:::tip 提示

你可以在 pinia 实例上使用 `watch()` 函数侦听整个 `state`。

```javascript
watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

#### Getter
Getter 完全等同于 store 的 `state` 的计算值。

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

大多数时候，`getter` 仅依赖 `state`。不过，有时它们也可能会使用其他 `getter`。因此，即使在使用常规函数定义 `getter` 时，我们也可以通过 `this` 访问到整个 store 实例，但(在 TypeScript 中)必须定义返回类型。这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 `getter`，也不会影响不使用 `this` 的 `getter`。

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

然后你可以直接访问 store 实例上的 getter 了：

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

与计算属性一样，你也可以组合多个 getter。通过 this，你可以访问到其他任何 getter。在这种情况下，你需要为这个 getter 指定一个返回值的类型。


1. 访问其他 getter

::: code-group

```typescript [counterStore.ts]
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
```

```javascript [counterStore.js]
// 你可以在 JavaScript 中使用 JSDoc (https://jsdoc.app/tags-returns.html)
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 类型是自动推断出来的，因为我们没有使用 `this`
    doubleCount: (state) => state.count * 2,
    // 这里我们需要自己添加类型(在 JS 中使用 JSDoc)
    // 可以用 this 来引用 getter
    /**
     * 返回 count 的值乘以 2 加 1
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // 自动补全 ✨
      return this.doubleCount + 1
    },
  },
})
```
:::

2. 访问其他 store 的 getter
想要使用另一个 store 的 getter 的话，那就直接在 getter 内使用就好：

```javascript
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```


3. 向 getter 传递参数
Getter 只是幕后的计算属性，所以不可以向它们传递任何参数。不过，你可以从 `getter` 返回一个函数，该函数可以接受任意参数：

```javascript
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```
并在组件中使用：

```vue
<script setup>
  import { useUserListStore } from './store'
  const userList = useUserListStore()
  const { getUserById } = storeToRefs(userList)
  // 请注意，你需要使用 `getUserById.value` 来访问
  // <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```
请注意，当你这样做时，`getter` 将不再被缓存。它们只是一个被你调用的函数。不过，你可以在 `getter` 本身中缓存一些结果，虽然这种做法并不常见，但有证明表明它的性能会更好：

```javascript
export const useUserListStore = defineStore('userList', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```


#### Action
Action 相当于组件中的 `method`。它们可以通过 `defineStore()` 中的 `actions` 属性来定义，并且它们也是定义业务逻辑的完美选择。

```javascript
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```
类似 `getter`，`action` 也可通过 `this` 访问整个 store 实例，并支持完整的类型标注(以及自动补全✨)。不同的是，`action` 可以是异步的，你可以在它们里面 `await` 调用任何 API，以及其他 `action`！

```javascript
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})
```

你也完全可以自由地设置任何你想要的参数以及返回任何结果。当调用 action 时，一切类型也都是可以被自动推断出来的。

Action 可以像函数或者通常意义上的方法一样被调用：

```vue
<script setup>
  const store = useCounterStore()
  // 将 action 作为 store 的方法进行调用
  store.randomizeCounter()
</script>
<template>
  <!-- 即使在模板中也可以 -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
```

1. 访问其他 store 的 action
想要使用另一个 store 的话，那你直接在 action 中调用就好了：

```javascript
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

#### 插件
1. 安装 `pinia-plugin-persistedstate`
::: code-group
```bash [npm]
npm install pinia-plugin-persistedstate --save
```

```bash [pnpm]
pnpm add pinia-plugin-persistedstate
```

```bash [yarn]
yarn add pinia-plugin-persistedstate
```
:::


2. 引入插件
```javascript
// src/stores/index.js
import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 使用插件
useMainStore.use(createPersistedState());

export { useMainStore };
```

3. 配置插件
```javascript
// src/stores/index.js
import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 使用插件并配置
useMainStore.use(createPersistedState({
  storage: sessionStorage, // 使用 sessionStorage
  key: 'your-storage-key', // 自定义存储的 key
  paths: ['count'], // 指定需要持久化的状态
}));

export { useMainStore };
```

## Vue Router

### 安装
::: code-group
```bash [npm]
npm install vue-router@4 --save
```

```bash [pnpm]  
pnpm add vue-router@4
```

```bash [yarn]
yarn add vue-router@4
```
:::

1. 创建路由器实例
  路由器实例是通过调用 `createRouter()` 函数创建的:

  ```javascript
  import { createMemoryHistory, createRouter } from 'vue-router'

  import HomeView from './HomeView.vue'
  import AboutView from './AboutView.vue'

  const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
  ]

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  ```

这里的 `history` 选项控制了路由和 URL 路径是如何双向映射的。在演练场的示例里，我们使用了 `createMemoryHistory()`，它会完全忽略浏览器的 URL 而使用其自己内部的 URL。但是未必是你想要在实际应用中使用的。通常，你应该使用 `createWebHistory()` 或 `createWebHashHistory()`。我们将在[不同的历史记录模式](#不同的历史记录模式)的部分详细介绍这个主题。

2. 注册路由器插件
  ```javascript [main.js]
    createApp(App)
    .use(router)
    .mount('#app')
  ```
  或等价地：

  ```js
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
  ```

### 动态路由匹配
  
  - 带参数的动态路由匹配
    ```javascript
      import User from './User.vue'

      // 这些都会传递给 `createRouter`
      const routes = [
        // 动态字段以冒号开始
        { path: '/users/:id', component: User },
      ]
    ```
    *路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 `params` 的值将在每个组件中以 `route.params` 的形式暴露出来。

    ```vue
      <template>
        <div>
          <!-- 当前路由可以通过 $route 在模板中访问 -->
          User {{ $route.params.id }}
        </div>
      </template>
    ```
    你可以在同一个路由中设置有多个 路径参数，它们会映射到 `$route.params` 上的相应字段。例如：

    | 匹配模式	                      |  匹配路径	                |   `route.params`                  |  
    | ------------------------------ | :-----------------------: | :-----------------------------: |
    | `/users/:username`	            | `/users/eduardo`	         |  `{ username: 'eduardo' }`        |
    | `/users/:username/posts/:postId` | `/users/eduardo/posts/123`  | `{ username: 'eduardo', postId: '123' }`|
        
    除了 `route.params` 之外，`route` 对象还公开了其他有用的信息，如 `route.query`（如果 URL 中存在参数）、`route.hash` 等。你可以在[ `API` 参考](https://router.vuejs.org/zh/api/#Functions-useRoute)中查看完整的细节。

  - 响应路由参数的变化
    使用带有参数的路由时需要注意的是，当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。

    要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性，在这个场景中，就是 `$route.params` ：

    ::: code-group
      ```vue [组合式 API]
        <script setup>
          import { watch } from 'vue'
          import { useRoute } from 'vue-router'

          const route = useRoute()

          watch(() => route.params.id, (newId, oldId) => {
            // 对路由变化做出响应...
          })
        </script>
      ```

      ```vue [选项式 API]
        <script>
          export default {
            created() {
              this.$watch(
                () => this.$route.params.id,
                (newId, oldId) => {
                  // 对路由变化做出响应...
                }
              )
            },
          }
        </script>
      ```
    :::

    或者，使用 `beforeRouteUpdate` 导航守卫，它还允许你取消导航：

    ::: code-group
      ```vue [组合式 API]
        <script setup>
          import { onBeforeRouteUpdate } from 'vue-router'
          // ...

          onBeforeRouteUpdate(async (to, from) => {
            // 对路由变化做出响应...
            userData.value = await fetchUser(to.params.id)
          })
        </script>
      ```

      ```vue [选项式 API]
        <script>
          export default {
            async beforeRouteUpdate(to, from) {
              // 对路由变化做出响应...
              this.userData = await fetchUser(to.params.id)
            },
            // ...
          }
        </script>
      ```
    ::: 

  - 捕获所有路由或 `404 Not found` 路由
    常规参数只匹配 url 片段之间的字符，用 `/` 分隔。如果我们想匹配任意路径，我们可以使用自定义的 *路径参数* 正则表达式，在 *路径参数* 后面的括号中加入 正则表达式 :

    ```javascript
      const routes = [
        // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
        // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
        { path: '/user-:afterUser(.*)', component: UserGeneric },
      ]
    ```

    在这个特定的场景中，我们在括号之间使用了[自定义正则表达式](#在参数中自定义正则))，并将 `pathMatch` 参数标记为[可选可重复](#可重复的参数)。这样做是为了让我们在需要的时候，可以通过将 `path` 拆分成一个数组，直接导航到路由：

    ```javascript
      router.push({
        name: 'NotFound',
        // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
        params: { pathMatch: this.$route.path.substring(1).split('/') },
        // 保留现有的查询和 hash 值，如果有的话
        query: route.query,
        hash: route.hash,
      })
    ```

### 高级匹配模式
#### 在参数中自定义正则
  当定义像 `:userId` 这样的参数时，我们内部使用以下的正则 `([^/]+)` (至少一个不是斜杠 `/` 的字符)来从 URL 中提取参数。这很好用，除非你需要根据参数的内容来区分两个路由。想象一下，两个路由 `/:orderId` 和 `/:productName`，两者会匹配完全相同的 URL，所以我们需要一种方法来区分它们。最简单的方法就是在路径中添加一个静态部分来区分它们：

  ```javascript
    const routes = [
      // 匹配 /o/3549
      { path: '/o/:orderId' },
      // 匹配 /p/books
      { path: '/p/:productName' },
    ]
  ```

  但在某些情况下，我们并不想添加静态的 `/o` `/p` 部分。由于，`orderId` 总是一个数字，而 `productName` 可以是任何东西，所以我们可以在括号中为参数指定一个自定义的正则：

  ```javascript
    const routes = [
      // /:orderId -> 仅匹配数字
      { path: '/:orderId(\\d+)' },
      // /:productName -> 匹配其他任何内容
      { path: '/:productName' },
    ]
  ```

#### 可重复的参数
  如果你需要匹配具有多个部分的路由，如 `/first/second/third`，你应该用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复：

  ```javascript
    const routes = [
      // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
      { path: '/:chapters+' },
      // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
      { path: '/:chapters*' },
    ]
  ```

  这将为你提供一个参数数组，而不是一个字符串，并且在使用命名路由时也需要你传递一个数组：

  ```javascript
    // 给定 { path: '/:chapters*', name: 'chapters' },
    router.resolve({ name: 'chapters', params: { chapters: [] } }).href
    // 产生 /
    router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
    // 产生 /a/b

    // 给定 { path: '/:chapters+', name: 'chapters' },
    router.resolve({ name: 'chapters', params: { chapters: [] } }).href
    // 抛出错误，因为 `chapters` 为空
  ```
  这些也可以通过在右括号后添加它们与自定义正则结合使用：

  ```javascript
    const routes = [
      // 仅匹配数字
      // 匹配 /1, /1/2, 等
      { path: '/:chapters(\\d+)+' },
      // 匹配 /, /1, /1/2, 等
      { path: '/:chapters(\\d+)*' },
    ]
  ```
#### Sensitive 与 strict 路由配置
默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 `/users` 将匹配 `/users`、`/users/`、甚至 `/Users/`。这种行为可以通过 `strict` 和 `sensitive` 选项来修改，它们既可以应用在整个全局路由上，又可以应用于当前路由上：

```javascript
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      // 当 strict: true  只匹配尾部没有斜线的路由
      // 当 sensitive: true （默认）都将匹配 
      { path: '/users', strict: true, component: () => import('../views/AaView.vue') },
      { path: '/users', component: () => import('../views/BbView.vue') }
    ],
    strict: true, // 适用于所有路由
  })
```

#### 可选参数
  你也可以通过使用 `?` 修饰符(0 个或 1 个)将一个参数标记为可选：

  ```javascript
    const routes = [
      // 匹配 /users 和 /users/posva
      { path: '/users/:userId?' },
      // 匹配 /users 和 /users/42
      { path: '/users/:userId(\\d+)?' },
    ]
  ```
  请注意，`*` 在技术上也标志着一个参数是可选的，但 `?` 参数不能重复。

### 嵌套路由
```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

当你访问 `/user/eduardo` 时，在 User 的 `router-view` 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径：

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },

      // ...其他子路由
    ],
  },
]
```

#### 嵌套的命名路由
在处理命名路由时，你通常会给子路由命名：

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 请注意，只有子路由具有名称
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```
这将确保导航到 `/user/:id` 时始终显示嵌套路由。

在一些场景中，你可能希望导航到命名路由而不导航到嵌套路由。例如，你想导航 `/user/:id` 而不显示嵌套路由。那样的话，你还可以命名父路由，但请注意重新加载页面将始终显示嵌套的子路由，因为它被视为指向路径 `/users/:id` 的导航，而不是命名路由：

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'user-parent',
    component: User,
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

#### 省略父组件
我们还可以利用 `routes` 之间的父子关系，而无需嵌套 `route` 组件。这对于将具有公共路径前缀的路由分组在一起，或者在使用更高级的功能（例如每个路由的导航守卫或路由元字段）时非常有用。

为了实现这一点，我们省略了父路由中的 `component` and `components` 选项：
```javascript
const routes = [
  {
    path: '/admin',
    children: [
      { path: '', component: AdminOverview },
      { path: 'users', component: AdminUserList },
      { path: 'users/:id', component: AdminUserDetails },
    ], 
  },
]
```

### 命名路由 
当创建一个路由时，我们可以选择给路由一个 name：

```javascript
  const routes = [
    {
      path: '/user/:username',
      name: 'profile', 
      component: User
    }
  ]
```

然后我们可以使用 `name` 而不是 `path` 来传递 `to` 属性给 `<router-link>`：

```vue
<template>
  <router-link :to="{ name: 'profile', params: { username: 'erina' } }">
    User profile
  </router-link>
</template>
```

使用 `name` 有很多优点：
  - 没有硬编码的 URL。
  - `params` 的自动编码/解码。
  - 防止你在 URL 中出现打字错误。
  - 绕过路径排序，例如展示一个匹配相同路径但排序较低的路由。

### 编程式导航

#### 导航到不同的位置
在组件内部，你可以使用 `$router` 属性访问路由，例如 `this.$router.push(...)`。如果使用组合式 API，你可以通过调用 `useRouter()` 来访问路由器。

当你点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用 `router.push(...)` ：

| 声明式 | 编程式 |
| ---- | ---- |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```javascript
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path` ：

```javascript
  const username = 'eduardo'
  // 我们可以手动建立 url，但我们必须自己处理编码
  router.push(`/user/${username}`) // -> /user/eduardo
  // 同样
  router.push({ path: `/user/${username}` }) // -> /user/eduardo
  // 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
  router.push({ name: 'user', params: { username } }) // -> /user/eduardo
  // `params` 不能与 `path` 一起使用
  router.push({ path: '/user', params: { username } }) // -> /user
```

当指定 `params` 时，可提供 `string` 或 `number` 参数（或者对于可重复的参数可提供一个数组）。任何其他类型（如对象、布尔等）都将被自动字符串化。对于可选参数，你可以提供一个空字符串`（""）`或 `null` 来移除它。

#### 替换当前位置
它的作用类似于 `router.push`，唯一不同的是，它在导航时不会向 `history` 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

|声明式 |	编程式 |
| ---- | ---- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

也可以直接在传递给 `router.push` 的 `to` 参数中增加一个属性 `replace: true` ：

```javascript
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

#### 横跨历史
该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 `window.history.go(n)`。

```javascript
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

### 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```vue
<template>
  <router-view class="view left-sidebar" name="LeftSidebar" />
  <router-view class="view main-content" />
  <router-view class="view right-sidebar" name="RightSidebar" />
</template>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```javascript
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        components: {
          default: Home,
          // LeftSidebar: LeftSidebar 的缩写
          LeftSidebar,
          // 它们与 `<router-view>` 上的 `name` 属性匹配
          RightSidebar,
        },
      },
    ],
  })
```

#### 嵌套命名视图

![嵌套命名视图](/嵌套命名视图.png)

  - Nav 只是一个常规组件。
  - UserSettings 是一个视图组件。
  - UserEmailsSubscriptions、UserProfile、UserProfilePreview 是嵌套的视图组件。

`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码:

```html
  <!-- UserSettings.vue -->
  <div>
    <h1>User Settings</h1>
    <NavBar />
    <router-view />
    <router-view name="helper" />
  </div>
```

那么你就可以通过这个路由配置来实现上面的布局：

```javascript
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [
    {
      path: 'emails',
      component: UserEmailsSubscriptions
    }, {
      path: 'profile',
      components: {
        default: UserProfile,
        helper: UserProfilePreview
      }
    }
  ]
}
```

### 重定向和别名

#### 重定向
重定向也是通过 `routes` 配置来完成，下面例子是从 `/home` 重定向到 `/`：

```javascript
  const routes = [{ path: '/home', redirect: '/' }]
```

重定向的目标也可以是一个命名的路由：

```javascript
  const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

甚至是一个方法，动态返回重定向目标：

```javascript
  const routes = [
    {
      // /search/screens -> /search?q=screens
      path: '/search/:searchText',
      redirect: to => {
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象
        return { path: '/search', query: { q: to.params.searchText } }
      },
    },
    {
      path: '/search',
      // ...
    },
  ]
```

请注意，导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在上面的例子中，在 `/home` 路由中添加 `beforeEnter` 守卫不会有任何效果。

在写 `redirect` 的时候，可以省略 `component` 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是嵌套路由：如果一个路由记录有 `children` 和 `redirect` 属性，它也应该有 `component` 属性。

##### 相对重定向
也可以重定向到相对位置：

```javascript
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return 'profile'
    },
  },
]
```

#### 别名

重定向是指当用户访问 `/home` 时，URL 会被 `/` 替换，然后匹配成 `/`。

将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

上面对应的路由配置为：

```javascript
  const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。使别名以 / 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

```javascript
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

如果你的路由有参数，请确保在任何绝对别名中包含它们：

```javascript
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

### 路由组件传参
通过声明 `prop` 来在组件中删除对 `$route` 的直接依赖：

::: code-group
```vue [组合式 API]
<script setup>
defineProps({
  id: String
})
</script>

<template>
  <div>
    User {{ id }}
  </div>
</template>
```

```vue [选项式 API]
<script>
export default {
  props: {
    id: String
  }
}
</script>

<template>
  <div>
    User {{ id }}
  </div>
</template>
```
:::

然后我们可以通过设置 `props: true` 来配置路由将 `id` 参数作为 `prop` 传递给组件：

```javascript
const routes = [
  { path: '/user/:id', component: User, props: true }
]
```

#### 命名视图
对于有命名视图的路由，你必须为每个命名视图定义 `props` 配置：

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

#### 对象模式
当 `props` 是一个对象时，它将原样设置为组件 `props`。当 `props` 是静态的时候很有用。

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

#### 函数模式
你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

```javascript
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

URL `/search?q=vue` 将传递 `{query: 'vue'}` 作为 `props` 传给 `SearchUser` 组件。

### 不同的历史记录模式

#### Hash 模式
`hash` 模式是用 `createWebHashHistory()` 创建的：

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

它在内部传递的实际 URL 之前使用了一个哈希字符`（#）`。 由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。 不过，它在 SEO 中确实有不好的影响。 如果你担心这个问题，可以使用 HTML5 模式。

#### Memory 模式
`Memory` 模式不会假定自己处于浏览器环境，因此不会与 URL 交互也不会自动触发初始导航。 这使得它非常适合 Node 环境和 SSR。 它是用 `createMemoryHistory()` 创建的，并且需要你在调用 `app.use(router)` 之后手动 `push` 到初始导航。

```javascript
import { createRouter, createMemoryHistory } from 'vue-router'
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
})
```

虽然不推荐，你仍可以在浏览器应用程序中使用此模式，但请注意它不会有历史记录，这意味着你无法后退或前进。

#### HTML5 模式
用 `createWebHistory()` 创建 HTML5 模式，推荐使用这个模式：

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

当使用这种历史模式时，URL 会看起来很 "正常"，例如 `https://example.com/user/id`。 漂亮!

不过，问题来了。 由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，就会得到一个 404 错误。 这就尴尬了。

不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。 如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 `index.html` 相同的页面。 漂亮依旧!


### 导航守卫

#### 全局前置守卫
  你可以使用 `router.beforeEach` 注册一个全局前置守卫：

  ```js
    const router = createRouter({ ... })

    router.beforeEach((to, from) => {
      // ...
      // 返回 false 以取消导航
      return false
    })
  ```

  当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 `resolve` 完之前一直处于等待中。

  每个守卫方法接收两个参数：
  - `to`: 即将要进入的目标 用一种标准化的方式
  - `from`: 当前导航正要离开的路由 用一种标准化的方式

  可以返回的值如下:

  - `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - 一个路由地址: 通过一个路由地址重定向到一个不同的地址，如同调用 `router.push()`，且可以传入诸如 `replace: true` 或 `name: 'home'` 之类的选项。它会中断当前的导航，同时用相同的 `from` 创建一个新导航。
  
  ```js
  router.beforeEach(async (to, from) => {
    if (
      // 检查用户是否已登录
      !isAuthenticated &&
      // ❗️ 避免无限重定向
      to.name !== 'Login'
    ) {
      // 将用户重定向到登录页面
      return { name: 'Login' }
    }
  })
  ```

  如果遇到了意料之外的情况，可能会抛出一个 `Error`。这会取消导航并且调用 `router.onError()` 注册过的回调。

  如果什么都没有，`undefined` 或返回 `true`，则导航是有效的，并调用下一个导航守卫

  以上所有都同 `async` 函数 和 `Promise` 工作方式一样：

  ```js
  router.beforeEach(async (to, from) => {
    // canUserAccess() 返回 `true` 或 `false`
    const canAccess = await canUserAccess(to)
    if (!canAccess) return '/login'
  })
  ```

  可选的第三个参数 `next`
  在之前的 `Vue Router` 版本中，还可以使用 第三个参数 `next` 。这是一个常见的错误来源，我们经过 RFC 讨论将其移除。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，确保 `next` 在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。这里有一个在用户未能验证身份时重定向到/login的错误用例：

  ```js
  // BAD
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // 如果用户未能验证身份，则 `next` 会被调用两次
    next()
  })
  ```
  下面是正确的版本:

  ```js
  // GOOD
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  })
  ```

#### 全局解析守卫
  你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，因为它在每次导航时都会触发，不同的是，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。这里有一个例子，根据路由在元信息中的 `requiresCamera` 属性确保用户访问摄像头的权限：

  ```js
  router.beforeResolve(async to => {
    if (to.meta.requiresCamera) {
      try {
        await askForCameraPermission()
      } catch (error) {
        if (error instanceof NotAllowedError) {
          // ... 处理错误，然后取消导航
          return false
        } else {
          // 意料之外的错误，取消导航并把错误传给全局处理器
          throw error
        }
      }
    }
  })
  ```

  `router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

#### 全局后置钩子
  你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

  ```js
  router.afterEach((to, from) => {
    sendToAnalytics(to.fullPath)
  })
  ```

  它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

  它们也反映了 `navigation failures` 作为第三个参数：

  ```js
  router.afterEach((to, from, failure) => {
    if (!failure) sendToAnalytics(to.fullPath)
  })
  ```
  了解更多关于 navigation failures 的信息在它的指南中。

#### 路由独享的守卫
  你可以直接在路由配置上定义 beforeEnter 守卫：

  ```js
  const routes = [
    {
      path: '/users/:id',
      component: UserDetails,
      beforeEnter: (to, from) => {
        // reject the navigation
        return false
      },
    },
  ]
  ```
  
  `beforeEnter` 守卫 只在进入路由时触发，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在 从一个不同的 路由导航时，才会被触发。

  你也可以将一个函数数组传递给 `beforeEnter`，这在为不同的路由重用守卫时很有用：

  ```js
  function removeQueryParams(to) {
    if (Object.keys(to.query).length)
      return { path: to.path, query: {}, hash: to.hash }
  }

  function removeHash(to) {
    if (to.hash) return { path: to.path, query: to.query, hash: '' }
  }

  const routes = [
    {
      path: '/users/:id',
      component: UserDetails,
      beforeEnter: [removeQueryParams, removeHash],
    },
    {
      path: '/about',
      component: UserDetails,
      beforeEnter: [removeQueryParams],
    },
  ]
  ```

  当配合嵌套路由使用时，父路由和子路由都可以使用 `beforeEnter`。如果放在父级路由上，路由在具有相同父级的子路由之间移动时，它不会被触发。例如：

  ```js
  const routes = [
    {
      path: '/user',
      beforeEnter() {
        // ...
      },
      children: [
        { path: 'list', component: UserList },
        { path: 'details', component: UserDetails },
      ],
    },
  ]
  ```
  
  示例中的 `beforeEnter` 在 `/user/list` 和 `/user/details` 之间移动时不会被调用，因为它们共享相同的父级路由。如果我们直接将 `beforeEnter` 守卫放在 `details` 路由上，那么在这两个路由之间移动时就会被调用。

#### 组件内的守卫
最后，你可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

##### 可用的配置 API
 你可以为路由组件添加以下配置：

  - `beforeRouteEnter`
  - `beforeRouteUpdate`
  - `beforeRouteLeave`

  ```vue
  <script>
    export default {
      beforeRouteEnter(to, from) {
        // 在渲染该组件的对应路由被验证前调用
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
      },
      beforeRouteUpdate(to, from) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
        // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
      },
      beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
        // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
      },
    }
  </script>
  ```

`beforeRouteEnter` 守卫 不能 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

  ```js
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  }
  ```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以不支持 传递回调，因为没有必要了：

  ```js
    beforeRouteUpdate (to, from) {
      // just use `this`
      this.name = to.params.name
    }
  ```
这个 **离开守卫** 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 `false` 来取消。

  ```js
    beforeRouteLeave (to, from) {
      const answer = window.confirm('你真的想离开吗？您有未保存的更改!')
      if (!answer) return false
    }
  ```

##### 使用组合 API
如果你正在使用组合式 API 编写组件，你可以通过 `onBeforeRouteUpdate` 和 `onBeforeRouteLeave` 分别添加 `update` 和 `leave` 守卫。 请参考组合式 API 部分以获得更多细节。

#### 完整的导航解析流程
  - 🕛导航被触发。
  - 🕧在失活的组件里调用 `beforeRouteLeave` 守卫。
  - 🕐调用全局的 `beforeEach` 守卫。
  - 🕜在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
  - 🕑在路由配置里调用 `beforeEnter`。
  - 🕝解析异步路由组件。
  - 🕒在被激活的组件里调用 `beforeRouteEnter`。
  - 🕞调用全局的 `beforeResolve` 守卫(2.5+)。
  - 🕓导航被确认。
  - 🕟调用全局的 `afterEach` 钩子。
  - 🕔触发 DOM 更新。
  - 🕠调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。


### 路由元信息
有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的 `meta` 属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 `meta` 字段：

```js
  const routes = [
    {
      path: '/posts',
      component: PostsLayout,
      children: [
        {
          path: 'new',
          component: PostsNew,
          // 只有经过身份验证的用户才能创建帖子
          meta: { requiresAuth: true },
        },
        {
          path: ':id',
          component: PostsDetail
          // 任何人都可以阅读文章
          meta: { requiresAuth: false },
        }
      ]
    }
  ]
```
#### 访问这个 `meta` 字段

首先，我们称呼 `routes` 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。

例如，根据上面的路由配置，`/posts/new` 这个 URL 将会匹配父路由记录 (path: '/posts') 以及子路由记录 (path: 'new')。

一个路由匹配到的所有路由记录会暴露为 `route` 对象(还有在导航守卫中的路由对象)的 `route.matched` 数组。我们需要遍历这个数组来检查路由记录中的 `meta` 字段，但是 Vue Router 还为你提供了一个 `route.meta` 方法，它是一个非递归合并所有 `meta` 字段（从父字段到子字段）的方法。这意味着你可以简单地写

  ```js
  router.beforeEach((to, from) => {
    // 而不是去检查每条路由记录
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
      // 此路由需要授权，请检查是否已登录
      // 如果没有，则重定向到登录页面
      return {
        path: '/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: to.fullPath },
      }
    }
  })
  ```

#### TypeScript
也可以继承来自 `vue-router` 中的 `RouteMeta` 来为 `meta` 字段添加类型：

```typescript
// 这段可以直接添加到你的任何 `.ts` 文件中，例如 `router.ts`
// 也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在
// 项目的 `tsconfig.json` 中的 "file" 字段内。
import 'vue-router'

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {}

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    requiresAuth: boolean
  }
}

```

### 数据获取

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

- 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
- 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

#### 导航完成后获取数据
当你使用这种方式时，我们会马上导航和渲染组件，然后在组件中获取数据。这让我们有机会在数据获取期间展示一个 `loading` 状态，还可以在不同视图间展示不同的 `loading` 状态。

假设我们有一个 Post 组件，需要基于 `route.params.id` 获取文章数据：


::: code-group

```vue 组合式 API
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from './api.js'

const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)

// 侦听路由的参数，以便再次获取数据
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = post.value = null
  loading.value = true
  
  try {
    // 用获取数据的工具函数 / API 包裹器替换 `getPost`
    post.value = await getPost(id)  
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
```

```vue 选项式 API
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { getPost } from './api.js'

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // 侦听路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      // 组件创建完后获取数据，
      // 此时 data 已经被监听了
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {
      this.error = this.post = null
      this.loading = true

      try {
        // 用获取数据的工具函数 / API 包裹器替换 `getPost`
        this.post = await getPost(id)
      } catch (err) {
        this.error = err.toString()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
```
:::

#### 在导航完成前获取数据
通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 `beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法：

```js
export default {
  data() {
    return {
      post: null,
      error: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    try {
      const post = await getPost(to.params.id)
      // `setPost` 方法定义在下面的代码中
      next(vm => vm.setPost(post))
    } catch (err) {
      // `setError` 方法定义在下面的代码中
      next(vm => vm.setError(err))
    }
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  async beforeRouteUpdate(to, from) {
    this.post = null
    getPost(to.params.id).then(this.setPost).catch(this.setError)
  },
  methods: {
    setPost(post) {
      this.post = post
    },
    setError(err) {
      this.error = err.toString()
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。

### 在 setup 中访问路由和当前路由
在 `setup` 里面没有访问 `this`，所以我们不能直接访问 `this.$router` 或 `this.$route`。作为替代，我们使用 `useRouter` 和 `useRoute` 函数：

```vue
  <script setup>
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  function pushWithQuery(query) {
    router.push({
      name: 'search',
      query: {
        ...route.query,
        ...query,
      },
    })
  }
  </script>
```

`route` 对象是一个响应式对象。在多数情况下，你应该**避免监听整个** `route` 对象，同时直接监听你期望改变的参数。

```vue
<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const userData = ref()

// 当参数更改时获取用户信息
watch(
  () => route.params.id,
  async newId => {
    userData.value = await fetchUser(newId)
  }
)
</script>
```
请注意，在模板中我们仍然可以访问 `$router` 和 `$route`，所以如果你只在模板中使用这些对象的话，是不需要 `useRouter` 或 `useRoute` 的。

### 路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：

```js
// 将

// import UserDetails from './views/UserDetails.vue'

// 替换成
const UserDetails = () => import('./views/UserDetails.vue')


const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails }
    // 或在路由定义里直接使用它
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})
```

`component (和 components)` 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  })
```

一般来说，对所有的路由**都使用动态导入**是个好主意。

:::warning 注意
不要在路由中使用异步组件。异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的。
:::

如果你使用的是 webpack 之类的打包器，它将自动从 [代码分割](https://webpack.js.org/guides/code-splitting/) 中受益。

如果你使用的是 Babel，你将需要添加 [`syntax-dynamic-import`](https://babeljs.io/docs/babel-plugin-syntax-dynamic-import/) 插件，才能使 Babel 正确地解析语法。

#### 把组件按组分块
- 使用 `webpack`
  有时候我们想把某个路由下的所有组件都打包在同个异步块 `(chunk)` 中。只需要使用命名 `chunk`，一个特殊的注释语法来提供 chunk name (需要 **Webpack > 2.4**)：

  ```js
    const UserDetails = () =>
      import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
    const UserDashboard = () =>
      import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
    const UserProfileEdit = () =>
      import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
  ```
  `webpack` 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

- 使用 `Vite`
  在Vite中，你可以在rollupOptions下定义分块：

  ```js
    // vite.config.js
    export default defineConfig({
      build: {
        rollupOptions: {
          // https://rollupjs.org/guide/en/#outputmanualchunks
          output: {
            manualChunks: {
              'group-user': [
                './src/UserDetails',
                './src/UserDashboard',
                './src/UserProfileEdit',
              ],
            },
          },
        },
      },
    })
  ```

### 动态路由

  对路由的添加通常是通过 `routes` 选项来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由。具有可扩展接口(如 Vue CLI UI )这样的应用程序可以使用它来扩展应用程序。

#### 添加路由
  动态路由主要通过两个函数实现。`router.addRoute()` 和 `router.removeRoute()`。它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 `router.push()` 或 `router.replace()` 来手动导航，才能显示该新路由。我们来看一个例子：

  想象一下，只有一个路由的以下路由：

  ```js
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/:articleName', component: Article }],
    })
  ```

  进入任何页面，`/about`，`/store`，或者 `/3-tricks-to-improve-your-routing-code` 最终都会呈现 `Article` 组件。如果我们在 `/about` 上添加一个新的路由：

  ```js
    router.addRoute({ path: '/about', component: About })
  ```
  
  页面仍然会显示 `Article` 组件，我们需要手动调用 `router.replace()` 来改变当前的位置，并覆盖我们原来的位置（而不是添加一个新的路由，最后在我们的历史中两次出现在同一个位置）：

  ```js
    router.addRoute({ path: '/about', component: About })
    // 我们也可以使用 this.$route 或 useRoute()
    router.replace(router.currentRoute.value.fullPath)
  ```

  记住，如果你需要等待新的路由显示，可以使用 `await router.replace()`。

#### 在导航守卫中添加路由
  如果你决定在导航守卫内部添加或删除路由，你不应该调用 router.replace()，而是通过返回新的位置来触发重定向：

  ```js
    router.beforeEach(to => {
      if (!hasNecessaryRoute(to)) {
        router.addRoute(generateRoute(to))
        // 触发重定向
        return to.fullPath
      }
    })
  ```

  上面的例子有两个假设：

  - 第一，新添加的路由记录将与 `to` 位置相匹配，实际上导致与我们试图访问的位置不同。
  - 第二，`hasNecessaryRoute()` 在添加新的路由后返回 `false`，以避免无限重定向。

  因为是在重定向中，所以我们是在替换将要跳转的导航，实际上行为就像之前的例子一样。而在实际场景中，添加路由的行为更有可能发生在导航守卫之外，例如，当一个视图组件挂载时，它会注册新的路由。

#### 删除路由
  有几个不同的方法来删除现有的路由：

  - 通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：

    ```js
      router.addRoute({ path: '/about', name: 'about', component: About })
      // 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
      router.addRoute({ path: '/other', name: 'about', component: Other })
    ```

  - 通过调用 router.addRoute() 返回的回调：

    ```js
      const removeRoute = router.addRoute(routeRecord)
      removeRoute() // 删除路由如果存在的话
    ```
    当路由没有名称时，这很有用。

  - 通过使用 `router.removeRoute()` 按名称删除路由：

    ```js
      router.addRoute({ path: '/about', name: 'about', component: About })
      // 删除路由
      router.removeRoute('about')
    ```
    需要注意的是，如果你想使用这个功能，但又想避免名字的冲突，可以在路由中使用 `Symbol` 作为名字。
    当路由被删除时，所有的别名和子路由也会被同时删除

#### 添加嵌套路由
  要将嵌套路由添加到现有的路由中，可以将路由的 `name` 作为第一个参数传递给 `router.addRoute()`，这将有效地添加路由，就像通过 `children` 添加的一样：

  ```js
    router.addRoute({ name: 'admin', path: '/admin', component: Admin })
    router.addRoute('admin', { path: 'settings', component: AdminSettings })
  ```
  
  这等效于：

  ```js
    router.addRoute({
      name: 'admin',
      path: '/admin',
      component: Admin,
      children: [{ path: 'settings', component: AdminSettings }],
    })
  ```

#### 查看现有路由
  Vue Router 提供了两个功能来查看现有的路由：

  - `router.hasRoute()`：检查路由是否存在。
  - `router.getRoutes()`：获取一个包含所有路由记录的数组。
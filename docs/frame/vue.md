---
title: html
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /logo.svg
---

# Vue2

## 安装

1. CDN 引入

```javascript
// vue2
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
```

2. npm 安装

::: code-group
```bash [npm]
npm install vue@^2
```

```bash [yarn]
yarn add vue@^2
```

```bash [pnpm]
pnpm add vue@^2
```
:::


3. 命令行工具
> Vue 提供了一个官方的 CLI，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI](https://cli.vuejs.org) 的文档。

::: code-group
```bash [npm]
npm install -g @vue/cli
```

```bash [yarn]
yarn global add @vue/cli
```
:::

4. 创建项目

```bash 
vue create my-project
#or
vue ui
```

5. 进入项目，安装并运行：

```bash 
cd my-project
npm install
npm run dev
```

## 介绍
> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

## 基础语法

### 模板语法
> Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。<br>
> Vue.js 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。<br>
> 结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

1. 插值

  - 文本
    数据绑定最常见的形式就是使用 `{ { } }` 插值表达式：

    - 语法：`{ {  } }`
    - 示例：
      ```html
      <div id="app">
        <p>{{ message }}</p>
      </div>
      ```
  
  - Html
    对于一些复杂的 HTML 内容，我们可以使用 `v-html` 指令进行绑定：

    - 语法：`v-html=""`
    - 示例：
      ```html
      <div id="app">
        <div v-html="message"></div>
      </div>
          
      <script>
      new Vue({
        el: '#app',
        data: {
          message: '<h1>菜鸟教程</h1>'
        }
      })
      </script>
      ```

2. 属性

  - 绑定属性
    我们可以使用 `v-bind` 指令来动态地绑定元素的属性：

    - 语法：`v-bind:属性名=""`
    - 示例：
      ```html
      <div id="app">
        <a v-bind:href="url">跳转</a>
      </div>
          
      <script>
      new Vue({
        el: '#app',
        data: {
          url: 'https://codecompass.cn'
        }
      })
      </script>
      ```

3. 指令 & 参数 & 修饰符

  - 指令：
    > 指令是带有 `v-` 前缀的特殊属性。<br>
    > 指令用于在表达式的值改变时，将某些行为应用到 DOM 上。

    ::: details 指令有哪些？
    - `v-text`: 更新元素的textContent。
    - `v-html`: 更新元素的innerHTML。
    - `v-show`: 根据表达式的值，切换元素的显示状态。
    - `v-if`: 根据表达式的值，切换元素的显示状态。
    - `v-else`: 配合 `v-if` 一起使用，表示当前元素的兄弟元素，当 `v-if` 表达式的值为 false 时显示。
    - `v-else-if`: 配合 `v-if` 一起使用，表示当前元素的兄弟元素，当 `v-if` 表达式的值为 false 时显示。
    - `v-for`: 遍历数组或对象，绑定元素或模板块。
    - `v-on`: 绑定事件监听器。
    - `v-bind`: 动态绑定元素的属性。
    - `v-model`: 绑定表单输入元素的双向数据绑定。
    - `v-pre`: 跳过当前元素和它的子元素的编译过程。
    - `v-cloak`: 隐藏未编译的元素，直到编译完成。
    - `v-once`: 只渲染元素和组件一次。
    - `v-slot`: 定义插槽。
    :::

  - 参数：
    > 参数在指令后以 `:` 指明。
    
    例如， v-bind 指令被用来响应地更新 HTML 属性：
    ```html
    <div id="app">
        <a v-bind:href="url">跳转</a>
      </div>
          
      <script>
      new Vue({
        el: '#app',
        data: {
          url: 'https://codecompass.cn'
        }
      })
      </script>
    ```

    例如， v-on 指令用来监听 DOM 事件：
    ```html
    <div id="app">
      <button v-on:click="handleClick">点击</button>
    </div>
          
    <script>
    new Vue({
      el: '#app',
      methods: {
        handleClick() {
          console.log('按钮被点击了')
        }
      }
    })
    </script>
    ```

  - 修饰符：
    > 修饰符是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 v-on 指令对于触发的事件调用 `event.preventDefault()`：
    
    ```html
    <form v-on:submit.prevent="onSubmit"></form>
    ```

    修饰符也可以串联：
    
    ```html
    <a v-on:click.stop.prevent="doSomething"></a>
    ```

    ::: details 修饰符有哪些？
    - `.stop`: 阻止事件冒泡。
    - `.prevent`: 阻止默认事件。
    - `.once`: 只触发一次回调。
    - `.enter`: 回车事件。
    :::

4. 过滤器
> 用作一些常见的文本格式化。由管道符 `|` 指示，过滤器可以用在插值 `{ { } }` 和 `v-bind` 表达式 (后者从 2.1.0+ 开始支持)。格式如下：

  - 语法：`{{ 表达式 | 过滤器 }}` 或 `v-bind:属性名="表达式 | 过滤器"`
  - 示例：
    ```html
    <div id="app">
      {{ message | capitalize }}
    </div>
        
    <script>
    new Vue({
      el: '#app',
      data: {
        message: 'runoob'
      },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      }
    })
    </script>
    ```

    过滤器可以串联：
    ```html
    {{ message | filterA | filterB }}
    ```

    过滤器是 JavaScript 函数，因此可以接受参数：
    ```html
    {{ message | filterA('arg1', arg2) }}
    ```
    这里，filterA 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。


5. 条件渲染与循环渲染

  - 条件渲染： Vue 提供了 `v-if`、`v-else-if`、`v-else` 和 `v-show` 指令来实现条件渲染。

  ```html
  <div id="app">
    <h1 v-if="true">你好！</h1>
    <h1 v-else>再见！</h1>

    <h1 v-show="true">{{ true ? '开' : '关' }}</h1>
  </div>
  
  ```

  - 循环渲染： Vue 提供了 `v-for` 指令来实现循环渲染。

    - 数组渲染：
    ```html
    <div id="app">
      <ul>
        <li v-for="(item, index) in items">
          {{ index }}： {{ item.text }}
        </li>
      </ul>
    </div>
    
    <script>
    new Vue({
      el: '#app',
      data: {
        items: [
          { text: '第一项' },
          { text: '第二项' },
          { text: '第三项' }
        ]
      },
    })
    </script>
    ```

    - 对象渲染：
    ```html
    <div id="app">
      <ul>
        <li v-for="(value, key, index) in object">
          {{ index }}. {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
    
    <script>
    new Vue({
      el: '#app',
      data: {
        object: {
          name: 'John',
          age: 30,
          city: 'New York'
        }
      },
    })
    </script>
    ```

    - 整数渲染：
    ```html
    <div id="app">
      <ul>
        <li v-for="n in 10">{{ n }}</li>
      </ul>
    </div>
    ```

6. 简写语法
  - `v-bind` 缩写: `:`
  ```html
  <!-- 完整语法 -->
  <a v-bind:href="url"></a>

  <!-- 缩写 -->
  <a :href="url"></a>
  ```

  - `v-on` 缩写: `@`
  ```html
  <!-- 完整语法 -->
  <a v-on:click="doSomething"></a>

  <!-- 缩写 -->
  <a @click="doSomething"></a>
  ```


### 计算属性与侦听器

1. 计算属性：`computed`

> 计算属性是基于数据进行处理的一种方式，它依赖于其他属性，并且它的返回值会根据依赖的属性变化而自动更新。

```html
<div id="app">
  <p>{{ fullName }}</p>
</div>


<script>
  new Vue({
    el: '#app',
    data: {
      firstName: 'John',
      lastName: 'Doe'
    },
    computed: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName
      }
    }
  })
</script>
```

**computed setter**
computed 属性默认只有 `getter` ，不过在需要时你也可以提供一个 `setter` 

```html
<div id="app">
  <input type="text" v-model="firstName">
  <input type="text" v-model="lastName">
  <p>{{ fullName }}</p>
</div>


<script>
  new Vue({
    el: '#app',
    data: {
      firstName: 'John',
      lastName: 'Doe'
    },
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },

        // setter
        set: function (value) {
          var names = value.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
  })
</script>
```

**computed vs methods**
> 我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的**响应式依赖进行缓存的**，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。


2. 侦听器：`watch`

> 虽然计算属性在大多数情况下更合适，但当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

```html
<div id="app">
  <input type="text" v-model="message">
  <p>{{ message }}</p>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      message: 'Hello'
    },
    watch: {
      message: function (newVal, oldVal) {
        console.log('new message: 'newVal)
      }
    }
  })
</script>
```
除了 watch 选项之外，您还可以使用命令式的 [vm.$watch API](https://v2.cn.vuejs.org/v2/api/#vm-watch)。


### 样式绑定

> `class` 与 `style` 是 HTML 元素的属性，用于设置元素的样式，我们可以用 `v-bind` 来设置样式属性。

- class 属性绑定

```html
<div v-bind:class="{ 'active': true }"></div>

<div class="static" v-bind:class="{ 'active' : true, 'text-danger' : true }"></div>

<div v-bind:class="['active', 'text-danger']"></div>

<div v-bind:class="['text-danger', true ? 'active' : '']"></div>
```

- style(内联样式)

```html
<div v-bind:style="{ color: 'red', fontSize: fontSize + 'px' }"></div>

<div v-bind:style="[{ color: 'red', fontSize: fontSize + 'px' }, { padding: '10px' }]">菜鸟教程</div>
```


### 组件
> 组件是 Vue.js 最强大的功能之一。组件系统提供了一种抽象机制，使得我们可以将界面中的可重用代码封装成一个个组件。组件可以组合、嵌套、扩展，使得应用的开发变得更加高效。<br>
> 组件是构成页面的最小单元，一个组件可以包含自己的 HTML、CSS、JavaScript、数据、方法等。<br>
> 在 Vue.js 中，一个 `.vue` 文件就是一个组件 

1. 全局注册

  > 全局注册的组件会自动地被注册为全局组件，可以在任何地方使用。

  ```javascript
  Vue.component('my-component-name', { /* ... */ })
  ```

  在应用入口文件 `main.js` 中自动化全局注册组件：

  ```javascript
  import Vue from 'vue'
  import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'

  const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /Base[A-Z]\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
  ```

2. 局部注册

  > 局部注册的组件只能在注册它的父组件的模板中使用。

  ```javascript
  new Vue({
    el: '#app',
    components: {
      'my-component-name': { /* ... */ }
    }
  })
  ```

  在模块系统中局部注册组件（假设有 `componentsA`）：
  
  ```javascript 
  import ComponentsA from './componentsA.vue'

  // 在模块B中的 components 选项注册组件
  export default {
    components: {
      ComponentsA
    }
  }
  ```

3. 动态组件 & 异步组件

  > 动态组件是指在运行时根据条件判断，动态地将组件切换为另一个组件。异步组件是指组件的定义和创建过程是异步的。

  - 动态组件：`keep-alive`

      - 属性：
        - `include` 字符串或正则表达式。只有名称匹配的组件会被缓存。
        - `exclude` 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
        - `max` 数字。最多可以缓存多少组件实例。

      - 用法：`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

        ```html
        <!-- 基本 -->
        <keep-alive>
          <component :is="view"></component>
        </keep-alive>

        <!-- 多个条件判断的子组件 -->
        <keep-alive>
          <comp-a v-if="a > 1"></comp-a>
          <comp-b v-else></comp-b>
        </keep-alive>

        <!-- 和 `<transition>` 一起使用 -->
        <transition>
          <keep-alive>
            <component :is="view"></component>
          </keep-alive>
        </transition>
        ```

        注意，`<keep-alive>` 是用在其一个直属的子组件被开关的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。

      - include and exclude
        > `include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：
        ```html
        <!-- 逗号分隔字符串 -->
        <keep-alive include="a,b">
          <component :is="view"></component>
        </keep-alive>

        <!-- 正则表达式 (使用 `v-bind`) -->
        <keep-alive :include="/a|b/">
          <component :is="view"></component>
        </keep-alive>

        <!-- 数组 (使用 `v-bind`) -->
        <keep-alive :include="['a', 'b']">
          <component :is="view"></component>
        </keep-alive>
        ```

        匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

      - max
        > 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。
        ```html
        <keep-alive :max="10">
          <component :is="view"></component>
        </keep-alive>
        ```
  
  - 异步组件：
    > 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。<br>
    > 为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。<br>
    > Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

    - 全局使用
      ```javascript
      Vue.component( 
        'async-webpack-example',
        // 这个动态导入会返回一个 `Promise` 对象。
        () => import('./my-async-component')
      )
      ```

    - 局部使用
      ```javascript
      export default {
        components: {
          'my-component1': () => import('./my-async-component1'),
          'my-component2': () => ({
            // 需要加载的组件 (应该是一个 `Promise` 对象)
            component: import('./my-async-component1'),
            // 异步组件加载时使用的组件
            loading: LoadingComponent,
            // 加载失败时使用的组件
            error: ErrorComponent,
            // 展示加载时组件的延时时间。默认值是 200 (毫秒)
            delay: 200,
            // 如果提供了超时时间且组件加载也超时了，
            // 则使用加载失败时使用的组件。默认值是：`Infinity`
            timeout: 3000
          })
        }
      }

### 生命周期（钩子函数）

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程。例如，需要设置数据观察、编译模板、创建数据绑定等。同时在这个过程中，也会运行一些叫做生命周期钩子的函数，这给我们提供了在不同阶段进行一些自定义操作的能力。

1. 生命周期函数

- `beforeCreate` 在实例初始化之后，数据观察和事件配置之前被调用，无法访问 `this`。

  ```javascript
  beforeCreate() {
    console.log('beforeCreate')
  }
  ```

- `created` 在实例创建完成后被调用，此时实例已经完成数据观察、属性和方法的绑定，但还没有开始编译模板。

  ```javascript
  created() {
    console.log('created')
  }
  ```
  **注意：** 此时实例的属性和方法是可用的，但未经过编译，`$el` 属性目前还不可用。

- `beforeMount` 在挂载开始之前被调用：相关的模板编译和渲染函数都还不存在。

  ```javascript
  beforeMount() {
    console.log('beforeMount')
  }
  ```

- `mounted` 在实例挂载之后被调用：此时实例已完成编译模板，`$el` 属性指向了真实的 DOM 元素。

  ```javascript
  mounted() {
    console.log('mounted')
  }
  ```

- `beforeUpdate` 在数据更新时调用，发生在虚拟 DOM 打补丁之前。

  ```javascript
  beforeUpdate() {
    console.log('beforeUpdate')
  }
  ```

- `updated` 在数据更新之后调用，发生在虚拟 DOM 打补丁之后。

  ```javascript
  updated() {
    console.log('updated')
  }
  ```

- `activated` 在 `keep-alive` 组件激活时调用。

  ```javascript
  activated() {
    console.log('activated')
  }
  ```

- `deactivated` 在 `keep-alive` 组件停用时调用。

  ```javascript
  deactivated() {
    console.log('deactivated')
  }
  ```

- `beforeDestroy` 在实例销毁之前调用。

  ```javascript
  beforeDestroy() {
    console.log('beforeDestroy')
  }
  ```

- `destroyed` 在实例销毁之后调用。

  ```javascript
  destroyed() {
    console.log('destroyed')
  }
  ```

2. 生命周期图示

![生命周期图示](/lifecycle.png)


### 组件通信

1. 父子组件通信

> 父组件通过 props 向子组件传递数据，子组件通过事件抛出数据。

::: code-group

```html [Parent.vue]
  <template>
    <div>
      <h1>父组件</h1>
      <child :msg="msg" @my-event="handleChildEvent"></child>
    </div>
  </template>

  <script>
  import Child from './Child.vue'

  export default {
    name: 'Parent',
    components: {
      Child
    },
    data() {
      return {
        msg: 'Hello, child'
      }
    },
    methods: {
      handleChildEvent(msg) {
        console.log(msg)
        this.msg = msg
      }
    }
  }
  </script>
```

```html [Child.vue]
  <template>
    <div>
      <h1>子组件</h1>
      <button @click="$emit('my-event', 'Hello, parent')">抛出数据</button>
    </div>
  </template>

  <script>
  export default {
    name: 'Child',
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick() {
        console.log(this.msg)
      }
    }
  }
  </script>
```
:::

2. 兄弟组件通信

> 兄弟组件通信可以用事件总线模式实现。

::: code-group
```javascript [eventBus.js]
import Vue from 'vue'
export default new Vue()
```

```html [ChildA.vue]
<template>
  <button @click="sendClickEvent">Click me</button>
</template>

<script>
import eventBus from './eventBus'

export default {
  name: 'ChildA',
  methods: {
    handleClick() {
      // 触发组件B组件监听的事件
      eventBus.$emit('event-name', 'Hello, ChildB')
    }
  }
}
</script>
```

```html [ChildB.vue]
<template>
  <div>{{ message }}</div>
</template>

<script>
import eventBus from './eventBus'

export default {
  name: 'ChildB',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    eventBus.$on('event-name', this.handleEvent);
  },
  // 事件总线在使用过程中可能会造成事件的叠加，需要注意移除事件监听器，避免内存泄漏
  beforeDestroy() {
    eventBus.$off('event-name', this.handleEvent);
  },
  methods: {
    handleEvent(data) {
      // 处理事件
      this.message = data;
    },
  }
}
</script>
```
:::

3. $ref

> 父组件可以通过 `ref` 属性给子组件注册引用，子组件可以通过 `this.$refs.xxx` 获取到对应的组件实例。

::: code-group
```html [Parent.vue]
<template>
  <div>
    <Child ref="child"></Child>
    <p>父组件信息：{{ message }}</p>
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  data() {
    return {
      message: '父'
    }
  },
  methods: {
    handleClick() {
      this.message = this.$refs.child.childMsg
    }
  }
}
</script>
```

```html [Child.vue]
<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      childMsg: '子'
    }
  }
}
</script>
```
:::

4. mixin混入

> 父组件可以将一些公共的功能混入到子组件中，子组件可以直接调用这些功能。

::: code-group
```javascript [mixin.js]
export const myMixin = {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      this.message = 'this is mixinData'
    }
  }
}
```

```javascript [Child.vue]
import { myMixin } from './myMixin.js'

export default {
  mixins: [myMixin],
  methods: {
    showMessage() {
      // 访问mixin里面的message
      console.log(this.message)
    }
  }
  // ...
}
```

```javascript [main.js]
import Vue from 'vue'
import { myMixin } from './myMixin.js'

Vue.mixin(myMixin)  // 全局混入   ！！！谨慎使用！！！

new Vue({
  // ...
})
```
:::


5. Vuex

> [Vuex](#vuex) 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### 自定义指令

> 除了默认设置的核心指令( `v-model` 和 `v-show` ), Vue.js 也允许注册自定义指令。

- 钩子函数： 一个指令定义对象可以提供如下几个钩子函数 (均为可选)
    - `bind`  只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - `inserted`  被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    - `update`  所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
    - `componentUpdated`  指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    - `unbind`  只调用一次，指令与元素解绑时调用。

- 钩子函数参数
    - `el`  指令所绑定的元素，可以用来直接操作 DOM。
    - `binding`  一个对象，包含以下属性：
        - `name`  指令名，不包括 `v-` 前缀。
        - `value`  指令的绑定值，例如：`v-my-directive="1 + 1"` 中为 `1 + 1`，`v-my-directive.prop="value"` 中为 `"value"`。
        - `oldValue`  指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
        - `expression`  指令的表达式，例如：`v-my-directive="1 + 1"` 中为 `"1 + 1"`。
        - `arg`  指令的参数，例如：`v-my-directive:foo` 中为 `"foo"`。
        - `modifiers`  一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
    - `vnode`  Vue 编译生成的虚拟节点，只在 `bind` 和 `update` 钩子中可用。
    - `oldVnode`  上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

1. 全局注册

> 全局注册的指令会自动地被注册为全局指令，可以在任何地方使用。

```javascript [main.js]
Vue.directive('my-directive', {
  bind: function (el, binding, vnode) {
    // 指令第一次绑定到元素时触发，只执行一次
  },
  inserted: function (el, binding, vnode) {
    // 元素插入到父节点时触发
  },
  update: function (el, binding, vnode, oldVnode) {
    // 元素更新时触发，可能会触发多次
  },
  componentUpdated: function (el, binding, vnode, oldVnode) {
    // 组件更新完成时触发
  },
  unbind: function (el, binding, vnode) {
    // 指令从元素上解绑时触发
  }
})

```

2. 局部注册

> 局部注册的指令只会在当前组件中生效。

```javascript
export default {
  directives: {
    'my-directive': {
      bind(el, binding, vnode) => {      
        // 指令第一次绑定到元素时触发，只执行一次
        // 例如，对于v-my-directive:arg.modifier1.modifier2="value"指令
        // binding.value       获取指令的值       value
        // binding.arg         获取指令的属性     arg
        // binding.modifiers   获取指令的修饰符   { modifier1: true, modifier2: true }

        // el.dataset来操作元素的data-*属性
        // el.classList来操作元素的class

        // 访问组件实例
    		vnode.context.myMethod() // 调用组件实例的myMethod方法
      },
      inserted(el, binding, vnode) => {
        // 元素插入到父节点时触发
        // 访问组件实例
        if (vnode.context) {
          vnode.context.$nextTick(() => {
            vnode.context.myMethod() // 调用组件实例的myMethod方法
          })
        }
      },
      update(el, binding, vnode, oldVnode) => {
        // 元素更新时触发，可能会触发多次
        // 访问组件实例
    		vnode.context.myData = binding.value // 设置组件实例的myData数据
      },
      componentUpdated(el, binding, vnode, oldVnode) => {
        // 组件更新完成时触发
        // 访问组件实例
        if (vnode.context) {
          vnode.context.$nextTick(() => {
            vnode.context.myData = binding.value // 设置组件实例的myData数据
          })
        }
      },
      unbind(el, binding, vnode) => {
        // 指令从元素上解绑时触发
         // 访问组件实例
        if (vnode.context && !vnode.context._isDestroyed) {
          vnode.context.myMethod() // 调用组件实例的myMethod方法
        }
      }
    }
  }
}
```

### 过渡 & 动画

```html [基础动画]
<template>
  <div id="app">
  	<button @click="show=!show">Toggle</button>
		<!-- 设置了name属性为"fade"，表示这是一个fade动画 -->
  	<transition name="fade">
    	<p v-if="show">Hello, World!</p>
  	</transition>
	</div>
</template>

<script>
export default {
  data: {
    show: false
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
```

```html [列表动画]
<template>
  <div id="app">
  	<button @click="add">Add</button>
  	<button @click="remove">Remove</button>
		<!-- 设置了name属性为"list"，表示这是一个列表过渡动画,tag属性，将其渲染为一个<ul>元素 -->
  	<transition-group name="list" tag="ul">
    	<li v-for="(item, index) in items" :key="item.id">{{ item.name }}</li>
  	</transition-group>
	</div>
</template>

<script>
export default {
  data: {
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  },
  methods: {
    add() {
      this.items.push({ id: Date.now(), name: `Item ${this.items.length + 1}` });
    },
    remove() {
      this.items.pop();
    }
  }
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
```

```html [路由过渡动画]
<template>
  <div id="app">
  	<ul>
    	<li><router-link to="/">Home</router-link></li>
    	<li><router-link to="/about">About</router-link></li>
    	<li><router-link to="/contact">Contact</router-link></li>
  	</ul>
		<!-- 
    	name属性为"fade"，表示这是一个fade过渡动画
    	mode属性，将过渡模式设置为"out-in"，表示先离开，再进入
    -->
  	<transition name="fade" mode="out-in">
    	<router-view></router-view>
  	</transition>
	</div>
</template>

<script>
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const Contact = { template: '<div>Contact</div>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
})
export default {
  data: {
    
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, transform .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```


## Vuex
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

1. 安装

::: code-group
```bash [npm]
npm install vuex --save
```

```bash [yarn]
yarn add vuex
```
:::

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 Vuex：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

2. 核心概念

- `State`：Vuex 使用单一状态树，即只包含一个状态对象的仓库。
- `Getters`：Vuex 使用 `getters` 计算属性，就是一些计算属性，它可以让我们能够轻松地从 `store` 中获取状态。
- `Mutations`：Vuex 使用 `mutations` 改变状态的唯一方法是提交 `mutation`。
- `Actions``：Actions` 类似于 `mutations`，不同在于：
    - 包含异步操作。
    - 可以包含任意异步操作，而不是像 `mutations` 那样只包含同步操作。
    - 可以通过提交 `mutation` 来触发状态的改变。
- `Modules`：Vuex 允许我们将 `store` 分割成模块（module）。每个模块拥有自己的 `state`、`mutation`、`action`、`getters`、甚至是嵌套子模块。

3. 基本用法

```javascript [state]
// 只读 只能由Mutation里面的方法修改 天生自带命名空间

// 组件中使用
this.$store.模块名.属性

// mapState 简化使用 （computed中）
...mapState('模块名', ['属性名'])
```

```javascript [getters]
// 同computed计算属性

// 组件使用
this.$store.getters['模块名/方法名']

// mapGetters简化使用 （computed中）
...mapGetters('模块名', ['方法名'])
```

```javascript [mutations]
// 专门修改state的地方   同步代码    每个方法最多接收两个参数 （state, 额外参数）

// 组件使用
this.$store.commit('方法名', 实参)

// mapMutations简化使用 （methods中）
...mapMutations('模块名', ['方法名'])
```

```javascript [actions]
// 异步代码   每个方法最多接收两个参数 （ctx, 额外参数）

// 组件使用
this.$store.dispatch('方法名', 实参)

// mapActions简化使用 （methods中）
...mapActions('模块名', ['方法名'])
```

```javascript [modules]
// 持久化插件  vuex-persistedstate

modules: {
  // ...
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['user.name', 'cart']
    })
  ]
}
```


## Router


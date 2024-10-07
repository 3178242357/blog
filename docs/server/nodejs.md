---
title: nodejs
titleTemplate: server
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /assets/logo.svg
---

# Node.js

## 安装

1. 下载安装包：https://nodejs.cn/download

2. 安装教程：https://blog.csdn.net/weixin_44259233/article/details/139743886

## NPM 使用介绍

> NPM（Node Package Manager）是一个 JavaScript 包管理工具，也是 Node.js 的默认包管理器。
> NPM 允许开发者轻松地下载、安装、共享、管理项目的依赖库和工具。

**主要功能：**
  - 包管理：NPM 可以帮助你安装并管理项目所需的各种第三方库（包）。例如，可以通过简单的命令来安装、更新、或删除依赖。
  - 版本管理：NPM 支持版本控制，允许你锁定某个特定版本的依赖，或根据需求选择最新的版本。
  - 包发布：NPM 允许开发者将自己的库发布到 NPM 仓库中，其他开发者可以通过 NPM 下载并使用这些库。
  - 命令行工具：NPM 提供了强大的命令行工具，可以用于安装包、运行脚本、初始化项目等多种操作。

### 常用命令

- `npm init`：初始化一个新的 Node.js 项目，生成 package.json 文件。
- `npm install`：安装项目依赖。
- `npm install <package>`：安装指定包。
- `npm install -g <package>`：全局安装指定包。
- `npm uninstall <package>`：卸载指定包。
- `npm update`：更新所有包。
- `npm update <package>`：更新指定包。
- `npm list`：查看所有包及版本。
- `npm run <script>`：运行 package.json 文件中定义的脚本。

### 发布自己的包

[参考](https://juejin.cn/post/7068170995298729991#heading-7) 

## fs模块

导入 `fs` 内置模块

```js
  const fs = require('fs')
```

1. 读文件 `fs.readFile()`
  - 参数1：读取文件路径
  - 参数2：读取文件的编码格式，一般默认**utf8**
  - 参数3：回调函数，拿到读取成功和失败的结果 **dataStr** 、**err** 
    - 读取成功：err的值为**null**
    - 读取失败：err的值为**错误对象**，dataStr的值为**undefined**

  ```js
    fs.readFile(url, utf8, function(err, dataStr) {
      if(err) return console.log('读取文件失败！' + err.message)
      console.log('读取文件成功！' + dataStr)
    })
  ```

2. 写文件 `fs.writeFile()` 
  - 参数1：文件存放路径
  - 参数2：写入文件的内容
  - 参数3：回调函数，写入文件失败的结果 **err**
    - 写入成功：err的值为 **null**
    - 写入失败：err的值为 **错误对象**

  ```js
    fs.writeFile(url,'hello word！',function() {
      if(err) return console.log('写入文件失败！'+err.message)
      console.log('写入文件成功！')
    })
  ```

## path模块

1. 全局对象 `__dirname`
> 表示当前文件所处的目录

2. `join()` 方法

```js
// 导入path路径模块
  const path = require('path')

  const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')  // ../ 会抵消前面的路径
  
  console.log(pathStr)  //	 \a\b\d\e
```

3. `basename()` 方法

  ```js
  // 导入path路径模块
  const path = require('path')
  
  // 定义文件的存放路径
  const fpath = '/a/b/c/index.html'
  
  const fullName = path.basename(fpath)
  console.log(fullName)  //	index.html
  
  
  const nameWithoutExt = path.basename(fpath, '.html')
  console.log(nameWithoutExt)  //		index
  ```

4. `extname()` 方法

  ```js
  const path = require('path')
  
  // 这是文件的存放路径
  const fpath = '/a/b/c/index.html'
  
  const fext = path.extname(fpath)
  console.log(fext)   //.html
  ```

## http模块

### 创建基本的 web 服务器
```js
// 1. 导入 http 模块
const http = require('http')

// 2. 创建 web 服务器实例
const server = http.createServer()

// 3. 绑定 request 事件
server.on('request', function (req, res) {
  const url = req.url
  const method = req.method
  console.log('Someone visit our web server.')

  let content = '<h1>404 Not found!</h1>'
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }

  // 解决中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  res.end(content)
})

// 4. 启动服务器
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
```

## NodeJS模块化分类

1. 内置模块：
> 由Node.js官方提供的模块。如：fs、path、http等

2. 自定义模块：
> 用户创建的每一个 `.js 文件` 都是自定义模块

3. 第三方模块：
> 由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载

### 模块作用域
> 和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。

### module对象
> 在每个 `.js` 自定义模块中都有一个 `module` 对象，它里面存储了和当前模块有关的信息

### module.exports 对象
1. 在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。
2. 外界用 `require()` 方法导入自定义模块时，得到的就是 `module.exports` 所指向的对象。
3. 使用 `require()` 方法导入模块时，导入的结果，永远以 `module.exports` 指向的对象为准。
4. 由于 `module.exports` 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 `exports` 对象。
5. 默认情况下，`exports` 和 `module.exports` 指向同一个对象。最终共享的结果，还是以 `module.exports` 指向的对象为准。

```js
// module.js
console.log(module)
console.log(module.exports)
console.log(exports)
console.log(module.exports === exports)   // true
```

### CommonJS 规定
> Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

1. 每个模块内部，`module` 变量代表当前模块。
2. `module` 变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口。
3. 加载某个模块，其实是加载该模块的 `module.exports` 属性。`require()` 方法用于加载模块。


## npm-包

> Node.js 中的第三方模块又叫做包。

一个规范的包，它的组成结构，必须符合以下 3 点要求：
1. 包必须以单独的目录而存在
2. 包的顶级目录下要必须包含 `package.json` 这个包管理配置文件
3. `package.json` 中必须包含 `name`、`version`、`main` 这三个属性，分别代表包的名字、版本号、包的入口。

### 下包

1. 从 [](https://www.npmjs.com/) 上搜索自己所需要的包
2. 从 [](https://registry.npmjs.org/)  服务器上下载自己需要的包

### 在项目中安装包的命令

1. 安装包
```bash
  npm install <package> --save

  or

  npm install <package> -S
```

2. 安装指定版本的包
```bash
  npm install <package>@<version> --save

  or

  npm install <package>@<version> -S
```

3. 一次性安装所有的包
```bash
  npm install`
```

4. 安装全局包
```bash
  npm install <package> -g
```

5. 卸载包
```bash
  npm uninstall <package>
```

6. 快速创建 `package.json`
- `npm init -y`
  - `dependencies` 节点(核心依赖)
    - 默认安装在 `dependencies` 节点
    - 在开发和项目上线之后都需要用到，则建议把这些包记录到 `dependencies` 节点中。
  - `devDependencies` 节点(开发依赖)
    - `npm i 包名 -D` 或 `npm i 包名 --save-dev`
    - 只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 `devDependencies` 节点中。

- **注意：**
  - 初次装包完成后，在项目文件夹下多一个叫做 `node_modules` 的文件夹和 `package-lock.json` 的配置文件。
  - 在项目开发中，一定要把 `node_modules` 文件夹，添加到 `.gitignore` 忽略文件中。
  - npm 规定，在项目根目录中，必须提供一个叫做 `package.json` 的包管理配置文件。用来记录与项目有关的一些配置信息。例如：
    - 项目的名称、版本号、描述等
    - 项目中都用到了哪些包
    - 哪些包只在开发期间会用到
    - 那些包在开发和部署时都需要用到

7. 切换 npm 下包镜像源
  - 查看当前镜像源：`npm config get registry`
  - 切换taobao镜像源：`npm config set registry=http://registry.npm.taobao.org/`
  
  **推荐使用 nrm 工具**

  - 安装：`npm install nrm -g`
  - 查看所有可用镜像源：`nrm ls`
  - 切换镜像源：`nrm use taobao`

## 模块的加载机制

1. 优先从缓存中加载
> 模块在第一次加载后会被缓存。 这也意味着多次调用 `require()` 不会导致模块的代码被执行多次。
**注意：**不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

2. 内置模块的加载机制
> 内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。
例如：`require('fs')` 始终返回内置的 `fs` 模块，即使在 `node_modules` 目录下有名字相同的包也叫做 `fs`。

3. 自定义模块的加载机制
> 使用 `require()` 加载自定义模块时，必须指定以 `./` 或 `../` 开头的路径标识符。否则 node 会把它当作内置模块或第三方模块进行加载。

在使用 `require()` 导入自定义模块时，如果省略了**文件的扩展名**，则 Node.js 会按顺序分别尝试加载以下的文件：

  1️⃣ 按照确切的文件名进行加载 <br>
  2️⃣ 补全 `.js` 扩展名进行加载 <br>
  3️⃣ 补全 `.json` 扩展名进行加载 <br>
  4️⃣ 补全 `.node` 扩展名进行加载 <br>
  5️⃣ 加载失败，终端报错

4. 第三方模块的加载机制

> 如果传递给 `require()` 的模块标识符不是一个内置模块，也没有以 `./` 或 `../` 开头，则 Node.js 会从当前模块的父目录开始，尝试从 `node_modules` 文件夹中加载第三方模块。如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

例如：假设在 'C:\Users\zhansan\project\foo.js' 文件里调用了 `require('tools')`，则 Node.js 会按以下顺序查找：

1️⃣ C:\Users\zhansan\project\node_modules\tools <br>
2️⃣ C:\Users\zhansan\node_modules\tools <br>
3️⃣ C:\Users\node_modules\tools <br>
4️⃣ C:\node_modules\tools <br>

**目录作为模块：**
当把目录作为模块标识符，传递给 `require()` 进行加载的时候，有三种加载方式：
- 在被加载的目录下查找一个叫做 `package.json` 的文件，并寻找 `main` 属性，作为 `require()` 加载的入口
- 如果目录里没有 `package.json` 文件，或者 `main` 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 `index.js` 文件。
- 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：`Error: Cannot find module 'xxx'`


## 安装 nodemon

> 在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。
> 现在，我们可以使用 [nodemon](https://www.npmjs.com/package/nodemon) 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

1. 安装：`npm i -g nodemon`
2. 使用：将 `node` 命令替换为 `nodemon` 命令，使用 `nodemon app.js` 来启动项目。
3. 好处是：代码被修改之后，会被 `nodemon` 监听到，从而实现自动重启项目的效果

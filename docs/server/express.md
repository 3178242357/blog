---
title: nodejs
titleTemplate: server
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /assets/logo.svg
---

# Express

## 安装
```bash
npm install express
```

## 基本使用

### Hello World 示例
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
```

### 基本路由
结构：`app.METHOD(PATH, HANDLER)`

- `app` 是 express 的一个实例。
- `METHOD` 是 HTTP 请求方法，如 `get`、`post`、`put`、`delete` 等。
- `PATH` 是服务器上的路径。
- `HANDLER` 是路由匹配时执行的函数。

示例：
1. 在首页响应 Hello World!：
```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

2. 响应根路由 `/` 上的 POST 请求，应用的主页：
```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

3. 响应对 `/user` 路由的 PUT 请求：
```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

4. 响应对 `/user` 路由的 DELETE 请求：
```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

### 提供静态文件
要提供静态文件，例如图片、CSS 文件和 JavaScript 文件，请使用 Express 中的 `express.static` 内置中间件函数。

函数签名是：`express.static(root, [options])`
- `root` 是提供静态资源的根目录。
- `options` 是可选的，可以指定一些选项，如 `maxAge`、`extensions`、`redirect`、`setHeaders`。

例如，使用以下代码在名为 `public` 的目录中提供图片、CSS 文件和 JavaScript 文件：
```js
app.use(express.static('public'))
```

现在，你可以加载 `public` 目录中的文件：
:::info 
- `http://localhost:3000/images/kitten.jpg`
- `http://localhost:3000/css/style.css`
- `http://localhost:3000/js/app.js`
- `http://localhost:3000/images/bg.png`
- `http://localhost:3000/hello.html`
:::

为 `express.static` 函数服务的文件创建虚拟路径前缀（该路径实际上并不存在于文件系统中），指定挂载路径 为静态目录，如下所示：
```js
app.use('/static', express.static('public'))
```

现在，你可以从 `/static` 路径前缀加载 `public` 目录中的文件。

:::info
- `http://localhost:3000/static/images/kitten.jpg`
- `http://localhost:3000/static/css/style.css`
- `http://localhost:3000/static/js/app.js`
- `http://localhost:3000/static/images/bg.png`
- `http://localhost:3000/static/hello.html`
:::

但是，你提供给 `express.static` 函数的路径是相对于你启动 node 进程的目录的。如果你从另一个目录运行 `express` 应用，使用你要服务的目录的绝对路径会更安全：

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

## 路由

基本示例：
```js
const express = require('express')
const app = express()

// 当向主页发出 GET 请求时，响应“hello world”
app.get('/', (req, res) => {
  res.send('hello world')
})
```

### 路由方法
路由方法派生自 HTTP 方法之一，并附加到 express 类的实例。

以下代码是为应用根目录的 GET 和 POST 方法定义的路由示例。

```js
// GET method route
app.get('/', (req, res) => {
  res.send('GET 请求发送到主页')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST 请求发送到主页')
})
```

有一种特殊的路由方法 `app.all()` 用于在所有 HTTP 请求方法的路径上加载中间件函数。例如，无论是使用 GET、POST、PUT、DELETE 还是 http 模块 中支持的任何其他 HTTP 请求方法，都会对路由 “/secret” 的请求执行以下处理程序。

```js
app.all('/secret', (req, res, next) => {
  console.log('访问 secret 部分')
  next() // 将控制权传递给下一个处理程序
})
```

1. 以下是一些基于字符串的路由路径示例。
  - 匹配对根路由 `/` 的请求。
    ```js
    app.get('/', (req, res) => {
      res.send('root')
    })
    ```

  - 匹配对 `/about` 路由的请求。
    ```js
    app.get('/about', (req, res) => {
      res.send('about')
    })
    ```

  - 匹配对 `/random.text` 的请求。
    ```js
    app.get('/random.text', (req, res) => {
      res.send('random.text')
    })
    ```

2. 以下是一些基于字符串模式的路由路径示例。
  - 此路由路径将匹配 `acd` 和 `abcd`。
    ```js
    app.get('/ab?cd', (req, res) => {
      res.send('ab?cd')
    })
    ```

  - 匹配 `abcd`、`abbcd`、`abbbcd` 等。
    ```js
    app.get('/ab+cd', (req, res) => {
      res.send('ab+cd')
    })
    ```
  
  - 匹配 `abcd`、`abxcd`、`abRANDOMcd`、`ab123cd` 等。
    ```js
    app.get('/ab*cd', (req, res) => {
      res.send('ab*cd')
    })
    ```

  - 匹配 `/abe` 和 `/abcde`。
    ```js
    app.get('/ab(cd)?e', (req, res) => {
      res.send('ab(cd)?e')
    })
    ```

3. 基于正则表达式的路由路径示例：
  - 匹配其中带有 “a” 的任何内容。
    ```js
    app.get(/a/, (req, res) => {
      res.send('/a/')
    })
    ```

  - 匹配 `butterfly` 和 `dragonfly`，但不匹配 `butterflyman`、`dragonflyman` 等。

    ```js
    app.get(/.*fly$/, (req, res) => {
      res.send('/.*fly$/')
    })
    ```

### 路由参数
> 路由参数是命名的 URL 段，用于捕获在 URL 中的位置指定的值。捕获的值填充到 `req.params` 对象中，路径中指定的路由参数的名称作为它们各自的键。

:::info
- Route path: `/users/:userId/books/:bookId`
- Request URL: `http://localhost:3000/users/34/books/8989`
- req.params: `{ "userId": "34", "bookId": "8989" }`
:::

要使用路由参数定义路由，只需在路由的路径中指定路由参数，如下所示。

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

### 路由处理程序
> 你可以提供多个回调函数，其行为类似于 中间件 来处理请求。唯一的例外是这些回调可能会调用 `next('route')` 来绕过剩余的路由回调。你可以使用此机制对路由施加先决条件，然后如果没有理由继续当前路由，则将控制权传递给后续路由。

路由处理程序的形式可以是**函数、函数数组或两者的组合**。

- 单个回调函数
  ```js
  app.get('/example/a', (req, res) => {
    res.send('Hello from A!')
  })
  ```

- 多个回调函数
  ```js
  app.get('/example/b', (req, res, next) => {
    console.log('Middleware 1')
    next()
  }, (req, res) => {
    console.log('Hello from B!')
  })
  ```

- 一组回调函数
  ```js
  const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }

  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }

  const cb2 = function (req, res) {
    res.send('Hello from C!')
  }

  app.get('/example/c', [cb0, cb1, cb2])
  ```

- 独立函数和函数数组的组合
  ```js
  const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }

  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }

  app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from D!')
  })
  ```

**响应方法：**
|  方法  |  描述  |
|---------|---------|
|  `res.download()`  |  提示要下载的文件。  |
|  `res.end()`  |  结束响应过程。  |
|  `res.json()`  |  发送 JSON 响应。  |
|  `res.jsonp()`  |  发送带有 JSONP 支持的 JSON 响应。  |
|  `res.redirect()`  |  重定向请求。  |
|  `res.render()`  |  渲染视图模板。  |
|  `res.send()`  |  发送各种类型的响应。  |
|  `res.sendFile()`  |  将文件作为八位字节流发送。  |
|  `res.sendStatus()`  |  设置响应状态码并将其字符串表示形式作为响应正文发送。  |

### app.route()
> 可以使用 `app.route()` 为路由路径创建可链式的路由处理程序。因为路径是在单个位置指定的，所以创建模块化路由是有帮助的，因为这有助于减少冗余和拼写错误。

示例：
```js
const express = require('express')
const app = express()

app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
  .delete((req, res) => {
    res.send('Delete the book')
  })
```

### express.Router
> 使用 `express.Router` 类创建模块化、可挂载的路由处理程序。一个 Router 实例就是一个完整的中间件和路由系统；

以下示例将路由创建为模块，在其中加载中间件函数，定义一些路由，并将路由模块安装在主应用的路径上。

在 app 目录下创建一个名为 birds.js 的路由文件，内容如下：

```js
const express = require('express')
const router = express.Router()

// 特定于此路由器的中间件
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// 定义主页路由
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// 定义 About 路由
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

然后，在应用中加载路由模块：

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

该应用现在将能够处理对 `/birds` 和 `/birds/about` 的请求，以及调用特定于路由的 `timeLog` 中间件函数。

## 中间件
> 中间件函数是可以访问 请求对象 (req)、响应对象 (res) 以及应用请求-响应周期中的下一个中间件函数的函数。下一个中间件函数通常由一个名为 next 的变量表示。

### 应用级中间件
使用 `app.use()` 和 `app.METHOD()` 函数将应用级中间件绑定到 应用对象 的实例，其中 METHOD 是中间件函数处理的请求的 HTTP 方法（例如 get、post、put 或 delete）。

此示例显示了一个没有挂载路径的中间件函数。每次应用收到请求时都会执行该函数。
```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

这个例子展示了一个挂载在 `/user/:id` 路径上的中间件函数。该函数针对 `/user/:id` 路径上的任何类型的 HTTP 请求执行。
```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

这个例子展示了一个路由和它的处理函数（中间件系统）。该函数处理对 `/user/:id` 路径的 GET 请求。
```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

这是一个在挂载点加载一系列中间件函数的示例，带有挂载路径。它说明了一个中间件子堆栈，它将任何类型的 HTTP 请求的请求信息打印到 `/user/:id` 路径。
```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

路由处理程序使你能够为路径定义多个路由。下面的示例定义了两条到 `/user/:id` 路径的 GET 请求路由。第二个路由不会引起任何问题，但它永远不会被调用，因为第一个路由结束了请求-响应周期。

此示例显示了一个处理对 `/user/:id` 路径的 GET 请求的中间件子堆栈。
```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})
```

要跳过路由中间件堆栈中的其余中间件函数，请调用 `next('route')` 将控制权传递给下一个路由。注意：`next('route')` 将仅在使用 `app.METHOD()` 或 `router.METHOD()` 函数加载的中间件函数中工作。

此示例显示了一个处理对 `/user/:id` 路径的 GET 请求的中间件子堆栈。
```js
app.get('/user/:id', (req, res, next) => {
  // 如果用户 ID 为 0，则跳至下一路由
  if (req.params.id === '0') next('route')
  // 否则，将控制权传递给此堆栈中的下一个中间件函数
  else next()
}, (req, res, next) => {
  // 发送常规响应
  res.send('regular')
})

// handler 的 user ：id 路径，该路径会发送特殊响应
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})
```

中间件也可以在数组中声明以实现可重用性。

此示例显示了一个带有中间件子堆栈的数组，用于处理对 `/user/:id` 路径的 GET 请求
```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

### 路由级中间件
> 路由级中间件的工作方式与应用级中间件相同，只是它绑定到 `express.Router()` 的实例。

```js
const express = require('express')
const router = express.Router()
```

使用 `router.use()` 和 `router.METHOD()` 函数加载路由级中间件。

```js
const express = require('express')
const app = express()
const router = express.Router()

// 一个没有挂载路径的中间件函数 这个代码对 router 的每个请求都执行
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// 中间件子堆栈显示对 /user/:id 路径的任何类型的 HTTP 请求的请求信息
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// 一个中间件子堆栈，用于处理对 /user/:id 路径的 GET 请求
router.get('/user/:id', (req, res, next) => {
  // 如果用户 ID 为 0，则跳至下一个路由器
  if (req.params.id === '0') next('route')
  // 否则，将控制权传递给此堆栈中的下一个中间件函数
  else next()
}, (req, res, next) => {
  // 呈现常规页面
  res.render('regular')
})

// handler 来获取 /user/:id 路径，该路径会呈现一个特殊页面
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// 将路由器安装在应用程序上
app.use('/', router)
```

要跳过路由的其余中间件函数，请调用 `next('router')` 将控制权从路由实例传回。

此示例显示了一个处理对 `/user/:id` 路径的 GET 请求的中间件子堆栈。
```js
const express = require('express')
const app = express()
const router = express.Router()

// 使用 check 和 bail out 来谓词路由器
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// 使用路由器和 401 任何掉进去的东西
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

### 错误处理中间件
> 错误处理中间件总是需要四个参数。你必须提供四个参数以将其标识为错误处理中间件函数。即使你不需要使用 `next` 对象，你也必须指定它来维护签名。否则，`next` 对象将被解释为常规中间件，无法处理错误。

以与其他中间件函数相同的方式定义错误处理中间件函数，但使用四个参数而不是三个参数，特别是使用签名 `(err, req, res, next)`：
```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

### 内置中间件

[中间件函数列表](https://github.com/senchalabs/connect#middleware)

Express 具有以下内置中间件函数：

- `express.static` 提供静态资源，例如 HTML 文件、图片等。
- `express.json` 使用 JSON 有效负载解析传入请求。（Express 4.16.0+）
- `express.urlencoded` 使用 URL 编码的负载解析传入的请求。（Express 4.16.0+）

### 第三方中间件
使用第三方中间件向 Express 应用添加功能。

安装所需功能的 Node.js 模块，然后在应用级别或路由级别将其加载到你的应用中。

以下示例说明了安装和加载 `cookie` 解析中间件函数 `cookie-parser`。

```bash
  npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// 加载 Cookie 解析中间件
app.use(cookieParser())
```


Express 常用的第三方中间件函数的部分列表，请参见：[第三方中间件](https://express.nodejs.cn/en/resources/middleware.html)。


## 数据库集成
Express 应用可以集成各种数据库，如 MySQL、MongoDB、PostgreSQL、Redis 等。

### MySQL

模块：[mysql](https://github.com/mysqljs/mysql)

1. 安装
```bash
  npm install mysql
```
2. 示例
```js
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
```
### MongoDB 

模块：[mongodb](https://github.com/mongodb/node-mongodb-native)

1. 安装
```bash
  npm install mongodb
```

2. 示例 
:::code-group
```js [(v2.*)]
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, db) => {
  if (err) throw err

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})
```

```js [(v3.*)]
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err

  const db = client.db('animals')

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})
```
:::

如果你想要 MongoDB 的对象模型驱动程序，请查看 [Mongoose](https://github.com/Automattic/mongoose)。

### PostgreSQL

模块：[pg-promise](https://github.com/vitaly-t/pg-promise)

1. 安装
```bash
  npm install pg-promise
```

2. 示例
```js
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
```

### Redis

模块：[redis](https://github.com/redis/node-redis)

1. 安装
```bash
  npm install redis
```

2. 示例
```js
const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
  console.log(`Error ${err}`)
})

client.set('string key', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

client.hkeys('hash key', (err, replies) => {
  console.log(`${replies.length} replies:`)

  replies.forEach((reply, i) => {
    console.log(`    ${i}: ${reply}`)
  })

  client.quit()
})
```
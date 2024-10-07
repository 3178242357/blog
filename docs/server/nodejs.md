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
---
title: nginx
titleTemplate: server
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /assets/logo.svg
---

# Nginx

## 安装(Windows)

1. 去[ Nginx官网 ](https://nginx.org/en/index.html)下载

访问[ Nginx官网 ](https://nginx.org/en/index.html)，找到 [download](https://nginx.org/en/download.html)

![nginx-download.png](/assets/nginx-download.png)

2. 下载后解压到指定目录，如`D:\nginx`

3. Nginx基本目录

![nginx-dir.png](/assets/nginx-dir.png)

- `conf`：存在Nginx配置文件的目录
- `docs`：存放Nginx文档的目录
- `html`：存放静态html文件的目录
- `logs`：存放Nginx日志的目录
- `temp`：存放临时文件的目录

## Nginx的使用

1. 启动Nginx
打开命令行，切换到Nginx的安装目录，输入命令`start nginx`
浏览器访问`http://localhost:80/`，出现欢迎页面则表示启动成功
![nginx-welcome.png](/assets/nginx-welcome.png)

2. 停止Nginx
打开命令行，切换到Nginx的安装目录，输入命令`nginx -s stop`

::: warning 解决windows下的nginx服务关不掉问题
使用 `nginx -s stop` 命令停止nginx，结果发现nginx服务没有停掉
再次使用 `nginx -s stop` 命令，报错

> nginx: [error] CreateFile() “D:\download\nginx-1.24.0\nginx-1.24.0/logs/nginx.pid” failed (2: The system cannot find the file specified)

问题原因：nginx启动了多个，但只关闭了一个

解决方法：强制终止运行中的 nginx.exe 进程及其所有子进程
```bash
taskkill /f /t /im nginx.exe

```
:::

3. 重启Nginx
打开命令行，切换到Nginx的安装目录，输入命令`nginx -s reload`

4. 查看Nginx版本
打开命令行，切换到Nginx的安装目录，输入命令`nginx -v`







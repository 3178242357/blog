---
title: server
---

## Node 
<script setup>
  import { useData } from 'vitepress'
  const { isDark } = useData()
</script>

<div class="introduce">
  <a href="https://nodejs.cn/" target="_blank">
    <img :src="isDark ? '/assets/nodejs-light.svg' : '/assets/nodejs-dark.svg'" alt="Node.js" width="100" height="100">
  </a>
  <ul>
    <li> <a href="/server/nodejs">Node.js®</a> 是一个免费、开源、跨平台的 JavaScript 运行时环境，它让开发人员能够创建服务器、Web 应用、命令行工具和脚本。</li>
  </ul>
</div>

## Express
<div class="introduce">
  <a href="https://express.nodejs.cn/" target="_blank">
    <img src="/assets/express.png" alt="Express" width="100" height="100">
  </a>
  <ul>
    <li> <a href="/server/express">Express</a> 是一个基于 Node.js 平台的快速、开放、极简的 web 应用框架，它提供一系列强大的功能，帮助你快速地搭建各种 Web 应用。</li>
  </ul>
</div>

## nginx
<div class="introduce">
  <a href="https://github.com/nginx/nginx" target="_blank">
    <img src="/assets/nginx.svg" alt="nginx" width="100" height="100">
  </a>
  <ul>
    <li> <a href="/server/nginx">nginx</a> 是一个 HTTP Web 服务器、反向代理、内容缓存、负载均衡器、 TCP/UDP 代理服务器、 和邮件代理服务器。</li>
  </ul>
</div>

<style>
  .introduce {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      border: 0 !important;
      margin: 0 !important;
    }
  }
</style>
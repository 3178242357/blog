---
title: miniprogram
---

## 微信小程序

<div class="introduce">
  <a href="https://developers.weixin.qq.com/miniprogram/dev/framework" target="_blank"><img src="/assets/taro-weapp.png" alt="vue" width="100" height="100"></a>
  <ul>
    <li> 微信小程序 是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</li>
  </ul>
</div>

## Vue mini
<div class="introduce">
  <a href="https://vuemini.org" target="_blank"><img src="/assets/vuemini.png" alt="vuemini" width="100" height="100"></a>
  <ul>
    <li> Vue Mini 是一个基于 Vue 3 的小程序框架，它能让你用组合式 API 写小程序。</li>
    <li> Vue Mini 仅聚焦于小程序逻辑部分，也就是 JS 部分，它并不影响小程序的模版、样式及配置。 </li>
  </ul>
</div>

**支持的平台**

目前 Vue Mini 仅支持微信小程序。虽然技术上 Vue Mini 可以支持其他小程序平台，但由于时间跟精力的限制，短期内并没有这样的计划。未来一段时间 Vue Mini 仍然只会专注于微信小程序，持续提升微信小程序的 UX 以及 DX。

## Taro 

<div class="introduce">
  <a href="https://docs.taro.zone/docs" target="_blank"><img src="/assets/taro-logo.png" alt="taro" width="100" height="100"></a>
  <ul>
    <li> Taro 是一个开放式跨端跨框架解决方案。</li>
    <li> 支持使用 React/Vue/Nerv 等框架来开发。</li>
  </ul>
</div>

**多端转换支持**

Taro 3 可以支持转换到 H5、ReactNative 以及任意小程序平台。

目前官方支持转换的平台如下：

<ul class="taro-platform">
  <li>
    <a href="https://developer.mozilla.org/zh-CN/docs/Web?from=taro" target="_blank"><img src="/assets/taro-h5.png" alt="h5" width="30" height="30">H5</a>
  </li>
  <li>
    <a href="https://reactnative.dev/?from=taro" target="_blank"><img src="/assets/taro-reactnative.png" alt="h5" width="30" height="30">React Native</a>
  </li>
  <li>
    <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/?from=taro" target="_blank"><img src="/assets/taro-weapp.png" alt="h5" width="30" height="30">微信小程序</a> 
  </li>
  <li>
    <a href="https://mp.jd.com/?from=taro" target="_blank"><img src="/assets/taro-jd.png" alt="h5" width="30" height="30">京东小程序</a>
  </li>
  <li>
    <a href="https://smartprogram.baidu.com/developer/index.html?from=taro" target="_blank"><img src="/assets/taro-baiduai.png" alt="h5" width="30" height="30">百度智能小程序</a>
  </li>
  <li>
    <a href="https://opendocs.alipay.com/mini/developer/getting-started?from=taro" target="_blank"><img src="/assets/taro-alipay.png" alt="h5" width="30" height="30">支付宝小程序</a>
  </li>
  <li>
    <a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview?from=taro" target="_blank"><img src="/assets/taro-douyin.png" alt="h5" width="30" height="30">抖音小程序</a>
  </li>
  <li>
    <a href="https://q.qq.com/wiki/develop/miniprogram/frame/?from=taro" target="_blank"><img src="/assets/taro-qq.png" alt="h5" width="30" height="30">QQ 小程序</a>
  </li>
  <li>
    <a href="https://open.dingtalk.com/document/org/develop-org-mini-programs?from=taro" target="_blank"><img src="/assets/taro-dingding.png" alt="h5" width="30" height="30">钉钉小程序</a>
  </li>
  <li>
    <a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/qywx-dev.html?from=taro" target="_blank"><img src="/assets/taro-wework.png" alt="h5" width="30" height="30">企业微信小程序</a>
  </li>
  <li>
    <a href="https://opendocs.alipay.com/iot/multi-platform/vcs0fv?from=taro" target="_blank"><img src="/assets/taro-alipay-IOT.png" alt="h5" width="30" height="30">支付宝 IOT 小程序</a>
  </li>
  <li>
    <a href="https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN?from=taro" target="_blank"><img src="/assets/taro-feishu.png" alt="h5" width="30" height="30">飞书小程序</a>
  </li>
  <li>
    <a href="https://mp.kuaishou.com/docs/develop/frame/config/conf_appjson.html?from=taro" target="_blank"><img src="/assets/taro-kuaishou.png" alt="h5" width="30" height="30">快手小程序</a>
  </li>
</ul>

## UniApp

<div class="introduce">
  <a href="https://uniapp.dcloud.net.cn" target="_blank"><img src="/assets/uniapp-logo.png" alt="uniapp" width="100" height="100"></a>
  <ul>
    <li> uni-app 是一个使用 Vue.js 开发所有前端应用的框架。</li>
    <li> 开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。 </li>
  </ul>
</div>

**多端转换支持**

<img src="/assets/uniapp-platform.png" alt="uniapp-platform">


<style>
.introduce {
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    border: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}


.taro-platform {
  list-style: none;
  padding-left: 0;

  li {
    display: grid;
    grid-template-columns: auto 1fr; /* 第一列自动宽度，第二列剩余空间 */
    align-items: center;

    a {
      display: flex;
      align-items: center;
      gap: 5px;
      
      img {
        margin: 0 !important;
        border: 0 !important;
      }
    }
  }

  li::before {
    content: "•";
    margin-right: 10px;
    transform: scale(1.5);
  }
}
</style>
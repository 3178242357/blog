---
title: miniprogram
---

# Taro 

<div class="introduce">
  <a href="https://docs.taro.zone/docs" target="_blank"><img src="/taro-logo.png" alt="vue" width="100" height="100"></a>
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
    <a href="https://developer.mozilla.org/zh-CN/docs/Web?from=taro" target="_blank"><img src="/taro-h5.png" alt="h5" width="30" height="30">H5</a>
  </li>
  <li>
    <a href="https://reactnative.dev/?from=taro" target="_blank"><img src="/taro-reactnative.png" alt="h5" width="30" height="30">React Native</a>
  </li>
  <li>
    <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/?from=taro" target="_blank"><img src="/taro-weapp.png" alt="h5" width="30" height="30">微信小程序</a> 
  </li>
  <li>
    <a href="https://mp.jd.com/?from=taro" target="_blank"><img src="/taro-jd.png" alt="h5" width="30" height="30">京东小程序</a>
  </li>
  <li>
    <a href="https://smartprogram.baidu.com/developer/index.html?from=taro" target="_blank"><img src="/taro-baiduai.png" alt="h5" width="30" height="30">百度智能小程序</a>
  </li>
  <li>
    <a href="https://opendocs.alipay.com/mini/developer/getting-started?from=taro" target="_blank"><img src="/taro-alipay.png" alt="h5" width="30" height="30">支付宝小程序</a>
  </li>
  <li>
    <a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview?from=taro" target="_blank"><img src="/taro-douyin.png" alt="h5" width="30" height="30">抖音小程序</a>
  </li>
  <li>
    <a href="https://q.qq.com/wiki/develop/miniprogram/frame/?from=taro" target="_blank"><img src="/taro-qq.png" alt="h5" width="30" height="30">QQ 小程序</a>
  </li>
  <li>
    <a href="https://open.dingtalk.com/document/org/develop-org-mini-programs?from=taro" target="_blank"><img src="/taro-dingding.png" alt="h5" width="30" height="30">钉钉小程序</a>
  </li>
  <li>
    <a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/qywx-dev.html?from=taro" target="_blank"><img src="/taro-wework.png" alt="h5" width="30" height="30">企业微信小程序</a>
  </li>
  <li>
    <a href="https://opendocs.alipay.com/iot/multi-platform/vcs0fv?from=taro" target="_blank"><img src="/taro-alipay-IOT.png" alt="h5" width="30" height="30">支付宝 IOT 小程序</a>
  </li>
  <li>
    <a href="https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN?from=taro" target="_blank"><img src="/taro-feishu.png" alt="h5" width="30" height="30">飞书小程序</a>
  </li>
  <li>
    <a href="https://mp.kuaishou.com/docs/develop/frame/config/conf_appjson.html?from=taro" target="_blank"><img src="/taro-kuaishou.png" alt="h5" width="30" height="30">快手小程序</a>
  </li>
</ul>



<style>
.introduce {
  display: flex;

  img {
    margin-right: 20px;
    border: 0 !important;
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
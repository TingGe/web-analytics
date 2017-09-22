[TOC]

# Web-Analytics

> 本文主要是我个人的一些思考，如需转载请标明[本文引用地址](https://github.com/TingGe/web-analytics)和[听歌](http://tingge.github.io/html/me.html)签名。资料采集自互联网，如有侵权，请联系我删除。

知识图谱标签：第三方监测、在线广告行业、JavaScript（前端/全栈）技术

## 监测分析 Measurement & Analytics

- [GoSquared](https://www.gosquared.com/) 美国的一家提供网站流量监控以及电子商务转化率监控的服务商，算是非常典型的监控平台，为了打造成所有人都愿意使用的产品，他们在设计上面临不小的挑战
- [Google Analytics之工作原理和应用技巧](http://www.drupal001.com/2012/04/google-analytics-mechanism/)源码分析见 google-analytics
- [谈谈Google Analytics](http://yansong.me/2013/09/17/talk-about-Google-Analytics.html)
- [蓝鲸的网站分析笔记](http://bluewhale.cc/?s=Google)
- [Lamp Blog](http://www.lampblog.net/category/web%E5%88%86%E6%9E%90/google-analytics/)
- [exelate](http://exelate.com/) 尼尔森，让品牌了解客户参与实时跟踪和数字营销影响到线下的销售
- [clicky](http://clicky.com/)  针对小网站和博客，包括实时访客追踪、深度内容分析等高级服务
- [Ptengine](https://www.ptengine.com/)  能够出页面复杂互动元素的热图报告、可实时分析网站数据和用户行为
- [GrowingIO](https://www.growingio.com/) 基于用户行为的新一代数据分析产品。亮点：通过圈选功能，可视化地建立标签、指标和单图。功能：概览（PV、UA），留存（新访、留存、行为类型），看板，单图，用户分群，管理（标签、指标）
- [RisingStack](https://trace.risingstack.com) Node.js和microservices监控解决方案，错误检测,调试,业绩监测和跟踪的分布的服务
- [segmentio/analytics.js](segmentio/analytics.js) 将 analytics.js 无障碍地集成到任何Web应用程序的方法。

## 前端日志记录

- [LogRocket](https://logrocket.com/)

## 异常监测

- [Sentry](https://github.com/getsentry/sentry)
- [TraceKit](https://github.com/csnover/TraceKit)
- [NewRelic](https://newrelic.com/)：性能监控的好工具
- [FunDebug](https://fundebug.com/)

## 广告验证 Verification

- Integral Ad Science
- [DoubleVerify](http://doubleverify.com/)
- [AppsFlyer](https://www.appsflyer.com/)
- [Moat](http://www.moat.com)
- [Adbug Tech](http://www.adbugtech.com/): 分析见 hegek7
- [RTB Asia](http://rtbasia.com)
- [ForensiQ](http://forensiq.com)
- [Sizmek](http://www.sizmek.com)

### 参考资料
- https://onlineadview.wordpress.com/2011/11/06/really-understanding-iframes/
- [Web性能API——帮你分析Web前端性能](http://www.infoq.com/cn/news/2015/06/web-performance-api)
- [Getting maximum from JavaScript error tracking](http://blog.qbaka.com/post/81596992555/getting-maximum-from-javascript-error-tracking)

## 访客唯一标识

- [Web客户端追踪（下）—浏览器指纹追踪](https://paper.seebug.org/229/)：比较全面，覆盖了浏览器指纹追踪、跨浏览器指纹和 WebRTC 等

- [Store.js](https://github.com/marcuswestin/store.js)
- [samyk/evercookie](https://github.com/samyk/evercookie)
- [lucb1e/cookielesscookies](https://github.com/lucb1e/cookielesscookies)
- [fingerprintjs2](https://github.com/Valve/fingerprintjs2)
- [不用Cookie的“Cookie”技术](http://blog.jobbole.com/46266/)
- [取代cookie的网站追踪技术：”帆布指纹识别”初探](http://netsecurity.51cto.com/art/201407/446816.htm)
- [利用图片传输数据的另类思想](https://imququ.com/post/use-image-to-transfer-data.html)
- [像素化你的代码](https://imququ.com/post/code2png-encoder.html)

### 作用

- 广告投放中，受众定向、投放频次控制
- 需求方平台中，区别重定向（site retargeting & personalized retargeting & search retargeting）和新客推荐（look－alike）
- 数据加工与交易中，用户标识、用户行为

#### 用户行为按照对效果广告有效性分类

| 决策行为                               | 主动行为                                     | 半主动行为                     | 被动行为          |
| ---------------------------------- | ---------------------------------------- | ------------------------- | ------------- |
| 转化（conversion）和预转化（pre－conversion） | 广告点击（ad click）、搜索（search）和搜索点击（search click） | 分享（share）和网页浏览（page view） | 广告浏览（ad view） |

### 参考资料

- [CodingLabs](http://blog.codinglabs.org/articles/how-web-analytics-data-collection-system-work.html)
- [聊一聊前端存储那些事儿](http://mp.weixin.qq.com/s?__biz=MzIwNjQwMzUwMQ==&mid=2247484013&idx=1&sn=270295c8a6fe604d22e71d8087297d35)
- [构建可靠的前端异常监控服务-采集篇](http://mp.weixin.qq.com/s/LGbMXauSuuGWcvqazjXWjQ)

## Web智能分析

> 个人的一些思考：基于 CNN 的 Web 智能分析

### 关键角色

|           | 说明                                       |
| --------- | ---------------------------------------- |
| 采集器       | 爬虫主动采集、JS SDK 被动采集                       |
| 识别、截图服务   | 截图的技术，可参见[《云商业智能(Cloud BI)》的“截屏”部分](http://tingge.github.io/html/cloud-bi.html) |
| 计算机视觉智能分析 | 主要使用计算机视觉 CNN 技术                         |

### 流程

1. #### 用户系统测试账号录入和授权

   授权内容主要包括：账号、密码、有效期和频率等

2. #### 爬取和机器识别，生成规则

3. #### 根据规则，账号登录和截屏服务

4. #### 机器学习，智能分析，生成报告

   关键词：深度卷积神经网络

   图谱步骤： 图片归一化：灰度值 = RGB各值的和 / 3 

   计算梯度：

   舍掉局部信息：

   | 报告   | 参考技术                                     |
   | ---- | ---------------------------------------- |
   | 色彩趋势 | 可用 [node-vibrant](https://github.com/akfish/node-vibrant) 提取出图片的主要颜色和百分比，分析出图片的主色调 |
   | 图关键词 | 可调用 [clarifai](https://clarifai.com/developer/) 或同类图像识别 api，标记出内容，自动识别图片的内容，作为图片的关键词 |

### 疑问和结论

1. 合适的图像识别服务？结论：clarifai 同类、[tensorflow/models](tensorflow/models) 等
2. 如何处理账号问题？有权限截图？结论：暂可采用用户授权方式解决。
3. 用户为什么用？怎么用？流量问题？结论：取决于不同报告的价值。

### 参考

- [写给设计师的人工智能指南：图像](https://mp.weixin.qq.com/s?__biz=MzA3MDgyMjMwMA==&mid=2649932923&idx=1&sn=6d2818ab05a3674350360132a3c4fa6e)
- [Google 图片搜索的原理是什么？](https://www.zhihu.com/question/19726630)

## 反馈

[https://github.com/TingGe/web-analytics/issues](https://github.com/TingGe/web-analytics/issues)

## 贡献

https://github.com/TingGe/web-analytics/graphs/contributors

## 许可

(The MIT License)

Copyright (c)  Ting Ge [505253293@163.com
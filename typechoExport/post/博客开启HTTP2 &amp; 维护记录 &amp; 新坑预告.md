---
title: 博客开启HTTP2 &amp; 维护记录 &amp; 新坑预告
type: post
status: publish
summary: ''
slug: '2006'
icon: ''
category: null
date: 1588107660
tags: ''
password: ''
permalink: /archives/2006.html
---

### 开启HTTP2
很久之前HTTP2刚出来的时候就打算开HTTP2，后来Safari测试不兼容就关了。
再后来因为太懒一直没动。
今天看到HTTP3都开始打酱油了，好的我这就开HTTP2。


### 近期博客的维护记录：

我一直以为typecho不更新了，然后忽然发现GitHub一直有commit，所以就折腾了一下。
- 将Apache改为我现在比较熟悉的Nginx
- 将typecho更新到GitHub的master分支
- 将PHP版本升级到7.2
- 将typecho的数据库连接方式改为PDO_MYSQL
- 关闭CDN的302调度
- 关闭CDN的重定向跟随
- 更改CDN的缓存规则，跳过后台地址。
以及上面说的
- 开启HTTP2


### 新项目 StartPages

[GitHub地址][1]

对了最近开了个坑，打算给自己写个网址导航。在公司一直在做微信小程序，空余时间回归正常Web开发换换脑子。主要以下目的
- 熟悉VUE
- 尝试indexedDB
- 换脑子


  [1]: https://zkl2333.github.io/start-pages/

---
title: 我是如何解决CNAME和MX不能共存的问题
type: post
status: publish
summary: ''
slug: 我是如何解决cname和mx不能共存的问题
icon: ''
category: dns
date: 1454652023
tags: ''
password: ''
permalink: /archives/318.html
---

最近使用了大企鹅的域名邮箱，毕竟大企业稳定一点。但是由于我使用了CDN加速，给域名做MX记录的时候却提示MX与CNAME冲突，这是为什么呢？

原来大部分加速服务提供的都是CNAME模式，MX企业邮件记录也必须配置到同一个节点下。而CNAME资源记录出现在一个域名节点，为了确保不会出现不同的解析结果，这个域名节点将不再接受其他记录值。

我的做法是：使用CloudXNS的域名解析服务<del>（原来用马云家的被吐槽了几次，这次刚好换一个）</del>，CloudXNS具备隐式CNAME扩展记录类型（即LINK记录），它可以隐藏当前这一层的配置，直接接管下一层的结果。因此，CloudXNS也可以获得“将MX和CNAME共同配置”类似的解决方案。

如下图所示，在www下配置CNAME到CDN服务提供商，然后在@下配置MX和LINK记录，将www作为被LINK的域名。

<a href="https://www.zkl2333.com/usr/uploads/2016/02/jilu.png" rel="attachment wp-att-357"><img class="alignnone wp-image-357" src="https://www.zkl2333.com/usr/uploads/2016/02/jilu-300x77.png" alt="jilu" width="673" height="173" /></a>

至此，就完美的解决了CNAME和MX不能共存的问题。<del>我是不是应该收点广告费？</del>

参考资料：<a href="https://jingyan.baidu.com/article/63f23628344f0e0209ab3d4f.html" target="_blank">https://jingyan.baidu.com/article/63f23628344f0e0209ab3d4f.html</a>

&nbsp;

&nbsp;
nbsp;

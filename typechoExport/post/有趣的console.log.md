---
title: 有趣的console.log
type: post
status: publish
summary: ''
slug: 有趣的console-log
icon: ''
category: 生活
date: 1486634347
tags: ''
password: ''
permalink: /archives/1345.html
---

最近折腾前端，发现了些有趣的东西。

大家都知道浏览器都自带<strong>开发人员工具</strong>，就算是不会前端膜法的麻瓜都知道按下F12浏览器会蹦出一些奇奇怪怪的东西

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_16-53-31.png"><img class="alignnone wp-image-1347 size-large" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_16-53-31-1024x564.png" width="1024" height="564" /></a>

<!--more-->这东西是对调试网站程序帮助很大，但由于我太咸鱼平时用到的功能不多，对他并不是十分了解

然后今天在调试博客的时候偶然发现了下面这条消息

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-0-29.png"><img class="alignnone wp-image-1348 size-full" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-0-29.png" width="344" height="147" /></a>

哇塞console.log<sup><a href="#1">[1]</a></sup>还能这么玩，这东西还能添加样式的吗？

于是我打开了一些奇奇怪怪的网站……然后我发现了这样一篇知乎<strong><a href="https://www.zhihu.com/question/28831274" target="_blank" rel="noopener">哪些网站有着一些有趣的 console.log 信息？</a></strong>

哇塞简直是打开了新世界的大门，虽然大多数是招聘信息，但还有不少中二度爆表

比如……

<a href="https://www.zkl2333.com/usr/uploads/2017/02/3324c4feb31a6a38a1b7d3aa5b5b7716_b.png"><img class="alignnone size-medium wp-image-1362" src="https://www.zkl2333.com/usr/uploads/2017/02/3324c4feb31a6a38a1b7d3aa5b5b7716_b-300x144.png" alt="" width="300" height="144" /></a>

&nbsp;

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-22-12.png"><img class="alignnone wp-image-1351 size-medium" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-22-12-300x220.png" width="300" height="220" /></a>

还有这个把调试搞得像火箭发射似的……

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-23-49.png"><img class="alignnone wp-image-1352 size-medium" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-23-49-300x87.png" width="300" height="87" /></a>

当然还有牛逼的大神在里面放了个可以玩的2048！

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-27-29.png"><img class="alignnone wp-image-1354 size-medium" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_17-27-29-300x88.png" width="300" height="88" /></a>

<a href="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_16-37-27.png"><img class="alignnone wp-image-1353 size-medium" src="https://www.zkl2333.com/usr/uploads/2017/02/BaiduShurufa_2017-2-9_16-37-27-300x271.png" width="300" height="271" /></a>

大家可以平时多按按<code>Ctrl+Shift+i</code>看看有什么好玩的呀~<sup><a href="#2">[2]</a></sup>

<hr />

<h3>注：</h3>
<ol>
 	<li id="1">console.log的作用：向web控制台输出一条消息，主要是方便你调式javascript用的。你可以看到你在页面中输出的内容。相比alert他的优点是：
<ul>
 	<li>他能看到结构话的东西，如果是alert，淡出一个对象就是[object object],但是console能看到对象的内容。</li>
 	<li>console不会打断你页面的操作，如果用alert弹出来内容，那么页面就死了，但是console输出内容后你页面还可以正常操作。</li>
 	<li>console里面的内容非常丰富，你可以在控制台输入：<code>console</code>，然后就可看到：</li>
</ul>
<pre>Console {memory: MemoryInfo, debug: function, error: function, info: function, log: function…}</pre>
它有网页的各种提示。</li>
 	<li id="2"><code>Ctrl+Shift+i</code>是调出控制台的快捷键</li>
</ol>

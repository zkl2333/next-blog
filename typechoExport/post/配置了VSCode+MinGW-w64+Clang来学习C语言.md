---
title: 配置了VSCode+MinGW-w64+Clang来学习C语言
type: post
status: publish
summary: ''
slug: 配置了vscodemingw-w64clang来学习c语言
icon: ''
category: 学习记录
date: 1511102580
tags: ''
password: ''
permalink: /archives/1884.html
---

配置过程参考逼乎<a href="https://www.zhihu.com/question/30315894" target="_blank" rel="noopener">https://www.zhihu.com/question/30315894</a>，一步一步模仿，虽然看起来繁琐，其实非常简单。虽然现在要在终端把<span class="RichText CopyrightRichText-richText" data-reactid="207">活动代码页改成65001才能正常的显示中文，</span>命令：<code>chcp 65001</code>。

每次打开终端就打这个命令有点麻烦，不过平时需要输出中文的情况并不多，所以就不去注册表改来改去了。

顺便看了下了PowerShell的使用，有类似Linux的命令，非常方便。比如<code>rm ./*.exe</code>可以瞬间删除目录下所有exe文件。用<code>Get-Alias rm</code>可以看到<code>rm</code>只是<code>Remove-Item</code>的别名，我一开始还以为内置Linux终端……

<a href="https://www.zkl2333.com/usr/uploads/2017/11/ps-rm.png"><img class="aligncenter wp-image-1888 size-full" src="https://www.zkl2333.com/usr/uploads/2017/11/ps-rm.png" alt="" width="358" height="149" /></a>

随便写个<code>hahaha.c</code>嗯……很棒

<a href="https://www.zkl2333.com/usr/uploads/2017/11/ha-vsc.png"><img class="aligncenter wp-image-1887 size-full" src="https://www.zkl2333.com/usr/uploads/2017/11/ha-vsc.png" alt="" width="1366" height="768" /></a>

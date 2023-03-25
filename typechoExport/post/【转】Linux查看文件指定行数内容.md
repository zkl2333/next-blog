---
title: 【转】Linux查看文件指定行数内容
type: post
status: publish
summary: ''
slug: '1997'
icon: ''
category: 学习记录
date: 1545226140
tags: ''
password: ''
permalink: /archives/1997.html
---

## Linux查看文件指定行数内容
1、tail date.log               输出文件末尾的内容，默认10行

    tail -20  date.log        输出最后20行的内容

    tail -n -20  date.log    输出倒数第20行到文件末尾的内容

    tail -n +20  date.log   输出第20行到文件末尾的内容

    tail -f date.log            实时监控文件内容增加，默认10行。

2、head date.log           输出文件开头的内容，默认10行

    head -15  date.log     输出开头15行的内容

    head -n +15 date.log 输出开头到第15行的内容

    head -n -15 date.log  输出开头到倒数第15行的内容

3、sed -n "开始行，结束行p" 文件名    

    sed -n '70,75p' date.log             输出第70行到第75行的内容

    sed -n '6p;260,400p; ' 文件名    输出第6行 和 260到400行

    sed -n 5p 文件名                       输出第5行

    tail 和 head 加上 -n参数后 都代表输出到指定行数，tail 是指定行数到结尾，head是开头到指定行数

    +数字 代表整数第几行， -数字代表倒数第几行

原文链接 https://www.cnblogs.com/zeke-python-road/p/9455048.html

---
title: ACM刷题：全排列问题
type: post
status: publish
summary: ''
slug: acm刷题-全排列问题
icon: ''
category: 学习记录
date: 1511105340
tags: ''
password: ''
permalink: /archives/1893.html
---

<dl>
 	<dt>描述</dt>
 	<dd>小明十分聪明，而且十分擅长排列计算。比如给小明一个数字5，他能立刻给出1-5按字典序的全排列，如果你想为难他，在这5个数字中选出几个数字让他继续全排列，那么你就错了，他同样的很擅长。现在需要你写一个程序来验证擅长排列的小明到底对不对。</dd>
</dl>
<dl>
 	<dt>输入</dt>
 	<dd>第一行输入整数N（1&lt;N&lt;10）表示多少组测试数据，
每组测试数据第一行两个整数 n m (1&lt;n&lt;9,0&lt;m&lt;=n)</dd>
 	<dt>输出</dt>
 	<dd>在1-n中选取m个字符进行全排列，按字典序全部输出,每种排列占一行，每组数据间不需分界。如样例</dd>
 	<dt>样例输入</dt>
 	<dd>
<pre>2
3 1
4 2
</pre>
</dd>
 	<dt>样例输出</dt>
 	<dd>
<pre>1
2
3
12
13
14
21
23
24
31
32
34
41
42
43
</pre>
</dd>
</dl>

<hr />

<h3> 解题笔记</h3>
说实话我刚刚看到全排序几个字的时候有点懵逼，后来才想起好像数学老师讲过……言归正传第一个想到的算法是冒泡排序，完全冒泡一遍不就是一个全排列吗！但是貌似和题意不符……貌似应该是一个深度优先算法。总之先搭个框架然后再去温习下算法书233
<pre>#include &lt;stdio.h&gt; 
int main()
{
    int n, a, b;
    scanf("%d", &amp;n);
    getchar();
    for (n; n &gt; 0; n--)
    {
        scanf("%d", &amp;a);
        getchar();
        scanf("%d", &amp;b);
        getchar();
        //开始排列

        //结束排列
    }
    return 0;
}
</pre>
&nbsp;

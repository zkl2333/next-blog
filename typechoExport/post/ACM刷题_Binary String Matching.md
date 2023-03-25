---
title: 'ACM刷题:Binary String Matching'
type: post
status: publish
summary: ''
slug: acm刷题binary-string-matching
icon: ''
category: acm
date: 1510991787
tags: ''
password: ''
permalink: /archives/1866.html
---

<div class="problem-display">
<h2><a href="https://acm.nyist.net/JudgeOnline/problem.php?pid=3" target="_blank" rel="noopener">Binary String Matching</a></h2>
<div class="problem-ins">时间限制：<span id="problem[time_limit]" class="editable highlight">3000</span> ms  |  内存限制：<span id="problem[memory_limit]" class="editable highlight">65535</span> KB</div>
<div class="problem-ins">难度：<span class="editable highlight">3</span></div>
</div>
<div class="clr"></div>
<dl class="problem-display">
 	<dt>描述</dt>
 	<dd>Given two strings A and B, whose alphabet consist only ‘0’ and ‘1’. Your task is only to tell how many times does A appear as a substring of B? For example, the text string B is ‘1001110110’ while the pattern string A is ‘11’, you should output 3, because the pattern A appeared at the posit</dd>
</dl>
<div class="clr"></div>
<dl class="others">
 	<dt>输入</dt>
 	<dd>The first line consist only one integer N, indicates N cases follows. In each case, there are two lines, the first line gives the string A, length (A) &lt;= 10, and the second line gives the string B, length (B) &lt;= 1000. And it is guaranteed that B is always longer than A.</dd>
 	<dt>输出</dt>
 	<dd>For each case, output a single line consist a single integer, tells how many times do B appears as a substring of A.</dd>
 	<dt>样例输入</dt>
 	<dd>
<pre id="sample_input">3
11
1001110110
101
110010010010001
1010
110100010101011</pre>
</dd>
 	<dt>样例输出</dt>
 	<dd>
<pre id="sample_output">3
0
3</pre>
</dd>
 	<dt>来源</dt>
 	<dd><a href="https://acm.nyist.net/JudgeOnline/search_result.php?source=%E7%BD%91%E7%BB%9C" target="_blank" rel="noopener">网络</a></dd>
 	<dt>上传者</dt>
 	<dd><a href="https://acm.nyist.net/JudgeOnline/profile.php?userid=naonao" target="_blank" rel="noopener">naonao</a></dd>
</dl>

<hr />

<h3>代码</h3>
<pre class="hljs"><code><span class="hljs-preprocessor">#<span class="hljs-keyword">include</span> &lt;stdio.h&gt;</span>
<span class="hljs-function"><span class="hljs-keyword">int</span>	<span class="hljs-title">main</span><span class="hljs-params">()</span></span>{
	<span class="hljs-keyword">int</span> n,i,j=<span class="hljs-number">0</span>,k=<span class="hljs-number">0</span>,l=<span class="hljs-number">0</span>;
	<span class="hljs-built_in">scanf</span>(<span class="hljs-string">"%d"</span>,&amp;n);
	getchar();
	<span class="hljs-keyword">char</span> a[<span class="hljs-number">10</span>];
	<span class="hljs-keyword">char</span> b[<span class="hljs-number">1000</span>];
 	<span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;n;i++){
		<span class="hljs-built_in">scanf</span>(<span class="hljs-string">"%s"</span>,a);
		getchar();
		<span class="hljs-built_in">scanf</span>(<span class="hljs-string">"%s"</span>,b);
		getchar();
		<span class="hljs-keyword">while</span>(b[j]!=<span class="hljs-string">'\0'</span>){
			<span class="hljs-keyword">while</span>(a[k]!=<span class="hljs-string">'\0'</span>){
				<span class="hljs-keyword">if</span>(a[k]!=b[j+k]){
				<span class="hljs-keyword">break</span>;
				}
				k++;
				<span class="hljs-keyword">if</span>(a[k]==<span class="hljs-string">'\0'</span>){
					l++;
					<span class="hljs-keyword">break</span>;
				}
			}
			j++;
			k=<span class="hljs-number">0</span>;	
		} 
		<span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d\n"</span>,l);
		k=<span class="hljs-number">0</span>;
		j=<span class="hljs-number">0</span>;
		l=<span class="hljs-number">0</span>;
 	}	
}
</code></pre>
e></pre>

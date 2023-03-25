---
title: 'ACM刷题:括号配对问题'
type: post
status: publish
summary: ''
slug: acm刷题括号配对问题
icon: ''
category: 学习记录
date: 1511192820
tags: ''
password: ''
permalink: /archives/1900.html
---

## 括号配对问题

时间限制： 3000</span> ms  |  内存限制： 65535 KB 
难度：3

## 描述
现在，有一行括号序列，请你检查这行括号是否配对。

### 输入
第一行输入一个数N（0&lt;N&lt;=100）,表示有N组测试数据。后面的N行输入多组输入数据，每组输入数据都是一个字符串S(S的长度小于10000，且S不是空串），测试数据组数少于5组。数据保证S中只含有"[", "]", "(", ")" 四种字符

### 输出
每组输入数据的输出占一行，如果该字符串中所含的括号是配对的，则输出Yes,如果不配对则输出No

### 样例输入
    3
    [(])
    (])
    ([[]()])

### 样例输出
    No
    No
    Yes

来源[网络](https://acm.nyist.net/JudgeOnline/search_result.php?source=%E7%BD%91%E7%BB%9C)

上传者[naonao](https://acm.nyist.net/JudgeOnline/profile.php?userid=naonao)

## 解题思路
用了栈的思想，后进后出。读取一个括号，如果与栈尾配对，则栈尾出栈，否则入栈。

[![](https://www.zkl2333.com/usr/uploads/2017/11/khpd.png)](https://www.zkl2333.com/usr/uploads/2017/11/khpd.png)

## 代码
    #include &lt;stdio.h&gt;
    #define Max 10000
    int main()
    {
        int n;
        scanf("%d", &n);
        while (n > 0)
        {
            char s[Max], t[Max];
            //printf("%d inpot=", n);//debug
            scanf("%s", s);
            int j = 0, i = 0;
            //printf("pdstart\n");//debug
            while (s[i] != '\0')
            {
                t[j] = s[i]; //入栈
                //printf("j=%d\t", j);//debug
                t[j + 1] = '\0'; //关闭
                //打印配对前栈
                //printf("t=%s\t", t);//debug
                //配对
                if ((t[j] == ']' && t[j - 1] == '[') || (t[j] == ')' && t[j - 1] == '('))
                {
                    j = j - 1;
                    t[j] = '\0'; //出栈
                    //printf("j=%d\t->\t", j);//debug
                }
                else
                {
                    j++;
                    //printf("j=%d\t--\t", j);//debug
                }
                i++;
                //打印配对后栈
                //printf("t=%s\n", t);//debug
            }
            if (t[0] == '\0')
            {
                printf("Yes\n");
            }
            else
            {
                printf("No\n");
            }
            //printf("pdend\n");//debug
            n--;
        }
        return 0;
    }
    

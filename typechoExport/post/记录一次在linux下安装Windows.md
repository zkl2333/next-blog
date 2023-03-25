---
title: 记录一次在linux下安装Windows
type: post
status: publish
summary: ''
slug: 记录一次在linux下安装windows
icon: ''
category: 瞎折腾
date: 1466256609
tags: ''
password: ''
permalink: /archives/833.html
---

上次一时冲动装了xUbuntu把整个硬盘格式化了，使用一周后感觉日常用linux很傻逼。

所以尝试在linux下制作Windows的启动盘。

最开始用dd命令把win10的ISO写入一块废弃的移动硬盘，失败，结果还是败在引导上。

后使用grub4doc将ISO镜像虚拟到内存(<a href="https://www.mintos.org/hardware/usb-linux-winpe.html" target="_blank">参考资料</a>)，成功进入安装程序。目前屏幕一片酱紫。

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60618-221306.jpg"><img class=" aligncenter" title="P60618-221306.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60618-221306.jpg" alt="image" width="373" height="503" /></a>

<hr />

十分钟后安装程序抛出一个错误

缺少介质驱动。百度一番后，大概是分区对齐之类的问题。由于我半吊子的水平完全不想去看gpt、efi之类的东西。

所以我决定抱着侥幸心理，使用win7的镜像来再一次安装。

挂机下win7，睡觉~zZ

2016.6.18

<hr />

啊，今天又找到个pe的ISO，一并丢到启动项。

不过现在先试试直接装win7
<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-092313.jpg"><img class="aligncenter size-full" title="P60619-092313.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-092313.jpg" alt="image" /></a>

fuck！和昨天一样的问题。

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-092946.jpg"><img class="aligncenter size-full" title="P60619-092946.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-092946.jpg" alt="image" /></a>

进入pe失败，grub报错为不是可执行文件。。。

摆渡一番后我减压pe的ISO到根目录，用grub引导bootmgr

成功进入pe

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-100515.jpg"><img class="aligncenter size-full" title="P60619-100515.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-100515.jpg" alt="image" /></a>

使用pe中的nt6开始安装

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-102230.jpg"><img class="aligncenter size-full" title="P60619-102230.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-102230.jpg" alt="image" /></a>

未知原因的格式化失败。使用pe内的工具手动格式化为NTFS。之后就是等待了…

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-102230-1.jpg"><img class="aligncenter size-full" title="P60619-102230.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-102230-1.jpg" alt="image" /></a>

重启之后理应进入win7安装程序，but入眼的xubuntu真是好烦躁。现在的引导出奇的混乱。硬盘里已经好像有好多引导程序了，谁引导谁啊啊，谁优先啊啊啊，好多好多好麻烦(つд⊂)

现在有两种选择
1.快刀斩乱麻！再全盘格了！之后学习建立有序的引导环境！
2.慢慢学习摆渡寻找解决方案。

由于时间吃紧加上懒癌晚期

格了吧(இωஇ )

柳暗花明又一村！我忽然发现在Ubuntu运行<code>sudo update-grub</code>即可自动检查已存在的系统并更新引导表！啊呵呵哈哈哈我真是天才。

安装ing

<a href="https://www.zkl2333.com/usr/uploads/2016/06/p60619-111123.jpg"><img class="aligncenter size-full" title="P60619-111123.jpg" src="https://www.zkl2333.com/usr/uploads/2016/06/p60619-111123.jpg" alt="image" /></a>

安装成功(๑•॒̀ ູ॒•́๑)啦啦啦

<a href="https://www.zkl2333.com/usr/uploads/2016/06/wp-1466306162010.jpg"><img class="aligncenter size-full" title="wp-1466306162010" src="https://www.zkl2333.com/usr/uploads/2016/06/wp-1466306162010.jpg" alt="image" /></a>

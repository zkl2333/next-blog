---
title: 本站进入https时代！我们可以说些悄悄话了~
type: post
status: publish
summary: ''
slug: 本站进入https时代-我们可以说些悄悄话了
icon: ''
category: WordPress
date: 1471174446
tags: ''
password: ''
permalink: /archives/963.html
---

早上签沃通证书又被 @xiashali 童鞋吐槽，于是就让他帮我签了个 COMODO 的证书 233333

其他没啥好写的，就记录下跳 https 的方法吧。
<pre class="">通过修改 .htaccass 文件实现全站强制跳转 https！

# BEGIN WordPress

RewriteEngine On
RewriteCond %{HTTPS} !^on$ [NC]
RewriteRule (.*) https://%{SERVER_NAME}%{REQUEST_URI} [L,R=301]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# END WordPress
</pre>

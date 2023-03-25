---
title: 今日踩坑：node-sass不支持node15，使用dart-sass代替node-scss
type: post
status: publish
summary: ''
slug: '2010'
icon: ''
category: 学习记录
date: 1603955134
tags: ''
password: ''
permalink: /archives/2010.html
---

早上一个`uni-app cli`项目`npm install`报错，定位到`node-sass`。

一开始以为是`node-gyp`的错，因为报错信息有一句`Try to update node-gyp`，但是仔细一看是一个叫`win32-x64-88_binding.node`的包404了。

然后去[https://github.com/sass/node-sass/releases/tag/v5.0.0][1]看发现支持node15的版本还在```Pre-release```状态。

```bash
npm i node-sass@5.0.0 //失败 不存在这个版本
```

弃坑 改用dart-sass
```bash
npm rm node-sass -D
npm i sass -D
```

项目根目录新建`vue.config.js`，修改loader。
```javascript
module.exports = {
	css: {
		loaderOptions: {
			sass: {
				implementation: require("sass") // This line must in sass option
			}
		}
	}
};

```
之后就一切正常了。
完结撒花.jpg


  [1]: https://github.com/sass/node-sass/releases/tag/v5.0.0

---
layout: post
keywords: "reading"
description: "使用github搭建自己的免费，不限流量的blog"
title: "使用github搭建自己的免费，不限流量的blog "
categories: [blog]
tags: [yhawaii,blog,python]
group: archive
icon: file-alt
---
{% include site/setup %}

##第一次使用git
###安装git
假如你已经安装了git；或者你是使用Mac OS X 并且安装了Xcode的话，系统默认就已经带了git了，你直接跳过本节，阅读下一节就可以了。

假如没有安装好git，请参阅[git官方](http://git-scm.com/book/zh/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git/)文档，根据自己的操作系统,安装git，

安装好git之后，你需要在终端中输入下面两条命令，配置用户信息和电子邮件地址：
	
	git config --global user.name "yourname"	
	git config --global user.email xxx@gmail.com

## 在github上新建一个
##命令
1. git init
2. git checkout --orphan gh-pages
3. git add .
4. git commit -m "first post"
5. git remote add origin https://github.com/yhawaii/blog.git
6. git push origin gh-pages


## Markdown对表格的支持
### 使用所见即所得编辑器 Mou
假如你使用的是Mac OSX ，就可以使用[Mou](http://mouapp.com/)。
其它平台类似Mou的软件

### 使用在线编辑工具
Markdown支持html，所以我们可以用html来写表格。但是......用html写表格，实在太麻烦了，这里有个简单的转换方法，
举例，假设有这样一个表格，内容如下：

时间 地点 人物
3月5日 北京 姚明
3月7日 上海 韩寒

处理方法如下：

从word或excel中复制表格

打开[excel，markdown表格转换器](http://pressbin.com/tools/excel_to_html_table/index.html)

贴上复制的文字，然后按convert，就会得到这个表格的代码.


###参考资料
#### [git官方中文文档](http://git-scm.com/book/zh)
####git 分支介绍：
git分支的介绍,可参考阮一峰的[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)
---
layout: post
keywords: "reading"
description: "Mac下jekyll环境的搭建"
title: "Mac下jekyll环境的搭建"
categories: [blog]
tags: [yhawaii,blog,python]
group: archive
icon: file-alt
---
{% include site/setup %}

##1. ruby环境安装

[天朝ruby源替换](http://ruby.taobao.org/)

可参考[如何在Mac OS X下升级Ruby到1.9.3版本](http://www.inferjay.com/blog/2013/05/09/how-to-install-ruby-1-dot-9-3-in-mac-osx/)

jekyll需要ruby1.9以上的版本，使用*ruby -v* 查看ruby版本，我本机的版本是1.8
	
	ruby 1.8.7 (2012-02-08 patchlevel 358) [universal-darwin12.0]

所以需要进行升级：
###1 安装rvm
单用户安装，在终端中输入：

	bash < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )
	
为所有用户安装：
	
	sudo bash < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )

安装完成之后，重启终端，然后在终端中输入：
	
	rvm -v
终端输出为：
		
	rvm 1.25.10 (master) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
	
###2 安装ruby

检查是否安装gcc编辑器，在开始安装ruby前请确认你是否安装了gcc，如果你安装了Xcode，请检查是否安装了command line tools, 打开Xcode，在Xcode -> Preference -> Download下，查看“Command Line tools”这一项是否为“installed” 如下图： 
![](http://www.inferjay.com/images/notes_images/xcode_download_info.png)


查看所有可以安装的Ruby版本
	
	rvm list known
	
安装Ruby,为了避免多次输入用户密码，可以使用sudo ：
	
	rvm install ruby --head
	
设置Ruby默认版本
	
	rvm use version-num --default #version-num是待设置的版本号，比如2.1.0
	
##2.安装gem
到 [RubyGems](https://rubygems.org/pages/download)官网下载文件，并按官方文档进行操作

## 3.使用gem安装jekyll

在终端中输入如下命令：
	
	$ sudo gem install jekyll	
	
	
## 4.jekyll使用总结
### 分组(group)
jekyll中默认带有的分组：
navigation,




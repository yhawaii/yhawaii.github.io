---
layout: post
keywords: "Mac"
description: " Mac下使如何使alias永久有效"
title: " Mac下使如何使alias永久有效"
categories: [Mac]
tags: [Mac]
group: archive
icon: file-alt
---
{% include site/setup %}


##0. 简述
linux/mac下的自定义命令alias，并保存别名使其永久生效（重启不会失效）


##1. 操作
现在做开发每次提交代码的命令都是一长串参数，不想去记，于是可以使用alias命令来解决这个问题：
alias aCommandAlias='aCommand 一堆参数什么的'

比如
alias gpush='git push origin HEAD:refs/for/master'

这样在终端中，只需要输入gpush就ok了。
——–
但是只是这样的话，会在重启之后失效，解决办法是编辑~/.bashrc文件，每行加入一个alias命令。比如：

	alias cdhome='cd ~'
	alias cdroot='cd /'
	alias gpull='git pull'
	alias gci='git commit -a'
	alias gpush='git push origin HEAD:refs/for/master'
	alias gst='git status'

保存文件后，运行(不然不生效):
	
	source ~/.bashrc

就可以了。

如果还不行的话，说明没有~/.bash_profile文件，或者文件中没有执行.bashrc文件。

(.bash_profile文件是用户登陆终端的时候会自动执行的文件，一般此文件中会调用.bashrc)

如果是这样，需要打开（如果没有的话先创建）文件：

	~/.bash_profile
在里面加入一行：

	source ~/.bashrc

就ok了。
我在mac系统下测试ok的。


或者

vim /etc/profile

设定 alias 内容
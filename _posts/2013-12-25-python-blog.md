---
layout: post
keywords: "reading"
description: "快速部署支持 Markdown 和 LaTeX 等格式的网站 "
title: "快速部署支持 Markdown 和 LaTeX 等格式的网站 "
categories: [blog]
tags: [yhawaii,blog,python]
group: archive
icon: file-alt
---
{% include site/setup %}



##0. What is Zbox-Wiki?
Zbox-Wiki 是一位名为 Shuge Lee 的开源爱好者编写的软件，用于搭建简单而轻便的个人或团队 Wiki 站点。Zbox-wiki 由 python 编写，支持 Markdown、Tex/Latex、Graphviz/dot。Zbox-wiki 有以下特点（摘自simple-is-better.com）：

它能用，真的能用
基于 web.py 写，部分脏活粗暴直接调用 find grep 来干
支持 markdown 标记
不用数据库，粗暴直接读写文本文件，你可以用 Firefox + It’s all text + 任意编辑器更新 wiki ，或者直接 修改对应的文本文件
支持简单的 LaTeX (确保你机器上安装了 latex 和 dvipng)
自动生成 table of content
代码高亮显示
button-mode path
下面开始介绍如何搭建这个短小精悍的 Wiki 站点。

##1. 依赖
###setuptools

	wget http://peak.telecommunity.com/dist/ez_setup.py
	python ez_setup.py


参考：[webutils Homepage](http://pypi.python.org/pypi/webutils)

###webutils
	wget http://pypi.python.org/packages/source/w/webutils/webutils-0.9.tar.gz#md5=7501f47b7499cd7b05e2789c27224615
	tar zxvf webutils-0.9.tar.gz
	cd webutils-0.9
	python setup.py build
	sudo python setup.py install

参考：[web.py Install Guide](http://webpy.org/install)

### web.py

	wget http://webpy.org/static/web.py-0.36.tar.gz
	tar zxvf web.py-0.36.tar.gz
	cd web.py-0.36
	sudo python setup.py install
	

## 2. 安装
[参考:Zbox-Wiki README](https://github.com/shuge/zbox_wiki/blob/master/README.md)

	git clone git://github.com/shuge/zbox_wiki.git
	cd zbox_wiki
	sudo python setup.py build
	sudo python setup.py install
	zwadmin.py --create /tmp/my_instance
	sed -i -e  s/readonly\ =\ True/readonly\ =\ False/g /tmp/foo/myproj/conf.py
	

##3. 启动
指定启动端口为8080，读者可自行修改。

zwd.py --path /tmp/foo/myproj --port 8080


##4. 添加文档
将你的文档添加到your_path/pages/zbox-wiki目录下即可。
Zbox-Wiki 支持自建目录，并会递归搜索形成1个的列表（注意是1个）。
如果想修改文档目录显示方式，可修改zbox_wiki/main.py文件。

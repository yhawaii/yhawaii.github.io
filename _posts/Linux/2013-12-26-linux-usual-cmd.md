---
layout: post
keywords: "Linux"
description: "Linux 常用命令 "
title: "Linux 常用命令 "
categories: [Linux]
tags: [Linux]
group: archive
icon: file-alt
---
{% include site/setup %}


##1.目录操作

### mkdir

创建目录命令
	
	-p 递归创建不存在的目录
	-v verbose模式
### rmdir
删除目录命令

### pwd
	
	-p 文件的物理路径
	-l 链接路径
### cd

### ls

##2.文件查看操作

### cat
将文件内容一次性显示到屏幕
	
	-A 相当于-vET的整合参数,列出一些特殊字符[包括tab键和换行]
	-n 显示行号
	-T 将tab键以：∧I显示出来
	-E 将结尾的换行符显示出来
	-v 列出一些看不出来的特殊字符[特殊字符，不包括tab和换行]
	cat file1 file2 > file3可作合并文件用
	cat file1 > file2  可做复制文件用
	
### tail
	反序输出，把文件内容反过来显示，文件内容的最后一行先显示，第一行最后显示。正好与cat相反
 
### tee
	双重定向
### nl
	显示的时候,输出行号
	
	-b a:表示不论是否为空行,同意列出行号 -b t:如果有空行,空行不要列出行号【默认 的】
	-n ln:行号在屏幕的最左方显示
	-n rn:行号在字段的最右方显示,且不加0 【同默认】
	-n rz:行号在字段的最右方显示,且加 0 -w:行号字段占用的位数	

### od
	以二进制方式读取文件内容
	
### more ,less

### head
	
	-n 显示前n行
### tail 

和head相反，显示后n行
	
	-n 显示后n行
### wc
统计命令，wc [- options] [filname]
	
	-c 显示字符数
	-l 显示行数
	-L显示一个文件中的最长行的长度
	-w显示单词数量

## 3 文件增/删/改
### cat
### cp
cp [-options] src_file des_file

### mv
### rm
### ln

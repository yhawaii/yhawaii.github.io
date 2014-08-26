---
layout: post
keywords: "PJSip"
description: "PJSip 开发笔记 "
title: "PJSip 开发笔记 "
categories: [voip]
tags: [voip]
group: archive
icon: file-alt
---
{% include site/setup %}

#PJSip developer's guild翻译


# 第一章：通用设计
## 1.1 架构
### 1.1.1 通信图
下图展示了sip消息如果在pjsip组件之间被来回传递：
![](http://yhawaii.github.io:1397/assets/themes/yhawaii/images/pjsip_dev_guild/pjsip_dev_ch1_f1.png)

### 1.1.2 类图
下图显示了类图：
![](http://yhawaii.github.io:1397/assets/themes/yhawaii/images/pjsip_dev_guild/pjsip_dev_ch1_f2.png)
## 1.2 Endpoint
sip协议栈的核心就是sip endpoint，endpoint使用非透明类型pjsip_endpoint来表示。endpoint含有以下的属性和责任：

* 含有内存池工厂，用于为所有的sip组件(sip componets)初始化内存池
* 含有timer栈实例，用于为所有的sip组件调度定时器
* 含有传输管理器实例。传输管理
---
layout: post
keywords: "Objective-C,iOS,persistence"
description: "iOS 持久化 "
title: "iOS 持久化 "
categories: [iOS]
tags: [iOS]
group: archive
icon: file-alt
---
{% include site/setup %}


## 概述
iOS中的持久化方式有以下几种：
1. plist文件
2. archive打包


避免过度使用单例，可以使用依赖注入:



## Core Data
Core Data是一个模型层的技术，它帮助你建立代表程序状态的模型层。Core Data 也是一种持久化技术，它能将模型对象的状态持久化到磁盘，但它最重要的特点是：Core Data 不仅是一个加载、保存数据的框架，它还能和内存中的数据很好的共事。

如果你之前曾经接触过 Object-relational maping (O/RM)：Core Data不是一个 O/RM，但它比 O/RM 能做的更多。如果你之前曾经接触过 SQL wrappers：Core Data 不是一个 SQL wrapper。它默认使用 SQL，但是，它是一种更高级的抽象概念。如果你需要的是一个 O/RM 或者 SQL wrapper，那么 Core Data 并不适合你。

对象图管理（object graph management）是 Core Data 最强大的功能之一。

还有一点要注意：Core Data 是完全独立于任何 UI 层级的框架。它是作为模型层框架被设计出来的。在 OS X 中，甚至在一些后台驻留程序中，Core Data 都起着非常重要的意义。

## iOS系统架构
### MVVM架构
### VIPER
VIPER 是一个创建 iOS 应用简明构架(clean architecture)的程序。VIPER 是视图 (View)，交互器 (Interactor)，展示器 (Presenter)，实体 (Entity) 以及路由 (Routing) 的首字母缩写。简明架构将一个应用程序的逻辑结构划分为不同的责任层。这使得它更容易隔离依赖项 (如数据库)，也更容易测试各层间的边界处的交互：

VIPER 的主要部分是：

* 视图：根据展示器的要求显示界面，并将用户输入反馈给展示器。
* 交互器：包含由用例指定的业务逻辑。交互器在应用中代表着一个独立的用例。它具有业务逻辑以操纵模型对象（实体）执行特定的任务。交互器中的工作应当独立与任何用户界面.
* 展示器：包含为显示（从交互器接受的内容）做的准备工作的相关视图逻辑，并对用户输入进行反馈（从交互器获取新数据）。展示器是一个主要包含了驱动用户界面的逻辑的 简单对象，它总是知道何时呈现用户界面。基于其收集来自用户交互的输入功能，它可以在合适的时候更新用户界面并向交互器发送请求。
* 实体：包含交互器要使用的基本模型对象。
* 路由：包含用来描述屏幕显示和显示顺序的导航逻辑。
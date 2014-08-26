---
layout: post
keywords: "sqlite学习"
description: "sqlite学习 "
title: "sqlite学习 "
categories: [数据库]
tags: [数据库]
group: archive
icon: file-alt
---
{% include site/setup %}

# sqlite使用

## 简介
一般情况下，SQLite 在三个主要的方面具有局限性：

* 并发。
* 数据库大小
* 网络

尽管 SQLite 做得已经很好了，但仍有部分特性未能实现，包括：
*  外键约束
	SQLite 3.6.18 之后才支持外键约束，需要使用**PRAGMA foreign_keys = ON;**打开外键支持。
* 完整的触发器支持。
* 完整的 ALTER TABLE 支持。
* 事务嵌套。
* RIGHT 和 FULL OUTER JOIN。
* 可修改视图。
* GRANT 和 REVOKE

## 字段类型和亲和性(Type Affinity)
首先，每个字段都具有一种亲和性。共有四种亲和性：NUMERIC、INTEGER、TEXT 和NONE。一个字段的亲和性由它预声明的类型决定。所以，当你为字段声明了类型，从根本上说是为字段指定了亲和性。SQLite 按下面的规则为字段指派亲和性：

* 默认的，一个字段默认的亲和性是 NUMERIC。如果一个字段不是 INTEGER、TEXT或 NONE 的，那它自动地被指派为 NUMERIC 亲和性。
*  如果为字段声明的类型中包含了'INT'(无论大小写)，该字段被指派为 INTEGER 亲和性。
* 如果为字段声明的类型中包含了'CHAR'、'CLOB'或'TEXT'(无论大小写)，该字段被指派为TEXT 亲和性。如'VARCHAR'包含了'CHAR'，所以被指派为 TEXT 亲和性。
* 如果为字段声明的类型中包含了'BLOB'(无论大小写)，或者没有为该字段声明类型，该字段被指派为 NONE 亲和性。

注意：如果没有为字段声明类型，该字段的亲和性为 NONE，在这种情况下，所有的值都将以它们本身的(或从它们的表示法中推断的)存储类存储。如果你暂时还不确定要往一个字段里放什么内容，或准备将来修改，用 NONE 亲和性是一个好的选择。但 SQLite 默认的亲和性是 NUMERIC。例如，如果为一定字段声明了类型 JUJYFRUIT，该字段的亲和性不是NONE，因为 SQLite 不认识这种类型，会给它指派默认的 NUMERIC 亲和性。所以，与其用一个不认识的类型最终得到 NUMERIC 亲和性，还不如不为它指定类型，从而使它得到NONE 亲和性。
### 亲和性和存储
亲和性对值如何存储到字段有影响，规则如下：

* 一个 NUMERIC 字段可能包括所有 5 种存储类。一个 NUMERIC 字段具有数字存储类的偏好(INTEGER 和 REAL)。当一个 TEXT 值被插入到一个 NUMERIC 字段，将会试图将其转化为 INTEGER 存储类；如果转化失败，将会试图将其转化为 REAL 存储类；如果还是失败，将会用 TEXT 存储类来存储。
*  一个 INTEGER 字段的处理很像 NUMERIC 字段。一个 INTEGER 字段会将 REAL 值按REAL存储类存储。也就是说，如果这个REAL值没有小数部分，就会被转化为INTEGER存储类。INTEGER 字段将会试着将 TEXT 值按 REAL 存储；如果转化失败，将会试图将其转化为 INTEGER 存储类；如果还是失败，将会用 TEXT 存储类来存储。
*  一个 TEXT 字段将会把所有的 INTEGER 或 REAL 值转化为 TEXT。
*  一个 NONE 字段不试图做任何类型转化。所有值按它们本身的存储类存储。
*  没有字段试图向 NULL 或 BLOB 值转化——如无论用什么亲和性。NULL 和 BLOB 值永远都按本来的方式存储在所有字段。

这些规则初看起来比较复杂，但总的设计目标很简单，就是：如果你需要，SQLite 会尽量模仿其它的关系型数据库。也就是说，如果你将 SQLite 看成是一个传统数据库，类型亲和性将会按你的期望来存储值。如果你声明了一个 INTEGER 字段，并向里面放一个整数，就会按整数来存储。如果你声明了一个具有 TEXT, CHAR 或 VARCHAR 类型的字段并向里放一个整数，整数将会转化为 TEXT。可是，如果你不遵守这些规定，SQLite 也会找到办法来存储你的值。

## 数据库配置
SQLite 没有配置文件。所有这些配置参数都是用 `pragma` 来实现。`Pragma` 以独特的方式工作，有些像变量，又有些像命令。

`连接缓冲池大小`

获取PRAGMA cache_size;设置PRAGMA cache_size = 10000;

`获得数据库信息`

* database_list: 列出附加的数据库
* index_info: 查看指定名称的索引信息，eg:`index_info(index_name),`其中参数为索引的名称
* index_list: 查看表的索引信息，eg : `index_list(tb_name),`其中参数为表的名称.
* table_info: 查看表信息，eg : `pragma table_info(tb_name),`其中tb_name为表名.

## 其它
附加(Attaching)数据库，ATTACH 的语法为：ATTACH [DATABASE] filename AS database_name;

#sqlite源码学习

## sqlite简介

<br />

		SQLite是一个开源的嵌入式关系数据库，它在2000年由D. Richard Hipp发布，它的减少应用程序管理数据的开销，SQLite可移植性好，很容易使用，很小，高效而且可靠。

		SQLite嵌入到使用它的应用程序中，它们共用相同的进程空间，而不是单独的一个进程。从外部看，它并不像一个RDBMS，但在进程内部，它却是完整的，自包含的数据库引擎。

		嵌入式数据库的一大好处就是在你的程序内部不需要网络配置，也不需要管理。因为客户端和服务器在同一进程空间运行。SQLite 的数据库权限只依赖于文件系统，没有用户帐户的概念。SQLite 有数据库级锁定，没有网络服务器。它需要的内存，其它开销很小，适合用于嵌入式设备。你需要做的仅仅是把它正确的编译到你的程序。

### 参考资料
		
[sqlite官网](http://www.sqlite.org/)

 
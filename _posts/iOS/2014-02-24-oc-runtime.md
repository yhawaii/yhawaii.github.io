---
layout: post
keywords: "Objective-C,runtime"
description: "Objective-C运行时 "
title: "Objective-C运行时 "
categories: [iOS]
tags: [iOS]
group: archive
icon: file-alt
---
{% include site/setup %}

## 参考资料
----


[by your_cmd](http://blog.securemacprogramming.com/2013/12/by-your-_cmd)

[理解objective-c运行时环境](http://www.cnblogs.com/yishuiliunian/archive/2013/01/10/2855620.html)

[Method Swizzling](http://www.cocoachina.com/applenews/devnews/2014/0225/7880.html)

[类对象和元类对象](http://blog.csdn.net/wzzvictory/article/details/8592492)

## 概述
The Objective-C language defers as many decisions as it can from compile time and link time to runtime. Whenever possible, it does things dynamically. This means that the language requires not just a compiler, but also a runtime system to execute the compiled code. The runtime system acts as a kind of operating system for the Objective-C language; it’s what makes the language work.

Objective-C语言尽可能的推迟决定到运行时，而不是在编译和链接时候决定。任何可能的时候，它都是动态的执行。这意味着这门语言不仅仅需要编译器，而且需要运行时系统来执行编译后的代码。运行时系统为Objective-C语言扮演着这一操作系统的职责；这就是让这门语言工作的东西。
This document looks at the NSObject class and how Objective-C programs interact with the runtime system. In particular, it examines the paradigms for dynamically loading new classes at runtime, and forwarding messages to other objects. It also provides information about how you can find information about objects while your program is running.
You should read this document to gain an understanding of how the Objective-C runtime system works and how you can take advantage of it. Typically, though, there should be little reason for you to need to know and understand this material to write a Cocoa application.

## 1. 同运行时交互的三种方法

### objective-c源代码(Objetive-C source code)
大部分时候，运行时系统都自动在背后运行。你仅仅在编写和编译Objective-C源代码的时候使用它。

当你编译的代码中包含Objective-C类和方法(methods)的时候,编译器调用该语言的动态特性实现来创建数据结构和函数(function)。该数据结构捕获找到的类和分类(category)的定义信息，它们(数据结构)包含在Objective-C语言中如何定义一个类和协议对象，方法选择器，实例变量模板，以及其它从源代码中提取的信息。

### NSObject中的方法(NSObject methods)

cocoa大多数的类是从NSObject继承的，所以大多数的对象都集成了NSObject中所定义的方法。(比较典型的不从NSObject继承的例子就是NSProxy类)。

### 运行时方法(Runtime fuctions)

## 2 消息的发送 (Messaging)
### obj_msgSend方法
在Objective-C中，消息直到运行时之前都是没有被绑定的。编译器将消息表达式进行转换.
```
objc_msgSend(receiver, selector)
objc_msgSend(receiver, selector, arg1, arg2, ...)
```

objc_msgSend方法为动态绑定做好了所有必须的事情(条件)。
* 它首先找到选择器(selector)对应的处理。因为同一个方法在不同的类中有不同的实现，这个精确的处理依赖与类的接受者
*  其次调用处理，传递接受者，以及该方法指定的伴随参数
*  最后，传递处理之后的返回值作为返回

消息的关键在于，编译器生成每个类和对象结构。每个类结构基本包括两个要素：
* 指向父类的指针。
* 一个类的选择器分发表(a class dispatch table)。

为了加速消息的处理，运行时系统缓存使用过的选择器(selector)和方法地址，每个类都有单独的缓存，并且它和类中定义的方法一样，也包含继承而来的选择器。在查找分发表之前，消息首先检查缓存中是否有接受对象的类，假如方法的选择器已经在缓存中，消息仅仅是比直接的函数调用稍慢一点。一旦程序运行得足够久来唤醒缓存，几乎所以的消息发送都会在缓存方法中，缓存动态适应程序运行中的新消息，
### 使用隐藏参数

当objc_msgSend查找方法的实现处理时候，它会调用处理这和传递给消息的所有参数。它也传递2个隐藏处理参数

* 消息接收者
* 方法的selector(then selector for the method)

```
- strange {    id  target = getTheReceiver();    SEL method = getTheMethod();     if ( target == self || method == _cmd )          return nil;     return [target performSelector:method];  }
```

### 获取方法地址

避免动态绑定的唯一方式就是获取

## 3 动态方法解析

### 动态方法解析
在某种情况下，你可能需要动态提供方法的实现。比如说，Objective-C定义动态属性特性，使用@dynamic指令：
```
@dynamic propertyName;
```

这将告诉编译器，该属性指定的setter,getter方法将被动态提供。
所以动态方法解析的实现步骤：
1. 你可以实现resolveInstanceMethod: 和 resolveClassMethod: 方法来为指定的selector动态提供实例或者类方法实现。
2. 使用`class_addMethod(Class cls, SEL name, IMP imp, const char *types)`方法动态添加实现方法。

demo:
```
void dynamicMethodIMP(id self, SEL _cmd) {
    // implementation ....
}
@implementation MyClass
+ (BOOL)resolveInstanceMethod:(SEL)aSEL
{
    if (aSEL == @selector(resolveThisMethodDynamically)) {
          class_addMethod([self class], aSEL, (IMP) dynamicMethodIMP, "v@:");
          return YES;
    }
    return [super resolveInstanceMethod:aSEL];
}
@end
```


### 动态加载(dynamic loading)
一个Objective-C程序可以在运行时加载和链接新的类和分类(categories).新的代码编入编入程序，并且同在开始时加载的类和分类进行一致的处理。

动态加载可以用于很多不同的事情，比如，系统的System Preferences影院的可变模块就是动态加载的。

在Cocoa环境中，动态加载常用于允许应用可定制化。其他的开发人员可以在你的程序中编写在运行时加载的模块，就像interface builder加载自定义调色板和Mac OS X系统预制的应用程序加载自定义喜欢的模块。

虽然运行时方法提供了动态加载Mach-O文件中的Objective-C模块，cocoa的NSBundle类提供了引人注目的方便的动态加载接口--一个面相对象和集成相关服务的接口。


## 4 消息转发(Message forwarding)

发送一个消息给一个不处理该消息的对象是一个错误的操作。但是，在报出错误之前，运行时系统给的消息的接收对象第二次机会来处理消息。

### 转发(forwarding)

假如你发送一个消息给一个不处理该消息的对象，在报错之前，运行时发送带单个NSInvocation对象参数的forwardInvocation:消息给该对象，在传递消息的时候，这个NSInvocation对象封装了原始的消息和参数。

你可以实现forwardInvocation:方法来指定一个默认的响应消息，或者使用其它方法来避免错误。就像它的名称所表示的一样，forwardInvocation: 方法常用于将消息转发给另一个对象。

为了达到消息转发的目的，所有的forwardInvocation:方法都必须做以下2件事：
* 决定消息将向哪儿发送
* 发送它原始的参数

一个forwardInvocation:方法为未识别消息(unrecognized messages)扮演一个分发中心的角色，将他们打包给其它的不同接收者，或者它可以作为一个转换状态，将所有消息发送同一目的接收者。它可以将一个消息转换成另一个，或者仅仅是在没有响应或者报错的时候“吞噬”一些方法。一个forwardInvocation:方法也可以将几个消息合并成为单个响应.forwardInvocation:方法将要做些什么决定于它的具体实现者。不管怎样，它提供了一个转发链链接对象的机会，打开了程序设计的可能性。


### 转发和多重继承(Forwarding and Mutiple Inheritance)

### 代理对象(Surrogate objects)

### 转发和继承(forwarding and inheritance)

消息的转发可以实现多继承，实现多继承的步骤：
1.  新建一个类，类中重写respondsToSelector:方法
2.  重写methodSignatureForSelector:方法
3.  重写forwardInvocation:方法

```
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    NSMethodSignature *sig;
    sig = [realObject1 methodSignatureForSelector:aSelector];
    if (sig) return sig;
    sig = [realObject2 methodSignatureForSelector:aSelector];
    return sig;
}

// Invoke the invocation on whichever real object had a signature for it.
- (void)forwardInvocation:(NSInvocation *)invocation {
    id target = [realObject1 methodSignatureForSelector:[invocation selector]] ? realObject1 : realObject2;
    [invocation invokeWithTarget:target];
}

// Override some of NSProxy's implementations to forward them...
- (BOOL)respondsToSelector:(SEL)aSelector {
    if ([realObject1 respondsToSelector:aSelector]) return YES;
    if ([realObject2 respondsToSelector:aSelector]) return YES;
    return NO;
}
```

## 5 类型编码


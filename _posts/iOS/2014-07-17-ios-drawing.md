---
layout: post
keywords: "iOS,Core Animation,Core Graphics,Quartz"
description: "iOS 图形绘制"
title: "iOS 图形绘制"
categories: [iOS]
tags: [iOS]
group: archive
icon: file-alt
---
{% include site/setup %}

# iOS图形绘制专题

## 相关书籍
[Core Animation for Mac OS X and the iPhone](http://www.ppurl.com/2009/06/core-animation-for-mac-os-x-and-the-iphone.html)

[From Idea to App: Creating iOS UI, animations, and gestures](http://www.ppurl.com/2011/10/from-idea-to-app-creating-ios-ui-animations-and-gestures.html)



##1. 概述 -- 绘制像素到屏幕上


### 图形堆栈
---
当像素映射到屏幕上的时候，后台发生了很多事情。但一旦他们显示到屏幕上，每一个像素均由三个颜色组件构成：红，绿，蓝。三个独立的颜色单元会根据给定的颜色显示到一个像素上。在 iPhone5 的液晶显示器上有1,136×640=727,040个像素，因此有2,181,120个颜色单元。所有的图形堆栈一起工作以确保每次正确的显示。当你滚动整个屏幕的时候，数以百万计的颜色单元必须以每秒60次的速度刷新，这是一个很大的工作量。

### 软件组成
---
从简单的角度来看，软件的堆栈看起来像这样：
![软件堆栈](http://img.objccn.io/issue-3/pixels-software-stack.png)

OpenGL 之上扩展出很多东西。在 iOS 上，几乎所有的东西都是通过 Core Animation 绘制出来，然而在 OS X 上，绕过 Core Animation 直接使用 Core Graphics 绘制的情况并不少见。对于一些专门的应用，尤其是游戏，程序可能直接和 OpenGL/OpenGL ES 交流。事情变得使人更加困惑，因为 Core Animation 使用 Core Graphics 来做一些渲染。像 AVFoundation，Core Image 框架，和其他一些混合的入口。

要记住一件事情，GPU 是一个非常强大的图形硬件，并且在显示像素方面起着核心作用。它连接到 CPU。从硬件上讲两者之间存在某种类型的总线，并且有像 OpenGL，Core Animation 和 Core Graphics 这样的框架来在 GPU 和 CPU 之间精心安排数据的传输。为了将像素显示到屏幕上，一些处理将在 CPU 上进行。然后数据将会传送到 GPU，这也需要做一些相应的操作，最终像素显示到屏幕上。

### Core Animation
---
正如名字所建议的那样，Core Animation 让你在屏幕上实现动画。我们将跳过动画部分，而集中在绘图上。需要注意的是，Core Animation 允许你做非常高效的渲染。这也是为什么当你使用 Core Animation 时可以实现每秒 60 帧的动画。

Core Animation 的核心是 OpenGL ES 的一个抽象物，简而言之，它让你直接使用 OpenGL ES 的功能，却不需要处理 OpenGL ES 做的复杂的事情。当我们上面谈论合成的时候，我们把 layer 和 texture 当做等价的，但是他们不是同一物体，可又是如此的类似。

Core Animation 的 layer 可以有子 layer，所以最终你得到的是一个图层树。Core Animation 所需要做的最繁重的任务便是判断出哪些图层需要被(重新)绘制，而 OpenGL ES 需要做的便是将图层合并、显示到屏幕上。

举个例子，当你设置一个 layer 的内容为 CGImageRef 时，Core Animation 会创建一个 OpenGL 纹理，并确保在这个图层中的位图被上传到对应的纹理中。以及当你重写 -drawInContext 方法时，Core Animation 会请求分配一个纹理，同时确保 Core Graphics 会将你所做的(即你在drawInContext中绘制的东西)放入到纹理的位图数据中。一个图层的性质和 CALayer 的子类会影响到 OpenGL 的渲染结果，许多低等级的 OpenGL ES 行为被简单易懂地封装到 CALayer 概念中。

Core Animation 通过 Core Graphics 的一端和 OpenGL ES 的另一端，精心策划基于 CPU 的位图绘制。因为 Core Animation 处在渲染过程中的重要位置上，所以你如何使用 Core Animation 将会对性能产生极大的影响。

### Core Graphics / Quartz 2D
---
通过 Core Graphics 这个框架，Quartz 2D 被更为广泛的知道。

Quartz 2D 拥有比我们这里谈到更多的装饰。我们这里不会过多的讨论关于 PDF 的创建，渲染，解析，或者打印。只需要注意的是，PDF 的打印、创建和在屏幕上绘制位图的操作是差不多的。因为他们都是基于 Quartz 2D。

让我们简单的了解一下 Quartz 2D 主要的概念。有关详细信息可以到苹果的官方文档中了解。

放心，当Quartz 2D 涉及到 2D 绘制的时候，它是非常强大的。有基于路径的绘制，反锯齿渲染，透明图层，分辨率，并且设备独立，可以说出很多特色。这可能会让人产生畏惧，主要因为这是一个低级并且基于 C 的 API。

主要的概念当对简单，UIKit 和 AppKit 都包含了 Quartz 2D 的一些简单 API，一旦你熟练了，一些简单 C 的 API 也是很容易理解的。最终你学会了一个能实现 Photoshop 和 Illustrator 大部分功能的绘图引擎。苹果把 iOS 程序里面的股票应用作为讲解 Quartz 2D 在代码中实现动态渲染的一个例子。

当你的程序进行位图绘制时，不管使用哪种方式，都是基于 Quartz 2D 的。也就是说，CPU 部分实现的绘制是通过 Quartz 2D 实现的。尽管 Quartz 可以做其它的事情，但是我们这里还是集中于位图绘制，在缓冲区(一块内存)绘制位图会包括 RGBA 数据。

### 光栅化和组合
---
渲染过程的第一部分是众所周知的光栅化(rasterization)，光栅化简单的说就是产生一组绘图指令并且生成一张图片。比如绘制一个圆角矩形、带图片、标题居中的 UIButtons。这些图片并没有被绘制到屏幕上去；取而代之的是，他们被自己的视图保持着留到下一个步骤使用。

## 2. iOS 7新特性
iOS 7 新特性主要包括，TextKit文字处理框架的支持，UIKit动力学动画支持。
### TextKit

NSTextStorage --> String

NSLayoutManager --> CoreText

NSTextContainer 

### UIKit Dynamics(UIKit 动力学)

其实就是UIKit的一套动画和交互体系。我们现在进行UI动画基本都是使用CoreAnimation或者UIView animations。而UIKit动力学最大的特点是将现实世界动力驱动的动画引入了UIKit，比如重力，铰链连接，碰撞，悬挂等效果。一言蔽之，即是，将2D物理引擎引入了人UIKit。需要注意，UIKit动力学的引入，并不是以替代CA或者UIView动画为目的的，在绝大多数情况下CA或者UIView动画仍然是最优方案，只有在需要引入逼真的交互设计的时候，才需要使用UIKit动力学它是作为现有交互设计和实现的一种补充而存在的。

目的当然是更加自然和炫目的UI动画效果，比如模拟现实的拖拽和弹性效果，放在以前如果单用iOS SDK的动画实现起来还是相当困难的，而在UIKit Dynamics的帮助下，复杂的动画效果可能也只需要很短的代码（基本100行以内...其实现在用UIView animation想实现一个不太复杂的动画所要的代码行数都不止这个数了吧）。总之，便利多多，配合UI交互设计，以前很多不敢想和不敢写（至少不敢自己写）的效果实现起来会非常方便，也相信在iOS7的时代各色使用UIKit动力学的应用的在动画效果肯定会上升一个档次。

#### UIKit动力学实现的结构
为了实现动力UI，需要注册一套UI行为的体系，之后UI便会按照预先的设定进行运动了。我们应该了解的新的基本概念有如下四个：

* UIDynamicItem：用来描述一个力学物体的状态，其实就是实现了UIDynamicItem委托的对象，或者抽象为有面积有旋转的质点；

* UIDynamicBehavior：动力行为的描述，用来指定UIDynamicItem应该如何运动，即定义适用的物理规则。一般我们使用这个类的子类对象来对一组UIDynamicItem应该遵守的行为规则进行描述；

* UIDynamicAnimator；动画的播放者，动力行为（UIDynamicBehavior）的容器，添加到容器内的行为将发挥作用；

* ReferenceView：等同于力学参考系，如果你的初中物理不是语文老师教的话，我想你知道这是啥..只有当想要添加力学的UIView是ReferenceView的子view时，动力UI才发生作用。

UIDynamicBehavior的具体子类有：UIAttachmentBehavior,UICollisionBehavior(碰撞)，UIDynamicItemBehavior(),UIGravityBehavior(),UIPushBehavior(),UISnapBehavior()

##3. Quartz 2D(Core Graphics)

Quartz是iOS中的本地绘制技术的常见名称。Core Graphics框架是Quartz的核心，并且是你用于内容绘制的主要接口。这个框架提供了以下操作的数据结构和方法：

* 绘制上下文(Graphics contexts)
* 路径
* 图像和位图
* 图层转换
* 颜色，颜色图案(pattern colors),颜色空间
* 阴影和渐变
* 字体
* pdf内容

### 使用Quartz和UIKit
####1. 配置图形上下文

* 当前转换矩阵(current transformation matrix) CTM

	CGContextRotateCTM(CGContextRef c, CGFloat angle)
	
	CGContextScaleCTM(CGContextRef c, CGFloat sx, CGFloat sy)
	
	CGContextTranslateCTM(CGContextRef c, CGFloat tx, CGFloat ty)
	
	CGContextConcatCTM(CGContextRef c, CGAffineTransform transform)

* 切割区域

	CGContextClipToRect(CGContextRef c, CGRect rect)
	UIKit中相对于的函数是UIRectClip (CGRect rect);
	
* 线条相关: 宽度, 连接, cap, 虚线, miter limit
	
	CGContextSetLineWidth
	
	CGContextSetLineJoin
	
	CGContextSetLineCap
	
	CGContextSetLineDash
	
	CGContextSetMiterLimit
	
* 精确的曲线估算(Accuracy of curve estimation)
	
	CGContextSetFlatness
	
* 抗锯齿设置(Anti-aliasing setting)
	
	CGContextSetAllowsAntialiasing
	
* 颜色：填充和描边设置
	CGContextSetRGBFillColor
	CGContextSetRGBStrokeColor
	
* 全局alpha值设置
	CGContextSetAlpha
	
* 渲染目的(rending intent)
	CGContextSetRenderingIntent
	
* 颜色空间:填充和描边设置
	CGContextSetFillColorSpace
	CGContextSetStrokeColorSpace
	
* 文本:字体，字体大小，字符间距，文本绘制模式
	CGContextSetFont
	CGContextSetFontSize
	CGContextSetCharacterSpacing
	
* 混合模式(blend mode)
	CGContextSetBlendMode
	
图形上下文对象包含一个用于保存图形状态的栈。当quratz创建一个图形上下文，这个栈是空的。使用**CGContextSaveGState**方法可以拷贝当前图形状态到该栈中。当你改变了状态之后，你可以使用**CGContextRestoreGState**方法恢复到上一次使用**CGContextSaveGState**方法保存的状态。

#### 2 创建绘制路径

一个路径是从一系列线条和贝塞尔曲线创建的基于矢量的形状。UIKit包含UIRectFrame和UIRectFill方法用于在你的视图上绘制比较简单的路径，比如说矩形。Core Graphics更加包含便利的创建简单路径的方法，不然矩形和椭圆。

对应更复杂的路径，你必须手动使用UIBezierPath类来进行创建，或者使用Core Graphics框架中的CGPathRef复杂类型来创建。虽然你可以使用其它没有使用图形上下文的API来构造路径，但是路径上的点必须映射到当前的坐标系统中，并且你必须使用图形上下文对改该路径进行渲染。

当绘制一个路径时，你必须设置当前的图像上下文。

对应路径的创建，强烈推荐使用UIBezierPath，而不是使用CGPath方法进行创建，除非你知道一些只有Core Graphics中才包含的特性，比如说添加一个椭圆路径。


#### 3.  创建图案、渐变和阴影
Core Graphics框架包含了创建图案，渐变和阴影的额外方法。您可以使用这些类型来创建非单色的颜色，并用它们来填充你创建的路径。图案是从重复图片中获取内容进行创建的。将被和阴影提供了不同的方式，用于创建从颜色到颜色的平滑过渡。

#### 4. 定制坐标空间

##### 使用坐标转换来改善绘制性能
改变当前坐标系统(CTM)是一个用于在一个视图上绘制内容标准的技术，因为它允许你重用路径，这样依赖就减少了绘制时计算的数量。比如说，假如你响应绘制一个始于(20,20)点的区域，你可以创建一个路径移动到点(20，20)

##### 翻转默认的坐标系统

##### 不同坐标系统绘制的负面影响
* 弧和旋转(arcs and rotations)
	
* 阴影(shadows)
在UIKit中，阴影offset为(2,2)表示的是下，右方向的阴影，而Core Graphics的(2,2)则表示的上，右方向的阴影。

### 使用贝塞尔曲线绘制形状
在iOS3.2之后，你可以使用UIBezierPath来创建基于矢量的路径。UIBezierPath类是Core Graphics中路径相关特性的Objective-C包装。你可以使用这个类来定义简单的形状，比如椭圆和矩形，也可以用来定义包含多个直线和曲线的复杂形状。

#### 贝塞尔路径基础

UIBezierPath对象是CGPathRef数据类型的对象封装。路径是基于矢量的由线和曲线元素组成的形状。你可以使用线条元素创建矩形和多边形，你也可以使用曲线元素创建弧，圆和复杂的曲线类型。每个元素由一个或者多个点(在当前坐标系统)组成，并定义了如何将这些点解释成绘图的命令。

每一个连接线和曲线的元素组成的集合被称为子路径。一个自路径的线或者曲线的终点是下一个自路径的起点。一个UIBezierPath对象可以包含一个或者多个围绕该路径的子路径，使用moveToPoint:命令进行分割。

创建和使用一个路径对象的过程是分离的，创建一个路径是第一步处理并且包含以下几个步骤：
1.  创建一个路径对象
2.  为你的UIBezierPath对象设置任意相关的绘制属性，比如*lineWitdh*或者*lineJoinStyle*描边属性。
3.  使用**moveToPoint:**方法元素的设置初始位置
4.  添加线和曲线元素以创建自路径
5.  可选，调用*closePath*关闭路径，这将直接绘制从终点到起点元素的线条元素。
6.  可选，重复步骤3，4，5来定义其它的自路径。

### 绘制和创建图像(drawing and creating images)
大多数的时候，直接使用标准视图进行图像的展示是相当简单的。但是，在以下2种情况下你可能需要需要额外的工作进行处理：
* 假如你想将图像作为自定义视图的一部分的时候，你必须在你的视图的**drawRect:**方法中绘制图像
* 假如你想要离屏渲染图像(延迟绘制，或者将图像保存到一个文件中)，你必须创建一个位图图像上下文。



##4. 动画

### CAAnimation类层次结构
CAAnimation
	--> 属性动画(CAPropertyAnimation)
		--> 基本动画(CABasicAnimation)
		--> 关键帧动画(CAKeyframeAnimation)
	--> 动画组(CAAnimationGroup)
	--> 渐变动画(CATransition)

[属性动画支持的动画键路径完整列表](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/CoreAnimation_guide/Key-ValueCodingExtensions/Key-ValueCodingExtensions.html)
[控制动画时间的一篇很棒的文章](http://ronnqvi.st/controlling-animation-timing/)

无论何时一个可动画的 layer 属性改变时，layer 都会寻找并运行合适的 'action' 来实行这个改变。在 Core Animation 的专业术语中就把这样的动画统称为动作 (action，或者 CAAction)。

layer 将像文档中所写的的那样去寻找动作，整个过程分为五个步骤。第一步中的在 view 和 layer 中交互的部分是最有意思的：

layer 通过向它的 delegate 发送 actionForLayer:forKey: 消息来询问提供一个对应属性变化的 action。delegate 可以通过返回以下三者之一来进行响应：

它可以返回一个动作对象，这种情况下 layer 将使用这个动作。
它可以返回一个 nil， 这样 layer 就会到其他地方继续寻找。
它可以返回一个 NSNull 对象，告诉 layer 这里不需要执行一个动作，搜索也会就此停止。


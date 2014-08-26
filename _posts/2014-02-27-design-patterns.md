---
layout: post
keywords: "设计模式学习笔记"
description: "设计模式学习笔记 "
title: "设计模式学习笔记 "
categories: [设计模式]
tags: [设计模式]
group: archive
icon: file-alt
---
{% include site/setup %}

# 设计模式

23种设计模式助记口诀：

桥适组装 外享代

职解状中备，观命策模访 迭

6大设计原则助记口诀: 开迪(的)接里(林)单


##一、 简介

### 设计模式四境界：

* 没学之前，想不到使用设计模式，设计的代码很糟糕
* 学了设计模式后，很开心，到处使用学过的模式，造成无用而不自知；
* 学完全部模式时，感觉诸多模式极其相似，无法分清模式直接的差异，有困惑，但深知误用之害，应用之时有所犹豫。
* 灵活应用模式，深知不应用具体的某种模式也能设计出非常优秀的代码，到达无剑胜有剑的境界。


## 二、 软件设计6大原则

###  1、单一职责原则(SRP)

###  2、里氏替换原则(LSP)


###  3、依赖倒置原则：
抽象不应该依赖细节，细节应该依赖抽象，说到底，就是要针对借口编程，不要对实现编程。

依赖倒置包含2个方面:
1. 高层模块不应该依赖底层模块，2个都应该依赖抽象
2. 抽象不应该依赖细节。细节应该依赖抽象

###  4、接口隔离原则

###  5、迪米特法则（LoD）
也叫最少知识原则。
如果两个类不必彼此直接通信，那么这两个类就不应当发生直接的相互作用。如果其中一个类需要调用另外一个类的某个方法的话，可以通过第三者转发这个调用。
迪米特法则的根本思想，是强调类之间的松耦合


###  6、开闭原则(ASD)： 

## 三、 23种设计模式概述：


23种设计模式

简单工厂（不属于23中设计模式）:
工厂类中包含了必要的逻辑判断，根据客户的选择条件动态实例化相关的类，对于客户端来说，去除了与具体产品的依赖。
假如要添加新的工厂，则需要修改工厂类，这样就违背了开放封闭原则。

### 学习设计模式的关注点

学习设计模式的关注点：

a、概念。     正常不使用的弊端（提出问题）

b、使用的优点

c、UML图

d、demo代码（以为懂了，但是写不出代码，说明你是假懂）

e、反复思考，举例印证

##四、创建型模式(5种)

### 1. 工厂方法模式：


a、定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到子类。

b、

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/factory_method.png)
### 2.建造者模式：

a、需要将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示的意图时，我们就可以考虑使用构造者模式。

如果我们用了建造者模式，那么用户就只需指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需知道了。

定义：建造者模式，将一个复杂对象的构建和它的表示分离，使得同样的构建过程可以创建不同的表示。


b、使得建造代码与表示代码分离，由于创建者隐藏了该产品是如何组装的，所以若需要改变一个产品的内部表示，只需要再定义一个具体的建造者就可以了。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/builder.png)
### 3.抽象工厂模式

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/abstract_factory.png)

### 4.原型模式：

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/prototype.png)

### 5.单例模式

## 五、结构型模式(7种)

### 1.适配器模式(Adapter)
UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/adapter.png)

### 2.桥接模式(Bridge)

a、意图

b、动机
当一个抽象可能有多个实现时,通常用继承来协调它们。抽象类定义对该抽象的接口,


c、适用性
以下一些情况使用Bridge模式:
* 类的抽象以及它的实现都应该可以通过生成子类的方法加以扩充。这时Bridge模式使你可以对不同的抽象接口和实现部分进行组合,并分别对它们进行扩充。
* 对一个抽象的实现部分的修改应对客户不产生影响,即客户的代码不必重新编译。
* (C++)你想对客户完全隐藏抽象的实现部分。在C++中,类的表示在类接口中是可见的。
* 正如在意图一节的第一个类图中所示的那样,有许多类要生成。这样一种类层次结构说明你必须将一个对象分解成两个部分。Rumbaugh称这种类层次结构为“嵌套的普化”(nestedgeneralizations)。
* 你想在多个对象间共享实现(可能使用引用计数),但同时要求客户并不知道这一点。一个简单的例子便是Coplien的String类[Cop92],在这个类中多个对象可以共享同一个字符串表示(StringRep)。
桥接模式：将抽象部分和它的实现部分分离，使它们都可以独立地变化。


什么叫做抽象与它的实现分离，这不是说，让抽象类与其派生类分离，因为这没有任何意义。实现指的是抽象类和它的派生类来实现自己的对象。

在发现我们需要多角度去分类实现对象，而且用继承会造成大量的类增加，不能满足开放-封闭原则时，就应该考虑用桥接模式了。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/bridge.png)
### 3.组合模式(Composite)
1.意图

2.适用性


UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/composite.png)
### 4.装饰模式(Decorator)

**from gof**<br />
a、意图

有时我们希望给某个对象而不是整个类添加一些功能。例如,一个图形用户界面工具箱

c、适用性

d、效果






**from 大话**<br />
a、当系统中需要新功能的时候，是向旧的类中添加新代码。这些新的代码通常装饰了原有类的核心职责或主要行为。但这种作法的问题在于，它们在主类中加入了新的字段，新的方法和新的逻辑



b、动态给一个对象添加一些额外的职责，就增加功能来说，装饰模式比生成子类更为灵活。
把类中的装饰功能从类中搬移去除，这样可以简化原有的类，有效的把类的核心职责和装饰功能区分开了。而且可以去除相关类中重复的逻辑。

c、UML图
Component是定义一个对象接口，可以给这些对象动态添加职责。ConcreteComponent是定义了一个具体的对象，也可以给这个对象添加一些职责。Decorator，装饰抽象类，继承了Component，从外类来扩展Component类的功能，但对应Component来说，是无需知道Decorator的存在的，至于ConcreteDecorator就是具体的装饰对象，起到给Component添加职责的功能。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/decorator.png)

###5.外观模式(Facade)
**from gof**

a、意图




**from 大话**
为子系统的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更容易使用。 父类需要了解所有的子系统的方法和属性，进行组合，以备外界调用。


> 外观模式在什么时候使用最好呢？

这要分三个阶段来说：

1. 首先，在设计初期，应该要有意识的将不同的2各层分离，比如经典的三层架构，就需要考虑在数据访问层和业务逻辑层、业务逻辑层和表示层的层与层之间建立外观模式，这样可以为复杂的子系统提供一个简单的接口，使得耦合大大降低。
2. 其次，在开发阶段，子系统往往因为不断的重构演化而变得越来越复杂，大多数的模式使用时也会产生很多很小的类，这是好事，但也给外部调用他们的用户程序带来使用上的困难，**增加外观模式可以提供一个简单的接口，减少它们之间的依赖**
3. 第三，在维和一个遗留的大型系统时，可能这个系统已经非常难以维护和扩展了，但因为他包含非常重要的功能，新的需求开发必须依赖于它。此时外观模式也是非常适合的。


UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/facade.png)
### 6.享元模式(flyweight)

运用共享技术有效地支持大量细粒度对象。

a、 意图




c、效果


* 因为共享,实例总数减少的数目
* 外部状态是计算的还是存储的


![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/flyweight.png)

### 7.代理模式(Proxy)

Cocoa touch框架中使用代理模式的例子：
NSProxy类

a、意图


**from 大话**

a、为其他对象提供一种代理以控制对这个对象的方法。

b、适用性



* 当第一次引用一个持久对象时,将它装入内存。

> 代理模式的使用场合：

1.  远程代理。webservice
2.  虚拟代理。
3.  安全代理


c、UML图如下：

![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/proxy.png)
##六、行为模式(11种)

>	行为模式涉及到算法和对象间职责的分配。行为模式不仅描述对象或类的模式,还描述它们之间的通信模式。这些模式刻划了在运行时难以跟踪的复杂的控制流。它们将你的注意力从控制流转移到对象间的联系方式上来。
	Observer 模式定义并保持对象间的依赖关系。典型的Observer的例子是Smalltalk中的模型/视图/控制器,其中一旦模型的状态发生变化,模型的所有视图都会得到通知。<br />
	<br />其他的行为对象模式常将行为封装在一个对象中并将请求指派给它。Strategy模式将算法封装在对象中,这样可以方便地指定和改变一个对象所使用的算法。Command 模式将请求封装在对象中,这样它就可作为参数来传递,也可以被存储在历史列表里,或者以其他方式使用。State模式封装一个对象的状态,使得当这个对象的状态对象变化时,该对象可改变它的行为。Visitor封装分布于多个类之间的行为,而Iterator则抽象了访问和遍历一个集合中的对象的方式。

### 1.职责链模式(Chain of Resposibility)

a、 意图


在以下条件下使用Responsibility 链:
* 你想在不明确指定接收者的情况下,向多个对象中的一个提交一个请求。







![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/responsibility.png)


eg：浏览器的前进/后退；数据库的事务操作，画图时的重做和撤消。

Cocoa touch框架中命令模式的使用：
NSUndoManager(对应的设计模式命令对象NSInvocation)和"Target-Action"机制是框架中对这个模式的经典应用。














![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/command.png)

### 3.解释器模式(Interpreter)

a、意图

给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

b、动机

如果一种特定类型的问题发生的频率足够高，那么可能就值得将该问题的各个实例表述为一个简单语言中的句子。这样就可以构建一个解释器，该解释器通过解释这些句子来解决该问题。

c、适用性

当有一个语言需要解释执行，并且你可将该语言中的句子表示为一个抽象语法树时，可使用解释器模式。而当存在以下情况时该模式效果最好：

* 该文法简单对于复杂的文法，文法的类层次变得庞大而无法管理。此时词法分析程序生成器这样的工具是更好的选择。它们无需构建抽象语法树即可解释表达式，这样可以节省空间而且还可能节省时间。
* 效率不是一个关键问题最高效的解释器通常不是通过直接解释语法分析树实现的，而是首先将它们转换成另一种形式。例如，正则表达式通常被转换成状态机。但即使在这种情况下，转换器仍可用解释器模式实现，该模式仍是有用的。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/interpreter.png)

### 4.迭代器模式(Iterator)

### 5.中介者(Meditor)
UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/mediator.png)

### 6.备忘录(Memento)
a、在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样以后就可将该对象恢复到原先保存的状态。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/memento.png)

### 7.观察者(Observer)
a、观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，这个主题对象在状态发生变化时，会通知所以观察者对象，使它们能够自动更新自己。


UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/observer.png)

### 8.状态模式(State)
a、当一个对象的内在状态改变时，允许改变其行为，这个对象看起来像是改变了其类。
不使用时的缺点：当判断分支特别多的时候，导致方法过长，并且任何需求的变动或者增加，都需要去更改这个方法的时候，导致出错的风险增大，就应该考虑状态模式了。

b、状态模式主要解决的是当控制一个对象的状态转换的条件表达式过于复杂时的情况。当状态的判断逻辑转移到表示不同状态的一系列类当中，可以把复杂的判断逻辑简化。通过定义新的子类，可以很容易的增加新的状态和转换。说明了转移做就是为了消除庞大的条件分支语句。状态模式通过把各种状态转移逻辑分布到State的子类之间，来减少相互依赖。


UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/state.png)

### 9.策略模式
a、算法本身只是一种策略，最重要的是算法随时都可能被替换，这就是变化，而封装变化点是面向对象的一种重要.

b、策略模式是一种定义一系列算法的方法，从概念上来看，所以这些算法完成的都是相同的工作，只是实现不同，它可以以相同的方式调用所有的算法，减少了各种算法类与使用算法类之间的耦合。
策略模式的Strategy类层次为context定义了一系列的可供充裕的算法或行为。继承有助于析取出这些算法中的公共功能。
简化了单元测试，因为每个算法都有自己的类，可以通过自己的接口单独测试。

c、UML图如下：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/strategy.png)

### 10.模板方法(Template Method)
a、定义一个操作中的算法的骨架，而将一些不再延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可冲定义改算法的某些特定步骤。

当我们要完成在某一细节层次一致的一个过程或一系列步骤，但其个别步骤在更详细的层次上的实现可能不同时，我们通常考虑用模板方法来处理。

b、模板方法模式是通过把不变行为搬移到父类，去除子类中的重复代码来体现它的优势。

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/template_method.png)

### 11.访问者模式(Visitor)

UML图：
![](http://yhawaii.github.io/assets/themes/yhawaii/images/DesignPatterns/visitor.png)
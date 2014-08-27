---
layout: post
keywords: "Objective-C,timer"
description: "如何实现一个精准的Timer "
title: "如何实现一个精准的Timer "
categories: [iOS]
tags: [iOS]
group: archive
icon: file-alt
---
{% include site/setup %}

#如何实现一个精准的Timer
在timer设计中，假如时间精确度大于500毫米，就可以认为是bug。

我们知道，NSTimer的可以精确到50-100毫秒，假如需要更精确的timer，应该如何实现呢？

> 参考资料:

[NSTimer你真的会用了吗](http://www.cnblogs.com/smileEvday/archive/2012/12/21/NSTimer.html)

[Experiments with precise timing in iOS](http://atastypixel.com/blog/experiments-with-precise-timing-in-ios/)

[High Precision Timers in iOS / OS X](https://developer.apple.com/library/ios/technotes/tn2169/_index.html)

## 我是否真的需要一个更精准的timer？
不要使用精准的timer除非你知道你确认你真的有必要这么做。因为这意味着消耗更多的CPU循环和电量。一次性只能激活有限数量的高精准timer，当尝试使用太多的精准timer，所有的timer都丧失了准确性。


## 使用
使用mach内核级的函数可以使用mach_absolute_time()获取到CPU的tickcount的计数值，可以通过"mach_timebase_info"函数获取到纳秒级的精确度 。然后使用mach_wait_until(uint64_t deadline)函数，直到指定的时间之后，就可以执行指定任务了。

关于数据结构mach_timebase_info的定义如下：

```
struct mach_timebase_info {
	uint32_t	numer;
	uint32_t	denom;
};
```

下面是一个demo


```
static const uint64_t NANOS_PER_USEC = 1000ULL;
static const uint64_t NANOS_PER_MILLISEC = 1000ULL * NANOS_PER_USEC;
static const uint64_t NANOS_PER_SEC = 1000ULL * NANOS_PER_MILLISEC;

static mach_timebase_info_data_t timebase_info;

static uint64_t nanos_to_abs(uint64_t nanos) {
    return nanos * timebase_info.denom / timebase_info.numer;
}

//传入的时间间隔，单位是秒。比如5s延时，就传入5就可以了。
void example_mach_wait_until(int seconds)
{
    mach_timebase_info(&timebase_info);
    uint64_t time_to_wait = nanos_to_abs(seconds * NANOS_PER_SEC);
    uint64_t now = mach_absolute_time();
    mach_wait_until(now + time_to_wait);
}

int main(int argc, const char * argv[])
{
    @autoreleasepool {
        //使用mach_wait_until()函数，实现精准的timer
        NSLog(@"start time = %f",CFAbsoluteTimeGetCurrent());
        example_mach_wait_until(5);
        NSLog(@"end time = %f",CFAbsoluteTimeGetCurrent());
	}
}
```
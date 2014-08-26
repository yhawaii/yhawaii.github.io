---
layout: post
keywords: "C语言标准库学习"
description: "C语言标准库学习"
title: "C语言标准库学习"
categories: [C]
tags: [C语言]
group: archive
icon: file-alt
---
{% include site/setup %}

#C语言标准库学习

学习资料：

[Wikiped c标准库头文件文档](http://zh.wikipedia.org/wiki/Category:C%E6%A0%87%E5%87%86%E5%BA%93%E5%A4%B4%E6%96%87%E4%BB%B6)

[酷勤网c语言使用手册](http://www.kuqin.com/clib/)


Radfi#8%9aiGei2AB

## math.h头文件
### 基本运算方法(basic operations)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>abs <br> labs <br> llab <br> imaxabs (C99)  </td>
<td> 计算整形数的绝对值 </td>
<td> computes absolute value of an integral value (|x|)</td>
</tr>
<tr>
<td>fabs </td>
<td> 计算浮点类型的绝对值 </td>
<td> absolute value of a floating point value (|x|)</td>
</tr>
<tr>
<td>div<br>ldiv<br>lldiv<br>imaxdiv(C99)</td>
<td> 获取整形类型数的除法的商和模 </td>
<td> the quotient and remainder of integer division</td>
</tr>
<tr>
<td>fmod </td>
<td> 求浮点类型的模 </td>
<td> remainder of the floating point division operation</td>
</tr>
<tr>
<td><code>remainderf</code>  </td>
<td> 计算浮点类型的余数(带符号) </td>
<td> signed remainder of the division operation</td>
</tr>
<tr>
<td><code>remquo(C99)</code> </td>
<td> </td>
<td> signed remainder as well as the three last bits of the division operation</td>
</tr>
<tr>
<td>fma(C99) </td>
<td> 乘-加操作，即前2个参数相乘后和第三个数相加的结果 </td>
<td>fused multiply-add operation</td>
</tr>
<tr>
<td>fmax </td>
<td> 求2个浮点数的最大值 </td>
<td> larger of two floating point values</td>
</tr>
<tr>
<td>fmin </td>
<td> 求2个浮点数的最小值 </td>
<td> smaller of two floating point values</td>
</tr>
<tr>
<td>fdim </td>
<td> 计算x-y的值，假如小于0则返回0，大于0则返回该值 </td>
<td> positive difference of two floating point values (max(0, x-y))</td>
</tr>
<tr>
<td><code>nan <br />
nanf<br /> nanl<br /></code> </td>
<td> </td>
<td>not-a-number (NaN)</td>
</tr>
</tbody>
</table>

	
测试代码：
	
		//圆周率 PI
		#define PI 3.1415926
		//自然对数e
		#define MATH_E 2.718281828
		
		
	 	int zeroNum = 0;
        printf("pow = %f \n",pow(2, 3));//2的3次方
        printf("mode = %f \n",fmodf(5, 2));//求模
        
        float num1 = 3.1;
        float num2 = - 3.5;
        printf("ceil %f;%f \n",ceil(num1),ceil(num2));//大于参数的整数
        printf("floor %f ; %f \n",floor(num1),floor(num2));//小于参数的整数
        printf("round %f ; %f \n",round(num1),round(num2));//四舍五入
        printf("nearbyint %f ; %f \n",nearbyint(num1),nearbyint(num2));//最接近的整数
        printf("trunc %f ; %f \n",trunc(num1),trunc(num2));//trunc截取整数部分
        
        //frexp，标准化浮点数, f = x * 2^p, 已知f求x, p ( x介于[0.5, 1] )
        double x, y;
        int n;
        x = 16.4;
        y = frexp( x, &n );
        printf( "frexp( %f, &n ) = %f, n = %d\n", x, y, n );
        
        printf("sigbit = %d \n",signbit(21));//用于判断符号位(正数还是负数)，返回的符号位为0表示是正数，返回1是负数
        
        div_t divValue = div(5, 2);//div_t结构体包含商和余数2个字段
        printf("div quotient value = %d;remainder value = %d ；fmode = %f;remainderf = %f \n",divValue.quot,divValue.rem,fmod(5.3, 2.0),remainderf(5.3, 2.0));
        
        int *pointer = &zeroNum;
        float remqiof = remquo(5.3, 2.0, pointer);
        printf("remqiof = %f ; pointer = %d; \n",remqiof,*pointer);
        
        printf("fmaf = %f ; \n",fmaf(2.0, 3.0, 4.0));

        printf("fdim = %f ;\n",fdimf(3.0, -1.2));
        
        char testChar = 1;
        const char *charP = &testChar;
        printf("nan = %f ; \n", nan(charP));
        
        printf("e = %f ;exp = %f ;\n",MATH_E,exp(2.0));//7.389056


### 指数方法(Exponential functions)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>exp </td>
<td> 返回e的x次方值,e为自然对数，是一个无限不循环小数，其值约等于2.718281828… </td>
<td> returns e raised to the given power (function)</td>
</tr>
<tr>
<td>exp2(C99) </td>
<td> 返回2的x次方值 </td>
<td> returns 2 raised to the given power  (function)</td>
</tr>
<tr>
<td>expm1(C99) </td>
<td> e的x次方减1的值 </td>
<td> returns e raised to the given power, minus one  (function)</td>
</tr>
<tr>
<td>log </td>
<td> 计算指定数的自然对数（以e为底）的值 </td>
<td> computes natural (base e) logarithm (to base e) (ln(x)) (function)</td>
</tr>
<tr>
<td>log10 </td>
<td> 计算指定数以10为底的自然对数的值 </td>
<td> computes common (base 10) logarithm (log10(x)) (function)</td>
</tr>
<tr>
<td>log1p(C99) </td>
<td> 计算指定数加1的自然对数（以e为底）的值 </td>
<td> natural logarithm (to base e) of 1 plus the given number (function)</td>
</tr>
<tr>
<td>log2(C99) </td>
<td>计算指定数的以2为底的对数值 </td>
<td> base 2 logarithm of the given number (function)</td>
</tr>
</tbody>
</table>
 
测试代码：
	
		float lnValue = log(10);
        float lnPlus1Value = log1p(10);
        printf("lnValue = %f ;lnPlus1Value = %f；log2 : %f\n",lnValue,lnPlus1Value,log2(8));


### 幂函数(Power functions)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>sqrt </td>
<td> 计算开根号的值 </td>
<td>computes square root (√x) (function)</td>
</tr>
<tr>
<td>cbrt(C99) </td>
<td> 计算开三次方的值 </td>
<td>computes cubic root (3√x) (function)</td>
</tr>
<tr>
<td>hypot(C99) </td>
<td> 计算x*x + y*y的值，然后再进行开根号 </td>
<td>computes square root of the sum of the squares of two given numbers (√x^2+y^2) (function)</td>
</tr>
<tr>
<td>pow </td>
<td> </td>
<td>raises a number to the given power (xy)</td>
</tr>
</tbody>
</table> 

测试代码：

	void testPowerFunc()
	{
	    int num1 = 2.0;
	    int num2 = 3.0;
	    printf("hypot = %f ; √13 = %f ;\n",hypot(num1, num2),sqrt(13));
	}


### 三角函数方法（Trigonometric functions）

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>sin </td>
<td> 求正弦值 </td>
<td> computes sine (sin(x)) (function)</td>
</tr>
<tr>
<td>cos </td>
<td> 求余弦值</td>
<td> computes cosine (cos(x)) (function)</td>
</tr>
<tr>
<td>tan </td>
<td> 求正切值</td>
<td> computes tangent (tan(x)) (function)</td>
</tr>
<tr>
<td>asin </td>
<td> 求反正弦值 </td>
<td> computes arc sine (arcsin(x)) (function)</td>
</tr>
<tr>
<td>acos </td>
<td> 求反余弦值</td>
<td> computes arc cosine (arccos(x)) (function)</td>
</tr>
<tr>
<td>atan </td>
<td> 求反正切值</td>
<td> computes arc tangent (arctan(x)) (function)</td>
</tr>
<tr>
<td>atan2 </td>
<td> 求反正切值，使用标志来确定象限 </td>
<td> arc tangent, using signs to determine quadrants (function)</td>
</tr>
</tbody>
</table>

[atan和atantan2的区别](http://blog.csdn.net/tuyang120428941/article/details/5822041)

测试代码：
	
	//度数转角度函数
	double degree2Arc(float degree)
	{
	    return PI / 180 * degree;
	}
	
	//角度转度数函数
	double arc2Degree(float arcValue)
	{
	    return arcValue * 180 / PI;
	}
	void testTriangle()
	{
	    float degreeV = 90;
	    float sinValue = (degree2Arc(degreeV));
	    float asinValue = asin(1);
	    printf("the value is  : %f ; asinValue对应的角度 = %f \n",sinValue,arc2Degree(asinValue));
    
	    printf("tan = %f \n",atanf(1) * 180/PI);
	
	    //atan2(x,y),atan2计算 x/y的反正切值
	    double a = atan2(1,1);
	    double b = atan2(1,-1);
	    double c = atan2(-1,-1);
	    double d = atan2(-1,1);
	    double e = atan(1);
	    double f = atan(-1);
	    printf("a对应的角度 = %f \n",arc2Degree(a));  //第一象限 45
	    printf("b对应的角度 = %f \n", arc2Degree(b)); //第二象限 135
	    printf("c对应的角度 = %f \n", arc2Degree(c));  //第三象限 -135
	    printf("d对应的角度 = %f \n", arc2Degree(d));  //第四象限 -45
	    printf("e对应的角度 = %f \n", arc2Degree(e)); // 45
	    printf("f对应的角度 = %f \n", arc2Degree(f)); // -45
	}


### 双曲线方法(Hyperbolic functions)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>sinh </td>
<td> 求双曲正弦值 </td>
<td> computes hyperbolic sine (sh(x)) (function)</td>
</tr>
<tr>
<td>cosh </td>
<td> 求双曲余弦值</td>
<td> computes hyperbolic cosine (ch(x)) (function)</td>
</tr>
<tr>
<td>tanh </td>
<td> 求双曲正切值</td>
<td> hyperbolic tangent (function)</td>
</tr>
<tr>
<td>asinh(C99) </td>
<td> 求双曲反正弦值</td>
<td> area hyperbolic sine (function)</td>
</tr>
<tr>
<td>acosh(C99) </td>
<td> 求双曲反余弦值</td>
<td> area hyperbolic cosine (function)</td>
</tr>
<tr>
<td>atanh(C99) </td>
<td> 求双曲反正切值</td>
<td> area hyperbolic tangent (function)</td>
</tr>
</tbody>
</table>

测试代码：
	
	void testHyperbolic()
	{
	    float degreeV = 45;
	    printf("sinh(%.4f)=%.4f\n",degree2Arc(degreeV),sinh(degree2Arc(degreeV)));
	}

### 误差相关方法（Error and gamma functions）

误差函数相关资料：
[误差函数](http://zh.wikipedia.org/wiki/%E8%AF%AF%E5%B7%AE%E5%87%BD%E6%95%B0)

Γ函数资料：
[Γ函数](http://zh.wikipedia.org/wiki/%CE%93%E5%87%BD%E6%95%B0)

[gamma(double x) different on two gcc versions](http://stackoverflow.com/questions/18116376/what-is-the-definition-for-gammadouble-x-and-why-is-it-different-on-two-gcc-ve)



<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>erf(C99) </td>
<td> 误差函数 </td>
<td> error function</td>
</tr>
<tr>
<td>erfc(C99) </td>
<td> 误差补函数 </td>
<td> complementary error function</td>
</tr>
<tr>
<td><code>lgamma(C99)</code> </td>
<td> Γ函数 </td>
<td> natural logarithm of the gamma</td>
</tr>
<tr>
<td><code>tgamma(C99)</code> </td>
<td> </td>
<td> gamma</td>
</tr>
</tbody>
</table>  

测试代码：
	
	void testErroFunc()
	{
	    double errF = 2.12648;
	    printf("erf(errF)=====%f\n",erf(errF));
	    printf("erfc(errF)=====%f\n",erfc(errF));
	    printf("lgamma(errF)=====%f\n",lgamma(errF));
	    printf("tgamma(errF)=====%f\n",tgamma(errF));
	}
	
### 最接近相关函数(Nearest integer floating point operations)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ceil </td>
<td> 返回大于指定参数的整型值 </td>
<td> nearest integer not less than the given value (function)</td>
</tr>
<tr>
<td>floor </td>
<td> 返回小于指定参数的值 </td>
<td> nearest integer not greater than the given value (function)</td>
</tr>
<tr>
<td>trunc(C99) </td>
<td> 截取指定参数的整数部分 </td>
<td> nearest integer not greater in magnitude than the given value (function)</td>
</tr>
<tr>
<td>round <br> lround(C99) <br>llround(C99)</td>
<td> 四舍五入 </td>
<td> nearest integer, rounding away from zero in halfway cases (function)</td>
</tr>
<tr>
<td>nearbyint(C99) </td>
<td> 最接近的整型值 </td>
<td> nearest integer using current rounding mode (function)</td>
</tr>
<tr>
<td>rint(C99) <br>lrint(C99) <br>llrint(C99) <br> </td>
<td> </td>
<td> nearest integer using current rounding mode with exception if the result differs (function)</td>
</tr>
</tbody>
</table>

测试代码：

	void testNearlestFunc()
	{
	    float num1 = 3.5;
	    float num2 = - 3.5;
	    printf("ceil %f;%f \n",ceil(num1),ceil(num2));//大于参数的整数
	    printf("floor %f ; %f \n",floor(num1),floor(num2));//小于参数的整数
	    printf("round %f ; %f \n",round(num1),round(num2));//四舍五入
	    printf("nearbyint %f ; %f \n",nearbyint(num1),nearbyint(num2));//最接近的整数
	    printf("trunc %f ; %f \n",trunc(num1),trunc(num2));//trunc截取整数部分
	}
### 浮点操作相关方法（Floating point manipulation functions）

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>frexp </td>
<td>  标准化浮点数, f = x * 2^p, 已知f求x, p ( x介于[0.5, 1] ) </td>
<td>　decomposes a number into significand and a power of 2 (function)</td>
</tr>
<tr>
<td>ldexp </td>
<td> 与frexp相反, 已知x, p求f </td>
<td> multiplies a number by 2 raised to a power (function)</td>
</tr>
<tr>
<td>modf </td>
<td> 将浮点数num分解成整数部分和小数部分。说明：返回小数部分，将整数部分存入float类型参数所指内存中。 </td>
<td> decomposes a number into integer and fractional parts (function)</td>
</tr>
<tr>
<td>scalbn(C99) <br>scalbln(C99) <br> </td>
<td> scalbn(x,y),返回值 z = x * 2^y ,其中2使用FLT_RADIX表示 </td>
<td> multiplies a number by FLT_RADIX raised to a power (function)</td>
</tr>
<tr>
<td>ilogb(C99) </td>
<td> 返回的是以 2 为底的对数,如果自变量的值是 0,则返回 FP_ILOGBO 宏的值;如果自变量是 无限的,返回的值等于 INT_MAX;如果自变量是 NAN,返回 FP_ILOGBNAN </td>
<td> extracts exponent of the number (function)</td>
</tr>
<tr>
<td>logb(C99) </td>
<td> 返回浮点的指数,如果浮点数没有被规范化,就先规范化再返回指数(以 2 为底) </td>
<td> extracts exponent of the number (function)</td>
</tr>
<tr>
<td>nextafter(C99) <br>nexttoward(C99) </td>
<td> </td>
<td> next representable floating point value towards the given value</td>
</tr>
<tr>
<td>copysign(C99) </td>
<td> 拷贝第二个参数的符号。返回值由第一个参数的绝对值和第二个参数的符号组成 </td>
<td> copies the sign of a floating point value</td>
</tr>
</tbody>
</table>


测试代码：

	void testFloatingPointFunc()
	{
	    int initialInt = 0;
	    float initialFloat= 0;
	    double num = 3.1415926;
	    int *frexpNum = &initialInt;
	    printf("frexp = %f; frexpNum = %d;\n",frexp(num, frexpNum),*frexpNum);
	    
	    //
	    float *modfFloat = & initialFloat;
	    printf("modff(-74.12,modfFloat) = %f;\nmodfFloat 's value =%f;\n",modff(-74.12,modfFloat),*modfFloat);
	    
	    //scalbn(x,y),返回值 z = x * 2^y ,其中2使用FLT_RADIX表示
	    printf("scalbn 用法 :%f %d；\n",scalbn(5.0, 3),FLT_RADIX);
	    
	    //
	    printf("ilogb = %d ；logb = %f \n",ilogb(8),logb(8));
	    
	    //
	    printf("nextafter %f ;nextafter %f ;\n",nextafter(5.1, 4.0),nexttowardf(5.1, 4.0));
	    
	    //copysign拷贝后一个参数的符号给第一个参数
	    printf("copysign %f;%f;\n",copysign(4.3,-5.8),copysign(-2.5,4));
	    printf("copysign %f;%f;\n",copysign(0,-5.8),copysign(0,4));
	}

### 分类方法(Classification)	

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>fpclassify(C99) </td>
<td> 对浮点数的类别判断.返回值为以下的某值：  <br><br><strong>FP_NAN</strong>：浮点数x不是一个数。<br><br><strong>FP_INFINITE</strong>：x的值为正负无穷大。<br><br><strong>FP_SUBNORMAL</strong>：x的绝对值过小，以至于无法以正常的形式表示，所以用更低精度、但离0更接近的形式表示。<br><br><strong>FP_NORMAL</strong>：x为除以上情况之外的正常的值。 </td>
<td> categorizes the given floating point value (function)</td>
</tr>
<tr>
<td>isfinite(C99) </td>
<td> 判断一个浮点类型数是否为无限不循环数，等价于(fpclassify (x) != FP_NAN &amp;&amp; fpclassify (x) != FP_INFINITE) </td>
<td> checks if the given number has finite value (function)</td>
</tr>
<tr>
<td>isinf(C99) </td>
<td> </td>
<td> checks if the given number is infinite (function)</td>
</tr>
<tr>
<td>isnan(C99) </td>
<td> 判断NaN </td>
<td> checks if the given number is NaN (function)</td>
</tr>
<tr>
<td>isnormal(C99) </td>
<td> 判断是否是一个正常值，<strong>FP_NORMAL</strong> </td>
<td> checks if the given number is normal (function)</td>
</tr>
<tr>
<td>signbit(C99) </td>
<td> //用于判断符号位(正数还是负数)，返回的符号位为0表示是正数，返回1是负数 </td>
<td> checks if the given number is negative (function)</td>
</tr>
</tbody>
</table>

## setjmp.h头文件
setjmp.h是C标准函数库中提供“非本地跳转”的头文件：控制流偏离了通常的子程序调用与返回串行。互补的两个函数setjmp与longjmp提供了这种功能。

setjmp/longjmp的典型用途是异常处理机制的实现：利用longjmp恢复程序或线程的状态，甚至可以跳过栈中多层的函数调用。



<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>int setjmp(jmp_buf env) </td>
<td> 创建本地的jmp_buf缓冲区并且初始化，用于将来跳转回此处。这个子程序 保存程序的调用环境于env参数所指的缓冲区，env将被longjmp使用。如果是从setjmp直接调用返回，setjmp返回值为0。如果是从longjmp恢复的程序调用环境返回，setjmp返回非零值。</td>
<td> Saves the current execution context into a variable env of type jmp_buf. This variable can later be used to restore the current execution context by longjmp function. That is, when a call to longjmp function is made, the execution continues at the particular call site that constructed the jmp_buf variable passed to longjmp. In that case setjmp returns the value passed to longjmp.</td>
</tr>
<tr>
<td>void longjmp(jmp_buf, int) </td>
<td> 恢复env所指的缓冲区中的程序调用环境上下文，env所指缓冲区的内容是由setjmp子程序[1]调用所保存。value的值从longjmp传递给setjmp。longjmp完成后，程序从对应的setjmp调用处继续执行，如同setjmp调用刚刚完成。如果value传递给longjmp零值，setjmp的返回值为1；否则，setjmp的返回值为value。 </td>
<td> Loads the execution context env saved by a previous call to setjmp. This function does not return. Control is transferred to the call site of the macro setjmp that set up env. That setjmp then returns the value, passed as the status.<br><br>If the function that called setjmp has exited, the behavior is undefined (in other words, only long jumps up the call stack are allowed)<br><br>No destructors for automatic objects are called. If replacing of longjmp with throw and setjmp with catch would execute a non-trivial destructor for any automatic object, the behavior of such longjmp is undefined.</td>
</tr>
</tbody>
</table>

简单测试demo：

	#include <stdio.h>
	#include <setjmp.h>
	static jmp_buf buf;

	void second(void) {
	    printf("second\n");         // 打印
	    longjmp(buf,1);             // 跳回setjmp的调用处 - 使得setjmp返回值为1
	}
	
	void first(void) {
	    second();
	    printf("first\n");          // 不可能执行到此行
	}
	int main(int argc, const char * argv[])
	{
	    if ( ! setjmp(buf) ) {
	        first();                // 进入此行前，setjmp返回0
	    } else {                    // 当longjmp跳转回，setjmp返回1，因此进入此行
	        printf("main\n");       // 打印
	    }
	}
	
## signal.h头文件
signal.h是C标准函数库中的信号处理部分， 定义了程序执行时如何处理不同的信号。信号用作进程间通信， 报告异常行为（如除零）、用户的一些按键组合（如同时按下Ctrl与C键，产生信号SIGINT）。

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>signal </td>
<td> 当程序收到特定信号时应该执行的处理函数 </td>
<td> sets a signal handler for particular signal</td>
</tr>
<tr>
<td>raise </td>
<td> 人工抛出一个信号 </td>
<td> runs the signal handler for particular signal</td>
</tr>
</tbody>
</table>



C语言标准定义了6个信号。都定义在signal.h头文件中。

* SIGABRT - 异常中止。
* SIGFPE - 浮点异常。
* SIGILL - 无效指令。
* SIGINT - 交互的用户按键请求，默认情况下，这会导致进程终止。
* SIGSEGV - 无效内存访问。
* SIGTERM - 程序的中止请求。

## stdarg.h头文件


stdarg.h是C语言中C标准库的头文件，stdarg是由stdandard(标准) arguments(参数)简化而来，主要目的为让函数能够接收不定量参数。C++的cstdarg头文件中也提供这样的机能；虽然与C的头文件是兼容的，但是也有冲突存在。[stdarg.h的参考资料](http://zh.wikipedia.org/wiki/Stdarg.h)

## stdio.h头文件

### 文件访问相关方法（File access）

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>fopen </td>
<td> FILE	*fopen(const char * file_path, const char * open_mode) 打开一个文件。第一个参数是文件路径，第二个参数是打开模式 </td>
<td> opens a file (function)</td>
</tr>
<tr>
<td>freopen </td>
<td> 使用别名打开一个已经存在的流。关闭FILE指针所指向的文件,然后打开指定名称的新文件,将他的FILE结构放入刚刚关闭的FILE 指针所指向的结构中,返回值是 FILE 指针,如果发生错误,返回一个空指针,同时出入函数的 FILE 指针也会被关闭,这个函数常用的是重定向标准流 stdin stdout stderr </td>
<td> open an existing stream with a different name (function)</td>
</tr>
<tr>
<td>fclose </td>
<td> 关闭文件 </td>
<td> closes a file (function)</td>
</tr>
<tr>
<td>fflush </td>
<td> 清空缓冲区,如果文件打开的目的是写,就将缓冲区的内容写入文件,如果打开文件的目的 是进行读取,就直接清空缓冲区,成功返回 0 </td>
<td> synchronizes an output stream with the actual file (function)</td>
</tr>
<tr>
<td>fwide </td>
<td> 切换流中的宽字符和窄字符 </td>
<td> switches a file stream between wide character I/O and narrow character I/O (function)</td>
</tr>
<tr>
<td>setbuf </td>
<td> 为打开的文件建立缓冲区,类似于 setvbuf,不同是没有返回值而且不能指定缓冲区的大小, 这个函数建立的缓冲区的大小有BUFSIZ宏决定。如果在调用的时候buffer参数不为空,并 且 buffer 的大小比 BUFSIZ 大,就会为 IO 建立全缓冲,等同与使用_IOFBF 参数调用的 setvbuf;如果传入的 buffer 为 NULL,就会完全非缓冲,进行数据的直接读写 这个函数的调用必须在打开文件之后和任何的文件读写之前进行 </td>
<td> sets the buffer for a file stream (function)</td>
</tr>
<tr>
<td>setvbuf </td>
<td> void setvbuf(FILE *stream,char *buf,int type,unsigned size) <br> <br>给流stream指定一个缓冲区buf,大小为size,类型为type</td>
<td> sets the buffer and its size for a file stream (function)</td>
</tr>
</tbody>
</table>

#### fopen函数
fopen函数中，文件打开模式有以下几种：
<table class="jqe-table" width="600" border="1" bordercolor="#cccccc"><tbody><tr><td>r</td><td>以只读方式打开文件，该文件必须存在。</td></tr><tr><td>r+</td><td>以可读写方式打开文件，该文件必须存在。</td></tr><tr><td>rb+</td><td>读写打开一个二进制文件，允许读数据。</td></tr><tr><td>rt+</td><td>读写打开一个文本文件，允许读和写。</td></tr><tr><td>w</td><td>打开只写文件，若文件存在则文件长度清为0，即该文件内容会消失。若文件不存在则建立该文件。</td></tr><tr><td>w+</td><td>打开可读写文件，若文件存在则文件长度清为零，即该文件内容会消失。若文件不存在则建立该文件。</td></tr><tr><td>a</td><td>以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留。（EOF符保留）</td></tr><tr><td>a+</td><td>以附加方式打开可读写的文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾后，即文件原先的内容会被保留。 （原来的EOF符不保留）</td></tr><tr><td>wb</td><td>只写打开或新建一个二进制文件；只允许写数据。</td></tr><tr><td>wb+</td><td>读写打开或建立一个二进制文件，允许读和写。</td></tr><tr><td>wt+</td><td>读写打开或着建立一个文本文件；允许读写。</td></tr><tr><td>at+</td><td>读写打开一个文本文件，允许读或在文本末追加数据。</td></tr><tr><td>ab+</td><td>读写打开一个二进制文件，允许读或在文件末追加数据。</td></tr></tbody></table>
	
使用demo：
	
	void test_fopen_Fun()
	{
	    const char *path = "Test.txt";//文件路径
	    FILE *fp =  fopen(path, "r+");	    int c = 0;	    if(fp == NULL)
	    {
	        fprintf(stderr,"Unable to open the file.\n");
	    }	    else while(1)
	    {	        c = fgetc(fp);	        if(c == EOF){	            if(feof(fp)) fprintf(stderr,"\nThe end of the file.\n");	            else if(ferror(fp))	                fprintf(stderr,"\nError on reading the file.\n");	            clearerr(fp);	            break;	        
	        }else{putchar(c);}
	    }
	}
	
	
### 重定向IO函数(Direct input/output)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>fread  </td>
<td> 从文件中读取内容 <br> <br>size_t fread(void *ptr, size_t size, size_t nmemb,FILE *stream); <br>试着从stream指向的流中读取nmemb个元素,每个元素大小为size个字节,并且把读入的元素存储到ptr指向的数组中。</td>
<td>reads from a file (function)</td>
</tr>
<tr>
<td>fwrite </td>
<td> 将内容写入到文件 <br><br>size_t fwrite(const void *ptr,size_tsize,size_t nmemb, FILE *stream); <br>从ptr指向的数组中写nmemb个元素到stream指向的流中,且每个元素大小为size个字节。<br><strong>返回值</strong>： 实际写入的元素(不是字符)的数量。如果fwrite函数检测到写错误,则这个数将会小 于nmemb。</td>
<td> writes to a file(function)</td>
</tr>
</tbody>
</table>

### 无格式IO(Unformatted input/output)

<table>
<thead>
<tr>
<th>方法 </th>
<th> 中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>fgetc<br>getc </td>
<td> 从文件中读取char字符 </td>
<td> gets a character from a file stream (function)</td>
</tr>
<tr>
<td>fgets</td>
<td> 从文件中读取字符串 </td>
<td> gets a character string from a file stream (function)</td>
</tr>
<tr>
<td>fputc<br>putc </td>
<td> 将字符写入到流中  </td>
<td> writes a character to a file stream (function)</td>
</tr>
<tr>
<td>fputs </td>
<td> 将字符串写入到流中 </td>
<td> writes a character string to a file stream (function)</td>
</tr>
<tr>
<td>getchar </td>
<td> 从标准输入流中读取字符 </td>
<td> reads a character from stdin (function)</td>
</tr>
<tr>
<td>gets </td>
<td> 从标志输入流中读取字符串 </td>
<td> reads a character string from stdin (function)</td>
</tr>
<tr>
<td>putchar </td>
<td> 将字符写入到标志输出流中 </td>
<td> writes a character to stdout (function)</td>
</tr>
<tr>
<td>puts </td>
<td> 将字符串写入到标志输出流中 </td>
<td> writes a character string to stdout (function)</td>
</tr>
<tr>
<td>ungetc </td>
<td> int ungetc( int c, FILE *fp );<br><br>将字符 c 写入 fp 指向的文件缓冲区,这样稍后读取字符的时候就会读到 c,然而如果程序 还没有调用读取操作就调用重定向函数(rewind fsetposfseek),那么使用ungetc() 放入的字符就会丢失,这个函数不会改变磁盘文件中的内容;多次调用不一定能成功,如果 成功,就是后进先出的堆栈顺序 <br><br>函数返回放回的字符,如果失败返回 EOF,不能在文件缓冲区中写 EOF 字符 </td>
<td> puts a character back into a file stream</td>
</tr>
</tbody>
</table>

测试代码：

	//ungetc函数使用示例
	void test_ungetc_Fun()
	{
	    FILE *fp = fopen("test.txt","w+");	    char buffer[100] = "taozhijiang";	    fprintf(fp,"%s",buffer);	    rewind(fp);	    ungetc('T',fp);	    ungetc('A',fp);	    ungetc('O',fp);	    fscanf(fp,"%s",buffer);	    printf("%s\n",buffer);
	}
	
	//fread函数使用示例
	void test_fread_Fun()
	{
	    FILE *fp = fopen("test.txt","r");	    char str[20];	    fread(str,sizeof(char),10,fp);	    fclose(fp);	    str[10] = '\0';	    printf("%s\n",str);
	}
	
### 格式化输入/输出函数(Formatted input/output)

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>scanf<br>fscanf <br>sscanf </td>
<td>int scanf(const char *format, ...);<br> <br> 从stdin流读取任意数量数据项。format指向的字符串说明了读入项的格式。跟随在 format后边的参数指向数据项要存储的地方。 </td>
<td> reads formatted input from stdin, a file stream or a buffer (function)</td>
</tr>
<tr>
<td>vscanf(C99)<br>vfscanf(C99)<br>vsscanf(C99)<br> </td>
<td> 使用可变参数列表，从stdin流读取任意数量数据项 </td>
<td> reads formatted input from stdin, a file stream or a buffer using variable argument list (function)</td>
</tr>
<tr>
<td>printf <br>fprintf<br> sprintf<br> snprintf(C99)<br> </td>
<td> 向stdout流写数据 </td>
<td>  prints formatted output to stdout, a file stream or a buffer (function)</td>
</tr>
<tr>
<td>vprintf <br>vfprintf<br>vsprintf<br>vsnprintf(C99)<br> </td>
<td> 使用可变参数列表，从stdout流写数据 </td>
<td> prints formatted output to stdout, a file stream or a bufferusing variable argument list (function)</td>
</tr>
</tbody>
</table>

### 宽字符输入/输出函数(Wide character)

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>wscanf<br>fwscanf<br>swscanf </td>
<td> 从stdin流读取宽字符数据 </td>
<td> reads formatted wide character input from stdin, a file stream or a buffer (function)</td>
</tr>
<tr>
<td>vwscanf(C99)<br>vfwscanf(C99)<br>vswscanf(C99) </td>
<td> 从stdin流读取宽字符数据，可变参数列表 </td>
<td> reads formatted wide character input from stdin, a file streamor a buffer using variable argument list (function)</td>
</tr>
<tr>
<td>wprintf<br>fwprintf<br>swprintf </td>
<td> 向stdout流写宽字符数据 </td>
<td> prints formatted wide character output to stdout, a file stream or a buffer (function)</td>
</tr>
<tr>
<td>vwprintf<br>vfwprintf<br>vswprintf </td>
<td> 向stdout流写宽字符数据，可变参数列表 </td>
<td> prints formatted wide character output to stdout, a file streamor a buffer using variable argument list (function)</td>
</tr>
</tbody>
</table>


### 文件位置相关函数(File positioning)


<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ftell<br> </td>
<td> long int ftell(FILE *stream); <br> <br> 返回stream指向的流的当前文件位置指示器。如果调用失败,返回-1L,并且把由实现定 义的错误码存储在errno中。 </td>
<td> returns the current file position indicator (function)</td>
</tr>
<tr>
<td>fgetpos </td>
<td> 获得文件位置 <br> int fgetpos(FILE *stream, fpos_t *pos); <br><br>把stream指向的流的当前位置存储到pos指向的对象中。 </td>
<td> gets the file position indicator (function)</td>
</tr>
<tr>
<td>fseek </td>
<td> 文件查找<br> int fseek(FILE *stream, long int offset, int whence); <br> <br>为stream指向的流改变文件位置指示器。如果whence是SEEK_SET,那么新位置是在文件开始处加上offset个字节。如果whence是SEEK_CUR,那么新位置是在当前位置加上 offset个字节。如果whence是SEEK_END,那么新位置是在文件末尾加上offset个字节。 对于文本流而言,offset必须是零,或者whence必须是SEEK_SET并且offset的值是 由前一次的ftell函数调用获得的。而对于二进制流来说,fseek函数不可以支持whence 是SEEK_END的调用。<br><br>如果操作成功就返回零。否则返回非零值。 </td>
<td> moves the file position indicator to a specific location in a file (function)</td>
</tr>
<tr>
<td>fsetpos </td>
<td> 设置文件位置 <br> int fsetpos(FILE *stream, const fpos_t *pos); <br> <br> 根据pos(前一次fgetpos函数调用获得的)指向的值来为stream指向的流设置文件位 置指示器。<br><br> 返回 如果成功就返回零。如果调用失败,返回非零值,并且把由实现定义的错误码存储在errno中 </td>
<td> moves the file position indicator to a specific location in a file (function)</td>
</tr>
<tr>
<td>rewind </td>
<td> 返回到文件头 <br>void rewind(FILE *stream);<br><br>为stream指向的流设置文件位置指示器到文件的开始处。为流清除错误指示器和文件尾指示器。 </td>
<td> moves the file position indicator to the beginning in a file (function)</td>
</tr>
</tbody>
</table>

### 错误处理（Error handling）

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>clearerr </td>
<td> 清除流错误 <br>void clearerr(FILE *stream);<br><br>为stream指向的流清除文件尾指示器和错误指示器。 </td>
<td> clears errors (function)</td>
</tr>
<tr>
<td>feof </td>
<td> 检测文件末尾<br> int feof(FILE *stream); <br> <br>返回:<br>如果为stream指向的流设置了文件尾指示器,那么返回非零值。否则返回零。</td>
<td> checks for the end-of-file (function)</td>
</tr>
<tr>
<td>ferror </td>
<td> 检测文件错误<br> int ferror(FILE *stream);<br><br>返回:<br> 如果为stream指向的流设置了文件错误指示器,那么返回非零值。否则返回零。 </td>
<td> checks for a file error (function)</td>
</tr>
<tr>
<td>perror </td>
<td> 显示错误信息 <br> void perror(const char *s);<br><br>向Stderr流中写下列信息:字符串:出错信息 这里的字符串是s所指向的字符串。出错信息是由实现定义的,它与strerror (errno) 函数调用返回的信息相匹配。 </td>
<td> displays a character string corresponding of the current error to stderr (function)</td>
</tr>
</tbody>
</table>

### 文件操作(Operations on files)

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>remove </td>
<td> 移除文件<br> int remove(const char *filename);<br><br>删除文件,此文件名由filename指向。 返回 如果成功就返回零;否则返回非零值。 </td>
<td> erases a file (function)</td>
</tr>
<tr>
<td>rename </td>
<td> 重命名文件<br>int rename(const char *old, const char *new); <br><br>改变文件的名字。old和new指向的字符串分别包含旧的文件名和新的文件名。 </td>
<td> renames a file (function)</td>
</tr>
<tr>
<td>tmpfile </td>
<td> 创建临时文件 <br> FILE *tmpfile(void);<br><br>创建临时文件,此文件在被关闭或者程序结束时会被自动删除。按照"wb+"模式打开文件。 返回文件指针。当执行对此文件的后续操作时候用到此指针。如果无法创建文件,则返回空指针 </td>
<td> returns a pointer to a temporary file (function)</td>
</tr>
<tr>
<td>tmpnam </td>
<td> 产生临时文件名<br> char *tmpnam(char *s);<br><br>产生临时文件名。如果s是空指针,那么tmpnam把文件名存储在静态变量中。否则,它会把文件名复制到s指向的字符数组中。(数组必须足够长可以存储L_tmpnam个字符, 这里的L_tmpnam是在&lt;stdio.h&gt;头文件中定义的宏。)返回 指向文件名的指针。  </td>
<td> returns a unique filename (function)</td>
</tr>
</tbody>
</table>

## stdlib.h头文件
### 内存管理(C memory management library)

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>malloc </td>
<td> 分配内存<br>void *malloc(size_t size);<br><br>分配size个字节的内存块。不清除内存块。 指向内存块开始处的指针。如果无法分配要求尺寸的内存块,那么返回空指针。 </td>
<td> allocates memory  (function)</td>
</tr>
<tr>
<td>calloc </td>
<td> 分配并清除内存块<br>void *calloc(size_t nmemb, size_t size); <br><br>为带有nmemb个元素的数组分配内存块,其中每个数组元素占size个字节。通过设置所 有位为零来清除内存块。返回 指向内存块开始处的指针。如果不能分配所要求大小的内存块,那么返回空指针。 </td>
<td> allocates and zeroes memory (function)</td>
</tr>
<tr>
<td>realloc </td>
<td> 调整内存块<br>void *realloc(void *ptr, size_t size);<br><br>假设ptr指向先前由calloc函数、malloc函数或realloc函数获得内存块。realloc函数分配size个字节的内存块,并且如果需要还会复制旧内存块的内容。返回 指向新内存块开始处的指针。如果无法分配要求尺寸的内存块,那么返回空指针。 </td>
<td> expands previously allocated memory block (function)</td>
</tr>
<tr>
<td>free </td>
<td> 释放内存块<br>void free (void *ptr);<br><br>释放地址为ptr的内存块(除非ptr为空指针时调用无效)。块必须通过calloc函数、malloc函数或realloc函数进行分配。 </td>
<td> deallocates previously allocated memory (function)</td>
</tr>
<tr>
<td>aligned_alloc(C11) </td>
<td> </td>
<td> allocates aligned memory (function)</td>
</tr>
</tbody>
</table>


### 程序支持工具(Program support utilities)

<table>
<thead>
<tr>
<th>方法   </th>
<th>中文描述 </th>
<th> 英文描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>abort </td>
<td> 异常终止程序<br> void abort(void);<br><br>产生SIGABRT信号。如果无法捕获信号(或者如果信号处理函数返回),那么程序会异常 终止,并且返回由实现定义的代码来说明不成功的终止。是否清洗输出缓冲区,是否关 闭打开的流,以及是否移除临时文件都是由实现定义的。</td>
<td> causes abnormal program termination (without cleaning up) (function)</td>
</tr>
<tr>
<td>exit </td>
<td> 退出程序<br> void exit(int status);<br><br>调用所有用atexit函数注册的函数,清洗全部输出缓冲区,关闭所有打开的流,移除任 何由tmpfile产生的文件,并终止程序。status的值说明程序是否正常终止。status 唯一可移植的值是0和EXIT_SUCCESS(两者都说明成功终止)以及EXIT_FAILURE(不 成功的终止)。status的其他值都是由实现定义的。 </td>
<td> causes normal program termination with cleaning up (function)</td>
</tr>
<tr>
<td>quick_exit(C99) </td>
<td> 作为第三种终止程序的方式。当 exit()失败时可以做最少的清理工作。 </td>
<td> causes normal program termination without completely cleaning up (function)</td>
</tr>
<tr>
<td>_Exit(C99) </td>
<td> _Exit()用来立刻结束目前进程的执行, 并把参数status 返回给父进程, 并关闭未关闭的文件. 此函数调用后不会返回, 并且会传递SIGCHLD 信号给父进程, 父进程可以由wait 函数取得子进程结束状态. </td>
<td> causes normal program termination without cleaning up (function)</td>
</tr>
<tr>
<td>atexit </td>
<td> 在程序退出处注册要调用的函数 <br> int atexit(void (*func)(void));<br><br>注册由func指向的函数作为终止函数。如果程序正常终止(通过return或exit,而不 是abort),那么将调用函数。可以重复调用atexit函数来注册多个终止函数。最后一 个注册的函数将是在终止前第一个被调用的函数。返回 如果成功,返回零。如果不成功,则返回非零(达到由实现定义的限制)。 </td>
<td> registers a function to be called on exit() invocation (function)</td>
</tr>
<tr>
<td>at_quick_exit(C99) </td>
<td> </td>
<td> registers a function to be called on quick_exit invocation (function)</td>
</tr>
<tr>
<td>EXIT_SUCCESS<br>EXIT_FAILURE </td>
<td> 表明程序的执行状态 </td>
<td> indicates program execution execution status (macro constant)</td>
</tr>
<tr>
<td>system </td>
<td> 执行操作系统命令,<br><br>int system(const char *string);<br><br>把string指向的字符串传递给操作系统的命令处理器(命令解释程序)来执行。返回 当string是空指针时,如果命令处理器有效,则返回非零值。如果string不是空指针</td>
<td>calls the host environment's command processor</td>
</tr>
</tbody>
</table>

### 随机数生成函数(Pseudo-random number generation)


[用C语言的rand()和srand()产生伪随机数的方法总结](http://developer.51cto.com/art/201105/264174.htm)


方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
rand | 生成一个随机数。 <br /><br />int rand(); |generates a pseudo-random number (function)
srand | 启动伪随机数产生器.void srand(unsigned int seed);<br /><br />使用seed来初始化由rand函数调用而产生的伪随机序列。 | seeds pseudo-random number generator (function)
RAND_MAX | 使用随机数函数返回的随机数最大值(至少大于32767) | maximum possible value generated by rand() (macro constant)

## string.h头文件
### 字符分类（Character classification）
方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
isalnum　|　判断字符是否是一个数字 |checks if a character is alphanumeric (function)
isalpha |　判断是否为一个字母 | checks if a character is alphabetic (function)
islower |　判断是否为小写 | checks if a character is lowercase (function)
isupper |　判断是否为大写 | checks if a character is an uppercase character (function)
isdigit |　判断是否为数字，<br />如果c是数字,返回非零值;否则返回零　 | checks if a character is a digit (function)
isxdigit | 如果c是十六进制数字(0-9、a-f、A-F),返回非零值;否则返回零。 | checks if a character is a hexadecimal character (function)
iscntrl | 判断是否为控制字符 | checks if a character is a control character (function)
isgraph | 如果c是显示字符(除了空格),返回非零值;否则返回零 | checks if a character is a graphical character (function)
isspace | 如果c是空白字符,返回非零值;否则返回零。空白字符有空格(' ')、换页符('\f')、 换行符('\n')、回车符('\r'),横向制表符('\t')和纵向制表符('\v')。 | checks if a character is a space character (function)
isblank(C99) |判断字符c是否为TAB或空格。当c为TAB或空格时，返回非零值，否则返回零。 | checks if a character is a blank character (function)
isprint | 如果c是显示字符(包括空格),返回非零值;否则返回零。 | checks if a character is a printing character (function)
ispunct | 如果c是标点符号字符,返回非零值;否则返回零。除了空格、字母和数字字符以外, 所有显示字符都可以看成是标点符号。 | checks if a character is a punctuation character (function)

### 字符串操作函数(String manipulation)

方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
strcpy | 字符串复制<br />`char *strcpy(char *s1, const char *s2);` <br /><br />把s2指向的字符串复制到s1所指向的数组中。返回 s1(指向目的的指针)。 为了减少缓冲区上溢的危险,建议使用 strncpy|　copies one string to another (function)
strncpy | 字符串复制<br />`char* strncpy( char* restrict dst, const char* restrict src, size_t n ); `这个函数如果src的长度小于n个,那么在字符串复制后一直添加空字符知道n个字符,如 果大于 n,那么是不自动添加空字符的 |　copies a certain amount of characters from one string to another (function)
strcat | 字符串的连接<br /><br />`*char *strcat(char *s1, const char *s2);`<br /> <br />把s2指向的字符串连接到s1指向的字符串后边。返回 s1(指向连接后字符串的指针)。 |　concatenates two strings (function)
strncat | 有限制的字符串的连接<br /><br />`char *strncat(char *s1, const char *s2, size_t n); `<br /><br />把来自s2所指向的数组的字符连接到s1指向的字符串后边。当遇到空字符或已经复制了 n个字符时,复制操作停止。<br />返回 s1(指向连接后字符串的指针)。 |　concatenates a certain amount of characters of two strings 
strxfrm | 转换指定地区的字符串 <br /><br />`size_t strxfrm(char *s1, const char *s2, size_t n);` <br /><br />函数转换由s2指向的字符串,把结果的前n个字符(包括空字符)放到s1指向的数组中。 调用带有两个转换的字符串的strcmp函数应该会产生相同的结果(负数、零或正数), 就像调用带有原始字符串的strcol函数。<br /><br />返回 转换的字符串的长度(可能超过n)。|　converts a substring so that it can be used by string comparison functions (function)

### 字符串检测方法（String examination）
方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
strlen | 返回字符串长度 | returns the length of a given string (function)
strcmp | 比较字符串 <br /><br /> ` int strcmp(const char *s1, const char *s2);`<br /> <br /> 返回负数、零还是正整数,依赖于s1所指向的字符串是小于、等于还是大于s2所指的字符串。 | compares two strings (function)
strncmp | `int strncmp( const char* s1, const char* s2, size_t len );`<br /><br />比较前 len 个字符,后面的字符会被忽略 | compares a certain amount of characters of two strings (function)
strcoll | 采用指定地区的比较序列进行字符串比较<br /><br />  `int strcoll(const char *s1, const char *s2);`<br /><br /> 返回 负数、零还是正整数,依赖于s1所指向的字符串是小于、等于还是大于s2所指的字符串。 根据当前地区的LC_COLLATE类型规则来执行比较操作。 | compares two strings in accordance to the current locale (function)
strchr | 搜索字符串中字符<br /><br /> `char *strchr(const char *s, int c);`<br /><br /> 返回 指向字符的指针,此字符是s所指向的字符串的前n个字符中第一个遇到的字符c。如果 没有找到c,则返回空指针。 | finds the first occurrence of a character 
strrchr | `char* strrchr( const char* s, int c );`<br /><br />查询 s 中最右边第一次出现 c(包含\0)的位置,返回空指针如果没有发现 | finds the last occurrence of a character (function)
strspn | `size_t strspn(const char *s, const char * accept);`<br /><br /> 函数说明：strspn()从参数s 字符串的开头计算连续的字符, 而这些字符都完全是accept 所指字符串中的字符.简单的说, 若strspn()返回的数值为n, 则代表字符串s 开头连续有n 个字符都是属于字符串accept 内的字符. | returns the length of the maximum initial segment that consists of only the characters found in another byte string (function)
strcspn |搜索集合中不在初始范围内的字符串<br /><br /> size_t strcspn(const char *s1, const char *s2);<br /><br /> 返回 最长的初始字符段的长度,此初始字符段由s1指向的,但是不包含s2指向的字符串中的 任何字符。 | returns the length of the maximum initial segment that consists of only the characters not found in another byte string (function)
strpbrk | 为一组字符之一搜索字符串 <br /> `char *strpbrk(const char *s1, const char *s2);`<br /><br /> 返回 指向字符的指针,此字符是s1所指向字符串中与s2所指向字符串中的字符相匹配的最左 侧的字符。如果没有找到匹配字符,则返回空指针。 | finds the first location of any character in one string, in another string (function)
strstr | 搜索子字符串<br /><br />`char *strstr(const char *s1, const char *s2);`<br /><br /> 在 s1 中查询字符串 s2,返回的是 s1 中符合的子字符串的首地址,如果 s2 是空,就返回 s1 | finds the first occurrence of a substring of characters (function)
strtok | `extern char *strtok(char *s, char *delim);`<br /><br /> 分解字符串为一组标记串。s为要分解的字符串，delim为分隔符字符串。首次调用时，s必须指向要分解的字符串，随后调用要把s设成NULL。<br />        strtok在s中查找包含在delim中的字符并用NULL('\0')来替换，直到找遍整个字符串。<br />        返回指向下一个标记串。当没有标记串时则返回空字符NULL。| finds the next token in a byte string (function)

测试代码：
	
	#include <string.h>
	void find_str(char const* str, char const* substr)
	{
	    char* pos = strstr(str, substr);
	    if(pos) {
	        printf("found the string '%s' in '%s' at position: %ld\n", substr, str, pos - str);
	    } else {
	        printf("the string '%s' was not found in '%s'\n", substr, str);
	    }
	}
	void test_string_Fun()
	{
	    //strtok()
	    char *str = malloc(20);
	    char *tok = NULL;
	    strcpy(str, "This is a string");
	    printf("string before strtok(): %s\n", str);
	    tok = strtok(str, " ");
	    while (tok) {
	        printf("Token: %s\n", tok);
	        tok = strtok(NULL, " ");
	    }
	    free(str);
	    
	    char* str1 = "one two three";
	    find_str(str1, "two");
	    find_str(str1, "");
	    find_str(str1, "nine");
	    find_str(str1, "n");
	}

### 字符数组操作(Character array manipulation)

方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
memchr | 搜索内存块字符 <br /> `void **memchr(const void *s, int c, size_t n); `<br /> <br />返回: 指向字符的指针,此字符是s所指向对象的前n个字符中第一个遇到的字符c。如果没有找到c,则返回空指针。 | searches an array for the first occurrence of a character (function)
memcmp | `int memcmp(const void *s1, const void *s2, size_t n);`<br /> <br />负整数、零还是正整数依赖于s1所指向对象的前n个字符是小于、等于还是大于s2所指 向对象的前n个字符。| compares two buffers (function)
memset | `void *memset(void *s, int c, size_t n);` <br /> <br />把c存储到s指向的内存块的前n个字符中。<br /> <br />返回 s(指向内存块的指针)。 | fills a buffer with a character (function)
memcpy |复制内存块<br /> <br />`void *memcpy(void *s1, const void *s2, size_t n); `<br /> <br />把s2所指向对象的n个字符复制到s1所指向的对象中。如果对象重叠,则不可能正确地 工作。<br />返回 : s1(指向目的的指针)。 | copies one buffer to another (function)
memmove |复制内存块 <br /> <br /> `void *memmove(void *s1, con*st void **s2, size_t n);` <br /> <br />把s2所指向对象的n个字符复制到s1所指向的对象中。如果对象重叠,即使memmove函 数比memcpy函数速度慢,但是memmove函数还将正确地工作。 | moves one buffer to another 

测试代码：
	
	void test_char_array_Fun()
	{
	    //memchr() 搜索内存块字符
	    char str1[20] = "beijing";	    char str2[25] = "beijinghuanyingni!";	    char *temp = NULL;	    temp = memchr(str1,'j',sizeof(str1));	    printf("%s\n",temp); //point to the 'j'
	    
	    //memcmp()
	    printf("compare result = %d;\n",memcmp(str1, str2, sizeof(str1)));
	    
	    //memset()	    memset(str2,'S',1);	    printf("memset test : %s\n",str2);
	    
	    //memcpy()
	    char *copy_str = "I am copied content";
	    char str3[20] = "beijing";
	    memcpy(str3, copy_str, sizeof(str3));
	    printf("memcpy test : %s \n",str3);
	    
	    //memmove()
	    char *move_str = "beijing";
	    char str4[30] = "beijing is a big city";
	    memmove(str4, move_str, sizeof(str4));
	    printf("memmove test : %s \n",str4);
	}
	
## time.h头文件（Date and time utilities）

### 时间操作(time manipulation)

方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
difftime | 计算时间差，返回值的单位是**秒**<br /><br /> double difftime( time_t time_end, time_t time_beg );<br /><br />| computes the difference between times (function)
time |当前时间 <br /><br /> `time_t time(time_t *timer);`<br /><br />返回 当前的日历时间。如果日历时间无效,则返回(time_t)-1。如果timer不是空指针, 也把返回值存储到timer指向的对象中。 | returns the current time of the system as time since epoch (function)
clock | 处理器时钟 <br /><br /> clock_t clock(void);<br /><br /> 返回 从程序开始执行起所经过的处理器时间(按照“tick”来衡量的)。(用 CLOCKS_PER_SEC除以此时间来转换成秒。)如果时间无效或者无法表示,那么返回 (clock_t)-1。 | returns raw processor clock time since the program is started (function)

测试demo：
	
	void test_time_man_Fun()
	{
	    //difftime()
	    time_t now ;
	    time(&now);//time()
	    struct tm beg = *localtime(&now);
	    // set beg to the beginning of the month
	    beg.tm_hour = 0;
	    beg.tm_min = 0;
	    beg.tm_sec = 0;
	    beg.tm_mday = 1;
	    double seconds = difftime(now, mktime(&beg));
	    printf("离月初距离%.f秒.\n", seconds);
	    
	    //clock()
	    clock_t t = clock();
	    double d = 0.0; // we dont want subsequent computation to be optimized out
	    for (int n=0; n<10000; ++n)
	        for (int m=0; m<10000; ++m)
	            d += d*n*m;
	    t = clock() - t;
	    printf("执行使用时间: %f 秒；使用的CPU时钟周期%ld;\n",((float)t)/CLOCKS_PER_SEC,t);
	    
	}
	
### 时间转换相关(Format conversions)

**表示时间的三种数据类型:**

* **日历时间（calendar time）**，是从一个标准时间点（epoch）到现在的时间经过的秒数，不包括插入闰秒对时间的调整。开始计时的标准时间点，各种编译器一般使用1970年1月1日0时0秒。日历时间用数据类型time_t表示。time_t类型实际上一般是32位或64位整数类型。<br /><br />
* **时钟滴答数（clock tick）**，从进程启动开始计时，因此这是相对时间。每秒钟包含CLOCKS_PER_SEC（time.h中定义的常量，一般为1000）个时钟滴答。时钟滴答数用数据类型clock_t表示。clock_t类型一般是32位整数类型。<br /><br />
* **分解时间(broken-down time)**，用结构数据类型tm表示<br /><br />

方法	 |中文描述 | 英文描述
------------ | ------------- | ------------
asctime | 把日期和时间转换成ASCII码<br /><br />`*char *asctime(const struct t*m *timeptr);`<br /><br />返回 指向以空字符结尾的字符串的指针,其格式如下所示: Mon Jul 15 12:30:45 1996\n 此格式的构造来源于timeptr指向的结构中的分解时间。 | converts a time_t object to a textual representation (function)
ctime | 把日期和时间转换成字符串<br /><br />`char *ctime(const time_t *timer);`<br /><br />返回 指向字符串的指针,此字符串描述了本地时间,此时间等价于timer指向的日历时间。 等价于asctime(localtime(timer))。 | converts a time_t object to a textual representation (function)
strftime | 把格式化的日期和时间写到字符串中<br /><br />`size_t strftime(char *s, size_t maxsize,const char *format,const struct tm \*timeptr);`<br /><br />在format指向的字符串的控制下把字符存储到s指向的数组中。格式串可能含有不用改 变就进行复制的普通字符和转换说明符,其中转换说明符要用timeptr指向的结构中的 值进行替换。maxsize参数限制了可以存储的字符的数量(包括空字符)。<br />返回 如果要存储的字符数量(包括空字符)超过了maxsize,那么返回零;否则,返回存储 的字符数量(不包括空字符)。 | converts a tm object to custom textual representation (function)
wcsftime | 格式化字符串,支持宽字符(中文就是用宽字符进行存储的)<br /><br />`size_t wcsftime( wchar_t\* str, size_t count, const wchar_t\* format, tm\* time );`<br /><br /> | converts a tm object to custom wide string textual representation (function)
gmtime | `struct tm\* gmtime(const time_t\* timer);`<br /><br />从日历时间time_t到分解时间tm的转换。函数返回的是一个静态分配的tm结构存储空间，该存储空间被gmtime, localtime与ctime函数所共用. 这些函数的每一次调用会覆盖这块tm结构存储空间的内容。 | converts time since epoch to calendar time expressed as Universal Coordinated Time (function)
localtime | 转换成区域时间<br /><br />`struct tm *localtime(const time_t *timer);`<br /><br />返回 指向结构的指针,此结构含有的分解时间等价于timer指向的日历时间。 | converts time since epoch to calendar time expressed as local time (function)
mktime | 转换成日历时间<br />time_t mktime(struct tm \*timeptr);<br /><br />把分解的区域时间(存储在由timeptr指向的结构中)转换成为日历时间。结构的成员不要求一定在合法的取值范围内。而且,会忽略tm_wday(星期的天号)的值和tm_yday (年份的天号)的值。调整其他成员到正确的取值范围内之后,mktime函数把值存储在tm_wday和tm_yday中。<br /><br />返回 日历时间对应timeptr指向的结构。如果无法表示日历时间,则返回(time_t)-1。 | converts calendar time to time since epoch (function)

测试demo:
	
	void test_time_convert_Fun()
	{
	    time_t rawtime;
	    struct tm *timeinfo;
	    time(&rawtime);
	    timeinfo = localtime(&rawtime);
	    
	    //asctime()
	    printf("asctime test :%s \n", asctime(timeinfo));
	    
	    //ctime()
	    printf("ctime test : %s \n",ctime(&rawtime));
	    
	    //strftime(),格式化字符串
	    char buff[70];
	    struct tm my_time = { .tm_year=113, // = year 2013
	        .tm_mon=9,    // = 10th month
	        .tm_mday=9,   // = 9th day
	        .tm_hour=8,   // = 8 hours
	        .tm_min=10,   // = 10 minutes
	        .tm_sec=20    // = 20 secs
	    };
	    long strf_int = strftime(buff, sizeof buff, "%y/%m/%d %H:%M:%S", &my_time);
	    if (strf_int) {
	        printf("strftime test: %s;\n",buff);
	    }
	    
	    //wcsftime()
	     setlocale(LC_ALL, "chinese-simplified");
	    if (wcsftime(buff, sizeof buff, L"%y/%m/%d %H:%M:%S", &my_time)) {
	        printf("wcsftime test: %s;\n",buff);
	    }
	}

## 算法相关函数

测试demo：
	
	void test_bsearch_Fun()
	{
	    //二分法进行查找,查找的数组必须是先前进行过排序的,而且这个查找函数所使用的比较函 数必须同排序法进行使用的函数必须是一样的
	    int i = 0;	    int data[] = {3,12,123,32,54,234,64,23,24};	    int n = sizeof(data) / sizeof(int);
	    printf("原始数组：");	    for(i = 0;i < n;i ++)	        printf("%d\t",data[i]);putchar('\n');
	    
	    //qsort()排序
	    /*
	        void qsort(void *base, size_t memb, size_t size, int (*compar)(const void *, const void *));
	        对base指向的数组排序。数组有memb个元素，每个元素的大小为size个字节。compar是指向“比较函数”的指针。当把指向2个数组元素的指针传递过来时，函数依赖于第一个数组元素是否小于，等于或者大于第二个数组元素应该返回负数、0或者正整数
	     */	    qsort(data,n,sizeof(int),comparefunc);
	    printf("qsort排序之后：");	    for(i = 0;i < n;i ++)	        printf("%d\t",data[i]);putchar('\n');
	    
	    //bsearch()
	    /*
	        void *bsearch(const void *key, const void *base,size_t memb, size_t size, int (*compar)(const void *,const void *));
	     
	         在有序数组中搜索由key指向的值。其中，数组存储在base地址上，且此数组有memb个元素，每个元素大小为size个字节。compar指向“比较函数”。
	         返回：指向数组元素的指针，此数组元素是用来测试是否等于关键字的。如果没有找到关键字，则返回空指针。
	     */	    int key = 12;	    int *found = bsearch(&key,data,n,sizeof(int),comparefunc);	    if( found == NULL)
	    {
	        printf("The key is not found.\n");
	    }	    else{
	        printf("Get it.\n");
	    }
	}

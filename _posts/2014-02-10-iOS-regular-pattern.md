---
layout: post
keywords: "iOS正则表达式"
description: "iOS正则表达式 "
title: "iOS正则表达式 "
categories: [iOS]
tags: [iOS 正则表达式]
group: archive
icon: file-alt
---
{% include site/setup %}

#TO-DO List

## 参考资料
1. [文字编码问题](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
2. 正则学习[正则表达式Greedy、Reluctant、Possessive 量词](http://blog.sina.com.cn/s/blog_6c9536b901011g2t.html) ； 
[正则表达式：Greedy、Reluctant、Possessive 区别](http://blog.csdn.net/ningguixin/article/details/7833392)
3. [正则测试工具](https://github.com/liyanage/regextester)


## 正则表达式知识点

### 原字符
iOS中正则表达式原字符(Regular Expression Metacharacters)；

<table>
<thead>
<tr>
<th>字符 </th>
<th> 含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>\a </td>
<td> 匹配警告符，\u0007</td>
</tr>
<tr>
<td>\A </td>
<td> 匹配起始输入，和"^"不同的地方是，"\A"在新的输入行不会进行匹配</td>
</tr>
<tr>
<td>\b </td>
<td> 匹配词的边界（单词的词头或者词尾）</td>
</tr>
<tr>
<td>\B </td>
<td> 匹配非词的边界（和\b相对）</td>
</tr>
<tr>
<td>\cX </td>
<td> 匹配<strong>"control-X"</strong>组合字符</td>
</tr>
<tr>
<td>\d </td>
<td> 匹配unicode普通Nd类型(数字，十进制数字)</td>
</tr>
<tr>
<td>\D </td>
<td> 匹配非Nd类型（和\d相对）</td>
</tr>
<tr>
<td>\e </td>
<td> 匹配转义字符(ESCAPE,/u001b)</td>
</tr>
<tr>
<td>\E </td>
<td> 特殊匹配，用于匹配 <strong>\Q ... \E</strong> 结构序列，<strong>\Q ... \E</strong>结构序列使用语表达式中需要比较长的普通文本，而其中包含了特殊符号的场景。</td>
</tr>
<tr>
<td>\f </td>
<td> 匹配换页符(\u000C)</td>
</tr>
<tr>
<td>\G </td>
<td> 匹配必须出现在上一个匹配结束的地方。</td>
</tr>
<tr>
<td>\n </td>
<td> 匹配换行符</td>
</tr>
<tr>
<td>\N{UNICODE CHARACTER NAME} </td>
<td> 匹配指定名称的字符</td>
</tr>
<tr>
<td>\p{UNICODE PROPERTY NAME} </td>
<td> 匹配指定集合中的任一指定字符</td>
</tr>
<tr>
<td>\P{UNICODE PROPERTY NAME} </td>
<td> 匹配不在指定集合中的任一指定字符，和 <strong>/p{UNICODE PROPERTY NAEM}</strong>相对</td>
</tr>
<tr>
<td>\Q </td>
<td> 用于和<strong>\E</strong>组成 <strong>\Q ... \E</strong> 结构序列</td>
</tr>
<tr>
<td>\r </td>
<td> 匹配回车(\u000D)</td>
</tr>
<tr>
<td>\s </td>
<td> 匹配空格符</td>
</tr>
<tr>
<td>\S </td>
<td> 匹配非空格符，和<strong>\s</strong>相对</td>
</tr>
<tr>
<td>\t </td>
<td> 匹配水平制表符 (\u0009).</td>
</tr>
<tr>
<td>\uhhhh </td>
<td> 匹配16进制字符  <strong>???</strong> Match the character with the hex value hhhh.</td>
</tr>
<tr>
<td>\Uhhhhhhhh </td>
<td> 匹配16进制字符 <strong>???</strong> Match the character with the hex value hhhhhhhh. Exactly eight hex digits must be provided, even though the largest Unicode code point is \U0010ffff.</td>
</tr>
<tr>
<td>\w </td>
<td> 匹配一个词</td>
</tr>
<tr>
<td>\W </td>
<td> 匹配一个非词，和\w相对</td>
</tr>
<tr>
<td>\x{hhhh} </td>
<td> 匹配指定的16进制字符 <strong>???</strong> Match the character with hex value hhhh. From one to six hex digits may be supplied.</td>
</tr>
<tr>
<td>\xhh </td>
<td> 匹配2位 <strong>???</strong>Match the character with two digit hex value hh.</td>
</tr>
<tr>
<td>\X </td>
<td> 匹配字母集(Grapheme cluster)</td>
</tr>
<tr>
<td>\z </td>
<td> 匹配字符串末尾</td>
</tr>
<tr>
<td>\Z </td>
<td> 匹配必须出现在字符串的末尾或出现在字符串末尾的 \n 之前。</td>
</tr>
<tr>
<td>\n </td>
<td> 匹配换行符，\n和\r是不一样的</td>
</tr>
<tr>
<td>\0ooo </td>
<td> 匹配8进制字符，0377是运行的最大8进制数</td>
</tr>
<tr>
<td>[pattern] </td>
<td> 匹配指定pattern的任一字符.eg:[a-z]表示a到z之间的某个字符，[A-Z]表示A到Z之间的某个字符。</td>
</tr>
<tr>
<td>. </td>
<td> 匹配任意字符</td>
</tr>
<tr>
<td>^ </td>
<td> 匹配行头</td>
</tr>
<tr>
<td>\ </td>
<td> 转义字符</td>
</tr>
</tbody>
</table>

### 操作符

iOS 正则表达式(Regular Expression Operators)

正则表达式的三种匹配类型：

* 贪婪匹配(greedy)：什么都不带
* 勉强匹配(reluctant):后带**?**
* 独占匹配（possessive）:后带**+**

<table>
<thead>
<tr>
<th>操作符 </th>
<th> 描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>| </td>
<td> 选择符，A | B表示匹配A或者B</td>
</tr>
<tr>
<td>* </td>
<td> 匹配0次或者多次。贪婪匹配(Match as many times as possible)</td>
</tr>
<tr>
<td>+ </td>
<td> 匹配1词或者多次，贪婪匹配(Match as many times as possible)</td>
</tr>
<tr>
<td>? </td>
<td> 匹配0次或者1次。最小匹配(prefer one)</td>
</tr>
<tr>
<td>{n} </td>
<td> 匹配n次</td>
</tr>
<tr>
<td>{n,} </td>
<td> 匹配至少n次。贪婪匹配(Match as many times as possible)</td>
</tr>
<tr>
<td>{n,m} </td>
<td> 匹配n(&gt;=n)到m(&lt;m)次.</td>
</tr>
<tr>
<td>*? </td>
<td> 匹配0次或者多次。最小匹配(Match as few times as possible)</td>
</tr>
<tr>
<td>+? </td>
<td> 匹配1次或者多次。最小匹配(Match as few times as possible)</td>
</tr>
<tr>
<td>?? </td>
<td> 匹配0次或者1次。最小匹配(匹配0次)</td>
</tr>
<tr>
<td>{n}? </td>
<td> 匹配n次</td>
</tr>
<tr>
<td>{n,}? </td>
<td> 匹配至少n次</td>
</tr>
<tr>
<td>{n,m}? </td>
<td> 匹配n(&gt;=n)到m(&lt;m)次.最小匹配(Match as few times as possible).</td>
</tr>
<tr>
<td>*+ </td>
<td> 匹配0次或者多次,</td>
</tr>
<tr>
<td>++ </td>
<td> Match 1 or more times. Possessive match.</td>
</tr>
<tr>
<td>?+ </td>
<td> Match zero or one times. Possessive match.</td>
</tr>
<tr>
<td>{n}+ </td>
<td> Match exactly n times.</td>
</tr>
<tr>
<td>{n,}+ </td>
<td> Match at least n times. Possessive Match.</td>
</tr>
<tr>
<td>{n,m}+ </td>
<td> Match between n and m times. Possessive Match.</td>
</tr>
<tr>
<td>(...) </td>
<td> Capturing parentheses. Range of input that matched the parenthesized subexpression is available after the match.</td>
</tr>
<tr>
<td>(?:…)</td>
<td>Non-capturing parentheses. Groups the included pattern, but does not provide capturing of matching text. Somewhat more efficient than capturing parentheses.</td>
</tr>
<tr>
<td>(?&gt;...) </td>
<td> Atomic-match parentheses. First match of the parenthesized subexpression is the only one tried; if it does not lead to an overall pattern match, back up the search for a match to a position before the "(?&gt;"</td>
</tr>
<tr>
<td>(?# ... ) </td>
<td> Free-format comment (?# comment ).</td>
</tr>
<tr>
<td>(?= ... ) </td>
<td> Look-ahead assertion. True if the parenthesized pattern matches at the current input position, but does not advance the input position.</td>
</tr>
<tr>
<td>(?! ... ) </td>
<td> Negative look-ahead assertion. True if the parenthesized pattern does not match at the current input position. Does not advance the input position.</td>
</tr>
<tr>
<td>(?&lt;= ... ) </td>
<td> Look-behind assertion. True if the parenthesized pattern matches text preceding the current input position, with the last character of the match being the input character just before the current position. Does not alter the input position. The length of possible strings matched by the look-behind pattern must not be unbounded (no * or + operators.)</td>
</tr>
<tr>
<td>(?&lt;! ... ) </td>
<td> Negative Look-behind assertion. True if the parenthesized pattern does not match text preceding the current input position, with the last character of the match being the input character just before the current position. Does not alter the input position. The length of possible strings matched by the look-behind pattern must not be unbounded (no * or + operators.)</td>
</tr>
<tr>
<td>(?ismwx-ismwx: ... ) </td>
<td> Flag settings. Evaluate the parenthesized expression with the specified flags enabled or -disabled. The flags are defined in “Flag Options.”</td>
</tr>
<tr>
<td>(?ismwx-ismwx) </td>
<td> Flag settings. Change the flag settings. Changes apply to the portion of the pattern following the setting. For example, (?i) changes to a case insensitive match.The flags are defined in “Flag Options.”</td>
</tr>
</tbody>
</table>


## 汉字匹配相关
由于汉字一般是双子节字符，所以一般可以使用双子节字符表示汉字，双子节字符的表达式：
	
	[^\x00-\xff]

也可使用unicode编码范围来进行判断：
	
	^[\u4E00-\u9fa5	]

汉字标点符号：

	
---
layout: post
keywords: "shell"
description: "常见shell命令收集 "
title: "常见shell命令收集 "
categories: [Linux]
tags: [Linux]
group: archive
icon: file-alt
---
{% include site/setup %}


#常见shell命令收集

## 查找含内容"contents"的指定“.h”文件


	find . -type f -name "*.h" | xargs grep "contents"


## 删除svn目录命令

	sudo find . -name ".svn" -exec rm -r {} \;


## 我的PS1

	PS1='[\u@\W \#]\$'


## 网络命令

[网络监控命令](http://blog.jobbole.com/49248/)

ifconfig

nslookup

在内网下查看公网ip

	curl ifconfig.me

tcpdump抓包命令
	
	tcpdump -i en1 -w ~/Desktop/t.cap

## find 和mv命令的使用
	
	find . -name "*.tm3" -exec mv {} . \;
	
	#或者
	find .  -name "*.tm3"  |  xargs  -I  '{}'  mv  {}  /opt/shell
	
## 	批量重命名
	
	for var in *.tm3; do mv "$var" "${var%.tm3}.mp3"; done
## 统计代码行数
	
	find . "(" -name "*.m" -or -name "*.mm" -or -name "*.cpp" -or -name "*.h" -or -name "*.rss" ")" -print | xargs wc -l
	
	
## 	管线命令(pipe)
### cut
cut 主要的用途在于将`同一行里面的数据进行分解!` 最常使用在分析一些数据或文字数据的时候! 这是因为有时候我们会以某些字符当作分割的参数,然后来将数据加以切割,以取得我们所需要的数据。 尤其是在分析 log 档案的时候!不过,cut 在处理多空格相连的数据时,可能会比较吃力一点。

选项与参数:

* -d :后面接分隔字符。与 -f 一起使用;
* -f :依据 -d 的分隔字符将一段讯息分割成为数段,用 -f 取出第几段的意思; 
* -c :以字符 (characters) 的单位取出固定字符区间;	

demo:
	
	#将 PATH 变量取出,并找出第五个路径。
	echo $PATH | cut -d ':' -f 5
	
	#PATH 变量取出,并找出第3个到第5个的路径
	echo $PATH | cut -d ':' -f 3,5
	
	#将 export 输出的讯息,取得第 12 字符以后的所有字符串
	export | cut -c 12-
	
### 	grep
 grep 用于分析一行讯息。
 选项与参数:
 
* -a :将 binary 档案以 text 档案的方式搜寻数据
* -A :后面可加数字,为 after 的意思,除了列出该行外,后续的 n 行也列出来;
* -B :后面可加数字,为 befer 的意思,除了列出该行外,前面的 n 行也列出 来;
* -c :计算找到 '搜寻字符串' 的次数
* -i :忽略大小写的不同,所以大小写视为相同
* -n :顺便输出行号
* -v :反向选择,亦即显示出没有 '搜寻字符串' 内容的那一行!



### 排序命令

####  sort


sort 是很有趣的指令,他可以帮我们进行排序,而且可以依据不同的数据型态来排序! 例如数字与文字的排序就不一样。此外,排序的字符与语系的编码有关,因此, 如果您需要排序时,建议使用 LANG=C 来让语系统一,数据排序比较好一些。


选项与参数:

* -f :忽略大小写的差异,例如 A 与 a 视为编码相同;
* -b :忽略最前面的空格符部分;
* -M :以月份的名字来排序,例如 JAN, DEC 等等的排序方法; 
* -n :使用『纯数字』进行排序(默认是以文字型态来排序的);
* -r :反向排序;
* -u :就是 uniq ,相同的数据中,仅出现一行代表; -t :分隔符,预设是用 [tab] 键来分隔;
* -k :以那个区间 (field) 来进行排序的意思

####  uniq


将重复的资料仅列出一个显示

选项与参数:

* -i :忽略大小写字符的不同; 

* -c :进行计数

####  wc 


如果我想要知道 /etc/man.config 这个档案里面有多少字?多少行?多少字符的话, 可以怎么做呢?其
实可以利用 wc 这个指令来达成喔!他可以帮我们计算输出的讯息的整体数据!

选项与参数:

* -l :仅列出行;
* -w :仅列出多少字(英文单字); 
* -m :多少字符;
	
### 	字符转换命令

#### tr

tr 可以用来删除一段讯息当中的文字,或者是进行文字讯息的替换!
选项与参数:

* -d :删除讯息当中的 SET1 这个字符串; 
* -s :取代掉重复的字符!

#### col

选项与参数:

* -x :将 tab 键转换成对等的空格键
* -b :在文字内有反斜杠 (/) 时,仅保留反斜杠最后接的那个字符

#### join

join用于处理两个档案之间的数据, 而且,主要是在处理 『两个档案当中,有 "相同数据" 的那一行,才将他加在一起』的意思

选项与参数:

* -t :join 默认以空格符分隔数据,并且比对『第一个字段』的数据,
如果两个档案相同,则将两笔数据联成一行,且第一个字段放在第一个! 
* -i :忽略大小写的差异;
* -1 :这个是数字的 1 ,代表『第一个档案要用那个字段来分析』的意思;
* -2 :代表『第二个档案要用那个字段来分析』的意思。

#### paste

paste 就直接『将两行贴在一起,且中间以 [tab] 键隔开』而已!

选项与参数:

* -d :后面可以接分隔字符。预设是以 [tab] 来分隔的!
* \- :如果 file 部分写成 - ,表示来自 standard input 的资料的意思。


#### expand

将 [tab] 按键转成空格键啦

选项与参数:

* -t :后面可以接数字。一般来说,一个 tab 按键可以用 8 个空格键取代。我们也可以自行定义一个 [tab] 按键代表多少个字符呢!


#### split

split可以帮你将一个 大档案,依据档案大小或行数来分割,就可以将大档案分割成为小档案了!

选项与参数:

* -b :后面可接欲分割成的档案大小,可加单位,例如 b, k, m 等;

* -l :以行数来进行分割。


#### xargs(参数代换)

xargs 是在做什么的呢?就以字面上的意义来看, x 是加减乘除的乘号,args 则是 arguments (参数) 的意思,所以说,这个玩意儿就是在产生某个指令的参数的意思! xargs 可以读入 stdin 的数据,并且 以空格符或断行字符作为分辨,将 stdin 的资料分隔成为 arguments 。 因为是以空格符作为分隔,所以,如果有一些档名或者是其他意义的名词内含有空格符的时候, xargs 可能就会误判了.

选项与参数:

* -0 :如果输入的 stdin 含有特殊字符,例如  \, 空格键等等字符时,这个 -0 参 数
可以将他还原成一般字符。这个参数可以用于特殊状态喔!
* -e :这个是 EOF (end of file) 的意思。后面可以接一个字符串,当 xargs 分析 到
这个字符串时,就会停止继续工作!
* -p :在执行每个指令的 argument 时,都会询问使用者的意思;
* -n :后面接次数,每次 command 指令执行时,要使用几个参数的意思。


### sed

sed 本身也是一个管线命令,可以分析 standard input 的啦! 而且 sed 还可以将数据进行取代、删除、新增、撷取特定行等等的功能呢

选项与参数:

* -n :使用安静(silent)模式。在一般 sed 的用法中,所有来自 STDIN
的数据一般都会被列出到屏幕上。但如果加上 -n 参数后,则只有经过
* sed 特殊处理的那一行(或者动作)才会被列出来。
* -e :直接在指令列模式上进行 sed 的动作编辑;
* -f :直接将 sed 的动作写在一个档案内, -f filename 则可以执行 filename 内 的
sed 动作;
* -r :sed 的动作支持的是延伸型正规表示法的语法。(预设是基础正规表示法语 法)
* -i :直接修改读取的档案内容,而不是由屏幕输出。


demo:

>`以行为单位的新增/删除功能:`

	#将 /etc/passwd 的内容列出并且打印行号,同时,请将第 2~5 行删 除!	
	nl /etc/passwd | sed '2,5d'

	#在第二行后(亦即是加在第三行)加上『drink tea』字样
	nl /etc/passwd | sed '2a drink tea'


>`以行为单位的取代与显示功能`

	#将第 2-5 行的内容取代成为『No 2-5 number』
	nl /etc/passwd | sed '2,5c No 2-5 number'
	
>`部分数据的搜寻并取代的功能`	

除了整行的处理模式之外, sed 还可以用行为单位进行部分数据的搜寻并取代的功能喔! 基本上 sed
的搜寻与取代的与 vi 相当的类似!他有点像这样:


将当前目录下的含有php的文件替换成java，并将原文件备份到"原文件名+.bak"文件中

	sed -i .bak -e's/php/java/g' *

	find . -type f | xargs sed -i 's/php/java/g'
	
删除shell脚本代码中的注释：
	
	cat /etc/man.config | grep 'MAN'| sed 's/#.*$//g'

	
延伸正规表示法：

事实上,一般读者只要了解基础型的正规表示法大概就已经相当足够了,不过,某些时刻为了要简化整 个指令操作, 了解一下使用范围更广的延伸型正规表示法的表示式会更方便呢!	

	grep -v '^$' regular_express.txt | grep -v '^#'	#可以替换为：
	egrep -v '^$|^#' regular_express.txt

### awk（管道命令）
awk 也是一个非常棒的数据处理工具!相较于 sed 常常作用于一整个行的处理, awk 则比较倾向于一 行当中分成数个『字段』来处理。因此,awk 相当的适合处理小型的数据数据处理呢!awk 通常运作的 模式是这样的:

```
awk '条件类型 1{动作 1} 条件类型 2{动作 2} ...' filename
```

awk内建变量

变量名称 | 代表意义
----- | ------ 
NF | 每一行 ($0) 拥有的字段总数
NR | 目前 awk 所处理的是『第几行』数据
FS | 目前的分隔字符,默认是空格键

demo : 


```
last -n 5| awk '{print $1 "\t lines: " NR "\t columes: " NF}'

#在 /etc/passwd 当中是以冒号":" 来作为字段的分 隔, 该档案中第一字段为账号,第三字段则是 UID。那假设我要查阅,第三栏小于 10 以下的数据,并 且仅列出账号与第三栏
cat /etc/passwd | awk '{FS=":"} $3 < 10 {print $1 "\t " $3}'

```

需要注意的是,awk 后续的所有动作是以单引号『 ' 』括住的,由于单引号与双引号都必 须是成对的, 所以, awk 的格式内容如果想要以 print 打印时,记得非变量的文字 部分,包含上一小节 printf 提到的格式中,都需要使用双引号来定义出来喔!因为 单引号已经是 awk 的指令固定用法了!
eg:

```
last -n 5| awk '{print $1 "\t lines: " NR "\t columes: " NF}'
```


## 	文件格式化与相关处理

### printf

选项与参数: 关于格式方面的几个特殊样式:

* \a 	警告声音输出
* \b 	退格键(backspace) 
* \f 清除屏幕 (form feed) 
* \n 输出新的一行
* \r Enter按钮
* \t 水平[tab]按钮
* \v 垂直[tab]按钮
* \xNN NN 为两位数的数字,可以转换数字成为字符。
关于 C 程序语言内,常见的变数格式
* %ns 那个 n 是数字, s 代表 string ,亦即多少个字符;
* %ni 那个 n 是数字, i 代表 integer ,亦即多少整数字数;
* %N.nf 那个 n 与 N 都是数字, f 代表 floating (浮点),如果有小数字数,假设我共要十个位数,但小数点有两位,即为 %10.2f 啰!

## 档案对比工具
### diff
diff 就是用在比对两个档案之间的差异的,并且是以行为单位来比对的!一般是用在 ASCII 纯文本档的 比对上。 由于是以行为比对的单位,因此 diff 通常是用在同一的档案(或软件)的新旧版本差异上!

用法：

```
diff [-bBi] from-file to-file
```

选项与参数:

* from-file :一个档名,作为原始比对档案的档名;
* to-file :一个档名,作为目的比对档案的档名;注意,from-file 或 to-file 可以 - 取代,那个 - 代表『Standard input』之意。
* -b :忽略一行当中,仅有多个空白的差异(例如 "about me" 与 "about me" 视为相同
* -B :忽略空白行的差异。
* -i :忽略大小写的不同。

用 diff 比对档案真的是很简单喔!不过,你不要用 diff 去比对两个完全不相干的档案,因为比不出个啥 咚咚! 另外, diff 也可以比对整个目录下的差异喔!举例来说,我们想要了解一下不同的开机执行等级 (runlevel) 内容有啥不同?假设你已经知道执行等级 3 与 5 的启动脚本分别放置到 /etc/rc3.d 及 /etc/rc5.d , 则我们可以将两个目录比对一下:

```
diff /etc/rc3.d/ /etc/rc5.d/
```

### cmp
相对于 diff 的广泛用途, cmp 似乎就用的没有这么多了~ 

cmp 主要也是在比对两个档案,他主要利 用『字节』单位去比对, 因此,当然也可以比对 binary file 啰~(还是要再提醒喔, diff 主要是以 『行』为单位比对, cmp 则是以『字节』为单位去比对,这并不相同!)

选项与参数:

* -s :将所有的不同点的字节处都列出来。因为 cmp 预设仅会输出第一个发现的 不同点。


### patch

patch 这个指令与 diff 可是有密不可分的关系啊!我们前面提到,diff 可以用来分辨两个版本之间的差 异, 举例来说,刚刚我们所建立的 passwd.old 及 passwd.new 之间就是两个不同版本的档案。 那 么,如果要『升级』呢?就是『将旧的档案升级成为新的档案』时,应该要怎么做呢? 其实也不难啦! 就是『先比较先旧版本的差异,并将差异档制作成为补丁档,再由补丁档更新旧档案』即可


选项与参数:

* -p :后面可以接『取消几层目录』的意思。
* -R :代表还原,将新的文件还原成原来旧的版本。

## Mac命令
Finder中显示/隐藏文件夹
隐藏命令：
	
	defaults write com.apple.finder AppleShowAllFiles No && killall Finder
显示命令：
	
	defaults write com.apple.finder AppleShowAllFiles YES && killall Finder
	
开启/关闭shh服务：

	#开启ptp	sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist
	
	#关闭
	sudo launchctl unload -w /System/Library/LaunchDaemons/ssh.plist
	
	#查看是否启动ssh
	sudo launchctl list | grep ssh

mds_stores很耗资源问题解决方案
mds_stores进程是spotlight建索引时的进程，禁用spotlight建索引就可以了：

	mdutil -a -i off
	
合并真机和模拟器的.a 库文件

```
$root > lipo -create SQY/iOS/iphoneos/libGamePlusAPI.a SQY/iOS/iphonesimulator/libGamePlusAPI.a  -output SQY/iOS/libGamePus.a

其中SQY/iOS/iphoneos/libGamePlusAPI.a //为真机库。  

 SQY/iOS/iphonesimulator/libGamePlusAPI.a //为模拟器库 
 -output SQY/iOS/libGamePus.a //为两个合并后存放的路径
 
然后可以输入命令测试下是否成功 ：
$root > lipo -info SQY/iOS/libGamePus.a 
```

---
layout: post
keywords: "Git"
description: "Git常用命令列表 "
title: "Git常用命令列表 "
categories: [Git]
tags: [Git]
group: archive
icon: file-alt
---
{% include site/setup %}

#Git常用命令列表

[git官网文档(含中文版)](http://git-scm.com/book)

[GitHub 帮助](https://help.github.com/)

[think like (a) git](http://think-like-a-git.net/)

[图解git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)

## 概述
### git文件状态

未合并状态(unmerged)属于三种状态中的哪个状态？

git文件（已跟踪的文件）的三种状态，已提交，已修改，已暂存。

已修改的文件使用`git add 文件名`命令，可以将文件状态改为已暂存状态，已暂存的文件使用`git commit 文件名`命令，可以将文件状态改为已提交。

想要将已修改的文件直接改为已提交状态，可以使用`git commit -a `命令.

取消暂存，将已暂存的文件状态改为已修改，可以使用`git reset HEAD 文件名`命令

取消文件的修改，将已经修改的文件状态，改为修改之前(回复文件原始状态)，使用`git checkout --文件名`

### 自动完成

如果你用的是 Bash shell,可以试试看 Git 提供的自动完成脚本。下载 Git 的源代码,进入 contrib/ completion 目录,会看到一个 git-completion.bash 文件。将此文件复制到你自己的用户主目录中(译注:按照下 面的示例,还应改名加上点:cp git-completion.bash  /.git-completion.bash),并把下面一行内容添加 到你的 .bashrc 文件中:
```
source ~/.git-completion.bash
```


### Git 命令别名
Git 并不会推断你输入的几个字符将会是哪条命令,不过如果想偷懒,少敲几个命令的字符,可以用 gitconfig 为命令设置别名。来看看下面的例子:```
$ git config --global alias.co checkout 
$ git config --global alias.br branch$ git config --global alias.ci commit$ git config --global alias.st status
```
##1.安装和配置（setup and config）

第一次初始化git工程：
	
	git init
	git remote add origin https://test@bitbucket.org/test/test.git
	git add directory/*
	git commit -a -m "first commit"
	git push -u origin --all
	
### config

Git软件的环境变量配置，环境变量存放的三个位置:

* /etc/gitconfig文件:系统中对所有用户都普遍适用的配置。若使用 git config 时用 --system 选项,读写 的就是这个文件。
* ~/.gitconfig文件:用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项,读写 的就是这个文件。
* 当前项目的 git 目录中的配置文件(也就是工作目录中的 .git/config 文件):这里的配置仅仅针对当前 项目有效。每一个级别的配置都会覆盖上层的相同配置,所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。

用户信息配置：
```
$ git config --global user.name "John Doe"$ git config --global user.email johndoe@example.com
```

查看配置信息:
```
$ git config --list
```
### help

##2.获取和创建工程(getting and createing projects)
### init
### clone
### fetch


##3.基础用法(basic snapshotting)
### add
### status
### diff

* 查看尚未缓存的文件更新了哪些部分，直接使用`git diff`命令.
* 查看已经暂存起来的文件和上次提交时的快照之间的差异,可以用 `git diff --cached `命令

### commit

* git commit -a 相当于运行 git add 把所有当前目录下的文件加入暂存区域再运行。git commit.
* git commit files 进行一次包含最后一次提交加上工作目录中文件快照的提交。并且文件被添加到暂存区域。


### reset



### rm

* 删除已修改的文件使用`git rm 文件名`命令，将会将文件从目录中删除。假如文件已经存放到暂存区域的话，需要使用`git rm -f 文件名`
* 假如仅仅是将文件从git仓库中移除，但是仍然保存在当前目录中，可以使用`git rm --cache 文件名`命令

### mv
命令`git mv 源文件 目标文件`，其实`git rm`命令相当于下面三条命令:
```
$ mv README.txt README 
$ git rm README.txt$ git add README
```

### git log

`git log`不带任何参数的话，git log 会按提交时间列出所有的更新,最近的更新排在最上面。

我们常用 -p 选项展开显示每次提交的内容差异,用 -2 则仅显示最近的两次更新:
```
$ git log –p -2
```

仅显示简要的增改行数统计,使用`--stat`参数:
```
git log --stat
```
## 4.分支与合并(Branching and Merging)

### 何为分支

由于 Git 中的分支实际上仅是一个包含所指对象校验和(40 个字符长度 SHA-1 字串)的文件,所以创建 和销毁一个分支就变得非常廉价。说白了,新建一个分支就是向一个文件写入 41 个字节(外加一个换行符) 那么简单,当然也就很快了。

### branch

创建分支命令`git branch 分支名`

查看分支命令，直接不带参数`git branch`

查看分支详细信息，`git branch -v`

删除分支命令: `git branch -d 分支名`

查看已经合并了的分支：`git branch --merged`,一般来说,列表中没有 * 的分支通常都可以用 git branch -d 来删掉。原因很简单,既然已经把它们所包含的工作整合到了其他分支,删掉也不会损失什么。

查看未合并分支命令：`git branch --no-merged`

删除远程分支命令: `git push [m远程名]:[分支名]`

### checkout
假如你操作失误（当然，这最好永远不要发生），你可以使用如下命令替换掉本地改动：

	git checkout -- <filename>
	
此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到暂存区的改动以及新文件都不会受到影响。

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：

	git fetch origin
	git reset --hard origin/master
	
要新建并切换到该分支,运行 git checkout 并加上 -b 参数:

```
$ git checkout -b iss53
```

相当于下面这两条命令:```
$ git branch iss53$ git checkout iss53
```

### 分支的合并

一个分支整合到另一个分支的办法有两种:merge(合并) 和 rebase(衍合)

#### merge

基本合并命令 `git merge 分支名`

#### rebase(衍合)
开发进程分叉到两个不同分支，又各自提交了更新。最初分叉的提交历史如下图所示:

![最初分叉的提交历史](http://yhawaii.github.io/assets/themes/yhawaii/images/Git/git-before-merge.png)


最容易的整合分支的方法是 merge 命令,它会把两个分支最新的快照(C3 和 C4)以及二者最新的共同祖先(C2)进行三方合并。如下图所示:
![最初分叉的提交历史](http://yhawaii.github.io/assets/themes/yhawaii/images/Git/git-merge.png)

其实,还有另外一个选择:你可以把在 C3 里产生的变化补丁重新在 C4 的基础上打一遍。在 Git 里,这种 操作叫做衍合(rebase)。有了 rebase 命令,就可以把在一个分支里提交的改变在另一个分支里重放一遍。

它的原理是回到两个分支(你所在的分支和你想要衍合进去的分支)的共同祖先,提取你所在分支每次提交 时产生的差异(diff),把这些差异分别保存到临时文件里,然后从当前分支转换到你需要衍合入的分支,依 序施用每一个差异补丁文件。下图演示了这一过程:
![最初分叉的提交历史](http://yhawaii.github.io/assets/themes/yhawaii/images/Git/git-rebase.png)


你可以经常使用衍合,确保在远程分支里的提交历史更清晰。比方说,某些项目自己不是维护者,但想帮 点忙,就应该尽可能使用衍合:先在一个分支里进行开发,当准备向主项目提交补丁的时候,再把它衍合到 origin/master 里面。这样,维护者就不需要做任何整合工作,只需根据你提供的仓库地址作一次快进,或者采 纳你提交的补丁。 请注意,合并结果中最后一次提交所指向的快照,无论是通过一次衍合还是一次三方合并,都是同样的快照内容,只是提交的历史不同罢了。衍合按照每行改变发生的次序重演发生的改变,而合并是把最终结果合在一起。

当然奇妙的衍合也不是完美无缺的,一句话可以总结这点:

**永远不要衍合那些已经推送到公共仓库的更新**

### mergetool
### log
### stash
### tag


## 5.分享和更新工程(Sharing and Updating Projects) 
### fetch

使用命令： `git fetch [仓库名称]`

如果是克隆了一个仓库,此命令会自动将远程仓库归于 origin 名下。所以,git fetch origin 会抓取从你上 次克隆以来别人上传到此远程仓库中的所有更新(或是上次 fetch 以来别人提交的更新)。有一点很重要, 需要记住,fetch 命令只是将远端的数据拉到本地仓库,并不自动合并到当前工作分支,只有当你确实准备好 了,才能手工合并。
### pull
如果设置了某个分支用于跟踪某个远端仓库的分支,可以使用 git pull 命令 自动抓取数据下来,然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用,既快 且好。实际上,默认情况下 git clone 命令本质上就是自动创建了本地的 master 分支用于跟踪远程仓库中的 master 分支(假设远程仓库确实有 master 分支)。所以一般我们运行 git pull,目的都是要从原始克隆的远端仓库中抓取数据后,合并到工作目录中当前分支。

### push

push命令：`git push [remote-name] [branch-name]`

如果在你推数据前,已经有其他人推送了若干更新,那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地,并到自己的项目中,然后才可以再次推送。


### remote

git remote 不带参数，列出已经存在的远程分支：
	
	#git remote
	origin
	
	
git remote -v | --verbose 列出详细信息，在每一个名字后面列出其远程url，例如：
	
	#git remote -v
	origin	https://yhawaii@bitbucket.org/test/draft.git (fetch)
	origin	https://yhawaii@bitbucket.org/test/draft.git (push)
	

git remote add name url ：

在url创建名字为name的仓库（Adds a remote named `<name>` for the repository at `<url>`）name为远程仓库的名字


git remote show name 必须要带name，否则git remote show的作用就是git remote，给出remote name的信息。

远程仓库的重命名:
```
git remote rename 原始名称 新名称
``

### submodule
## 6.查看和比较命令(Inspection and comparison)
### show
### log
### diff
### shortlog
### describe

## 7.Patching
### am	
### apply
### cherry-pick
### rebase

## 8.


## FAQ
### 在git命令行中含有中文文件名时，不显示中文名，显示xx%问题

	git config core.quotepath false
---
layout: post
title: 了解xss攻击
category: xss
tags: 编码
keywords: xss攻击,xss,web前端安全
---

什么是xss攻击。

### **前端安全的必要认知之一**

xss跨站脚本攻击(Cross Site Scripting)，是一种经常出现在web应用中的计算机安全漏洞，指攻击者在网页中嵌入客户端脚本(例如JavaScript), 当用户浏览此网页时，脚本就会在用户的浏览器上执行，从而达到攻击者的目的。比如获取用户的Cookie，导航到恶意网站,携带木马等。

大部分的xss漏洞都是由于没有处理好用户的输入，导致攻击脚本在浏览器中执行，这就是跨站脚本漏洞的根源。

### **xss攻击类型**

1.非持久型XSS攻击

非持久型XSS（Non-persistent）又叫做反射XSS（Reflect XSS），它是指那些浏览器每次都要在参数中提交恶意数据才能触发的跨站脚本漏洞。

非持久型XSS漏洞实际上大多数攻击数据是包含在URL中的，类似这样的：http://www.vicitim.com/vul.asp?hi=[code]。需要用户的浏览器访问到这个URL恶意代码才执行，攻击者一般会把URL发给用户让用户通过浏览器去访问。不过URL里面带有稀奇古怪的代码确实有点奇怪，为了掩人耳目，攻击者可以发一个看起来没问题的URL，再通过那个页面跳转到恶意的URL；甚至也可以让一个域名转向到恶意URL，把那个域名发给用户。

2.持久型XSS攻击

持久型XSS（Persistent）又叫做存储XSS（Stored XSS），与非持久型XSS相反，它是指通过提交恶意数据到存储器（比如数据库、文本文件等），Web应用程序输出的时候是从存储器中读出恶意数据输出到页面的一类跨站脚本漏洞。

持久型XSS攻击就简单一点，只要第一次把攻击代码提交到服务器就一劳永逸了。比如我在某个论坛发帖的时候，论坛没有对传入的HTML作处理，那么我就可以发一个帖子内容包含“<script>[code]</script>”的帖子。呵呵，然后就守株待兔地等着来看帖子的人执行恶意脚本了。持久型XSS漏洞是把恶意脚本存储到了数据库，访问页面的时候完全没有预兆，所以它的危害也比非持久型XSS略微高一点。

### **常见的xss攻击方法**

1.绕过XSS-Filter，利用<>标签注入Html/JavaScript代码；

2.利用HTML标签的属性值进行xss攻击。例如：<img src=“javascript:alert(‘xss’)”/>；（当然并不是所有的Web浏览器都支持Javascript伪协议，所以此类XSS攻击具有一定的局限性）

3. 空格、回车和Tab。如果XSS Filter仅仅将敏感的输入字符列入黑名单，比如javascript，用户可以利用空格、回车和Tab键来绕过过滤，例如：<img src=“javas  cript:alert(/xss/);”/>；

4. 利用事件来执行跨站脚本。例如：<img src=“#” onerror= “alert(1)”/>，当src错误的视乎就会执行onerror事件；

5. 利用CSS跨站。例如：Body {backgrund-image: url(“javascript:alert(‘xss’)”)}；

6. 扰乱过滤规则。例如：<IMG SRC=“javaSCript: alert(/xss/);”/>；

7.利用字符编码，透过这种技巧，不仅能让XSS代码绕过服务端的过滤，还能更好地隐藏Shellcode；（JS支持unicode、eacapes、十六进制、十进制等编码形式）

8.拆分跨站法，将xss攻击的代码拆分开来，适用于应用程序没有过滤 XSS关键字符（如<、>）却对输入字符长度有限制的情况下；

9.DOM型的XSS主要是由客户端的脚本通过DOM动态地输出数据到页面上，它不依赖于提交数据到服务器，而是从客户端获得DOM中的数据在本地执行。容易导致DOM型的XSS的输入源包括：Document.URL、Location(.pathname|.href|.search|.hash)、

Document.referrer、Window.name、Document.cookie、localStorage/globalStorage；



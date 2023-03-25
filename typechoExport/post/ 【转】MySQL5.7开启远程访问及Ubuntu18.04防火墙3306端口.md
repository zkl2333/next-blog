---
title: ' 【转】MySQL5.7开启远程访问及Ubuntu18.04防火墙3306端口'
type: post
status: publish
summary: ''
slug: '1995'
icon: ''
category: 学习记录
date: 1544418300
tags: ''
password: ''
permalink: /archives/1995.html
---

最近重新安装了MySQL，遇到一些问题，发现几篇文章，觉得有用就转过来了。

## MySQL5.7开启远程访问及Ubuntu18.04防火墙3306端口 ##

在虚拟机中安装了Ubuntu18.04，MySQL5.7。系统默认的root等只能在本地访问，host被限制为localhost，为了进行Java程序测试，本地eclipse访问虚拟机的数据库，避免用户管理混乱，特意新建一数据库和用户。

新建数据库ttmsg，用户ub64，开启ub64用户远程访问的过程。

```sql
--新建数据库ttmsg
 
mysql> CREATE DATABASE ttmsg;
Query OK, 1 row affected (0.00 sec)
 
--新建用户ub64，和登陆密码，设置访问限制为%，允许远程访问。
mysql> CREATE USER 'ub64'@'%' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.01 sec)
 
--给新建的用户ub64访问数据库ttmsg的所有权限
mysql> grant all privileges on ttmsg.* to 'ub64'@'%' identified by '123456';
Query OK, 0 rows affected, 1 warning (0.00 sec)
 
--刷新权限列表，这样就可以用ub64用户登陆了
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
 
--新建数据表，开始测试。
mysql> CREATE TABLE Student(
    ->    ID   INT NOT NULL AUTO_INCREMENT,
    ->    NAME VARCHAR(20) NOT NULL,
    ->    AGE  INT NOT NULL,
    ->    PRIMARY KEY (ID)
    -> );
Query OK, 0 rows affected (0.01 sec)
 
mysql> show tables;
+-----------------+
| Tables_in_ttmsg |
+-----------------+
| Student         |
+-----------------+
1 row in set (0.00 sec)
```

在eclipse中调试java程序，尝试往Student表中插入数据，报错了。

```
------Records Creation--------
Exception in thread "main" org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
 
The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
	at org.springframework.jdbc.datasource.DataSourceUtils.getConnection(DataSourceUtils.java:81)
	at org.springframework.jdbc.core.JdbcTemplate.execute(JdbcTemplate.java:612)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:862)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:917)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:927)
	at com.tutorialspoint.StudentJDBCTemplate.create(StudentJDBCTemplate.java:14)
	at com.tutorialspoint.MainApp.main(MainApp.java:13)
Caused by: com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
```

好吧，检查报错说远程JDBC创建失败，没连上。检查一下MySQL是不是没有开通对外的3306端口过滤，导致外部地址无法访问呢，通过netstat命令，检查3306端口，果然只有一个127.0.0.1:3306的监听端口。

```
ub64@ub64-1804-1:~$ netstat -ntpl
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:23              0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:6010          0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:27017           0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
tcp6       0      0 ::1:6010                :::*                    LISTEN      -
```

怀疑是否配置`mysqld.cnf`文件，检查`bind-address`的设置值问题。

```
vim /etc/mysql/mysql.conf.d/mysqld.cnf

#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 127.0.0.1
```

好吧，把`bind-address`修改成0.0.0.0，无限制，重启mysql服务。重新检查`netstat`，3306端口的访问已经有所有来源地址的监听了。

```
bind-address            = 0.0.0.0
 
ub64@ub64-1804-1:~$ service mysql restart
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
Authentication is required to restart 'mysql.service'.
Authenticating as: ub64-1804-1 (ub64)
Password:
==== AUTHENTICATION COMPLETE ===
ub64@ub64-1804-1:~$ netstat -ntpl
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:23              0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:6010          0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:27017           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
tcp6       0      0 ::1:6010                :::*                    LISTEN      -
```

继续程序代码测试，重新跑数据库访问程序。额(⊙﹏⊙)，又出错了，还是一样的报错信息，还是没有建立连接。

```
------Records Creation--------
Exception in thread "main" org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
 
The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
	at org.springframework.jdbc.datasource.DataSourceUtils.getConnection(DataSourceUtils.java:81)
	at org.springframework.jdbc.core.JdbcTemplate.execute(JdbcTemplate.java:612)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:862)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:917)
	at org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:927)
	at com.tutorialspoint.StudentJDBCTemplate.create(StudentJDBCTemplate.java:14)
	at com.tutorialspoint.MainApp.main(MainApp.java:13)
Caused by: com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
```

好吧，那应该就是系统防火墙没有开了，我也没有设置过。检查防火墙通过规则，果然`grep`一下没有见到3306的端口记录。

```shell
ub64@ub64-1804-1:~$ sudo iptables -L -n
Chain INPUT (policy DROP)
target     prot opt source               destination
ufw-before-logging-input  all  --  0.0.0.0/0            0.0.0.0/0
ufw-before-input  all  --  0.0.0.0/0            0.0.0.0/0
ufw-after-input  all  --  0.0.0.0/0            0.0.0.0/0
ufw-after-logging-input  all  --  0.0.0.0/0            0.0.0.0/0
......
 
ub64@ub64-1804-1:~$ sudo iptables -L -n | grep 3306
ub64@ub64-1804-1:~$ 
```

那就好办了，`iptables`新增一条3306的端口允许通过规则，在重新检查一下`iptables`，这下有了。

```shell
ub64@ub64-1804-1:~$ sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
 
ub64@ub64-1804-1:~$ sudo iptables -L -n | grep 3306
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            state NEW tcp dpt:3306
ub64@ub64-1804-1:~$ 
```

重新测试程序，程序访问成功。果然，开启mysql的访问，不仅要设置user表用户的访问控制权限，还要设置mysqld.cnf的`bind-address`，同时系统防火墙规则也要配置好3306的端口通过权限。这3个地方的控制缺一不可。

```
//程序日志
------Records Creation--------
Created Record Name = Zara Age = 11
Created Record Name = Nuha Age = 2
Created Record Name = Ayan Age = 15
 
mysql> select * from Student ;
+----+------+-----+
| ID | NAME | AGE |
+----+------+-----+
|  1 | Zara |  11 |
|  2 | Nuha |   2 |
|  3 | Ayan |  15 |
+----+------+-----+
3 rows in set (0.00 sec)
```

另外，在程序访问数据库进行操作的日志中出现了WARN告警如下:

```
Sun Oct 07 21:21:50 GMT+08:00 2018 WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
```

上网搜了一下，以下参考来自我是康小小的CSDN博客

> --------------------
> 
> 原来是Mysql数据库的SSL连接问题，提示警告不建议使用没有带服务器身份验证的SSL连接，是在MYSQL5.5.45+, 5.6.26+
> and 5.7.6+版本中才有的这个问题。解决办法在警告中已经说明了：
> 
> 1.在数据库连接的url中添加`useSSL=false`;
> 
> ```jdbc:mysql://localhost:3306/test?useSSL=false```
> 或者在使用Java进行JDBC连接的时候，可以在`Properties`对象中设置`useSSL`的值为`false`。 
> 
> 2.url中添加`useSSL=true`，并且提供服务器的验证证书。
> 
> 
> 参考来源地址：https://blog.csdn.net/u010429286/article/details/77750177
> 
---------------------

作者：秋野001 
来源：CSDN 
原文：https://blog.csdn.net/ZENMELAOSHIYOUREN/article/details/82961610 

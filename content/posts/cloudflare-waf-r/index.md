---
title: "Cloudflare 安全规则，防机器人和扫描，防黑AS"
date: 2025-06-01T00:25:04Z
draft: false
description: "分享安全规则"
tags: ["cloudflare", "waf"]
---

# 我的三个Cloudflare WAF安全规则

## 前言

在运营网站的过程中，Web应用防火墙(WAF)是保护站点安全的重要工具。今天我将发布两个在Cloudflare的WAF规则，希望能帮助到有需要的站长。

## 规则 1: AS Byebye

**适用场景**：无效流量，主要为服务器运营商as号码

**规则详情**：
```
(ip.src.asnum in {174 195 209 577 792 793 794 965 1215 1216 1217 2497 2914 3223 3255 3269 3326 3329 3457 3462 3598 4184 4190 4637 4694 4755 4785 4788 4816 4826 4835 5056 5610 5617 6461 6471 6584 6830 6876 6877 6939 7029 7195 7203 7224 7303 7489 7552 7684 7713 7941 8068 8069 8070 8071 8074 8100 8220 8560 8796 8881 8987 9009 9123 9299 9312 9370 9534 9678 9952 9984 10026 10206 10453 11351 11426 11691 11878 12076 12271 12334 12367 12874 12876 12989 13335 13349 13965 14061 14117 14140 14576 14593 14618 16276 16509 16591 16629 17043 17428 17707 17788 17789 17790 17791 18013 18186 18228 18257 18403 18450 18599 18734 18779 18978 19148 19527 19740 19871 20207 20473 20552 20554 20853 20860 21704 21769 21859 21887 22552 22612 22616 22773 22884 23468 23724 23885 23959 23969 24088 24192 24424 24429 24940 25369 25429 25697 25820 25935 25961 26160 26496 26818 27715 28429 28431 28438 28725 28753 29066 29286 29287 29802 30083 30633 30823 31122 31235 31400 31898 32097 32098 32505 32613 34081 34248 34549 34947 35070 35212 35320 35540 35593 35804 35816 35908 35916 36351 36352 36384 36385 36444 36492 36599 36806 37148 37963 37969 38001 38197 38283 38365 38538 38587 38588 38627 39284 39486 39686 40065 40676 40788 41009 41096 41264 41378 42652 42905 43289 43513 43624 43989 44144 44477 45011 45012 45062 45075 45076 45085 45090 45102 45103 45104 45139 45458 45566 45576 45629 45753 45899 45932 46261 46484 46516 46606 46844 47232 47285 47583 47927 48024 48337 48905 49327 49367 49588 49981 50297 50304 50340 50495 50835 50837 51167 51290 51765 51852 52000 52228 52341 52393 52449 52485 53089 53667 54252 54463 54538 54574 54600 54801 54854 54994 55081 55158 55286 55330 55720 55799 55924 55933 55960 55967 55990 55992 56005 56011 56109 56222 57613 58073 58199 58461 58466 58519 58541 58543 58563 58593 58772 58773 58774 58775 58776 58777 58844 58854 58862 58879 59019 59025 59028 59048 59050 59051 59052 59053 59054 59055 59067 59077 59078 59253 59374 60068 60592 60631 60781 60798 61112 61138 61154 61317 61348 61577 61853 62044 62160 62240 62468 62785 62874 62904 63018 63023 63075 63288 63314 63545 63612 63620 63631 63655 63677 63678 63679 63727 63728 63729 63835 63838 63888 63916 63949 64050 64080 64267 64286 131090 131106 131138 131139 131140 131141 131293 131428 131444 131477 131486 131495 131571 132196 132203 132509 132510 132513 132591 132813 132817 132839 133024 133199 133380 133478 133492 133499 133746 133752 133774 133775 133776 133905 133929 133944 134238 134327 134420 134450 134756 134760 134761 134763 134764 134765 134766 134768 134769 134770 134771 134835 134963 135061 135290 135300 135330 135365 135377 135629 136195 136907 137017 137263 137280 137687 137693 137697 137698 137699 137718 137753 137784 137785 137787 137788 137876 137967 137969 138366 138407 138607 138915 138949 138950 138952 138982 138994 139007 139018 139124 139144 139201 139203 139220 139316 139327 139341 139462 139659 139726 139887 140096 140596 140701 140716 140717 140720 140723 140979 141157 141180 141771 141995 141998 142002 142570 142608 146817 149167 149428 150436 152194 152711 177453 177549 197099 197540 198047 198651 199490 199506 199524 199883 200373 200756 201035 201094 201106 201341 201978 202044 202053 202422 202496 202675 202914 203020 203061 203087 203098 203346 203999 204287 204601 204720 205544 205659 205964 206092 206204 206791 206798 207319 207400 207590 207990 208425 208556 209043 209366 209709 210644 210906 211914 212144 212329 212335 212384 212708 213230 213251 213375 215859 216071 262187 263022 263196 263639 263693 263740 264344 264509 265443 265537 266706 267784 269939 270110 328608 394380 394474 394699 394814 395003 395936 395954 395973 396356 396982 397391 397630 398101 398823} and not http.request.uri.path in {"/robots.txt" "/ads.txt"}) or (http.user_agent eq "") or (any(http.request.headers["accept-encoding"][*] eq "")) or (not http.user_agent contains "bingbot" and ip.src.asnum eq 8075 and http.request.uri.path ne "/robots.txt")
```

## 规则 2: AS Byebye

**适用场景**：动态软件，本站为静态，动态访问都是robot，以及不科学的路径

**规则详情**：
```
(ends_with(http.request.uri.path, ".php")) or (ends_with(http.request.uri.path, ".asp")) or (ends_with(http.request.uri.path, ".aspx")) or (ends_with(http.request.uri.path, ".jsp")) or (ends_with(http.request.uri.path, ".cfm")) or (ends_with(http.request.uri.path, ".pl")) or (ends_with(http.request.uri.path, ".cgi")) or (ends_with(http.request.uri.path, ".py")) or (ends_with(http.request.uri.path, ".sh")) or (ends_with(http.request.uri.path, ".do")) or (ends_with(http.request.uri.path, ".action")) or (ends_with(http.request.uri.path, ".phtml")) or (ends_with(http.request.uri.path, ".phar")) or (ends_with(http.request.uri.path, ".inc")) or (ends_with(http.request.uri.path, ".bak")) or (ends_with(http.request.uri.path, ".swp")) or (ends_with(http.request.uri.path, ".sql")) or (ends_with(http.request.uri.path, ".env")) or (ends_with(http.request.uri.path, ".git")) or (ends_with(http.request.uri.path, ".svn")) or (ends_with(http.request.uri.path, ".htaccess")) or (ends_with(http.request.uri.path, ".htpasswd")) or (http.request.uri.path contains "/.")
```

## 规则 3: AI Byebye

**适用场景**：AI流量

**规则详情**：
```
(http.user_agent contains "AI2Bot") or (http.user_agent contains "Amazonbot") or (http.user_agent contains "amazon-kendra") or (http.user_agent contains "anthropic-ai") or (http.user_agent contains "Applebot") or (http.user_agent contains "Applebot-Extended") or (http.user_agent contains "AwarioRssBot") or (http.user_agent contains "AwarioSmartBot") or (http.user_agent contains "Brightbot") or (http.user_agent contains "Bytespider") or (http.user_agent contains "ChatGPT-User") or (http.user_agent contains "ClaudeBot") or (http.user_agent contains "Diffbot") or (http.user_agent contains "DuckAssistBot") or (http.user_agent contains "FacebookBot") or (http.user_agent contains "FriendlyCrawler") or (http.user_agent contains "Google-Extended") or (http.user_agent contains "GPTBot") or (http.user_agent contains "iaskspider/2.0") or (http.user_agent contains "ICC-Crawler") or (http.user_agent contains "img2dataset") or (http.user_agent contains "Kangaroo Bot") or (http.user_agent contains "LinerBot") or (http.user_agent contains "MachineLearningForPeaceBot") or (http.user_agent contains "Meltwater") or (http.user_agent contains "meta-externalagent") or (http.user_agent contains "meta-externalfetcher") or (http.user_agent contains "Nicecrawler") or (http.user_agent contains "OAI-SearchBot") or (http.user_agent contains "omgili") or (http.user_agent contains "omgilibot") or (http.user_agent contains "PanguBot") or (http.user_agent contains "PerplexityBot") or (http.user_agent contains "Perplexity-User") or (http.user_agent contains "PetalBot") or (http.user_agent contains "PiplBot") or (http.user_agent contains "QualifiedBot") or (http.user_agent contains "Scoop.it") or (http.user_agent contains "Seekr") or (http.user_agent contains "SemrushBot-OCOB") or (http.user_agent contains "Sidetrade indexer bot") or (http.user_agent contains "Timpibot") or (http.user_agent contains "VelenPublicWebCrawler") or (http.user_agent contains "Webzio-Extended") or (http.user_agent contains "YouBot") or (http.user_agent contains "Censys") or (http.user_agent contains "Shodan") or (http.user_agent contains "Zoomeye") or (http.user_agent contains "NetcraftSurveyAgent") or (http.user_agent contains "Nmap") or (http.user_agent contains "masscan") or (http.user_agent contains "zgrab") or (http.user_agent contains "ffuf") or (http.user_agent contains "wpscan") or (http.user_agent contains "nikto") or (http.user_agent contains "sqlmap") or (http.user_agent contains "Acunetix") or (http.user_agent contains "Nessus") or (http.user_agent contains "OpenVAS") or (http.user_agent contains "Qualys") or (http.user_agent contains "Rapid7")
```

以上规则不一定有用，waf默认应该选择交互式查询

## **📚 参考资源**  
### **🔹 Liuzhen932**  
- [开网站五年多了，分享下我的 Cloudflare WAF 规则 | liuzhen932 的小窝](https://blog.liuzhen932.top/posts/cloudflare-waf-rules/)  


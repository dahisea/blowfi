---
title: "小米路由器4A千兆版最新款（r4av2）Openwrt 刷入教程"
date: 2023-05-19T01:25:04Z
draft: false
description: "教程"
tags: ["路由", "openwrt"]
---

### **2023 小米路由器 4A 千兆版 (r4av2) OpenWrt 刷机完整教程**  
**⚠️ 注意：本教程适用于硬件版本 r4av2（固件版本 2.30.x），与旧版 r4a/r3gv2 不兼容！**  

---

## **📌 前言**  
我最近购买了 **小米路由器 4A 千兆版（r4av2）**，替换了旧的路由器。但使用官方固件时发现以下问题：  
1. **后台偷偷请求** `api.miwifi.com`（小米云端服务）  
2. **莫名访问** `www.baidu.com` 和 `www.taobao.com`（原因不明）  
3. **2.4GHz WiFi 频繁断连**（官方固件 Bug）  

经过研究，发现这款路由器的硬件版本是 **r4av2**（海外对应型号 **ac1200-rb02**），与旧版 **r4a/r3gv2** 不同，固件不通用。  

由于网上教程较零散，我整理了一份 **完整的刷机指南**，帮助大家顺利刷入 **Breed + OpenWrt**。  

---

## **🔧 准备工作**  
### **📌 硬件需求**  
✅ **小米路由器 4A 千兆版（r4av2，固件版本 2.30.x）**  
✅ **网线 1 根**（连接电脑和路由器）  
✅ **Windows 电脑**（需开启 Telnet 功能）  

### **📌 软件工具**  
1. **解锁脚本（V2 版）**（用于获取 root 权限）  
2. **WinSCP**（上传文件到路由器）  
3. **Breed 引导程序**（`breed-mt7621-pbr-m1.bin`）  
4. **OpenWrt 固件**（推荐 `supes.top` 或恩山论坛的定制版）  

> **⚠️ 注意：**  
> - **所有工具和固件可在文末参考链接下载**  
> - **刷机有风险，请谨慎操作！**  

---

## **⚡ 刷机步骤**  
### **🔹 第一步：解锁路由器（获取 root 权限）**  
1. **用网线连接路由器**（确保电脑能访问 `192.168.31.1`）  
2. **运行解锁脚本 `V2 版`**  
3. **输入路由器 IP（默认 `192.168.31.1`）、本机 IP、管理密码**  
4. **重复尝试直到成功**（Windows 可能需多次运行）  

> **💡 提示：**  
> - 如果 Windows 报错，可尝试 **关闭防火墙/杀毒软件**  
> - **安卓手机运行脚本基本不会成功**，建议用电脑  

---

### **🔹 第二步：上传 Breed 到路由器**  
1. **打开 WinSCP**，选择 **SCP 协议**  
2. **主机名**：`192.168.31.1`，**用户名**：`root`，**密码**：`（留空或输入解锁后的密码）`  
3. **进入 `/tmp/` 目录**，上传 `breed-mt7621-pbr-m1.bin`  

> **📌 如果不会用 WinSCP，可参考恩山论坛的教程（文末链接）**  

---

### **🔹 第三步：刷入 Breed**  
1. **使用 SSH/Telnet 连接路由器**（如 PuTTY）  
2. **输入以下命令备份分区（可选，但强烈建议，但樓主沒試過，不知道能不能用）**：  
   ```
    cd /tmp
    mkdir backupB9AD
    cd backupB9AD
    dd if=/dev/mtd0 of=/tmp/backupB9AD/mtd0-ALL.bin
    dd if=/dev/mtd1 of=/tmp/backupB9AD/mtd1-Bootloader.bin
    dd if=/dev/mtd2 of=/tmp/backupB9AD/mtd2-Config.bin
    dd if=/dev/mtd3 of=/tmp/backupB9AD/mtd3-Bdata.bin
    dd if=/dev/mtd4 of=/tmp/backupB9AD/mtd4-Factory.bin
    dd if=/dev/mtd5 of=/tmp/backupB9AD/mtd5-crash.bin
    dd if=/dev/mtd6 of=/tmp/backupB9AD/mtd6-cfg_bak.bin
    dd if=/dev/mtd7 of=/tmp/backupB9AD/mtd7-overlay.bin
    dd if=/dev/mtd8 of=/tmp/backupB9AD/mtd8-OS1.bin
    dd if=/dev/mtd9 of=/tmp/backupB9AD/mtd9-rootfs.bin
    dd if=/dev/mtd10 of=/tmp/backupB9AD/mtd10-disk.bin
   ```
3. **刷入 Breed**：  
   ```bash
   mtd -r write /tmp/breed.bin Bootloader
   ```
4. **等待刷写完成，路由器会自动重启**  

---

### **🔹 第四步：进入 Breed 控制台**  
1. **拔掉路由器电源**  
2. **按住复位键（RESET）不放**  
3. **插上电源，等待 3 秒后松开复位键**  
4. **电脑访问 `192.168.1.1` 进入 Breed**  

> **⚠️ 重要：进入 Breed 后，立即备份 `full.bin` 和 `eeprom.bin`！**  
> - **`full.bin`**：可用于救砖  
> - **`eeprom.bin`**：包含 WiFi 校准数据，刷机时必须一起刷入，否则 WiFi 可能无法使用  

---

### **🔹 第五步：刷入 OpenWrt**  
1. **在 Breed 选择「固件更新」**  
2. **上传 OpenWrt 固件 + `eeprom.bin`**  
3. **等待刷写完成，路由器会自动重启**  
4. **进入 OpenWrt 管理界面（默认 IP 可能是 `192.168.1.1`）**  

> **🔑 默认登录账号/密码尝试组合：**  
> - `root / root`  
> - `root / （空）`  
> - `root / password`  
> - `（默认） / 88888888`  

---

## **📌 注意事项**  
1. **刷机前建议备份所有分区**（防止变砖）  
2. **第三方固件的 WiFi 信号可能不如官方**  
3. **如果刷机失败，可使用 Breed 恢复备份**  
4. **刷机有风险，后果自负！**  

---

## **📚 参考资源**  
### **🔹 OpenWrt 固件下载**  
- [supes.top 定制固件](https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/)  
- [恩山论坛固件](https://www.right.com.cn/forum/thread-8261014-1-1.html)  

### **🔹 详细教程**  
1. [恩山教程 1](https://www.right.com.cn/forum/thread-8261014-1-1.html)  
2. [恩山教程 2](https://www.right.com.cn/forum/thread-8269849-1-1.html)  
3. [恩山教程 3](https://www.right.com.cn/forum/thread-8275612-1-1.html)  

### **🔹 更多资源**  
复制这段内容后打开天翼云盘手机App，操作更方便哦！链接：https://cloud.189.cn/t/BzMveiqyMnu2（访问码：6xhm）)  

---

**🎉 恭喜！现在你的小米路由器 4A 千兆版已成功刷入 OpenWrt，享受更纯净、更强大的路由系统吧！**  
**🚨 如果遇到问题，欢迎在评论区留言讨论！**




# 以下廢案

## 前言

我拿到這款小米路由器4A千兆版，替換掉了劫持嚴重性能低下的舊路由器。但小米路由器終究是小米路由器（廢話），經過我的自建DNS的AdguardHome後台，這款路由器每天都會大量請求api.miwifi.com（小米雲端） 以及www.baidu.com 和www.taobao.com （意味不明），不知葫蘆裡賣的是什麼藥。本來以為這款路由器挺好折騰的，但是經過種種探索後，我發現商家發來的居然是新款硬件的r4av2（海外版對應硬件ac1200-rb02）。

在此科普：小米路由器4a千兆版分為①r4a與r3gv2②r4av2（別搞混了，硬件不一樣的，固件一般不通用

當時遇到了各種問題，由於本人在此方面純屬小白，加上路由器的這個硬件版本是新出的，所以我沒有辦法找到有用的資料，研究（折騰）就此暫停之後的日子裡，我每天便體驗著官方固件的2.4Ghz斷網bug。而最近由於考試結束，我得以抽出時間（平時也浪費了很多時間啊啊啊）來折騰家庭網絡，我要以現有的有限的條件，創造更好的網絡條件（甚

我發現網絡上已經有針對r4av2的破解教程，但這些教程要么有些零散，要么過分簡單（恩山里都是大佬一看就懂滴.png），所以，我寫了這篇教程，是為了幫助各位r4av2用戶捋清楚思路。這個教程可以幫助您破解鎖小米路由器4A千兆版（r4av2: 2.30.x版本硬件，16M閃存）的權限，並刷入breed進而使用OPENWRT。


## 材料

教程在開始之前，您需要準備以下預備材料

1.  路由器本體
小米路由器4A千兆版（最新款r4av2硬件，支援固件版本為2.30.x）。

2.  網線
一根能夠正常與路由器進行連結的網線。

3.  電腦
一台能夠通過網線正常與路由器進行連結的電腦。 （要求電腦搭載Windows系統，系統開啟telnet<如果你不用電腦來執行刷寫breed的命令，請忽略系統telnet環境狀態>。需要注意的是Windows在運行破解程序時是可能出現bug的，故破解時如有問題請多試幾次）。

4.  軟件
本教程中所提到的軟件工具與固件包。 （評論區自取）

5.  眼睛
確保您熟悉使用網頁瀏覽器，並且了解路由器復位鍵位於路由器的什麼位置。 （breed使用時需要）


## 如果準備好了，那就可以開始了

1.  解鎖
首先，你需要在電腦通過網線正常與路由器進行連結時，運行解鎖腳本`V2版`，輸入對應的路由器局域網ip、本機的局域網ip、路由器管理密碼，接著，程序會自動嘗試解鎖路由器的權限。值得一提的是，如果你使用Windows電腦仍未成功，那麼你最好是多試幾次。如果您使用安卓手機進行此解鎖腳本的運行，那麼等待著你的基本上是不會成功。

2.  把breed文件放進去
如果你成功解鎖了權限，你就需要通過WINSCP上傳breed固件（breed.bin）（這款路由器使用的是breed-mt7621-pbr-m1.bin）到路由器的/tmp/目錄下上傳的方法如果不會請看恩山大佬的帖子和視頻（文章結尾處參考）。

3.  刷入breed文件
上傳完了就可以嘗試刷入，先連接路由器終端，
然後你可以嘗試備份（方法來自網絡），樓主忘記備份了
以下為命令：

```
    cd /tmp
    mkdir backupB9AD
    cd backupB9AD
    dd if=/dev/mtd0 of=/tmp/backupB9AD/mtd0-ALL.bin
    dd if=/dev/mtd1 of=/tmp/backupB9AD/mtd1-Bootloader.bin
    dd if=/dev/mtd2 of=/tmp/backupB9AD/mtd2-Config.bin
    dd if=/dev/mtd3 of=/tmp/backupB9AD/mtd3-Bdata.bin
    dd if=/dev/mtd4 of=/tmp/backupB9AD/mtd4-Factory.bin
    dd if=/dev/mtd5 of=/tmp/backupB9AD/mtd5-crash.bin
    dd if=/dev/mtd6 of=/tmp/backupB9AD/mtd6-cfg_bak.bin
    dd if=/dev/mtd7 of=/tmp/backupB9AD/mtd7-overlay.bin
    dd if=/dev/mtd8 of=/tmp/backupB9AD/mtd8-OS1.bin
    dd if=/dev/mtd9 of=/tmp/backupB9AD/mtd9-rootfs.bin
    dd if=/dev/mtd10 of=/tmp/backupB9AD/mtd10-disk.bin
```

備份完把這幾個文件複製出來（可以用WINSCP）保存好，以後萬一要恢復官方要用到
然後然後你應該執行breed刷寫命令

```
mtd -r write /tmp/breed.bin Bootloader
```

4.  進breed
刷好了可能也就進入breed系統了。如果你要進入breed系統，請按著路由器復位鍵不動，然後重新插入路由器電源線，3秒後鬆手，此時你就進入了breed系統（後台地址為192.168.1.1）。

5.  breed是什麼
在此說明：breed是一個恢復控制台，刷openwrt固件用的。

6.  進來之後
進入breed後台後，請立即備份full.bin和eeprom.bin。 full.bin可能可以幫助你救磚。而eeprom.bin很重要，你在每一次固件刷寫時都應將固件包與eeprom.bin一併刷入，如果沒有eeprom.bin，會導致一些奇怪的bug（比如沒信號）。

7.  刷入Openwrt固件
備份完畢後，將OPENWRT固件（底部）和你的eeprom.bin一併刷入，耐心等待進度條跑完，然後就會自動重啟到OPENWRT了，enjoy it!

8.  密碼多少
【附加】如果你遇到需要輸入密碼時，你應該嘗試以下（用戶/密碼）組合：[root/root][root/（空）][root/password][（默認）/88888888]


## 參考文章

《【一些固件】supes.top》 [https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/](https://op.supes.top/firmware/ramips_mt7621/ xiaomi_mi-router-4a-gigabit-v2/) （111開頭的定制固件來源）

1. [https://www.right.com.cn/forum /thread-8261014-1-1.html](https://www.right.com.cn/forum/thread-8261014-1-1.html)

2. [https://www.right.com.cn/forum/thread-8269849-1-1.html](https://www.right. com.cn/forum/thread-8269849-1-1.html)

3. [https://www.right.com.cn/forum/thread-8275612- 1-1.html](https://www.right.com.cn/forum/thread-8275612-1-1.html) （評論區中right開頭固件來源）


# 感謝您的瀏覽，以下是建議

在刷入breed之前可以用命令備份一下全部分區，方便恢復到官方固件。樓主不會，所以沒備份。如果沒備份官方uboot，那麼路由器則不能回到官方狀態。

第三方固件wifi不如官方。

路由器折騰死了博主不負責。

> https://share.dahi.icu/r4av2_mi/
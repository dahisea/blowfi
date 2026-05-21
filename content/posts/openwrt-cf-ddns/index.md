---
title: "OpenWrt 上 Cloudflare DDNS 设置步骤教学"
date: 2024-08-01T10:25:04Z
draft: false
description: "在 OpenWrt 上设定 Cloudflare 动态 DNS 解析"
tags: ["openwrt", "ddns", "cloudflare"]

---

## 📌 Cloudflare DDNS 设置步骤

### 1. 检查 DDNS 服务是否支持 Cloudflare
在 OpenWrt 的 DDNS 设置中，确认是否有「cloudflare.com-v4」选项：

![DDNS 服务列表](https://oxs.dahi.icu/pic/Screenshot_20240802-183356.png)
![DDNS 服务选项](https://oxs.dahi.icu/pic/Screenshot_20240802-183347.png)

### 2. 在Cloudflare建立DNS记录
- 登入 Cloudflare 控制台
- 为你的域添加一笔 DNS 记录：
  - IPv4 请选择 A」记录
  - IPv6 请选择「AAAA」记录
- 记录值可先随意设定，稍后会自动更新

### 3. 建立 Cloudflare API Token
1. 前往 [Cloudflare API Tokens 页面]（https://dash.cloudflare.com/profile/api-tokens）
2. 选择「Create Token」→「Create custom token」
3. 设定权限：
   - 权限类型：Zone
   - 权限设置：DNS → Edit
4. 建立并妥善保存 Token

### 4. OpenWrt DDNS 模块设置
![OpenWrt DDNS 设置画面](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)
看着办吧，以上要注意。 密码就是你的token。
![设定成功画面](https://oxs.dahi.icu/pic/Screenshot_20240802-195526.png)

### 5. 储存并应用设定
完成配置后 ：
1. 点击“保存并应用”
2. 建议重新启动路由器
3. 等待几分钟后检查 Cloudflare 控制台，确认 DNS 记录已自动更新

---

## 💡 注意事项
- API Token 请妥善保管，不要外泄
- 若 IP 变更频繁，可缩短检查间隔时间
- 建议同时设定 IPv4 和 IPv6 记录以确保连接质量

---

## 📚 参考资源
- [OpenWrt 官方文件]（https://openwrt.org/docs/guide-user/services/ddns/client）
- [Cloudflare API 文件]（https://developers.cloudflare.com/api/）
- [外国大神教學]（https://alexskra.com/blog/dynamc-dnsddns-with-openwrt-and-cloudflare/）

> 现在您可以享受稳定可靠的 Cloudflare DDNS 服务了！

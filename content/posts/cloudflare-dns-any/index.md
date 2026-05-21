---
title: "2025年中國內地 Cloudflare DNS over HTTPS (DoH) 使用教程"
date: 2025-06-01T03:25:04Z
draft: false
description: "分享CF的DNS访问方法"
tags: ["dns", "cloudflare"]
---

# Cloudflare DNS over HTTPS （DoH） 使用教程

Cloudflare 提供多种 DNS over HTTPS （DoH） 服务端点，包括标准 DNS、家庭保护 DNS 和安全 DNS 服务。
而其附带的诸如ECH等各种功能，似是禁忌乐章。
以下是详细使用教程。 来自中国内地的报告显示，Cloudflare的部分DNS网域已被封锁。但是封的居然不是全局，离谱了，用子域名就行。看来是开了后门。

## Cloudflare DoH

Cloudflare 提供以下公共 DNS over HTTPS 端点：

1. **标准 DNS**：
   - `https://cloudflare-dns.com/dns-query`
   - 'https://[任意子域].cloudflare-gateway.com/dns-query'

2. **家庭保护 DNS** （拦截恶意内容和成人内容）：
   - `https://family.cloudflare-dns.com/dns-query`
   - 'https://[任意子域].family.cloudflare-dns.com/dns-query'

3. **安全 DNS** （仅拦截恶意内容）：
   - `https://security.cloudflare-dns.com/dns-query`
   - 'https://[任意子域].security.cloudflare-dns.com/dns-query'

## 浏览器直接配置

手动配置安全的DNS

## 高级应用

### 在路由器上配置

许多现代路由器支持自定义DNS，可将上述DNS服务器地址配置到路由器，使所有连接设备自动使用。

### 移动设备配置

**Android 9+**：
- 设置 > 网络和互联网 > 私人DNS
- 输入：『任意子域.security.cloudflare-dns.com』

**iOS**：
- 需要使用描述文件

通过以上配置，您可以充分利用Cloudflare提供的各种DNS over HTTPS服务，根据需求选择标准、安全或家庭保护模式。 使用此公司提供的DNS时，请注意你所在地区的法律。本站不对任何DNS服务维护或支持。
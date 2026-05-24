---
title: "Tyranor 模拟器 Kirikiri 字号设置"
date: 2024-04-20T09:25:04Z
draft: false
description: "Tyranor 模拟器 Kirikiri 引擎文字字号调整教程：字体大小修改、显示优化与常见问题解决"
tags: ["gal", "krkr"]
---
## patch.tjs
```
System.setArgument("-debugwin","no");
Plugins.link("kirikiroid2.dll");
with(Font) {
global._origFontHeightProp = &.height;
property hook_font_height {
setter(v) { global._origFontHeightProp = v * 2.0; }
getter { return global._origFontHeightProp; }
}
&.height = &(hook_font_height incontextof null);
}
```
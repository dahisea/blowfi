const fs = require('fs');
const axios = require('axios');
const path = require('path');
const sharp = require('sharp');

// 配置
const usersFolderPath = "./content/tomodachi/";

if (!fs.existsSync(usersFolderPath)) {
  console.error(`错误：用户目录不存在 ${usersFolderPath}`);
  process.exit(1);
}

// 图片下载并转为webp
async function downloadImageAsWebP(url, dest) {
  const response = await axios({ url, method: 'GET', responseType: 'arraybuffer' });
  await sharp(response.data)
    .toFormat('webp')
    .toFile(dest);
}

// 读取用户数据
let users = [];
try {
  const rawdata = fs.readFileSync(path.join(usersFolderPath, 'users.json'));
  users = JSON.parse(rawdata);
} catch (err) {
  console.error('读取users.json失败:', err.message);
  process.exit(1);
}

// 主处理函数
async function main() {
  try {
    for (const [index, user] of users.entries()) {
      const userDir = path.join(usersFolderPath, user.title.replaceAll("/", "-"));
      
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      const content = `---
title: "${user.title}"
tags: [${user.tags}]
externalUrl: "${user.url}"
weight: ${index + 1}
showDate: false
showAuthor: false
showReadingTime: false
showEdit: false
showLikes: false
showViews: false
layoutBackgroundHeaderSpace: false
---\n`;

      fs.writeFileSync(path.join(userDir, 'index.md'), content);

      // 下载图片并转为webp
      if (user.source) {
        try {
          const webpDest = path.join(userDir, 'feature.webp');
          const jpgOld = path.join(userDir, 'feature.jpg');
          const pngOld = path.join(userDir, 'feature.png');
          // 清理旧图
          if (fs.existsSync(jpgOld)) fs.unlinkSync(jpgOld);
          if (fs.existsSync(pngOld)) fs.unlinkSync(pngOld);
          
          await downloadImageAsWebP(user.source, webpDest);
          console.log(`成功下载: ${user.title} (webp)`);
        } catch (err) {
          console.warn(`图片下载失败 ${user.title}:`, err.message);
        }
      }
    }
    console.log('处理完成！');
  } catch (err) {
    console.error('处理过程中出错:', err);
  }
}

// 运行主函数
main();
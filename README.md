# 星禾星穗 · 线下体验课欢迎页

当前需求为单页纯前端展示。称呼为**亲爱的小明**，主文案为**欢迎来到星禾星穗线下体验课**。

## 查看

[在线欢迎页](https://yiwuqifei66-cmyk.github.io/xinghe-xingsui-welcome/) · [GitHub 仓库](https://github.com/yiwuqifei66-cmyk/xinghe-xingsui-welcome)

直接用浏览器打开 `index.html`，并保留同目录的 `assets` 文件夹。页面样式与脚本包含在 HTML 内，桌宠动画使用本地 WebP，不依赖网络、外部字体或第三方库。

也可以在本目录执行：

```powershell
node dev-server.cjs
```

然后打开 `http://127.0.0.1:4173`。本地预览服务仅提供欢迎页。

## 设计

- 深蓝黑基底搭配橙红氛围光、暖金星环和缓慢流动光带；底部透视网格增加空间层次。
- 欢迎文字前有轻薄玻璃面板，边缘采用低亮度暖金光线；主文案仍为三行。
- 主文案上方增加专属称呼，姓名使用浅金宋体，开场先呈现称呼再展开欢迎文字。小明为演示占位；在 `index.html` 的 `#attendee-name` 内替换姓名，目前未接入报名数据。
- “星禾星穗”使用金色高光衬线大字，开场聚焦并进行一次扫光；之后文字保持稳定。
- 光环上的粒子沿轨迹移动，环境光以 3.5 秒周期柔和呼吸；主文字不持续漂浮。
- 手机和电脑使用不同字号与间距；支持系统减少动态效果设置，离开页面后暂停星点更新。
- 右下角展示星小禾动态形象，点击弹出“星小禾欢迎你呀”，再次点击或按 Escape 可收起。

## 文件

- `index.html`：可直接交付的欢迎页。
- `assets/blue-star-spirit-animated.webp`：透明背景桌宠动画，保留原始 120 帧。
- `dev-server.cjs`：可选本地预览工具，需要 Node.js，无需安装依赖。
- `docs/`：此前的活动框架和参考项目分析，仅保留在本地，不上传公开仓库。

## GitHub Pages 部署

网站只需要 `index.html`、`assets/` 和 `.nojekyll`，无需构建。

GitHub Pages 已配置为 Deploy from a branch，使用 `main` 分支和 `/(root)` 目录。后续修改页面或素材后提交并推送到 `main`，网站会自动重新部署。

目前是浏览器网页，未封装为微信原生小程序。

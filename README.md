# 星禾星穗 · 线下体验课欢迎页

当前需求为单页纯前端展示。称呼为**亲爱的小明**，主文案为**欢迎来到星禾星穗线下体验课**。

## 查看

[在线欢迎页](https://yiwuqifei66-cmyk.github.io/xinghe-xingsui-welcome/) · [GitHub 仓库](https://github.com/yiwuqifei66-cmyk/xinghe-xingsui-welcome)

直接用浏览器打开 `index.html`，并保留同目录的 `assets` 文件夹。页面样式与脚本包含在 HTML 内，桌宠动画与字体使用本地文件，无需连接外部字体服务或安装第三方库。

也可以在本目录执行：

```powershell
node dev-server.cjs
```

然后打开 `http://127.0.0.1:4173`。本地预览服务提供欢迎页、字体素材及排版对比页。

## 设计

- 深蓝黑基底搭配橙红氛围光、暖金星环和缓慢流动光带；底部透视网格增加空间层次。
- 欢迎文字位于不透明深蓝卡片中；勾选底部开关可翻到暖米白背面，查看广州校区路线图，取消勾选返回欢迎页。
- 正式页面采用 A「姓名主角」：使用站酷快乐体，依次呈现“亲爱的”、姓名、“欢迎来到”、“星禾星穗”、“线下体验课”。姓名使用 62px 浅金大字，欢迎语为 24px，品牌与课程名均为 30px。
- 小明为演示占位；在 `index.html` 的 `#attendee-name` 内替换姓名，目前未接入报名数据。较长姓名自然换行；较矮手机屏幕压缩间距并预留桌宠空间。
- 光环上的粒子沿轨迹移动；主文字不持续漂浮。卡片通过 CSS 透视、preserve-3d 与 rotateY 翻面，实际状态由原生 checkbox 保存。
- 手机和电脑使用不同字号与间距；支持系统减少动态效果设置，离开页面后暂停星点更新。
- 右下角展示星小禾动态形象，点击弹出“星小禾欢迎你呀”，再次点击或按 Escape 可收起；减少动态效果时显示其静态第一帧。
- 翻面开关支持 Tab 与空格，路线图区支持键盘滚动。浏览器不支持 3D 或禁用 JS 时降级为二维切换，内容仍可阅读。

## 文件

- `index.html`：可直接交付的欢迎页。
- `welcome-flip-standalone.html`：字体、图片和桌宠均已内嵌，可单文件离线运行。
- `FLIP-CARD.md`：翻面原理、键盘操作、特性检测与可调参数的完整说明。
- `assets/guangzhou-route-guide.png`：用户提供的完整广州校区路线图。
- `assets/blue-star-spirit-still.png`：桌宠原动画第一帧，供减少动态效果设置使用。
- `assets/blue-star-spirit-animated.webp`：透明背景桌宠动画，保留原始 120 帧。
- `assets/fonts/`：自托管站酷快乐体、站酷庆科黄油体及各自 OFL 许可；正式欢迎页使用快乐体。
- `dev-server.cjs`：可选本地预览工具，需要 Node.js，无需安装依赖。
- `docs/`：此前的活动框架和参考项目分析，仅保留在本地，不上传公开仓库。

## GitHub Pages 部署

网站只需要 `index.html`、`assets/` 和 `.nojekyll`，无需构建。

GitHub Pages 已配置为 Deploy from a branch，使用 `main` 分支和 `/(root)` 目录。后续修改页面或素材后提交并推送到 `main`，网站会自动重新部署。

目前是浏览器网页，未封装为微信原生小程序。

## 字体与排版提案

[打开四版对比](https://yiwuqifei66-cmyk.github.io/xinghe-xingsui-welcome/typography-preview.html)。提案分别突出姓名、欢迎语、课程主题及连贯阅读；正式 `index.html` 已采用 A「姓名主角」，对比页保留其余方案。

对比页支持切换字体、调整字号与字距、替换示例姓名。两款字体来自 Google Fonts 官方仓库，字体和 OFL 许可文件放在 `assets/fonts/`，无需连接外部字体服务。

四个预览保留选型时的欢迎页版本，不随本次翻面改动重新生成。`tools/build-typography-previews.cjs` 是此前的提案生成工具；当前正式页面的独立文件使用以下命令生成：

```powershell
node tools/build-standalone.cjs
node dev-server.cjs
```

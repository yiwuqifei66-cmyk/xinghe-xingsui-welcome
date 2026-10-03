# 欢迎卡片与路线指引：实现说明

正式首页为 `index.html`。`welcome-flip-standalone.html` 是完整内嵌版本，包含 HTML、CSS、原生 JavaScript、字体、路线图和桌宠，约 6.7 MB；复制这一个文件即可离线打开。没有框架、包安装或外部服务依赖。

## 逐步实现原理

1. **用原生 checkbox 保存状态。** `#route-toggle` 的 `checked` 为唯一状态源。没有隐藏输入，也没有用 `div` 模拟开关；Tab 能聚焦，空格原生切换。关联的 `label` 扩大可点击区域。JavaScript 不维护第二份正反面状态。
2. **把两个面叠在同一个位置。** `.flip-card` 使用 Grid，正反面都设置 `grid-area: 1 / 1`。正面保留 A 版欢迎文案，用不透明的夜空蓝黑到暖棕渐变承接背景色调；背面用暖米白底，以用户提供的路线图为主体。
3. **建立三维空间。** 外层 `.flip-stage` 设置 `perspective`，中间 `.flip-card` 设置 `transform-style: preserve-3d`。背面预先 `rotateY(180deg)`；checkbox 勾选时，通过后续兄弟选择器把整个卡片旋转 180°。
4. **隐藏转向屏幕后方的面。** 两面均设置 `backface-visibility: hidden`。三维模式下不提前隐藏正面，旋转经过 90° 时由浏览器自然决定哪一面可见，避免中途露出镜像文字或突然空白。不要在 `.flip-card` 上添加透明度、filter、overflow:hidden 等会压平三维上下文的属性。
5. **同步可访问性。** 原生 JS 只把非活动面设为 `aria-hidden` 与 `inert`，避免 Tab 落到卡片背后的链接。检测到浏览器不支持 `inert` 时，临时把非活动面控件的 `tabindex` 设为 -1，返回时恢复原值。浏览器从历史记录恢复 checkbox 状态时，`pageshow` 再同步一次。
6. **给长图独立的阅读区域。** `.route-scroll` 在固定卡片内纵向滚动，图片 `width:100%; height:auto`，不裁切原图。滚动区本身可以 Tab 聚焦，再用方向键或 PageDown 阅读。底部保留“保存路线图”链接，图片后还有图中六步的文字版。
7. **保留降级路径。** `CSS.supports` 与 CSS `@supports` 都确认 preserve-3d、backface-visibility、perspective 后，才启用三维效果。没有 JS、没有 3D 支持时仍以 checkbox 切换二维正反面。`prefers-reduced-motion: reduce` 时直接切换内容，不旋转；背景停止连续更新，桌宠改用原动画第一帧的静态图片。可见焦点不支持 `:focus-visible` 时保留普通 `:focus`。

## 可调参数

在 `index.html` 的 `:root` 中修改：

| 参数 | 当前值 | 作用 |
| --- | --- | --- |
| `--card-width` | `640px` | 桌面最大宽度；窄屏自动不超过容器 |
| `--card-height` | `500px` | 基础高度；支持 svh 时使用 `clamp(460px, 64svh, 540px)` |
| `--card-radius` | `24px` | 两面圆角 |
| `--card-front` | `#211b22` | 正面中部暖深色，也是基础降级底色 |
| `--card-front-top` | `#171c28` | 正面顶部蓝黑，与夜空呼应 |
| `--card-front-bottom` | `#2c211e` | 正面底部暖棕，与橙金流光呼应 |
| `--card-back` | `#f5efe2` | 背面不透明暖米白底 |
| `--flip-perspective` | `1400px` | 透视距离；数值越小，纵深越强 |
| `--flip-duration` | `640ms` | 翻面时长，建议 450–750ms |
| `--flip-easing` | `cubic-bezier(.22,1,.36,1)` | 减速就位的缓动曲线 |

需要固定高度时，同时修改 `@supports (height: 1svh)` 中的 `--card-height`。姓名在 `#attendee-name` 中替换。路线图片使用 `assets/guangzhou-route-guide.png`；内容与文字说明均来自用户提供的图片，没有另外推测目的地。

## 布局与交互约束

- 卡片底部的开关始终在三维容器之外，不会跟着翻转，也不会被图层遮挡。
- 窄屏允许页面自然纵向滚动；路线图另有内部滚动区，没有横向溢出。
- 页面下方为桌宠和气泡预留空间，较矮屏幕会把它们放在正文之后，避免压住图片和开关。
- 星点、流光、科技地面、装饰 SVG 都设置 `pointer-events:none`，不拦截点击；不增加悬停自动翻转。
- 用户主动选择的正反面会保持，直到再次操作 checkbox；不跨报名者保存到 localStorage。

## 重新生成独立文件

```powershell
node tools/build-standalone.cjs
```

独立文件是生成产物，修改源页面后应重新生成。网页部署使用资源分离的 `index.html`，避免每次进入页面都加载大体积的内嵌文件。四版排版预览保留此前设计提案，不参与本次翻面功能。

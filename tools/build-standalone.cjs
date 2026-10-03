const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dataURI = (file, type) => `data:${type};base64,${fs.readFileSync(path.join(root, file)).toString('base64')}`;
const fontLicense = fs.readFileSync(path.join(root, 'assets/fonts/ZCOOLKuaiLe-OFL.txt'), 'utf8');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html
  .replace(/^    <link rel="preload"[^>]+\/>\r?\n/m, '')
  .replace('    <link rel="stylesheet" href="assets/fonts/preview-fonts.css" />', `    <!-- Embedded ZCOOL KuaiLe font license:
${fontLicense}
    -->
    <style>
      @font-face {
        font-family: "ZCOOL KuaiLe";
        src: url("${dataURI('assets/fonts/ZCOOLKuaiLe-Regular.ttf', 'font/ttf')}") format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    </style>`);
for (const [file, type] of [
  ['assets/guangzhou-route-guide.png', 'image/png'],
  ['assets/blue-star-spirit-animated.webp', 'image/webp'],
  ['assets/blue-star-spirit-still.png', 'image/png'],
]) {
  html = html.replaceAll(file, dataURI(file, type));
}
const output = path.join(root, 'welcome-flip-standalone.html');
fs.writeFileSync(output, html);
console.log(`独立 HTML 已生成，约 ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB；字体、路线图和桌宠均已内嵌。`);

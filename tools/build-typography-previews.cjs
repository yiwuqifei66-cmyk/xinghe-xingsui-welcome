const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const common = `
  :root { --type-scale: 1; --type-tracking: .04em; }
  .welcome { padding-inline: 24px; }
  .invitation { max-width: 860px; padding: 36px 14px 42px; margin-bottom: 9svh; }
  .opening-mark { width: 22px; height: 30px; margin-bottom: 24px; }
  .recipient { margin-bottom: 24px; font-family: var(--preview-font, var(--scheme-font)); font-size: 19px; letter-spacing: .035em; }
  .recipient-name {
    font-family: var(--preview-font, var(--scheme-font));
    font-size: calc(var(--name-size) * var(--type-scale));
    line-height: 1.3;
    color: #f6d998;
    letter-spacing: var(--type-tracking);
  }
  .greeting, .brand, .course {
    font-family: var(--preview-font, var(--scheme-font));
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: var(--type-tracking);
    text-indent: 0;
    overflow-wrap: anywhere;
    white-space: normal;
  }
  .greeting { font-size: calc(var(--welcome-size) * var(--type-scale)); color: #fff1d5; margin-bottom: 18px; }
  .brand { font-size: calc(var(--brand-size) * var(--type-scale)); color: #edd4ac; }
  .course { font-size: calc(var(--course-size) * var(--type-scale)); color: #fff1d5; margin-top: 10px; }
  .brand-ink {
    font-family: inherit; color: inherit; background: none;
    -webkit-text-fill-color: currentColor; filter: none;
  }
  .recipient, .greeting, .brand, .brand-ink, .course, .opening-mark, .closing-mark, .glass-halo, .tech-ground {
    animation: none; opacity: 1; transform: none; filter: none;
  }
  .tech-ground { opacity: .8; }
  .closing-mark { margin-top: 28px; }
  @media (max-height: 700px) and (max-width: 600px) {
    .welcome { padding-top: 22px; padding-bottom: 188px; }
    .invitation { padding: 24px 8px 28px; margin-bottom: 0; }
    .opening-mark { margin-bottom: 16px; }
    .recipient { margin-bottom: 18px; }
    .greeting { margin-bottom: 14px; }
    .closing-mark { margin-top: 22px; }
  }
`;

const schemes = [
  {
    id: 'a-name', title: 'A · 姓名主角',
    css: `
      :root { --scheme-font: "ZCOOL KuaiLe", sans-serif; --name-size: 62px; --welcome-size: 24px; --brand-size: 30px; --course-size: 30px; }
      .recipient { display: block; margin-bottom: 30px; }
      .recipient > span { display: block; }
      .recipient-name { margin-top: 8px; }
      .greeting { margin-bottom: 14px; }
    `,
  },
  {
    id: 'b-welcome', title: 'B · 欢迎主角',
    css: `
      :root { --scheme-font: "ZCOOL QingKe HuangYou", sans-serif; --name-size: 28px; --welcome-size: 62px; --brand-size: 30px; --course-size: 32px; }
      .recipient { margin-bottom: 30px; }
      .greeting { color: #f6d998; margin-bottom: 26px; }
      @media (max-width: 600px) { .greeting { font-size: min(calc(var(--welcome-size) * var(--type-scale)), calc((100vw - 88px) / 4.7)); } }
    `,
  },
  {
    id: 'c-course', title: 'C · 课程主角',
    css: `
      :root { --scheme-font: "ZCOOL KuaiLe", sans-serif; --name-size: 27px; --welcome-size: 25px; --brand-size: 28px; --course-size: 48px; }
      .recipient { margin-bottom: 28px; }
      .brand { color: #dac7b0; }
      .course { color: #f6d998; margin-top: 16px; }
      @media (max-width: 600px) { .course { font-size: min(calc(var(--course-size) * var(--type-scale)), calc((100vw - 88px) / 5.7)); } }
    `,
  },
  {
    id: 'd-sentence', title: 'D · 连贯邀请',
    css: `
      :root { --scheme-font: "ZCOOL QingKe HuangYou", sans-serif; --name-size: 29px; --welcome-size: 36px; --brand-size: 36px; --course-size: 36px; }
      .invitation { text-align: left; padding-inline: 30px; }
      .opening-mark { margin-left: 0; }
      .recipient { justify-content: flex-start; margin-bottom: 28px; }
      .greeting { margin-bottom: 8px; }
      .brand, .course { color: #fff1d5; }
      .course { margin-top: 8px; }
      .closing-mark { justify-content: flex-start; }
      @media (max-width: 600px) { .course { font-size: min(calc(var(--course-size) * var(--type-scale)), calc((100vw - 110px) / 5.7)); } }
      @media (max-height: 700px) and (max-width: 600px) { .invitation { padding-inline: 22px; } }
    `,
  },
];

fs.mkdirSync(path.join(root, 'previews'), { recursive: true });
const standaloneSettings = `
  (() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (name) document.querySelector('#attendee-name').textContent = name.slice(0, 16);
    const font = { playful: '"ZCOOL KuaiLe", sans-serif', butter: '"ZCOOL QingKe HuangYou", sans-serif' }[params.get('font')];
    if (font) document.documentElement.style.setProperty('--preview-font', font);
    const scale = Number(params.get('scale') || 100);
    const tracking = Number(params.get('tracking') || 4);
    if (Number.isFinite(scale)) document.documentElement.style.setProperty('--type-scale', String(Math.max(85, Math.min(115, scale)) / 100));
    if (Number.isFinite(tracking)) document.documentElement.style.setProperty('--type-tracking', Math.max(0, Math.min(12, tracking)) / 100 + 'em');
  })();
`;
const shortScreen = `
  @media (max-height: 700px) and (max-width: 600px) {
    .welcome { padding-top: 16px; }
    .invitation { padding-block: 16px 18px; }
    .opening-mark { margin-bottom: 14px; }
    .recipient { margin-bottom: 20px; }
    .recipient-name { font-size: min(calc(var(--name-size) * var(--type-scale)), 19vw); }
    .greeting { margin-bottom: 16px; }
    .closing-mark { margin-top: 16px; }
  }
`;
for (const scheme of schemes) {
  const html = source
    .replace('<title>欢迎来到星禾星穗线下体验课</title>', `<title>${scheme.title} · 星禾星穗欢迎页</title>`)
    .replace('    <style>', '    <link rel="stylesheet" href="../assets/fonts/preview-fonts.css" />\n    <style>')
    .replace('    </style>', `    </style>\n    <style>${common}${scheme.css}${shortScreen}</style>`)
    .replace('src="assets/blue-star-spirit-animated.webp"', 'src="../assets/blue-star-spirit-animated.webp"')
    .replace('    <script>', `    <script>${standaloneSettings}</script>\n    <script>`)
    .replace('Math.min(window.devicePixelRatio || 1, 2)', '1')
    .replace('1000 / 24', '1000 / 15');
  fs.writeFileSync(path.join(root, 'previews', `${scheme.id}.html`), html);
}
console.log(`已生成 ${schemes.length} 个排版预览；正式 index.html 保持原样。`);

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const port = Number(process.env.PORT || 4173);
const routes = new Map([
  ['/', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/index.html', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/assets/blue-star-spirit-animated.webp', { file: 'assets/blue-star-spirit-animated.webp', type: 'image/webp' }],
  ['/typography-preview.html', { file: 'typography-preview.html', type: 'text/html; charset=utf-8' }],
  ['/previews/a-name.html', { file: 'previews/a-name.html', type: 'text/html; charset=utf-8' }],
  ['/previews/b-welcome.html', { file: 'previews/b-welcome.html', type: 'text/html; charset=utf-8' }],
  ['/previews/c-course.html', { file: 'previews/c-course.html', type: 'text/html; charset=utf-8' }],
  ['/previews/d-sentence.html', { file: 'previews/d-sentence.html', type: 'text/html; charset=utf-8' }],
  ['/assets/fonts/preview-fonts.css', { file: 'assets/fonts/preview-fonts.css', type: 'text/css; charset=utf-8' }],
  ['/assets/fonts/ZCOOLKuaiLe-Regular.ttf', { file: 'assets/fonts/ZCOOLKuaiLe-Regular.ttf', type: 'font/ttf' }],
  ['/assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf', { file: 'assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf', type: 'font/ttf' }],
]);
const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/favicon.ico') {
    response.writeHead(204).end();
    return;
  }
  const route = routes.get(pathname);
  if (!route) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('页面不存在');
    return;
  }
  try {
    const page = await fs.readFile(path.join(__dirname, route.file));
    response.writeHead(200, { 'Content-Type': route.type, 'Cache-Control': 'no-store' });
    response.end(page);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('无法读取页面资源');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`欢迎页预览：http://127.0.0.1:${port}`);
});

// Re-embed the readable farm workspace sources into the portable HTML.
// Run from any directory: node design/sync-admin-farms.mjs
import fs from 'node:fs';
import vm from 'node:vm';
const htmlPath = new URL('../public/admin-design.html', import.meta.url);
const css = fs.readFileSync(new URL('./admin-farms.css', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('./admin-farms.js', import.meta.url), 'utf8');
new vm.Script(js);
let html = fs.readFileSync(htmlPath, 'utf8');
for (const [pattern, replacement] of [
  [/<style id="farm-workspace-styles">[\s\S]*?<\/style>/, `<style id="farm-workspace-styles">${css}</style>`],
  [/<script id="farm-workspace-script">[\s\S]*?<\/script>/, `<script id="farm-workspace-script">${js}</script>`],
]) {
  if (!pattern.test(html)) throw new Error('Farm workspace embed marker is missing.');
  html = html.replace(pattern, () => replacement);
}
fs.writeFileSync(htmlPath, html);
console.log('Farm workspace embedded; JavaScript syntax validated.');

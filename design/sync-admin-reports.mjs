import fs from 'node:fs';import vm from 'node:vm';
const p='public/admin-design.html',js=fs.readFileSync('design/admin-reports.js','utf8')+'\n'+fs.readFileSync('design/admin-report-flow.js','utf8');new vm.Script(js);let html=fs.readFileSync(p,'utf8').replace(/<script id="admin-reports-script">[\s\S]*?<\/script>/g,'');html=html.replace('</body>',()=>`<script id="admin-reports-script">${js}</script></body>`);fs.writeFileSync(p,html);


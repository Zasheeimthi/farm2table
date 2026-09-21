import { chromium } from '@playwright/test';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=resolve('public/content-pack');
await mkdir(resolve(root,'standalone'),{recursive:true});
const list=JSON.parse(await readFile(resolve(root,'manifest.json'),'utf8'));
const browser=await chromium.launch();const page=await browser.newPage();
for(const e of list){
 await page.goto(pathToFileURL(resolve(root,'preview.html')).href+'?email='+e.id);
 await page.frameLocator('#frame').locator('h1').waitFor();
 let html=await page.locator('#frame').getAttribute('srcdoc');
 const assets=[...html.matchAll(/(?:src="|url\(')([^"')]+)/g)].map(m=>m[1]);
 for(const asset of new Set(assets)){
  const bytes=await readFile(fileURLToPath(new URL(asset,pathToFileURL(resolve(root,'preview.html')))));
  const mime=asset.endsWith('.woff2')?'font/woff2':asset.endsWith('.jpg')?'image/jpeg':'image/png';
  html=html.replaceAll(asset,'data:'+mime+';base64,'+bytes.toString('base64'));
 }
 await writeFile(resolve(root,'standalone',e.id+'.html'),html);
}
await browser.close();
console.log('Exported 10 self-contained HTML design previews.');

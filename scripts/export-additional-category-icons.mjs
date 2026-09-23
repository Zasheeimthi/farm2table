import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
const icons={
 fruits:`<path d="M42 31c-8-8-24-7-26 7-2 14 10 31 19 30l7-2 7 2c9 1 21-16 19-30-2-14-18-15-26-7Z" fill="#efbda9"/><path d="M42 31c-2-9-1-14 3-19"/><path d="M45 24c-1-10 8-13 17-12-1 10-8 15-17 12Z" fill="#bed59a"/><path d="M25 38c-3 5-2 11 1 15"/>`,
 honey:`<path d="M24 29h31l6 12v21c0 5-4 8-9 8H27c-5 0-9-3-9-8V41l6-12Z" fill="#f2d38b"/><rect x="23" y="22" width="33" height="8" rx="3" fill="#e3b58e"/><path d="M19 43h41M19 60h41"/><path d="m40 45-6 8a6 6 0 0 0 12 0l-6-8Z" fill="#e3b58e"/><path d="m59 27 11-15"/><path d="m63 10 11 8m-14-3 11 8m-14-3 11 8"/>`,
 nuts:`<path d="M42 14C21 20 12 37 16 50c3 12 18 14 29 3 10-10 11-26-3-39Z" fill="#e3b58e"/><path d="M40 23C27 34 22 43 24 51"/><path d="M61 35c-15 0-29 11-29 23 0 11 12 16 23 11 13-6 15-20 6-34Z" fill="#f2d38b"/><path d="M58 43c-9 5-15 13-16 20"/>`,
 herbs:`<path d="M27 71c9-13 17-29 24-51M33 62 20 39m20 8 24-9"/><path d="M48 29c-6-11-1-18 9-21 5 11 1 19-9 21Z" fill="#bed59a"/><path d="M43 42c-13 0-20-8-17-20 13 1 20 9 17 20Z" fill="#bed59a"/><path d="M42 47c0-12 10-18 22-15-1 12-10 17-22 15Z" fill="#bed59a"/><path d="M32 62c-13 0-20-9-17-21 13 2 20 10 17 21Z" fill="#bed59a"/><path d="M33 62c4-12 15-15 26-9-5 11-15 14-26 9Z" fill="#bed59a"/>`,
 grains:`<path d="M42 73V23"/><path d="M42 29c-9-7-8-15 0-23 8 8 9 16 0 23Z" fill="#f2d38b"/><path d="M42 42c-13 0-20-8-18-21 13 1 20 9 18 21ZM42 42c13 0 20-8 18-21-13 1-20 9-18 21ZM42 56c-13 0-20-8-18-21 13 1 20 9 18 21ZM42 56c13 0 20-8 18-21-13 1-20 9-18 21ZM42 69c-13 0-20-8-18-21 13 1 20 9 18 21ZM42 69c13 0 20-8 18-21-13 1-20 9-18 21Z" fill="#f2d38b"/>`
};
const root='public/category-icons/additional';for(const dir of ['png','with-circle','svg'])await mkdir(`${root}/${dir}`,{recursive:true});
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:512,height:512}});
for(const [name,art] of Object.entries(icons)){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 84 84" fill="none" stroke="#103b37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${art}</svg>`;
 await writeFile(`${root}/svg/${name}.svg`,svg);
 for(const circle of [false,true]){await page.setContent(`<body style="margin:0;background:transparent"><div style="width:512px;height:512px;display:grid;place-items:center;${circle?'background:rgba(255,255,255,.55);border-radius:50%':''}">${circle?svg.replaceAll('512','423'):svg}</div></body>`);await page.screenshot({path:`${root}/${circle?'with-circle':'png'}/${name}.png`,omitBackground:true});}
}
await page.setViewportSize({width:1100,height:250});await page.setContent(`<body style="margin:0;background:#f8f3ec;display:flex;justify-content:space-around;font:15px Arial;color:#103b37">${Object.entries(icons).map(([name,art])=>`<div style="text-align:center;padding:18px"><svg width="160" height="160" viewBox="0 0 84 84" fill="none" stroke="#103b37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${art}</svg><p>${name}</p></div>`).join('')}</body>`);await page.screenshot({path:`${root}/preview.png`});await browser.close();

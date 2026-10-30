import fs from 'node:fs';
const root=new URL('../',import.meta.url);
let html=fs.readFileSync(new URL('public/admin-design.html',root),'utf8');
const css=fs.readFileSync(new URL('design/admin-elegant.css',root),'utf8');
const logo=fs.readFileSync(new URL('public/storefront/admin-logo-white.png',root)).toString('base64');
html=html.replace(/<style id="admin-elegant-theme">[\s\S]*?<\/style>/g,'');
html=html.replace('</head>',()=>'<style id="admin-elegant-theme">'+css+'\n.sidebar .brand,.login-art .brand{content:url("data:image/png;base64,'+logo+'")!important}\n</style>\n</head>');
fs.writeFileSync(new URL('public/admin-design.html',root),html);
console.log('Elegant theme and supplied logo embedded.');

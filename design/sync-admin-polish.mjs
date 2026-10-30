import fs from 'node:fs';
import vm from 'node:vm';
const file=new URL('../public/admin-design.html',import.meta.url);
let html=fs.readFileSync(file,'utf8');
for(const [extension,tag,anchor] of [['css','style','</head>'],['js','script','</body>']]){
 const source=fs.readFileSync(new URL(`./admin-polish.${extension}`,import.meta.url),'utf8');
 if(extension==='js')new vm.Script(source);
 const block=`<${tag} id="admin-polish-${extension}">${source}</${tag}>`;
 const pattern=new RegExp(`<${tag} id="admin-polish-${extension}">[\\s\\S]*?</${tag}>`);
 html=pattern.test(html)?html.replace(pattern,()=>block):html.replace(anchor,()=>block+'\n'+anchor);
}
fs.writeFileSync(file,html);
console.log('Admin polish embedded and syntax checked.');

const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'mockup-kalendarz.html');
let html=fs.readFileSync(file,'utf8');
const block='<!-- calendar-workflows:start -->\n<script>\n'+fs.readFileSync(path.join(__dirname,'calendar-workflows.js'),'utf8')+'\n</script>\n<!-- calendar-workflows:end -->';
html=html.includes('<!-- calendar-workflows:start -->')?html.replace(/<!-- calendar-workflows:start -->[\s\S]*?<!-- calendar-workflows:end -->/,()=>block):html.replace('</body>',block+'\n</body>');
fs.writeFileSync(file,html);
console.log('Embedded calendar workflows in standalone HTML.');

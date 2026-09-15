const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'mockup-dashboard.html');
let html=fs.readFileSync(file,'utf8');
const block='<!-- dashboard-workflows:start -->\n<script>\n'+fs.readFileSync(path.join(__dirname,'dashboard-workflows.js'),'utf8')+'\n</script>\n<!-- dashboard-workflows:end -->';
html=html.includes('<!-- dashboard-workflows:start -->')?html.replace(/<!-- dashboard-workflows:start -->[\s\S]*?<!-- dashboard-workflows:end -->/,()=>block):html.replace('</body>',block+'\n</body>');
fs.writeFileSync(file,html);
console.log('Embedded dashboard workflows.');

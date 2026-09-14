// Tests the actual embedded workflow functions without driving a browser.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const test=require('node:test'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'mockup-kalendarz.html'),'utf8');
const workflow=fs.readFileSync(path.join(__dirname,'calendar-workflows.js'),'utf8');
function between(text,a,b){const start=text.indexOf(a),end=text.indexOf(b,start);assert.ok(start>=0&&end>start);return text.slice(start,end);}
function fixture(){
  const ctx=vm.createContext({
    stays:[{id:'a',pet:'luna',box:1,start:0,end:3},{id:'b',pet:'luna',box:2,start:3,end:5},{id:'c',pet:'luna',box:1,start:5,end:7}],
    pets:[{id:'luna',reservation:'r1',start:0,end:7}],state:{draft:null},reservations:{r1:{version:1}},serial:0,
    structuredClone,selectedSegments:[],saveError:'',pendingRecovery:null,saved:0,render(){},notify(){},$:()=>({focus(){}})
  });
  vm.runInContext('const petById=id=>pets.find(p=>p.id===id);const reservationPets=id=>pets.filter(p=>p.reservation===id);const draftRange=(s,d=state.draft)=>d.scope==="whole"?{start:s.start,end:s.end}:{start:d.start,end:d.end};function persist(id,change,after){saved++;change();after();}',ctx);
  vm.runInContext(between(html,'function mergeStays(){','function householdCandidates'),ctx);
  vm.runInContext(between(workflow,'  function resizePlan(','  function showDateConflicts('),ctx);
  vm.runInContext(between(workflow,'  function completePlan(','  function reservationFields('),ctx);
  vm.runInContext(between(workflow,'  validateDraft = function(){','  targetPicker = function('),ctx);
  vm.runInContext(between(workflow,'  saveMove = function(){','  function completePlan('),ctx);
  return ctx;
}
const plain=x=>JSON.parse(JSON.stringify(x));
test('HTML contains current source and all scripts parse',()=>{
  assert.ok(html.includes(workflow));
  for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
});
test('selecting all segments joins them into one stay',()=>{
  const c=fixture();c.state.draft={id:'a',ids:['a','b','c'],scope:'whole',start:0,end:3,target:4,version:1};
  vm.runInContext('saveMove()',c);
  assert.deepEqual(plain(c.stays).map(({start,end,box})=>({start,end,box})),[{start:0,end:7,box:4}]);assert.equal(c.saved,1);
});
test('non-adjacent selection preserves unselected middle segment',()=>{
  const c=fixture();c.state.draft={id:'a',ids:['a','c'],scope:'whole',start:0,end:3,target:4,version:1};
  vm.runInContext('saveMove()',c);
  assert.deepEqual(plain(c.stays).map(s=>[s.start,s.end,s.box]),[[0,3,4],[3,5,2],[5,7,4]]);
});
test('moving group to one existing source box is allowed and merges correctly',()=>{
  const c=fixture();c.state.draft={id:'a',ids:['a','b','c'],scope:'whole',start:0,end:3,target:1,version:1};
  assert.equal(vm.runInContext('validateDraft()',c),'');vm.runInContext('saveMove()',c);
  assert.equal(c.stays.length,1);assert.equal(c.stays[0].box,1);
});
test('invalid part range does not mutate any segment',()=>{
  const c=fixture(),before=plain(c.stays);c.state.draft={id:'a',ids:['a'],scope:'part',start:2,end:6,target:4,version:1};
  vm.runInContext('saveMove()',c);assert.deepEqual(plain(c.stays),before);assert.equal(c.saved,0);
});
test('activation requires full coverage of every cat',()=>{
  const c=fixture();assert.equal(vm.runInContext('completePlan("r1")',c),true);
  c.pets.push({id:'mela',reservation:'r1',start:0,end:7});
  assert.equal(vm.runInContext('completePlan("r1")',c),false);
  c.stays.push({id:'d',pet:'mela',box:5,start:0,end:7});
  assert.equal(vm.runInContext('completePlan("r1")',c),true);
  c.stays[1].start=4;assert.equal(vm.runInContext('completePlan("r1")',c),false);
});
test('shortening clips edges; extending retains internal transitions',()=>{
  const c=fixture();
  assert.deepEqual(plain(vm.runInContext('resizePlan(pets[0],2,6)',c)).map(s=>[s.start,s.end,s.box]),[[2,3,1],[3,5,2],[5,6,1]]);
  assert.deepEqual(plain(vm.runInContext('resizePlan(pets[0],-2,10)',c)).map(s=>[s.start,s.end,s.box]),[[-2,3,1],[3,5,2],[5,10,1]]);
});
test('disjoint term changes and unassigned stay remain completely covered',()=>{
  const c=fixture();
  assert.deepEqual(plain(vm.runInContext('resizePlan(pets[0],10,12)',c)).map(s=>[s.start,s.end,s.box]),[[10,12,1]]);
  c.stays=[{id:'a',pet:'luna',box:null,start:0,end:7}];
  assert.deepEqual(plain(vm.runInContext('resizePlan(pets[0],1,9)',c)).map(s=>[s.start,s.end,s.box]),[[1,9,null]]);
});
test('stale version cannot overwrite current plan',()=>{
  const c=fixture(),before=plain(c.stays);c.state.draft={id:'a',ids:['a'],scope:'whole',start:0,end:3,target:4,version:0};
  vm.runInContext('saveMove()',c);assert.deepEqual(plain(c.stays),before);assert.equal(c.saved,0);assert.match(c.saveError,/zmieniona/);
});

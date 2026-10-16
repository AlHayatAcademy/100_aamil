/* Dependency-free integrity and interaction checks. No browser rendering claim. */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..');const els=new Map();const listeners={};
function el(){return {innerHTML:'',textContent:'',value:'',style:{setProperty(){}},dataset:{},classList:{toggle(){},remove(){},contains(){return false},add(){}},setAttribute(){},removeAttribute(){},addEventListener(){},scrollIntoView(){}}}
const ctx={console,window:{scrollTo(){},addEventListener(){},print(){}},document:{querySelector(s){if(!els.has(s))els.set(s,el());return els.get(s)},querySelectorAll(){return []},body:el(),documentElement:el(),addEventListener(type,fn){listeners[type]=fn}},location:{hash:'#home'},localStorage:{getItem(){return null},setItem(){}},setTimeout(){},clearTimeout(){},Blob,URL,confirm(){return false}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);const lessons=ctx.window.LESSONS;
assert.equal(lessons.length,100);assert.equal(new Set(lessons.map(l=>l.id)).size,100);
assert.equal(run('curriculum.length'),100);assert.equal(run('new Set(curriculum.map(l=>l.id)).size'),100);
for(const l of lessons){assert(l.title&&l.explanation&&l.sentence&&l.translation&&l.objective);assert(l.words.length>=2);assert(l.notes.length>=2);assert(l.qa.length);for(const q of l.quiz){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation);}}
for(const page of ['home','paths','map','lessons','practice','review','sources','unknown']){ctx.location.hash='#'+page;run('route()');assert(!els.get('#view').innerHTML.includes('undefined'),page);}
for(const l of lessons){for(const mode of ['read','analysis','qa','quiz']){ctx.location.hash=`#lesson/${l.id}/${mode}`;run('route()');const html=els.get('#view').innerHTML;assert(html.includes(l.title));assert(!html.includes('undefined'),l.id+mode);}}
run("startQuiz('all')");assert.equal(run('quiz.items.length'),20);assert(run('quiz.items.every(q=>quiz.items.filter(x=>x.id===q.id).length===1)'));
run('answer(quiz.options.findIndex(o=>o.correct))');assert.equal(run('quiz.score'),1);run('answer(0)');assert.equal(run('quiz.score'),1,'duplicate answers blocked');run('nextQuestion();answer(quiz.options.findIndex(o=>!o.correct))');assert.equal(run('Object.values(state.answers).filter(x=>x===false).length'),1);run("startQuiz('mistakes')");assert.equal(run('quiz.items.length'),1);
run('startQuiz(STAGES[0].ids)');assert(run('quiz.items.every(q=>STAGES[0].ids.includes(q.lesson))'));
for(const file of ['index.html','styles.css','data.js','app.js','content.json','assets/fonts/Amiri-Regular.woff2','assets/fonts/JameelNooriNastaleeq.woff2'])assert(fs.statSync(path.join(root,file)).size>0,file);
console.log(`PASS: 100 lessons, 10 stages, ${lessons.reduce((n,l)=>n+l.quiz.length,0)} questions; 400 lesson views; routes; scoring; duplicate protection; mistake review; stage scope; local assets.`);

assert(run("rich('یہ مثال قَرَأَ ہے۔').includes('lang=\"ar\"')"));
assert(run("rich('<script>قَرَأَ</script>').includes('&lt;script&gt;')"));
assert(!fs.readFileSync(path.join(root,'app.js'),'utf8').includes('href=\"books/'));
console.log('PASS: Arabic spans, HTML escaping and no bundled-PDF links.');
for(const l of lessons){
 assert(l.synthesis&&l.sentenceType,'whole-sentence explanation '+l.id);
 assert(l.transfer?.sentence&&l.transfer?.synthesis,'new worked example '+l.id);
 for(const [area,ids] of Object.entries(l.coverage)){assert(ids.length,'uncovered '+l.id+' '+area);assert(ids.every(id=>l.quiz.some(q=>q.id===id)),'coverage links '+l.id);}
 assert.equal(new Set(l.quiz.map(q=>q.q)).size,l.quiz.length,'duplicate stem '+l.id);
 assert(l.quiz.some(q=>q.kind==='قاعدہ و شرط'));
 assert(l.quiz.some(q=>q.kind==='نئی مثال پر تطبیق'));
 assert(l.quiz.some(q=>q.kind==='ربطِ اجزائے جملہ'));
}
run("startQuiz('all')");assert.equal(run('new Set(quiz.items.map(q=>STAGES.findIndex(s=>s.ids.includes(q.lesson)))).size'),10,'all ten stages sampled');
run("startQuiz('type:ربطِ اجزائے جملہ')");assert(run("quiz.items.every(q=>q.kind==='ربطِ اجزائے جملہ')"));
run('reviewPage()');assert.equal(run('reviewList.length'),lessons.reduce((n,l)=>n+l.qa.length,0),'all short answers in revision');
ctx.location.hash='#coverage';run('route()');assert(els.get('#view').innerHTML.includes('مواد اور مشق کی مطابقت'));
ctx.location.hash='#lesson/l17/analysis';run('route()');assert(els.get('#view').innerHTML.includes('اب پورے جملے کے اجزا جوڑیے'));assert(els.get('#view').innerHTML.includes('اسی قاعدے کو دوسری عبارت میں پہچانیے'));
assert(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('id="print"'));
console.log('PASS: all seven coverage areas for every lesson; 200 worked examples; whole-sentence synthesis; contextual practice; balanced stage sampling; all short answers in revision.');

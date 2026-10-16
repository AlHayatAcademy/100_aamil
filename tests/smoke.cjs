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
for(const file of ['index.html','styles.css','data.js','app.js','content.json','assets/fonts/Amiri-Regular.woff2','assets/fonts/NafeesNastaleeq.woff2','books/diya.pdf','books/sharh.pdf','books/tawdih.pdf'])assert(fs.statSync(path.join(root,file)).size>0,file);
console.log(`PASS: 100 lessons, 10 stages, ${lessons.reduce((n,l)=>n+l.quiz.length,0)} questions; 400 lesson views; routes; scoring; duplicate protection; mistake review; stage scope; local assets.`);

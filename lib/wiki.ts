import fs from 'node:fs';
import path from 'node:path';
import type masteryType from '../progress/mastery.json';
import type queueType from '../reviews/queue.json';
export const sections = ['curriculum','concepts','assessments','daily','mistakes','sources','exercises'];
export function documents() {
 const entries: {path:string;title:string;section:string;body:string}[] = [];
 // Only enumerate the fixed wiki roots above. Explicit tracing includes live in next.config.ts.
 function walk(dir:string) { for (const item of fs.readdirSync(path.join(/* turbopackIgnore: true */ process.cwd(),dir),{withFileTypes:true})) { if(item.name.startsWith('.') || item.name==='node_modules') continue; const p = `${dir}/${item.name}`; if(item.isDirectory()) walk(p); else if(/\.(md|txt)$/.test(p)) { const raw = fs.readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(),p),'utf8'); const body=p.endsWith('.txt')?'```text\n'+raw+'\n```':raw; entries.push({path:p,title:raw.match(/^#\s+(.+)/m)?.[1] ?? item.name,section:dir.split('/')[0],body}); } } }
 sections.forEach(walk);
 for(const p of ['README.md','AGENTS.md']) {const body=fs.readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(),p),'utf8');entries.push({path:p,title:body.match(/^#\s+(.+)/m)?.[1]??p,section:'guide',body});}
 return entries;
}
export function wikiData() {
 const mastery = JSON.parse(fs.readFileSync(path.join(process.cwd(),'progress/mastery.json'),'utf8')) as typeof masteryType;
 const queue = JSON.parse(fs.readFileSync(path.join(process.cwd(),'reviews/queue.json'),'utf8')) as typeof queueType;
 return { mastery, queue, docs:documents(), today:new Intl.DateTimeFormat('en-CA',{timeZone:mastery.timezone}).format(new Date()) };
}
export function noteUrl(p:string) {return '/notes/'+p.split('/').map(encodeURIComponent).join('/');}

import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import path from 'node:path';
import { documents, noteUrl } from '@/lib/wiki';
export const dynamic = 'force-dynamic';
export default async function Note({params}:{params:Promise<{slug:string[]}>}) {
 const {slug}=await params; const key=slug.join('/'); const docs=documents(); const doc=docs.find(d=>d.path===key); if(!doc) notFound();
 return <main className="reader"><Link href="/" className="back">← Back to workspace</Link><div className="eyebrow">{doc.section} / FIELDNOTES</div><article className="prose"><Markdown remarkPlugins={[remarkGfm]} components={{a:({href,children})=>{ if(!href) return <span>{children}</span>; if(href.startsWith('https://')||href.startsWith('http://')) return <a href={href} target="_blank" rel="noreferrer">{children} ↗</a>; if(href.startsWith('#')) return <a href={href}>{children}</a>; const [file,anchor]=href.split('#'); const relative=path.posix.normalize(path.posix.join(path.posix.dirname(key),file)); const target=docs.find(d=>d.path===relative)||docs.find(d=>d.path===file); return target ? <Link href={noteUrl(target.path)+(anchor?'#'+anchor:'')}>{children}</Link>:<span>{children} <small>({href})</small></span>;},h2:({children})=><h2 id={String(children).toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s/g,'-')}>{children}</h2>,h3:({children})=><h3 id={String(children).toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s/g,'-')}>{children}</h3>}}>{doc.body}</Markdown></article></main>;
}

import { wikiData } from '@/lib/wiki';
import Dashboard from '@/components/dashboard';
export const dynamic = 'force-dynamic';
export default function Home() { return <Dashboard data={wikiData()}/>; }

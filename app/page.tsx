import { wikiData } from '@/lib/wiki';
import Dashboard from '@/components/dashboard';
export const revalidate = false;
export default function Home() { return <Dashboard data={wikiData()}/>; }

import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Fieldnotes · Engineering tutor', description: 'A personal engineering wiki grounded in demonstrated understanding.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }

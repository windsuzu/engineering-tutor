import type { NextConfig } from 'next';
const config: NextConfig = {
  agentRules: false,
  ...(process.env.GITHUB_PAGES === 'true' ? {
    output: 'export' as const,
    basePath: '/engineering-tutor',
    trailingSlash: true,
    images: { unoptimized: true },
    distDir: '.next-pages',
  } : {}),
  outputFileTracingIncludes: {
    '/*': ['AGENTS.md', 'README.md', 'curriculum/**/*.md', 'concepts/**/*.md',
      'assessments/**/*.md', 'assessments/**/*.txt', 'daily/**/*.md',
      'mistakes/**/*.md', 'sources/**/*.md', 'exercises/**/README.md',
      'progress/mastery.json', 'reviews/queue.json'],
  },
};
export default config;

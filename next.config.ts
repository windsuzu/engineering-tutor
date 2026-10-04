import type { NextConfig } from 'next';
const config: NextConfig = {
  agentRules: false,
  outputFileTracingIncludes: {
    '/*': ['AGENTS.md', 'README.md', 'curriculum/**/*.md', 'concepts/**/*.md',
      'assessments/**/*.md', 'assessments/**/*.txt', 'daily/**/*.md',
      'mistakes/**/*.md', 'sources/**/*.md', 'exercises/**/README.md',
      'progress/mastery.json', 'reviews/queue.json'],
  },
};
export default config;

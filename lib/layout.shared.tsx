import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'pytscope',
    },
    links: [
      { text: 'Documentation', url: '/docs' },
      { text: 'Changelog', url: '/docs/changelog' },
    ],
    githubUrl: 'https://github.com/Sumu004/pytscope',
  };
}

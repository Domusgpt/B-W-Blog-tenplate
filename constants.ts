import { SectionType, Article } from './types';

export const SECTIONS = [
  { id: SectionType.HOME, label: 'NEXUS' },
  { id: SectionType.DESIGN, label: 'AESTHETICS' },
  { id: SectionType.CODE, label: 'SYNTAX' },
  { id: SectionType.AUDIO, label: 'FREQUENCY' },
];

export const MOCK_ARTICLES: Record<SectionType, Article[]> = {
  [SectionType.HOME]: [
    {
      id: 'h1',
      title: 'The Digital Renaissance',
      excerpt: 'Exploring the convergence of generative art and brutalist web design.',
      content: 'We are witnessing a shift in digital aesthetics. The clean, corporate Memphis design is dying, replaced by a raw, chaotic, yet structured brutalism. This article explores the roots of this movement...',
      imageUrl: 'https://picsum.photos/800/600?grayscale&blur=2',
      date: 'OCT 24, 2023',
      tags: ['Culture', 'Web']
    },
    {
      id: 'h2',
      title: 'Algorithmic Serendipity',
      excerpt: 'How random seed generators are changing user experiences.',
      content: 'Predictability is boring. By introducing controlled chaos into UI patterns, we create memorable moments. This deep dive looks at the math behind "feeling lucky".',
      imageUrl: 'https://picsum.photos/800/601?grayscale',
      date: 'NOV 01, 2023',
      tags: ['UX', 'Math']
    }
  ],
  [SectionType.DESIGN]: [
    {
      id: 'd1',
      title: 'Void & Form',
      excerpt: 'Mastering negative space in dense information displays.',
      content: 'Whitespace is not just empty; it is an active element. In the era of data density, how do we use the void to guide the eye without overwhelming the cognitive load?',
      imageUrl: 'https://picsum.photos/800/602?grayscale',
      date: 'SEP 15, 2023',
      tags: ['Design', 'Minimalism']
    }
  ],
  [SectionType.CODE]: [
    {
      id: 'c1',
      title: 'React Server Components',
      excerpt: 'Why the hydration boundary matters more than ever.',
      content: 'Server components allow us to trim the bundle size significantly, but they introduce a new mental model for data flow. Let\'s break down the boundary.',
      imageUrl: 'https://picsum.photos/800/603?grayscale',
      date: 'DEC 12, 2023',
      tags: ['React', 'Tech']
    }
  ],
  [SectionType.AUDIO]: [
    {
      id: 'a1',
      title: 'Sonic Branding',
      excerpt: 'The unseen layer of user interface design.',
      content: 'A click is not just an action; it is a sound. Haptic and audio feedback loops create a tactile web. We analyze the best-in-class examples of UI sound design.',
      imageUrl: 'https://picsum.photos/800/604?grayscale',
      date: 'JAN 05, 2024',
      tags: ['Sound', 'UX']
    }
  ]
};

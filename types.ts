export enum SectionType {
  HOME = 'HOME',
  DESIGN = 'DESIGN',
  CODE = 'CODE',
  AUDIO = 'AUDIO'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

export interface NavItem {
  id: SectionType;
  label: string;
  angle?: number;
}

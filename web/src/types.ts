export interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string | null;
  modified: string;
  shared: boolean;
}

export interface Share {
  id: number;
  name: string;
  type: string;
  link: string;
  views: number;
  downloads: number;
  expires: string | null;
  created: string;
}

export type PageType = 'files' | 'share';

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}

export interface ArticleStoryblok {
  title: string;
  thumbnail: AssetStoryblok;
  date: string;
  summary: string;
  body: any;
  _uid: string;
  component: "article";
  [k: string]: any;
}

export interface PageStoryblok {
  title: string;
  body?: any[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

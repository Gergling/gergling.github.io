import { SanityImageSource } from '@sanity/asset-utils';
import { Accordion, BlockContent, Microform, SingleArticleBySlugQueryResult } from "../../libs/sanity";

export type UpcomingBlog = {
  title: string;
  slug: string;
  hasBody: boolean;
  hasImage: boolean;
  onClick: () => unknown;
};

export type BlogProgressReport = {
  ideas: string;
  lastPublished: string;
  nextProjectedPublishDate: string;
  upcoming: UpcomingBlog;
};

export type BlogArticle = SingleArticleBySlugQueryResult & {
  body: BlockContent;
};

export type BlogImageData = {
  alt: string;
  caption: string;
  height: number;
  src: string;
  status: 'success' | 'asset-missing';
  width: number;
};

export type PortableTextMapping = {
  accordion: Accordion;
  figure: SanityImageSource;
  microform: Microform;
};

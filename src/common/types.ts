export interface SeoProps {
  title: string;
  description: string;
  siteName?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
}

export type Seeder = () => number;

export type StoreOp<T> = (state: T) => T;

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

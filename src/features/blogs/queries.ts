import { defineQuery } from 'groq';
import { sanityClientFetch } from '../../libs/sanity/utilities';

const baseArticleFields = `
  title,
  "slug": slug.current,
  "image": mainImage.asset->url,
  categories[]->{description, title},
  publishedAt,
`;

const featuredArticlesQuery = defineQuery(`
  *[_type == "post" && status == "ready"]
  | order(publishedAt desc)
  [0...3]
  {
    ${baseArticleFields}
  }
`);

export const fetchFeaturedArticles = () =>
  sanityClientFetch(featuredArticlesQuery);

const singleArticleBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug]
  | order(publishedAt desc)
  [0]
  {
    ${baseArticleFields}
    body,
    survey
  }
`);

export const fetchSingleArticleBySlug = (slug: string) =>
  sanityClientFetch(singleArticleBySlugQuery, { slug });

const listArticlesQuery = defineQuery(`
  *[_type == "post" && status == "ready"]
  | order(publishedAt desc)
  {
    ${baseArticleFields}
  }
`);

export const fetchListArticles = () =>
  sanityClientFetch(listArticlesQuery);

const articleProgressStatusQuery = defineQuery(`
  {
    "ideaCount": count(*[_type == "post" && status == "idea"]),
    "upcomingList": *[
      _type == "post" &&
      status == "upcoming"
    ] | order(_createdAt asc) {
      title,
      "slug": slug.current,
      "hasBody": defined(body),
      "hasImage": defined(mainImage)
    },
    "publishDates": *[
      _type == "post" &&
      publishedAt != null
    ].publishedAt | order(publishedAt desc)
  }
`);

export const fetchArticleProgressStatus = () =>
  sanityClientFetch(articleProgressStatusQuery);

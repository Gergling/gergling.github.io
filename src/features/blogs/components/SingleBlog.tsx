import { useMemo } from "react";
import { toHTML } from '@portabletext/to-html'
import { Typography } from "@mui/material";
import { BlockContent, SingleArticleBySlugQueryResult } from "../../../libs/sanity";
import { Seo } from "../../../common/components/Seo";
import { BlogProvider } from "../context";
import { useBlog, useBlogItemQuery } from "../hooks";
import { ReadablePublishingTime } from "./ReadablePublishingTime";
import { BlogRendererBlockContent, BlogRendererImage } from "./content";

type SingleBlogProps = { slug: string; };

const RenderBlog = ({
  body,
  image,
  publishedAt,
  title,
  survey,
}: SingleArticleBySlugQueryResult & {
  body: BlockContent;
}) => {
  const { blogContainerRef } = useBlog();

  const blogDescription = useMemo(() => {
    const html = toHTML(body, { onMissingComponent: false });
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    if (text.length < 150) return text;

    const truncatedByLength = text.substring(0, 150);
    const lastSpace = truncatedByLength.lastIndexOf(' ');
    const truncatedByWord = lastSpace !== -1 ? truncatedByLength.substring(0, lastSpace) : truncatedByLength;
    const ellipsisText = `${truncatedByWord}...`;
    return ellipsisText;
  }, [body]);

  return (
    <div ref={blogContainerRef}>
      <Seo
        title={title}
        description={blogDescription}
        image={image ?? ''}
      />
      <Typography variant="h4" sx={{ textAlign: 'center' }}>{title}</Typography>
      <div style={{ textAlign: 'center' }}>
        {image && <BlogRendererImage alt={title} src={image} />}
      </div>
      <ReadablePublishingTime publishedAt={publishedAt} />
      <BlogRendererBlockContent value={body} />
      {survey && <div><a href={`/survey/${survey}`}>Click here to take the survey.</a></div>}
    </div>
  );
};

export const SingleBlog = ({ slug }: SingleBlogProps) => {
  const {
    data,
    isLoading,
    error
  } = useBlogItemQuery(slug);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No article found.</>;
  if (!data.body) return <>Article has no body.</>;

  return (
    <BlogProvider>
      <RenderBlog {...data} body={data.body} />
    </BlogProvider>
  );
};

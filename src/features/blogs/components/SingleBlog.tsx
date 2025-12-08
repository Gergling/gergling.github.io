import { Typography } from "@mui/material";
import { Seo } from "../../../common/components/Seo";
import { BlogProvider } from "../context";
import { useBlog, useBlogItemQuery } from "../hooks";
import { ReadablePublishingTime } from "./ReadablePublishingTime";
import { BlogRendererBlockContent, BlogRendererImage } from "./content";
import { BlogArticle } from "../types";

type SingleBlogProps = { slug: string; };

const RenderBlog = (blog: BlogArticle) => {
  const {
    body,
    image,
    publishedAt,
    survey,
    title,
  } = blog;
  const { blogContainerRef, description } = useBlog(blog);

  return (
    <div ref={blogContainerRef}>
      <Seo
        title={title}
        description={description || ''}
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

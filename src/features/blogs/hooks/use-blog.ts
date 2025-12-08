import { SanityImageSource } from '@sanity/asset-utils';
import { useCallback, useEffect, useRef, useState } from "react";
import { useElementSize } from '../../../common/hooks/use-element-dimension';
import { useBlogContext } from "../context";
import { BlogArticle } from '../types';
import { useBlogDescription } from './use-description';
import { useSearchParams } from 'react-router-dom';
import { download } from '../../../common/utilities/dom';
import { getBlogContentMarkdown, getBlogImageData } from '../utilities';

const PARAM = 'download-markdown';

export const useBlog = (blog?: BlogArticle | null) => {
  const [markdownHasDownloaded, setMarkdownHasDownloaded] = useState(false);
  const description = useBlogDescription(blog || undefined);
  const { setWidth, width: blogElementWidth } = useBlogContext();
  const getImageData = useCallback(
    (value: SanityImageSource) => getBlogImageData(blogElementWidth, value),
    [blogElementWidth]
  );
  const blogContainerRef = useRef(null);
  const imgWidth = useElementSize(blogContainerRef, (element) => element.offsetWidth);
  const [searchParams] = useSearchParams();
  const runDownload = useCallback(() => {
    if (!blog?.body) return;
    if (!searchParams.has(PARAM)) return;

    const markdown = getBlogContentMarkdown(blog.body, getImageData);
    const blob = new Blob([markdown], { type: 'text/plain' });
    download(blob, `blog_${blog.slug}_analysis_draft.md`);
    setMarkdownHasDownloaded(true);
  }, [blog?.body, searchParams]);

  useEffect(() => {
    setWidth(imgWidth);
  }, [imgWidth, setWidth]);
  useEffect(runDownload, [runDownload]);

  return {
    blogContainerRef,
    description,
    getImageData,
    markdownHasDownloaded,
  };
};

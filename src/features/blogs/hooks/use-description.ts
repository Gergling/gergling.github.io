import { useMemo } from "react";
import { toHTML } from '@portabletext/to-html'
import { BlogArticle } from "../types";

export const useBlogDescription = (blog?: BlogArticle) => useMemo(() => {
  if (!blog?.body) return;
  const html = toHTML(blog.body, { onMissingComponent: false });
  const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
  if (text.length < 150) return text;

  const truncatedByLength = text.substring(0, 150);
  const lastSpace = truncatedByLength.lastIndexOf(' ');
  const truncatedByWord = lastSpace !== -1 ? truncatedByLength.substring(0, lastSpace) : truncatedByLength;
  const ellipsisText = `${truncatedByWord}...`;
  return ellipsisText;
}, [blog?.body]);

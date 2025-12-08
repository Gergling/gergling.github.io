import { Typography, useTheme } from '@gergling/ui-components';
import { SanityImageSource } from '@sanity/asset-utils';
import { useMemo } from 'react';
import { useBlog } from '../../hooks';
import { BlogRendererImage } from './Image';

export const BlogRendererFigure = ({ value }: { value: SanityImageSource }) => {
  const { getImageData } = useBlog();
  const { alt, caption, src, status } = useMemo(
    () => getImageData(value),
    [getImageData, value]
  );
  const { theme: { typography } } = useTheme();

  if (status !== 'success') return (
    <Typography variant='caption' color='error'>Image: '{alt}' is missing.</Typography>
  );

  return (
    <figure style={{
      margin: '16px 0',
    }}>
      <BlogRendererImage alt={alt} src={src} />
      <figcaption style={{
        fontFamily: typography.body1.fontFamily,
        fontSize: typography.caption.fontSize,
        margin: 'auto',
        display: 'block',
        textAlign: 'center',
      }}>{caption}</figcaption>
    </figure>
  )
}
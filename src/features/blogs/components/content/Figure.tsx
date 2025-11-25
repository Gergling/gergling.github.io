import { SanityImageSource } from '@sanity/asset-utils';
import { useMemo } from 'react';
import { useBlog } from '../../hooks';
import { Typography, useTheme } from '@gergling/ui-components';

export const BlogRendererFigure = ({ value }: { value: SanityImageSource }) => {
  const { getBlogImageData } = useBlog();
  const { alt, caption, src, width, height, status } = useMemo(
    () => getBlogImageData(value),
    [getBlogImageData, value]
  );
  const { theme: { typography } } = useTheme();

  if (status !== 'success') return (
    <Typography variant='caption' color='error'>Image: '{alt}' is missing.</Typography>
  );

  return (
    <div>
      <img
        alt={alt}
        src={src}
        loading="lazy"
        style={{
          aspectRatio: width / height,
        }}
      />
      <Typography variant='caption' sx={{
        fontFamily: typography.body1.fontFamily,
        margin: 'auto',
        display: 'block',
        textAlign: 'center',
      }}>{caption}</Typography>
    </div>
  )
}
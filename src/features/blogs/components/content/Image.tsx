export const BlogRendererImage = ({ alt, src }: { alt: string; src: string; }) => <img
  alt={alt}
  src={src}
  loading="lazy"
  style={{
    display: 'block',
    width: '100%',
    height: '200px',
    objectFit: 'cover', // This is the key property
    objectPosition: 'center', // Ensures the image is centered within its frame
  }}
/>;

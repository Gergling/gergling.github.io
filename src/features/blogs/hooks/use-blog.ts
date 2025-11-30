import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { useCallback, useEffect, useRef } from "react";
import { useElementSize } from '../../../common/hooks/use-element-dimension';
import { client } from "../../../libs/sanity";
import { useBlogContext } from "../context";

type ImageData = {
  alt: string;
  caption: string;
  height: number;
  src: string;
  status: 'success' | 'asset-missing';
  width: number;
};

type ImageSourceKey<T> = T extends string ? never : keyof T;
// TODO: Pretty sure this is just tricking TS into believing the output isn't
// going to break everything, but whatever, let's roll the dice.
const getImageValueProp = <T extends SanityImageSource, U extends ImageSourceKey<T>>(
  value: SanityImageSource,
  prop: U,
  defaultValue: string = '',
): string => {
  if (typeof value === 'string') return defaultValue;
  if (!(prop in value)) return defaultValue;

  return (value as Record<U, string>)[prop];
}

const getImageValueStatus = (value: SanityImageSource): 'success' | 'asset-missing' => {
  if (typeof value !== 'string' && '_type' in value && value._type === 'figure' && !value.asset) return 'asset-missing';
  return 'success';
};

const getImageData = (blogElementWidth: number, value: SanityImageSource): ImageData => {
  const alt = getImageValueProp(value, 'alt', 'No alt text was provided for this image.');
  const caption = getImageValueProp(value, 'caption');
  const status = getImageValueStatus(value);

  if (status === 'asset-missing') return {    
    src: '',
    alt,
    width: 0,
    height: 0,
    caption,
    status,
  };

  const src = urlBuilder(client).image(value).width(blogElementWidth).fit('max').auto('format').url();
  const { width, height } = getImageDimensions(value);

  return {
    alt,
    caption,
    height,
    src,
    status,
    width,
  };
};

export const useBlog = () => {
  const { setWidth, width: blogElementWidth } = useBlogContext();
  const getBlogImageData = useCallback(
    (value: SanityImageSource) => getImageData(blogElementWidth, value),
    [blogElementWidth]
  );
  const blogContainerRef = useRef(null);
  const imgWidth = useElementSize(blogContainerRef, (element) => element.offsetWidth);

  useEffect(() => {
    setWidth(imgWidth);
  }, [imgWidth, setWidth]);

  return {
    blogContainerRef,
    getBlogImageData,
  };
};

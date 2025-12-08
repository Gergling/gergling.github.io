import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { client } from "../../../libs/sanity";
import { BlogImageData } from '../types';

type ImageSourceKey<T> = T extends string ? never : keyof T;

const getImageValueProp = <T extends SanityImageSource, U extends ImageSourceKey<T>>(
  value: SanityImageSource | undefined,
  prop: U,
  defaultValue: string = '',
): string => {
  if (value === undefined || typeof value === 'string') return defaultValue;
  if (!(prop in value)) return defaultValue;

  return (value as Record<U, string>)[prop];
}

const getImageValueStatus = (value: SanityImageSource | undefined): BlogImageData['status'] => {
  if (value === undefined) return 'asset-missing';
  if (typeof value !== 'string' && '_type' in value && value._type === 'figure' && !value.asset) return 'asset-missing';
  return 'success';
};

export const getBlogImageData = (blogElementWidth: number, value: SanityImageSource): BlogImageData => {
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

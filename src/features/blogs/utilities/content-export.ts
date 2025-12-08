// import * as fs from 'fs';
// import * as path from 'path';

import { SanityImageSource } from '@sanity/asset-utils';
import toMarkdown from '@sanity/block-content-to-markdown';
import { Accordion as AccordionProps, BlockContent } from "../../../libs/sanity";
import { BlogImageData, PortableTextMapping } from '../types';

// --- Type Definitions for Mock Content ---

// interface PortableTextSpan {
//     _type: 'span';
//     text: string;
// }

// interface PortableTextBlock {
//     _type: 'block';
//     style: 'h1' | 'h2' | 'normal' | 'blockquote';
//     children: PortableTextSpan[];
// }

// interface MainImageBlock {
//     _type: 'mainImage';
//     alt: string;
//     caption?: string;
// }

// type PortableText = (PortableTextBlock | MainImageBlock)[];

// --- Mock Data Retrieval (Simulates fetching from Sanity API) ---

// const mockPortableTextData: PortableText = [
//     {
//         _type: 'block',
//         style: 'h1',
//         children: [{ _type: 'span', text: 'Decoding the Modern Data Pipeline' }],
//     },
//     {
//         _type: 'block',
//         style: 'normal',
//         children: [{ _type: 'span', text: 'The following section introduces the concept of content versioning and real-time synchronization, which are foundational to any modern CMS strategy.' }],
//     },
//     {
//         _type: 'mainImage',
//         alt: 'A complex, multi-layered diagram showing content flowing from a source, through an API layer, and into various distribution channels.',
//         caption: 'Architecture of a Headless CMS and Content Delivery Network.',
//     },
//     {
//         _type: 'block',
//         style: 'normal',
//         children: [{ _type: 'span', text: 'This image clearly illustrates how the separation of concerns improves deployment reliability. Next, we analyze the specific components of the Content Lake.' }],
//     },
//     {
//         _type: 'block',
//         style: 'h2',
//         children: [{ _type: 'span', text: 'GROQ vs. GraphQL' }],
//     },
//     {
//         _type: 'block',
//         style: 'blockquote',
//         children: [{ _type: 'span', text: 'GROQ allows for powerful server-side filtering, leading to leaner network payloads.' }],
//     },
// ];

// --- Core Transformation Logic ---

/**
 * Converts a simplified Portable Text structure into a clean markdown string,
 * explicitly tagging images with their alt text.
 * @param blocks The array of Portable Text blocks.
 * @returns A string representing the content suitable for LLM analysis.
 */
// function portableTextToAnalysisMarkdown(blocks: PortableText): string {
//     return blocks.map(block => {
//         // Handle standard text blocks
//         if (block._type === 'block' && 'children' in block) {
//             const text = block.children.map(span => span.text).join('');
            
//             switch (block.style) {
//                 case 'h1': return `# ${text}\n`;
//                 case 'h2': return `## ${text}\n`;
//                 case 'blockquote': return `> ${text}\n`;
//                 case 'normal': 
//                 default: 
//                     return text + '\n\n';
//             }
//         }
        
//         // Handle Image Blocks (Custom Type)
//         if (block._type === 'mainImage' && 'alt' in block) {
//             // Use the explicit, unambiguous token structure
//             const altText = block.alt.trim();
//             const caption = block.caption ? ` (Caption: ${block.caption.trim()})` : '';
            
//             // This tag is what the LLM will interpret as the "visual element"
//             return `\n\n{IMAGE: ${altText}${caption}}\n\n`; 
//         }

//         // Ignore other unsupported custom types
//         return '';
//     }).join('').trim();
// }

type Serialiser<T> = ({ value }: { value: T; }) => string;
type Serialisers = {
  types: {
    [K in keyof Omit<PortableTextMapping, 'microform'>]: Serialiser<PortableTextMapping[K]>;
  };
};

const serialiserTypeFactory = <T>(
  callback: (value: T) => string
): Serialiser<T> => (data) => {
  if (!data?.value) return '';
  return callback(data.value);
};

export const getBlogContentMarkdown = (
  body: BlockContent,
  getBlogImageData: (value: SanityImageSource) => BlogImageData
) => toMarkdown(body, {
  serializers: {
    types: {
      accordion: serialiserTypeFactory((value: AccordionProps) => {
        const { headerText, hiddenContent } = value;
        return `
          ### ${headerText}
          ${hiddenContent}
        `;
      }),
      figure: serialiserTypeFactory((value: SanityImageSource) => {
        const { alt, src } = getBlogImageData(value);
        return `![${alt}](${src})`;
      }),
    },
  } satisfies Serialisers,
});

/**
 * Type declarations for the legacy but functional '@sanity/block-content-to-markdown' package.
 *
 * This file is required because the package itself does not include its own
 * TypeScript definition files (.d.ts), which causes compilation errors
 * like "implicitly has an 'any' type."
 *
 * This structure assumes the function is the default export, but since we
 * are using named exports (toMarkdown), we define the module structure.
 */
declare module '@sanity/block-content-to-markdown' {
  import { PortableTextRawData } from '@sanity/block-content-to-html/lib/types';

  /**
   * Defines the configuration options for the markdown converter.
   * This is a simplified definition based on common usage.
   */
  export interface ToMarkdownOptions {
    /**
     * Map of Sanity block styles (like 'h1', 'normal') to their
     * corresponding Markdown representations.
     */
    serializers?: {
      types?: Record<string, Function>;
      marks?: Record<string, Function>;
      list?: Record<string, Function>;
      listItem?: Record<string, Function>;
      // This is the core block serializer
      block?: (props: { node: any; children: string[] }) => string;
      // You can define other serializers here if needed
      [key: string]: any;
    };
    /**
     * The ID of the dataset the content comes from (often 'production').
     */
    dataset?: string;
    /**
     * The name of the Sanity project.
     */
    projectId?: string;
    /**
     * A function to resolve the URL for references, especially for images/files.
     * Takes an asset reference object and returns the URL string.
     */
    imageOptions?: {
        // e.g., A function that builds a URL from an asset reference
        [key: string]: any;
    };
    /**
     * If true, links will be created with their original titles instead of the linked text.
     */
    renderers?: { [key: string]: Function };
    
    // Fallback or legacy options
    [key: string]: any;
  }

  /**
   * Converts a Sanity Portable Text array into a Markdown string.
   *
   * @param blocks The array of Portable Text blocks (usually from your Sanity content).
   * @param options Configuration options, including serializers for custom types.
   * @returns A Markdown formatted string.
   */
  export default function toMarkdown(
    blocks: PortableTextRawData | PortableTextRawData[],
    options: ToMarkdownOptions
  ): string;
}

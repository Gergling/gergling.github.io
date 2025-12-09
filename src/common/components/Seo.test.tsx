import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Seo } from './Seo';
import { SeoProps } from '../types';

// Mock the required data structure from your Sanity fetch
const mockProps: SeoProps = {
  title: "SEO Title!",
  description: "SEO Description!",
  twitterHandle: "Twitter? Handled.",
  image: 'test-my-seo.jpg', // Test for omission
  siteName: 'test-my-seo.jpg', // Test for omission
  url: 'test-my-seo.jpg', // Test for omission
};

describe('Seo component', () => {
  it('component hoists correct SEO tags, with default values where properties are omitted', () => {
    // Arrange: Render the component, causing the metadata to be hoisted into the <head> element by React 19.
    render(
      <MemoryRouter>
        <Seo {...mockProps} />
      </MemoryRouter>
    );

    // Assert: Verify the tags
    expect(document.title).toBe(`${mockProps.title} | ${mockProps.siteName}`);
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage).toBeDefined();
    expect(ogImage?.getAttribute('content')).toBe(mockProps.image);
    const description = document.head.querySelector('meta[name="description"]');
    expect(description).toBeDefined();
    expect(description?.getAttribute('content')).toBe(mockProps.description);
  });
});

/**
 * Custom Sanity Studio Desk Structure for Content Workflow
 * Defines the list view for the 'post' schema, breaking it down by specific workflow statuses.
 */
import { ListItemBuilder, StructureBuilder, StructureResolverContext } from 'sanity/structure';

// The schema type we are targeting
const POST_SCHEMA_TYPE = 'post';

// Define the custom workflow statuses with their specific filters
const WORKFLOW_SECTIONS: { 
  title: string; 
  value: string; 
  filter: string; 
}[] = [
  { 
    title: 'Upcoming', 
    value: 'upcoming', 
    filter: `_type == "${POST_SCHEMA_TYPE}" && status == "upcoming"`,
  },
  { 
    title: 'Ideas', 
    value: 'idea', 
    filter: `_type == "${POST_SCHEMA_TYPE}" && status == "idea"`,
  },
  { 
    title: 'Ready Drafts', 
    value: 'ready-drafts', 
    // Filters for 'ready' status AND the document ID starts with 'drafts.'
    filter: `_type == "${POST_SCHEMA_TYPE}" && status == "ready" && _originalId in path("drafts.**")`,
  },
  { 
    title: 'Published', 
    value: 'published', 
    // Filters for 'published' status AND the document ID does NOT start with 'drafts.'
    filter: `_type == "${POST_SCHEMA_TYPE}" && status == "ready" && !(_originalId in path("drafts.**"))`,
  },
  { 
    title: 'All', 
    value: 'all', 
    // Filters for 'published' status AND the document ID does NOT start with 'drafts.'
    filter: `_type == "${POST_SCHEMA_TYPE}"`,
  },
];

/**
 * Creates the filtered list items for the Studio's sidebar.
 */
function createWorkflowListItems(
  S: StructureBuilder,
  // context: StructureResolverContext
): ListItemBuilder[] {
  return WORKFLOW_SECTIONS.map(section => {
    return S.listItem()
      .title(section.title)
      .id(section.value)
      .child(
        S.documentList()
          .title(section.title + ' Posts')
          .schemaType(POST_SCHEMA_TYPE) // 1. Explicitly set the schema type
          .apiVersion('v2025-10-18')
          .filter(section.filter)
          .defaultLayout('default') // 2. CRUCIAL: Use the schema's default list layout
          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
      )
  });
}


/**
 * The main structure function.
 */
export const postWorkflowStructure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Content')
    .items([
      // 1. The main "All Posts" list for the 'post' type
      // S.listItem()
      //   .title('All Posts')
      //   .child(
      //     S.documentTypeList(POST_SCHEMA_TYPE).title('All Posts')
      //   ),
      
      // S.divider(), // A visual separator
      
      // 2. The dynamic list of posts separated by their status
      // ...createWorkflowListItems(S, context),
      ...createWorkflowListItems(S),

      S.divider().title('Related'),
      
      // Include all other document types (like Category, Author) below the posts
      // and filter out the 'post' type itself to prevent duplication
      ...S.documentTypeListItems().filter(
        listItem => !(listItem.getId() === POST_SCHEMA_TYPE)
      ),
    ]);

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// import {typegen} from 'sanity/ty'
import {schemaTypes} from './schemaTypes'
import { resolveDocumentActions } from './utilities/resolve-document-actions'
import { postWorkflowStructure } from './utilities/post-workflow-structure'

export default defineConfig({
  title: 'GRX',

  projectId: 'd8f0naws',
  dataset: 'production',

  plugins: [
    structureTool({
      // Set the custom structure here
      structure: postWorkflowStructure,
    }),
    visionTool(),
    // typegen({
    //   // Your frontend source code
    //   // source: ['../src'],
    // }),
  ],

  document: {
    actions: resolveDocumentActions,
  },

  schema: {
    types: schemaTypes,
  },
})

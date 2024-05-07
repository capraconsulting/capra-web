import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'project-name',
  title: 'Project Name',
  projectId,
  dataset,
  plugins: [
    codeInput({
      codeModes: [
        {
          name: 'vue',
          loader: () => import('@codemirror/lang-vue').then(({vue}) => vue()),
        },
      ],
    }),
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),

    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

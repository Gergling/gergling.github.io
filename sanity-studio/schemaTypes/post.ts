import {defineField, defineType} from 'sanity'
import { ChecklistItem } from '../../src/libs/sanity/sanity.types';
import { SURVEYS } from '../constants';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      // TODO: Default?
      validation: rule => rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Idea', value: 'idea' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ready', value: 'ready' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'idea',
      validation: Rule => Rule.required(),
    }),
    // TODO: Need more from the summary image.
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'ready',
    }),
    defineField({
      name: 'standard',
      title: 'Standard',
      type: 'string',
      options: {
        list: [
          { title: 'Incomplete', value: 'incomplete' },
          { title: 'Ok', value: 'ok' },
          { title: 'Good', value: 'good' },
          { title: 'Excellent', value: 'excellent' },
          { title: 'Perfect', value: 'perfect' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'incomplete',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'editorialChecklist',
      title: 'Editorial Checklist',
      type: 'array',
      of: [
        // Specify that this array can only contain items of the checklistItem type
        { type: 'checklistItem' } 
      ],
      description: 'Use this checklist to track required steps before publishing.',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'survey',
      title: 'Survey',
      type: 'string',
      options: {
        list: SURVEYS.map(({ name, label }) => ({ title: label, value: name })),
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'mainImage',
      checklist: 'editorialChecklist',
      standard: 'standard',
    },
    prepare(selection) {
      const { subtitle, checklist, standard } = selection;
      const completed = (checklist as ChecklistItem[]).filter((item) => item.isComplete === true).length;
      const progress = checklist ? `Progress: ${completed}/${checklist.length}` : false;
      const description = [`Standard: ${standard}`, progress].filter(Boolean).join(' - ');
      return {
        ...selection,
        subtitle: subtitle && `by ${subtitle}`,
        description
      };
    },
  },
})

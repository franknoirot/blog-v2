import remarkFootnotes from 'remark-footnotes'
import remarkPrism from 'remark-prism'
import remarkExternalLinks from 'remark-external-links'
// import remarkObsidian from 'remark-obsidian'
import remarkObsidianLinks from './lib/remarkObsidianLinks'
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
// import { parseObsidianLinks } from './lib/markdown'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md*`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    created: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    updated: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    category: {
      type: 'enum',
      options: ['technology', 'culture'],
      default: 'technology',
      description: `The area of interest of this piece. "Seedlings" are rough thoughts that aren't fully formed yet.`,
    },
    growthStage: {
      type: 'enum',
      options: ['seedling', 'budding', 'evergreen'],
      default: 'seedling',
      description: `How developed the idea is.`,
    },
    description: {
      type: 'string',
      description: 'The metadata description of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.sourceFileName.slice(0, post._raw.sourceFileName.lastIndexOf( '.'))}`,
    },
  },
}))

export const Book = defineDocumentType(() => ({
    name: 'Book',
    filePathPattern: `books/**/*.md*`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'Title of the book',
            required: true,
        },
        subtitle: {
            type: 'string',
            description: 'Subtitle of the book, usually after a colon',
            required: false,
        },
        coverImg: {
            type: 'string',
            description: 'Filename and extension of cover image within _assets folder',
            required: true,
        },
        author: {
            type: 'string',
            description: 'Author of the book. For now also list any other authors here',
            required: false,
        },
        editor: {
            type: 'string',
            description: 'Editor of the book. Comma separate any additional editors',
            required: false,
        },
        publisher: {
            type: 'string',
            description: 'Publishing company of the owned edition.',
            required: false,
        },
        publishLocation: {
            type: 'string',
            description: 'Publishing location of the owned edition.',
            required: false,
        },
        firstPublished: {
            type: 'number',
            description: 'Year of first publication',
            required: false,
        },
        publishDate: {
            type: 'number',
            description: 'Year of owned published copy',
            required: true,
        },
        edition: {
            type: 'string',
            description: 'Edition name of owned published copy',
            required: false,
        },
        category: {
          type: 'enum',
          options: [
            'Fiction',
            'Nonfiction',
            'Memoir',
            'History',
            'Drama',
            'Essays',
            'Poetry',
            'Periodical',
            'Biography',
          ],
          default: 'Nonfiction',
          description: `The category of writing the work falls under`,
          required: false,
        },
        language: {
            type: 'string',
            description: 'Two-character code of language of publication',
            default: 'en',
            required: false,
        },
        translator: {
            type: 'string',
            description: 'Name of translator if published',
            required: false,
        },
        format: {
            type: 'string',
            description: 'Format of publication, usually "Printed Book" or "Digital Book"',
            default: 'Printed Book',
            required: false,
        },
        coverType: {
            type: 'string',
            description: 'Cover of book if printed `format`',
            default: 'Paperback',
            required: false,
        },
        pages: {
          type: 'number',
          description: 'Number of pages in owned published copy',
          required: false,
        },
        locId: {
          type: 'string',
          description: 'Library Congress ID of work',
          required: false,
        },
        isbn: {
          type: 'string',
          description: 'ISBN of owned edition',
          required: false,
        },
        issn: {
          type: 'string',
          description: 'ISSN of owned edition',
          required: false,
        },
        tags: {
          type: 'string',
          description: 'Comma-separated list of tags',
          required: false,
        },
        isBorrowed: {
          type: 'boolean',
          description: 'Is the book currently checked out (should be documented in `borrowedBy`)',
          required: false,
        },
        borrowedBy: {
          type: 'string',
          description: 'Who the book is currently checked out by (if filled, `isBorrowed` should be `true`)',
          required: false,
        },
        rating: {
          type: 'number',
          description: 'Personal rating of the book 1-5',
          required: false,
        },
        status: {
          type: 'enum',
          options: [
            'Read',
            'Unread',
            'Reading',
          ],
          default: 'Unread',
          description: 'Has the book been read',
        },
        created: {
          type: 'date',
          description: 'The date of the post',
          required: true,
        },
        updated: {
          type: 'date',
          description: 'The date of the post',
          required: true,
        },
    },
    computedFields: {
        url: {
          type: 'string',
          resolve: (book) => `/books/${book._raw.sourceFileName.slice(0, book._raw.sourceFileName.lastIndexOf('.'))}`,
        },
    },
}))


export const NowUpdate = defineDocumentType(() => ({
  name: 'NowUpdate',
  filePathPattern: `now/*.md*`,
  fields: {
      title: {
          type: 'string',
          description: 'Title of the life update',
          required: true,
      },
  },
}))


export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.md*`,
  contentType: 'mdx',
  fields: {
      title: {
          type: 'string',
          description: 'Meta title of the page.',
          required: true,
      },
      description: {
          type: 'string',
          description: 'Meta description of the page.',
          required: true,
      },
      hidden: {
        type: 'boolean',
        description: 'Should this page be prevented from being indexed by search engines?',
        default: false,
        required: false,
    },
  },
  computedFields: {
      url: {
        type: 'string',
        resolve: (page) => `/${page._raw.sourceFileName.slice(0, page._raw.sourceFileName.lastIndexOf('.'))}`,
      },
  },
}))

const HSL = defineNestedType(() => ({
  name: 'HSL',
  required: true,
  description: 'HSL color that is the base of the theme for this project',
  fields: {
    h: {
      type: 'number',
      required: true,
      description: 'Hue',
    },
    s: {
      type: 'number',
      required: true,
      description: 'Saturation',
    },
    l: {
      type: 'number',
      required: true,
      description: 'Lightness',
    },
  },
}))


export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.md*`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    organization: {
      type: 'string',
      description: 'The organization or client the work was built for.',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Your role on the project.',
      required: true,
    },
    created: {
      type: 'date',
      description: 'The start date of the project.',
      required: true,
    },
    updated: {
      type: 'date',
      description: 'The date this project was last worked on.',
      required: true,
    },
    tools: {
      type: 'string',
      description: 'The tools used on the project. Currently has to be a string but should be a list.',
      required: true,
    },
    image: {
      type: 'string',
      description: 'Filename of the image within the `/public/_assets/` directory where this image sits.',
      required: true,
    },
    color: {
      type: 'nested',
      of: HSL,
    }
  },
  computedFields: {
      url: {
        type: 'string',
        resolve: (page) => `/projects/${page._raw.sourceFileName.slice(0, page._raw.sourceFileName.lastIndexOf('.'))}`,
      },
  },
}))

export default makeSource({
    contentDirPath: 'vault/public',
    documentTypes: [
        Post,
        Book,
        NowUpdate,
        Page,
        Project,
    ],
    markdown: {
      remarkPlugins: [
        remarkFootnotes, 
        [remarkPrism, { transformInlineCode: true }],
        remarkExternalLinks
      ],
    },
    mdx: {
      remarkPlugins: [
        remarkFootnotes,
        [remarkPrism, { transformInlineCode: true }],
        remarkExternalLinks,
        remarkObsidianLinks
      ],
    },
})
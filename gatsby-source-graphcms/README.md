# gatsby-source-graphcms

> The official Gatsby source plugin for GraphCMS projects 🚀

• [Demo](https://gatsby-source-graphcms.vercel.app) • [`gatsby-starter-graphcms-blog`](https://github.com/GraphCMS/gatsby-starter-graphcms-blog)

## Installation

```shell
yarn add gatsby-source-graphcms
```

## Configuration

> We recommend using environment variables with your GraphCMS `token` and `endpoint` values. You can learn more about using environment variables with Gatsby [here](https://www.gatsbyjs.org/docs/environment-variables).

### Basic

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
      },
    },
  ],
}
```

### Authorization

You can also provide an auth token using the `token` configuration key. This is necessary if your GraphCMS project is **not** publicly available, or you want to scope access to a specific content stage (i.e. draft content).

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
  ],
}
```

### Options

| Key                   | Type                                     | Description                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`            | _String_ (**required**)                  | The endpoint URL for the GraphCMS project. This can be found in the [project settings UI](https://graphcms.com/docs/guides/concepts/apis#working-with-apis).                                                                                                                                                                           |
| `token`               | String                                   | If your GraphCMS project is **not** publicly accessible, you will need to provide a [Permanent Auth Token](https://graphcms.com/docs/reference/authorization) to correctly authorize with the API. You can learn more about creating and managing API tokens [here](https://graphcms.com/docs/guides/concepts/apis#working-with-apis). |
| `typePrefix`          | String _(Default: `GraphCMS_`)\_         | The string by which every generated type name is prefixed with. For example, a type of `Post` in GraphCMS would become `GraphCMS_Post` by default. If using multiple instances of the source plugin, you **must** provide a value here to prevent type conflicts.                                                                      |
| `downloadLocalImages` | Boolean _(Default: `false`)_             | Download and cache GraphCMS image assets in your Gatsby project. [Learn more](#downloading-local-image-assets).                                                                                                                                                                                                                        |
| `buildMarkdownNodes`  | Boolean _(Default: `false`)_             | Build markdown nodes for all [`RichText`](https://graphcms.com/docs/reference/fields/rich-text) fields in your GraphCMS schema. [Learn more](#using-markdown-nodes).                                                                                                                                                                   |
| `fragmentsPath`       | String _(Default: `graphcms-fragments`)_ | The local project path where generated query fragments are saved. This is relative to your current working directory. If using multiple instances of the source plugin, you **must** provide a value here to prevent type and/or fragment conflicts.                                                                                   |
| `locales`             | [String] _(Default: `['en']`)_           | An array of locale key strings from your GraphCMS project. [Learn more](#querying-localised-nodes). You can read more about working with localisation in GraphCMS [here](https://graphcms.com/docs/guides/concepts/i18n).                                                                                                              |
| `stages`              | [String] _(Default: `['PUBLISHED']`)_    | An array of Content Stages from your GraphCMS project. [Learn more](#querying-from-content-stages). You can read more about using Content Stages [here](https://graphcms.com/guides/working-with-content-stages).                                                                                                                      |

## Features

- [Querying localised nodes](#querying-localised-nodes)
- [Querying from content stages](#querying-from-content-stages)
- [Downloading local image assets](#downloading-local-image-assets)
- [Using markdown nodes](#using-markdown-nodes)
- [Working with query fragments](#working-with-query-fragments)

### Querying localised nodes

If using GraphCMS localisation, this plugin provides support to build nodes for all provided locales.

Update your plugin configuration to include the `locales` key.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        locales: ['en', 'de'],
      },
    },
  ],
}
```

To query for nodes for a specific locale, use the `filter` query argument.

```gql
{
  enProducts: allGraphCmsProduct(filter: { locale: { eq: en } }) {
    nodes {
      name
    }
  }
}
```

Check out the [demo source](https://github.com/GraphCMS/gatsby-source-graphcms/tree/main/demo) for an example of a localisation implementation.

### Querying from content stages

This plugin provides support to build nodes for entries from multiple Content Stages.

Update your plugin configuration to include the `stages` key.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        stages: ['DRAFT', 'PUBLISHED'],
      },
    },
  ],
}
```

To query for nodes from a specific Content Stage, use the `filter` query argument.

```gql
{
  enProducts: allGraphCmsProduct(filter: { stage: { eq: DRAFT } }) {
    nodes {
      name
    }
  }
}
```

### Downloading local image assets

This source plugin provides the option to download and cache GraphCMS assets in your Gatsby project. This enables you to use [`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image), for image loading optimizations, with your GraphCMS image assets.

To enable this, add `downloadLocalImages: true` to your plugin configuration.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        downloadLocalImages: true,
      },
    },
  ],
}
```

This adds a `localFile` field to the `GraphCMS_Asset` type which resolves to the file node generated at build by [`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem).

You can then use the fragments from [`gatsby-transformer-sharp`](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp) as a part of your GraphQL query.

```gql
{
  allGraphCmsAsset {
    nodes {
      localFile {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
```

For more information on using `gatsby-image`, please see the [documentation](https://www.gatsbyjs.org/packages/gatsby-image/?=#how-to-use).

### Using markdown nodes

This source plugin provides the option to build markdown nodes for all `RichText` fields in your GraphCMS schema, which in turn can be used with [MDX](https://mdxjs.com).

To enable this, add `buildMarkdownNodes: true` to your plugin configuration.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        buildMarkdownNodes: true,
      },
    },
  ],
}
```

Enabling this option adds a `markdownNode` nested field to all `RichText` fields on the generated Gatsby schema.

#### Usage with `gatsby-plugin-mdx`

These newly built nodes can be used with [`gatsby-plugin-mdx`](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx) to render markdown from GraphCMS.

Once installed, you will be able to query for `MDX` fields using a query similar to the one below.

```gql
{
  allGraphCmsPost {
    nodes {
      id
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
    }
  }
}
```

Check out the [demo source](https://github.com/GraphCMS/gatsby-source-graphcms/tree/main/demo) for an example of a full MDX implementation.

### Working with query fragments

The source plugin will generate and save GraphQL query fragments for every node type. By default, they will be saved in a `graphcms-fragments` directory at the root of your Gatsby project. This can be configured:

> If using multiple instances of the source plugin, you **must** provide a value to prevent type and/or fragment conflicts.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        fragmentsPath: 'my-query-fragments',
      },
    },
  ],
}
```

The generated fragments are then read from the project for subsequent builds. It is recommended that they are checked in to version control for your project.

Should you make any changes or additions to your GraphCMS schema, you will need to update the query fragments accrdingly. Alternatively they will be regnerated on a subsequent build after removing the directory from your project.

#### Modifying query fragments

In some instances, you may need modify query fragments on a per type basis. This may involve:

- Removing unrequired fields
- Adding new fields with arguments as an aliased field

For example, adding a `featuredCaseStudy` field:

```graphql
fragment Industry on Industry {
  featuredCaseStudy: caseStudies(where: { featured: true }, first: 1)
}
```

Field arguments cannot be read by Gatsby from the GraphCMS schema. Instead we must alias any required usages as aliased fields. In this example, the `featuredCaseStudy` field would then be available in our Gatsby queries:

```graphql
{
  allGraphCmsIndustry {
    nodes {
      featuredCaseStudy {
        ...
      }
    }
  }
}
```

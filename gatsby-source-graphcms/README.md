# gatsby-source-graphcms

> The official Gatsby source plugin for GraphCMS projects 🚀

⚠️ **THIS PLUGIN IS IN BETA. PLEASE USE AT YOUR OWN RISK** ⚠️

• [Demo](https://gatsby-source-graphcms.vercel.app) • [`gatsby-starter-graphcms-blog`](https://github.com/GraphCMS/gatsby-starter-graphcms-blog)

## Installation

```shell
yarn add gatsby-source-graphcms@next
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

- `endpoint` _String_ (**required**)

  - The endpoint URL for the GraphCMS project. This can be found in the [project settings UI](https://graphcms.com/docs/guides/concepts/apis#working-with-apis).

- `token` _String_

  - If your GraphCMS project is **not** publicly accessible, you will need to provide a [Permanent Auth Token](https://graphcms.com/docs/reference/authorization) to correctly authorize with the API. You can learn more about creating and managing API tokens [here](https://graphcms.com/docs/guides/concepts/apis#working-with-apis).

- `downloadLocalImages` _Boolean_ (default value: `false`)

  - Download and cache GraphCMS image assets in your Gatsby project. [Learn more](#downloading-local-image-assets).

- `buildMarkdownNodes` _Boolean_ (default value: `false`)

  - Build markdown nodes for all [`RichText`](https://graphcms.com/docs/reference/fields/rich-text) fields in your GraphCMS schema. [Learn more](#using-markdown-nodes).

- `fragmentsPath` _String_ (default value: `graphcms-fragments`)

  - The local project path where generated query fragments are saved. This is relative to your current working directory.

- `locales` _[String]_ (default value: `['en']`)

  - An array of locale key strings from your GraphCMS project. [Learn more](#querying-localised-nodes). You can read more about working with localisation in GraphCMS [here](https://graphcms.com/docs/guides/concepts/i18n).

## Querying localised nodes

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

Check out the [demo source](https://github.com/GraphCMS/gatsby-source-graphcms/tree/next/demo) for an example of a localisation implementation.

## Downloading local image assets

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

## Using markdown nodes

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

### Usage with `gatsby-plugin-mdx`

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

Check out the [demo source](https://github.com/GraphCMS/gatsby-source-graphcms/tree/next/demo) for an example of a full MDX implementation.

# gatsby-source-graphcms

> The official Gatsby source plugin for GraphCMS projects 🚀

## Installation

```shell
yarn add gatsby-source-graphcms
```

## Configuration

> We recommend using environment variables with your GraphCMS token and endpoint values. You can learn more about using environment variables with gatsby [here](https://www.gatsbyjs.org/docs/environment-variables/).

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

You can then use the fragments from [`gatsby-transformer-sharp`](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/) as a part of your GraphQL query.

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

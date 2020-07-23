# `gatsby-source-graphcms`

> A Gatsby source plugin for GraphCMS projects 🚀

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

  - The endpoint URL for the GraphCMS project. This can be find in the [project settings UI](https://graphcms.com/docs/guides/concepts/apis#working-with-apis).

- `token` _String_

  - If your GraphCMS project is **not** publicly accessible, you will need to provide a [Permanent Auth Token](https://graphcms.com/docs/reference/authorization) to correctl authorize with the API. You can learn more about creating and manageing API tokens [here](https://graphcms.com/docs/guides/concepts/apis#working-with-apis).

- `downloadLocalImages` _Boolean_ (default value: `false`)

  - Download and cache GraphCMS image assets in your Gatsby project. This enables you to use Gatsby transformers (and [`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image)) with your GraphCMS image assets.

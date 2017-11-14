# gatsby-source-graphcms

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Source plugin for pulling data into [Gatsby](https://github.com/gatsbyjs) from a [GraphCMS](https://graphcms.com) endpoint.

#### [Working example: @hmeissner/gatsby-graphcms-testing](https://github.com/hmeissner/gatsby-graphcms-testing)

## Install

Once publishied to npm, you will be able to
`npm install --save gatsby-source-graphcms`

For now during alpha-testing phase you need to build the plugin,
following the testing steps below.

## Gatsby's GraphCMS plugin testing

1. `cd` to your Gatsby install, `mkdir plugins` if it does not
    exist yet and `cd` into it.
1. Your path should now be something like
    `~/code/graphcms/myKillerGatsbySite/plugins/`
1. `git clone https://github.com/GraphCMS/gatsby-source-graphcms.git`
1. `cd gatsby-source-graphcms`
1. `yarn && yarn build`
    Swap `yarn build` for `yarn watch` in plugin's directory for
    auto-rebuilding the plugin after you make changes to it—only
    during development, remember to build the plugin pre-deployment.
1. Make sure plugin is referenced in your Gatsby config, as in
    the example below.
1. From there you can `cd ../.. && yarn && yarn develop` to test.

### Every time you rebuild the plugin, gatsby's development server has to be restarted for the changes to be reflected in your test environment.


## Usage
*In your gatsby config...*
```javascript
plugins: [
  /*
   * Gatsby's data processing layer begins with “source”
   * plugins. Here the site sources its data from the GraphCMS endpoint
   */
  {
    resolve: `gatsby-source-graphcms`,
    options: {
      endpoint: `graphql_endpoint`,
      token: `graphql_token`,
      query: `{
          allArtists {
            id
            name
          }
      }`,
    },
  }
],
```
Use an `.env` file or set environment variables directly to access the GraphCMS endpoint and token. This avoids committing potentially sensitive data.

## Plugin options
|              |                                                          |
|-------------:|:---------------------------------------------------------|
| **endpoint** | indicates the endpoint to use for the graphql connection |
| **token**    | The API access token. Optional if the endpoint is public |
| **query**    | The GraphQL query to execute against the endpoint        |

## How to query : GraphQL

Let's say you have a GraphQL type called `Artist`. You would query all artists like so:

```graphql
{
   allArtists {
      id
      name
      slug
      picture {
        id
        url
        height
        width
      }
      records {
        id
        title
      }
    }
}
```

## Current limitations

#### `length` must be aliased

If you have a field named `length` it must be aliased to something else like so: `myLength: length`. This is due to internal limitations of gatsby's graphql.

#### Does not support over 1000 records per `__type`

A way to automatically paginate and fetch all data is being worked on, but this is a limitation on the graph.cool backend.

#### Does not support localization

GraphCMS recently implemented localization, which provides an interesting challenge for the plugin.

#### Does not support automatic \_\_meta count association
<!-- Talk about this more -->

## Discussion
All of the aforementioned limitations are under active discussion and development in the Gatsby channel on the GraphCMS Slack group. [Join us!](https://graphcms.slack.com/) Contact a contributor for an invite if needed.

## Other TODOs

1. Implement support for relationships/embedded fields
1. Implement mapping feature for transformation plugins, like the MongoDB plugin
1. Explore schema stitching and `graphql-tools`

## Contributors

- [@redmega](https://github.com/redmega) Angel Piscola
- [@rafacm](https://github.com/rafacm) Rafael Cordones
- [@hmeissner](https://github.com/hmeissner) Hugo Meissner
- [@rdela](https://github.com/rdela) Ricky de Laveaga

…[and you](https://github.com/GraphCMS/gatsby-source-graphcms/issues)?

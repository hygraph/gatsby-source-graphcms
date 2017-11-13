# gatsby-source-graphcms

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
Use a `.env` file or set environment variables directly to access the GraphCMS endpoint and token. This avoids committing potentially sensitive data.

## Plugin options
|              |                                                          |
|-------------:|:---------------------------------------------------------|
| **endpoint** | indicates the endpoint to use for the graphql connection |
| **token**    | The API access token. Optional if the endpoint is public |
| **query**    | The GraphQL query to execute against the endpoint        |

## How to query : GraphQL

Let's say you have a GraphQL type called `Post`. You would query it like so:

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

### Fields which have sub selections do not work

This one pertains to the introspection metaquery method.

Example:
```
    Artist {
      picture {
        url
    ...
```

The metaQuery currently used is not capable of finding url from
the above query, which will cause the query that fetches all
data to fail. It will have to be modified. It looks like it will
be a bit more difficult to find that url and add it to the query,
as it might require making a __type query for each field of a
type that has subfields and then modifying the final query
before firing it. Related errors can be seen at:
[redmega/example_05_static_site_generation_with_gatsby](https://github.com/redmega/example_05_static_site_generation_with_gatsby)

Does not support datasets over 1000 items per type, localization, or automatic _meta count association, although all are under active discussion in the Gatsby channel on the GraphCMS Slack group. [Join us!](https://graphcms.slack.com/) Contact a contributor for an invite if needed.

## TODOs

1. Implement support for relationships/embedded fields
1. Implement mapping feature for transformation plugins, like the MongoDB plugin
1. Explore schema stitching and `graphql-tools`

## Contributors

- [@redmega](https://github.com/redmega/) Angel Piscola
- [@rafacm](https://github.com/rafacm) Rafael Cordones
- [@hmeissner](https://github.com/hmeissner) Hugo Meissner
- [@rdela](https://github.com/rdela) Ricky de Laveaga

…[and you](https://github.com/GraphCMS/gatsby-source-graphcms/issues)?

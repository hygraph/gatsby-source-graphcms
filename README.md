# gatsby-source-graphcms

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Source plugin for pulling data into [Gatsby](https://github.com/gatsbyjs) from a
[GraphCMS](https://graphcms.com) endpoint.

#### [Working example: @hmeissner/gatsby-graphcms-testing](https://github.com/hmeissner/gatsby-graphcms-testing)

## Install

Once publishied to npm, you will be able to `npm install --save
gatsby-source-graphcms`

For now during alpha-testing phase you need to build the plugin, following the
testing steps below.

## Gatsby's GraphCMS plugin testing

1. `cd` to your Gatsby install, `mkdir plugins` if it does not exist yet and
   `cd` into it.
1. Your path should now be something like
   `~/code/graphcms/myKillerGatsbySite/plugins/`
1. `git clone https://github.com/GraphCMS/gatsby-source-graphcms.git`
1. `cd gatsby-source-graphcms`
1. `yarn && yarn build` Swap `yarn build` for `yarn watch` in plugin's directory
   for auto-rebuilding the plugin after you make changes to it—only during
   development, remember to build the plugin pre-deployment.
1. Make sure plugin is referenced in your Gatsby config, as in the example
   below.
1. From there you can `cd ../.. && yarn && yarn develop` to test.

### Every time you rebuild the plugin, you must restart Gatsby’s development server to reflect the changes in your test environment.

## Usage

_In your gatsby config..._

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

Use an `.env` file or set environment variables directly to access the GraphCMS
endpoint and token. This avoids committing potentially sensitive data.

## Plugin options

|              |                                                          |
| -----------: | :------------------------------------------------------- |
| **endpoint** | indicates the endpoint to use for the graphql connection |
|    **token** | The API access token. Optional if the endpoint is public |
|    **query** | The GraphQL query to execute against the endpoint        |

## How to query : GraphQL

Let's say you have a GraphQL type called `Artist`. You would query all artists
like so:

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

If you have a field named `length` it must be aliased to something else like so:
`myLength: length`. This is due to internal limitations of Gatsby’s GraphQL
implementation.

#### Does not support over 1000 records per `__type`

A way to automatically paginate and fetch all data is being worked on, but this
is a limitation on the [graph.cool](https://www.graph.cool) backend. See
[Graphcool Forum — Query without pagination limits](https://www.graph.cool/forum/t/query-without-pagination-limits/845)
and
[Graphcool Docs — Query API — Pagination](https://www.graph.cool/docs/reference/graphql-api/query-api-nia9nushae/#pagination)

> Limitations Note that a maximum of 1000 nodes can be returned per pagination
> field. If you need to query more nodes than that, you can use first and skip
> to seek through the different pages. You can also include multiple versions of
> the same field with different pagination parameter in one query using GraphQL
> Aliases.

#### Does not support automatic __meta count association

Related to pagination and 1K limitation, if you want to show an accurate total
count of the result set without wanting to aggregate on the client side,
especially with large sets, you might want to use the auto-generated meta fields
with `count`. A way to automatically extract the meta fields from query and use
`createNodeFields` to add the meta fields to their corresponding nodes is being
worked on.

If in the config query:

```
allArticles {
  id
}
__allArticlesMeta {
  count
}
```

We would instead move the `_allArticlesMeta` inside `allArticles` (as we don’t
need nor want any nodes from meta fields) and then query the total articles
count like so in the page level:

```
allArticles {
  __meta {
    count
  }
}
```

For now we advise using `this.props.data.articles.edges.length` instead because
Gatsby tries to create nodes out of top level fields which does not make sense
in this case, bearing in mind pagination limitations described above.

#### Does not support localization

[GraphCMS recently implemented localization](https://graphcms.com/blog/introducing-content-localization),
which provides an interesting challenge for the plugin. Work in Gatsby on
“[GeoIP and Language-based redirects](https://github.com/gatsbyjs/gatsby/pull/2890)”
is ongoing with some really nice
[extras for those who host with Netlify](https://www.netlify.com/docs/redirects/#geoip-and-language-based-redirects).

## Discussion

All of the aforementioned limitations are under active discussion and
development in the Gatsby channel on the GraphCMS Slack group.
[Join us!](https://slack.graphcms.com/)

## Other TODOs

1. Implement support for relationships/embedded fields
1. Implement mapping feature for transformation plugins, like
   [the MongoDB plugin](https://www.gatsbyjs.org/packages/gatsby-source-mongodb/#mapping-mediatype-feature)
1. Explore schema stitching —
   [Apollo GraphQL Tools Docs](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html),
   [blog post](https://dev-blog.apollodata.com/graphql-schema-stitching-8af23354ac37)
   — and [graphql-tools](https://github.com/apollographql/graphql-tools)

## Contributors

* [@redmega](https://github.com/redmega) Angel Piscola
* [@rafacm](https://github.com/rafacm) Rafael Cordones
* [@hmeissner](https://github.com/hmeissner) Hugo Meissner
* [@rdela](https://github.com/rdela) Ricky de Laveaga

…[and you](https://github.com/GraphCMS/gatsby-source-graphcms/issues)?

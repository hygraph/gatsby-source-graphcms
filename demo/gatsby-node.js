const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data } = await graphql(`
    {
      products: allGraphCmsProduct {
        nodes {
          id
          name
          price
          slug
        }
      }
    }
  `)

  data.products.nodes.forEach((product) => {
    createPage({
      component: path.resolve(`src/templates/product-page.js`),
      context: {
        id: product.id,
        product,
      },
      path: `/products/${product.slug}`,
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Product: {
      formattedPrice: {
        type: 'String',
        resolve: (source) => {
          return new Intl.NumberFormat('en-US', {
            currency: 'USD',
            style: 'currency',
          }).format(source.price)
        },
      },
    },
  }

  createResolvers(resolvers)
}

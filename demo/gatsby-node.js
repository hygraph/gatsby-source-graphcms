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

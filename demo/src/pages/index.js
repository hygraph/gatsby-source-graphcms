import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const IndexPage = ({ data: { products } }) => {
  return (
    <ul className="gap-6 grid grid-cols-1 max-w-6xl md:grid-cols-3 mx-auto">
      {products.nodes.map((product) => {
        const [mainImage] = product.images

        return (
          <li key={product.id} className="bg-white rounded-lg shadow">
            <Link to={`/${product.locale}/products/${product.slug}`}>
              <div className="flex-1 flex flex-col p-8">
                {mainImage && (
                  <GatsbyImage image={getImage(mainImage)} alt={product.name} />
                )}
                <h2 className="my-4 text-gray-900 text-xl leading-5 font-medium">
                  {product.name}
                </h2>
                <p className="font-semibold text-purple-600">
                  {product.formattedPrice}
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const query = graphql`
  query PageQuery {
    products: allGraphCmsProduct(
      filter: { locale: { eq: en }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        formattedPrice
        id
        images {
          gatsbyImageData(layout: FULL_WIDTH)
        }
        locale
        name
        slug
      }
    }
  }
`

export default IndexPage

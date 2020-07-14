import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const IndexPage = ({ data: { products } }) => {
  return (
    <div className="gap-6 grid max-w-6xl md:grid-cols-3 mx-auto px-4">
      {products.nodes.map((product) => (
        <div key={product.slug}>
          {product.image && (
            <Img fluid={product.image.localFile.childImageSharp.fluid} />
          )}
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query PageQuery {
    products: allGraphCmsProduct {
      nodes {
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        name
        slug
      }
    }
  }
`

export default IndexPage

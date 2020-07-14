import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const IndexPage = ({ data: { products } }) => {
  return products.nodes.map((product) => (
    <div>
      {product.image && (
        <Img fluid={product.image.localFile.childImageSharp.fluid} />
      )}
      <p key={product.id}>{product.name}</p>
    </div>
  ))
}

export const query = graphql`
  query PageQuery {
    products: allGraphCmsProduct {
      nodes {
        id
        name
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage

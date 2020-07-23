import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductPage = ({ data: { productImage }, pageContext: { product } }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      {productImage && (
        <Img fluid={productImage.localFile.childImageSharp.fluid} />
      )}
    </div>
  )
}

export const query = graphql`
  query ProductImageQuery($id: String!) {
    productImages: graphCmsAsset(
      productImages: { elemMatch: { id: { eq: $id } } }
    ) {
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default ProductPage

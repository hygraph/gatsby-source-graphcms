import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const ProductPage = ({ data: { productImages }, pageContext: { product } }) => {
  const [mainImage] = productImages.nodes

  return (
    <>
      <h1 className="my-4 text-gray-900 text-3xl leading-5 font-medium">Product with GraphCMS CDN images</h1>
      <div className="bg-white flex flex-1 flex-col md:flex-row p-8 rounded-lg shadow">
        <div className="flex flex-1 flex-col">
          <h2 className="my-4 text-gray-900 text-3xl leading-5 font-medium">
            {product.name}
          </h2>
          <p className="font-semibold text-purple-600 text-lg">
            {product.formattedPrice}
          </p>
          {product.description && (
            <React.Fragment>
              <hr className="my-4" />
              {product.description.markdownNode && <MDXRenderer>
                {product.description.markdownNode.childMdx.body}
              </MDXRenderer>}
            </React.Fragment>
          )}
        </div>
        {mainImage && (
          <div className="w-full md:w-3/5">
            <GatsbyImage image={getImage(mainImage)} alt={product.name} />
          </div>
        )}
      </div>
      <h1 className="my-4 text-gray-900 text-3xl leading-5 font-medium">Product with locally served images</h1>
      <div className="bg-white flex flex-1 flex-col md:flex-row p-8 rounded-lg shadow">
        <div className="flex flex-1 flex-col">
          <h2 className="my-4 text-gray-900 text-3xl leading-5 font-medium">
            {product.name}
          </h2>
          <p className="font-semibold text-purple-600 text-lg">
            {product.formattedPrice}
          </p>
          {product.description && (
            <React.Fragment>
              <hr className="my-4" />
              {product.description.markdownNode && <MDXRenderer>
                {product.description.markdownNode.childMdx.body}
              </MDXRenderer>}
            </React.Fragment>
          )}
        </div>       
        {mainImage && (
          <>
            <div className="w-full md:w-3/5">
              <GatsbyImage image={getImage(mainImage.localFile)} alt={product.name} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export const query = graphql`
  query ProductImageQuery($id: String!) {
    productImages: allGraphCmsAsset(
      filter: { productImages: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        gatsbyImageData(layout: FULL_WIDTH)
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export default ProductPage

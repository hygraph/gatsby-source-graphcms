require('dotenv').config()

module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-postcss',
    { 
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      }
    },
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        buildMarkdownNodes: true,
        endpoint:
          process.env.HYGRAPH_ENDPOINT ||
          'https://api-eu-central-1.hygraph.com/v2/ckclvjtet0f0901z69og3f3gm/master',
        locales: ['en', 'de'],
        stages: ['DRAFT', 'PUBLISHED'],
        downloadLocalImages: true
      },
    },
    'gatsby-plugin-image',
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {
          quality: 100,
          formats: ["auto", "webp"],
          placeholder: "blurred",
          blurredOptions: {
            width: 80,
          },
          webpOptions: {
            quality: 100,
            alphaQuality: 100,
            lossless: true,
            smartSubsample: true
          }
        },
        // Set to false to allow builds to continue on image errors
        failOnError: true
      },
    },
    "gatsby-transformer-sharp",
  ],
}

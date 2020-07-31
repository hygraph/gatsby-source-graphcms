require('dotenv').config()

module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        buildMarkdownNodes: true,
        downloadLocalImages: true,
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
    'gatsby-transformer-sharp',
  ],
}

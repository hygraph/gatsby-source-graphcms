require('dotenv').config()

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        downloadLocalImages: true,
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
    'gatsby-transformer-sharp',
  ],
}

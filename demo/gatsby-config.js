require('dotenv').config()

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        downloadLocalImages: true,
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
  ],
}

require('dotenv').config()

module.exports = {
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-mdx',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        buildMarkdownNodes: true,
        endpoint:
          process.env.HYGRAPH_ENDPOINT ||
          'https://api-eu-central-1.hygraph.com/v2/ckclvjtet0f0901z69og3f3gm/master',
        locales: ['en', 'de'],
        stages: ['DRAFT', 'PUBLISHED'],
      },
    },
  ],
}

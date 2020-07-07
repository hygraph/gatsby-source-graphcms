const {
  createDefaultQueryExecutor,
  loadSchema,
  generateDefaultFragments,
} = require('gatsby-graphql-source-toolkit')
const pluralize = require('pluralize')

const createSourcingConfig = async (gatsbyApi, { endpoint, token }) => {
  const execute = createDefaultQueryExecutor(endpoint)
  const schema = await loadSchema(execute)

  const nodeInterface = schema.getType('Node')
  const possibleTypes = schema.getPossibleTypes(nodeInterface)

  const gatsbyNodeTypes = possibleTypes.map((type) => ({
    remoteTypeName: type.name,
    remoteIdFields: ['__typename', 'id'],
    queries: `query LIST_${pluralize(type.name).toUpperCase()} { ${pluralize(
      type.name.toLowerCase()
    )}(limit: $limit, skip: $skip) }`,
  }))

  const fragments = generateDefaultFragments({ schema, gatsbyNodeTypes })
}

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const config = await createSourcingConfig(gatsbyApi, pluginOptions)
}

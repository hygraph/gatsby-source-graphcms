const {
  createDefaultQueryExecutor,
  loadSchema,
  generateDefaultFragments,
  compileNodeQueries,
  buildNodeDefinitions,
  createSchemaCustomization,
  sourceAllNodes,
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
    )}(first: $limit, skip: $offset) }`,
  }))

  const fragments = generateDefaultFragments({ schema, gatsbyNodeTypes })

  const documents = compileNodeQueries({
    schema,
    gatsbyNodeTypes,
    customFragments: fragments,
  })

  return {
    gatsbyApi,
    schema,
    execute,
    gatsbyTypePrefix: `GraphCMS_`,
    gatsbyNodeDefs: buildNodeDefinitions({ gatsbyNodeTypes, documents }),
  }
}

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const config = await createSourcingConfig(gatsbyApi, pluginOptions)

  await createSchemaCustomization(config)

  await sourceAllNodes(config)
}

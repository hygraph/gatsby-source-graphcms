const {
  createDefaultQueryExecutor,
  loadSchema,
  generateDefaultFragments,
  compileNodeQueries,
  buildNodeDefinitions,
  createSchemaCustomization,
  sourceAllNodes,
} = require('gatsby-graphql-source-toolkit')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
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

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  getCache,
}) => {
  if (node.remoteTypeName === 'Asset' && node.mimeType.includes('image/')) {
    const fileNode = await createRemoteFileNode({
      url: node.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) node.file = fileNode.id
  }
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type GraphCMS_Asset {
      file: File @link
    }
  `)
}

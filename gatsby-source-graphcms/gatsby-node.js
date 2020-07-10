const {
  wrapQueryExecutorWithQueue,
  loadSchema,
  generateDefaultFragments,
  compileNodeQueries,
  buildNodeDefinitions,
  createSchemaCustomization,
  sourceAllNodes,
} = require('gatsby-graphql-source-toolkit')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const fetch = require('node-fetch')
const pluralize = require('pluralize')

const createSourcingConfig = async (gatsbyApi, { endpoint, token }) => {
  const execute = async ({ operationName, query, variables = {} }) => {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, variables, operationName }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }).then((res) => res.json())
  }
  const schema = await loadSchema(execute)

  const nodeInterface = schema.getType('Node')
  const possibleTypes = schema.getPossibleTypes(nodeInterface)

  const gatsbyNodeTypes = possibleTypes.map((type) => ({
    remoteTypeName: type.name,
    remoteIdFields: ['__typename', 'id'],
    queries: `
      query LIST_${pluralize(type.name).toUpperCase()} { ${pluralize(
      type.name.toLowerCase()
    )}(first: $limit, skip: $offset) }
      query NODE_${type.name.toUpperCase()} { ${type.name.toLowerCase()}(id: $id) }`,
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
    execute: wrapQueryExecutorWithQueue(execute, { concurrency: 10 }),
    gatsbyTypePrefix: `GraphCMS_`,
    gatsbyNodeDefs: buildNodeDefinitions({ gatsbyNodeTypes, documents }),
  }
}

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const config = await createSourcingConfig(gatsbyApi, pluginOptions)

  await createSchemaCustomization(config)

  await sourceAllNodes(config)
}

exports.onCreateNode = async (
  { node, actions: { createNode }, createNodeId, getCache },
  { downloadLocalImages = false }
) => {
  if (
    downloadLocalImages &&
    node.remoteTypeName === 'Asset' &&
    node.mimeType.includes('image/')
  ) {
    const fileNode = await createRemoteFileNode({
      url: node.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) node.localFile = fileNode.id
  }
}

exports.createSchemaCustomization = (
  { actions: { createTypes } },
  { downloadLocalImages = false }
) => {
  if (downloadLocalImages)
    createTypes(`
    type GraphCMS_Asset {
      localFile: File @link
    }
  `)
}

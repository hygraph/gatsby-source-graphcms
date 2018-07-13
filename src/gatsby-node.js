import {GraphQLClient} from 'graphql-request';
import {forEachObjIndexed} from 'ramda';
import {createNodes} from './util';
import {DEBUG_MODE} from './constants';
import {
  keywordsError,
  checkForFaultyFields
} from './faulty-keywords';

const setHeaders = (origin, token) => {
  let headers = {};
  if (origin) {
    headers = Object.assign(headers, {"Origin": origin})
  }
  if (token) {
    headers = Object.assign(headers, {"Authorization": `Bearer ${token}`})
  }
  return Object.keys(headers).length === 0 ? {} : { headers };
};

exports.sourceNodes = async (
  {boundActionCreators, reporter},
  {endpoint, token, query, origin}
) => {
  if (query) {
    const {createNode} = boundActionCreators;
    const client = new GraphQLClient(endpoint, setHeaders(origin, token));
    const userQueryResult = await client.request(query);

    // Keywords workaround
    if (checkForFaultyFields(userQueryResult)) {
      reporter.panic(`gatsby-source-graphcms: ${keywordsError}`);
    }

    if (DEBUG_MODE) {
      const jsonUserQueryResult = JSON.stringify(userQueryResult, undefined, 2);
      console.log(`\ngatsby-source-graphcms: GraphQL query results: ${jsonUserQueryResult}`);
    }
    forEachObjIndexed(createNodes(createNode, reporter), userQueryResult);
  } else {
    reporter.panic(`gatsby-source-graphcms: you need to provide a GraphQL query in the plugin 'query' parameter`);
  }
};

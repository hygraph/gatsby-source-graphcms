import crypto from 'crypto';
import {compose, join, pluck, map, path, forEach} from 'ramda';
import { singular, plural } from 'pluralize';

import {SOURCE_NAME, DEBUG_MODE} from './constants';

// If type ends in a non-vowel, we need to append es. Else s.
export const formatTypeName = t => `all${plural(t)}`;

// Get the type name back from a formatted type name.
export const extractTypeName = t => singular(t.replace(/all/, ''));

// Create the query body
export const surroundWithBraces = c => `{${c}}`;

// Constructs a query for a given type.
export const constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${compose(join(`\n`), pluck(`name`))(type.fields)}
  }
`;

// Composition which assembles the query to fetch all data.
export const assembleQueries = compose(
  surroundWithBraces,
  join(`\n`),
  map(constructTypeQuery),
  path([`__type`, `possibleTypes`])
);

export const createNodes = (createNode, reporter) => (value, key) => {
  forEach(queryResultNode => {
    const {id, ...fields} = queryResultNode;
    const jsonNode = JSON.stringify(queryResultNode);
    const gatsbyNode = {
      id,
      ...fields,
      parent: `${SOURCE_NAME}_${key}`,
      children: [],
      internal: {
        type: extractTypeName(key),
        content: jsonNode,
        contentDigest: crypto.createHash(`md5`).update(jsonNode).digest(`hex`)
      }
    };

    if (DEBUG_MODE) {
      const jsonFields = JSON.stringify(fields);
      const jsonGatsbyNode = JSON.stringify(gatsbyNode);
      reporter.info(`  processing node: ${jsonNode}`);
      reporter.info(`    node id ${id}`);
      reporter.info(`    node fields: ${jsonFields}`);
      reporter.info(`    gatsby node: ${jsonGatsbyNode}`);
    }

    createNode(gatsbyNode);
  }, value);
};

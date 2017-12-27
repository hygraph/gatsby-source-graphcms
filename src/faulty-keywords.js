import {map, filter, compose} from 'ramda';

const keywords = [
  `length`
];

const inlineQuery = query =>
  query.replace(/(\r\n|\n|\r|\s+)/g, ' ');

// ignore if there's a colon behind/ahead of the keyword
const keywordToRegex = keyword =>
  new RegExp(`(?<!:\\s*)\\b${keyword}\\b(?!\\s*:)`);

const checkQuery = inlinedQuery => regex =>
  regex.test(inlinedQuery);

const violations = query => compose(
  filter(checkQuery(query)),
  map(keywordToRegex)
)(keywords);

export const faultyKeywordsCount = query => {
  const violationsArr = violations(query);
  return violationsArr.length;
};

export const keywordsError = count =>
  `Found unaliased field with name matching ${count} of reserved keywords ([ ${keywords} ]). Build failed! Please refer to the caveats in the gatsby-source-graphcms README for a solution: https://github.com/GraphCMS/gatsby-source-graphcms#length-must-be-aliased`;

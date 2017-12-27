import {filter} from 'ramda'

const keywords = [
  `length`
];

const getAllObjKeys = obj => {
  let all = [];
  const getObjKeys = obj =>
    all.push(
      ...Object.keys(obj).map(key => {
        if(obj[key] instanceof Object) getObjKeys(obj[key])
        return key
      })
    );
  getObjKeys(obj);
  return all;
};

const checkForKeyword = key =>
  keywords.includes(key)

// Checking if the query we pass in config has any of the faulty fields
export const checkForFaultyFields = userQueryResult => {
  const allKeys = getAllObjKeys(userQueryResult)
  const faultyFields = filter(checkForKeyword, allKeys)

  return faultyFields.length;
};

export const keywordsError = `Found unaliased reserved field with a name matching one of [ ${keywords} ]. Build failed! Please refer to the caveats in the gatsby-source-graphcms README for a solution: https://github.com/GraphCMS/gatsby-source-graphcms#length-must-be-aliased`;
const {checkForFaultyFields} = require(`../faulty-keywords`);

const faultyResponse = {
  allTracks: [
    {length: 214},
    {length: 184}
  ]
};

const swellResponse = {
  allTracks: [
    {aliasedLength: 214},
    {aliasedLength: 184}
  ]
};

it(`is truthy if the query contains a faulty keyword`, () => {
  expect(
    checkForFaultyFields(faultyResponse)
  ).toBeTruthy();
});

it(`is falsy if the faulty keyword is aliased`, () => {
  expect(
    checkForFaultyFields(swellResponse)
  ).toBeFalsy();
});

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

it(`returns true if the query contains a faulty keyword`, () => {
  expect(
    checkForFaultyFields(faultyResponse)
  ).toBeTruthy();
});

it(`returns false if the faulty keyword is aliased`, () => {
  expect(
    checkForFaultyFields(swellResponse)
  ).toBeFalsy();
});

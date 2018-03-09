import {checkForFaultyFields} from '../faulty-keywords';

describe('Faulty keywords tests', () => {
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

  it(`detects faulty keywords`, () => {
    expect(
      checkForFaultyFields(faultyResponse)
    ).toBeTruthy();
  });

  it(`ignores faulty keywords if they are aliased`, () => {
    expect(
      checkForFaultyFields(swellResponse)
    ).toBeFalsy();
  });
});

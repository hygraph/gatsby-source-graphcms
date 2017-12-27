const {faultyKeywordsCount} = require(`../faulty-keywords`);

const faultyQuery = `{
  allArtists {
    records {
      tracks {
        record {
          tracks {
            id
            length
          }
        }
      }
    }
  }
}`;

const swellQuery = `{
  allArtists {
    records {
      tracks {
        record {
          tracks {
            id
            aliasedLength: length
          }
        }
      }
    }
  }
}`;

it(`returns truthy value if the query contains a faulty keyword`, () => {
  const checkResult = faultyKeywordsCount(faultyQuery);
  expect(checkResult).toBeTruthy();
});

it(`returns falsy value if the faulty keyword is aliased`, () => {
  const checkResult = faultyKeywordsCount(swellQuery);
  expect(checkResult).toBeFalsy();
});

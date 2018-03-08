import {
  formatTypeName,
  extractTypeName,
  surroundWithBraces,
  constructTypeQuery,
  assembleQueries,
  createNodes
} from '../util';

describe('Util function tests', () => {
  describe('String manipulation', () => {
    // TODO: This is just a little bit broken until we find a good plural lib to match GraphCMS's.
    it('formats the type name properly', () => {
      expect(formatTypeName('Post')).toBe('allPosts');
      expect(formatTypeName('Page')).toBe('allPages');
      expect(formatTypeName('Recess')).toBe('allRecesses');
      // XXX: expect(formatTypeName('Index')).toBe('allIndexes');
      // XXX: expect(formatTypeName('Focus')).toBe('allFocuses');
    });

    it('extracts the type name from a xyz', () => {
      expect(extractTypeName('allPosts')).toBe('Post');
      expect(extractTypeName('allPages')).toBe('Page');
      expect(extractTypeName('allFoci')).toBe('Focus');
    });

    it('surrounds a string with braces', () => {
      expect(surroundWithBraces('a')).toBe('{a}');
    });
  });

  describe('GraphQL utilities', () => {
    const type = {
      name: 'Post',
      fields: [{name: 'a'}, {name: 'b'}, {name: 'c'}]
    };
    // TODO: This is funky, I hate it
    const query = `
  allPosts {
    a
b
c
  }
`;

    it('Constructs a type query from a given type', () => {
      expect(constructTypeQuery(type)).toBe(query);
    });

    // TODO: The rest of the assembleQueries tests.
    it('throws an error when trying to assemble an undefined query list', () => {
      const assemble = () => assembleQueries(undefined);
      expect(assemble).toThrow();
    });

    it('Creates some gatsby nodes or something', () => {
      const createNode = jest.fn();
      const reporter = jest.fn();
      const createThemNodes = createNodes(createNode, reporter);

      // This is the output for id: 1...
      const whatThisThingGetsCalledWith = {
        children: [],
        fields: [{name: 'a'}],
        id: 1,
        internal: {
          content: '{"id":1,"fields":[{"name":"a"}]}',
          contentDigest: 'faeed10185d8d423f42c5b37891dcdd9',
          type: 'Post'
        },
        parent: 'GraphCMS_allPosts'
      };

      createThemNodes([{id: 0, fields: [{name: 'a'}]}, {id: 1, fields: [{name: 'a'}]}], 'allPosts');

      expect(createNode).toBeCalledWith(whatThisThingGetsCalledWith);
      expect(createNode).toHaveBeenCalledTimes(2);
      expect(createNode.mock.calls[0][0]).not.toEqual(createNode.mock.calls[1][0]);
      expect(reporter).not.toHaveBeenCalled();
    });
  });
});

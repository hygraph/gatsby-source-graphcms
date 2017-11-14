import { compose, join, pluck, map, path } from "ramda"

// If type ends in a non-vowel, we need to append es. Else s.
// TODO: Use an actual pluralize library for this. This doesn't cover all use cases.
export const formatTypeName = t => `all${t}${/s$/.test(t) ? `es` : `s`}`

// Get the type name back from a formatted type name.
// TODO: Use the same pluralize to convert from plural to singular?
export const extractTypeName = t => /all(.+(?:s|es))/gi.exec(t)[1]

// Create the query body
export const surroundWithBraces = c => `{${c}}`

// Constructs a query for a given type.
export const constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${compose(join(`\n`), pluck(`name`))(type.fields)}
  }
`

// Composition which assembles the query to fetch all data.
export const assembleQueries = compose(
  surroundWithBraces,
  join(`\n`),
  map(constructTypeQuery),
  path([`__type`, `possibleTypes`])
)

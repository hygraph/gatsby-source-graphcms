import { PLUGIN_NAME } from './constants'

export function reportPanic(id, message, error, reporter) {
  return reporter.panic({
    context: {
      id,
      sourceMessage: `[${PLUGIN_NAME}]: ${message} \n\n ${new Error(error)}`,
    },
  })
}

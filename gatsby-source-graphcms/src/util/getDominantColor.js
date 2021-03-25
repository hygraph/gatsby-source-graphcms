import { fetchRemoteFile } from 'gatsby-core-utils'

import { PLUGIN_NAME } from './constants'

export async function getImageDominantColor({ url, cache }) {
  try {
    const { getDominantColor } = require(`gatsby-plugin-sharp`)

    const filePath = await fetchRemoteFile({
      url,
      cache,
    })

    const backgroundColor = await getDominantColor(filePath)

    return backgroundColor
  } catch {
    console.error(
      `[${PLUGIN_NAME}] In order to use the dominant color placeholder, you need to install gatsby-plugin-sharp`
    )

    return `rgba(0, 0, 0, 0.5)`
  }
}

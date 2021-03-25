import { fetchRemoteFile } from 'gatsby-core-utils'
import { readFileSync } from 'fs'

export function getBase64DataURI({ imageBase64 }) {
  return `data:image/png;base64,${imageBase64}`
}

export async function getImageBase64({ url, cache }) {
  const filePath = await fetchRemoteFile({
    url,
    cache,
  })

  const buffer = readFileSync(filePath)
  return buffer.toString(`base64`)
}

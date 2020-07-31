import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Layout from './src/components/layout'
import Parargraph from './src/components/paragraph'

import './src/styles/main.css'

const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

const wrapRootElement = ({ element }) => {
  return <MDXProvider components={{ p: Parargraph }}>{element}</MDXProvider>
}

export { wrapPageElement, wrapRootElement }

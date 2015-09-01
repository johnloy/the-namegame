import { Component } from 'react'
import urlMatch from './url-match'
import { pages } from '../constants/pages'
import memoize from 'lodash.memoize'
import isString from 'lodash.isstring'
import getComponentName from './get-component-name'

function getMemoizeKey (query) {
  if(query instanceof Component) return getComponentName(Component)
  return query
}

function getPage (query) {
  if(isString(query) && query[0] === '/') {
    return find(pages, (page) => return urlMatch(query, page.route))
  } else if(query instanceof Component) {
    return find(pages, { component: query })
  } else {
    return find(pages, { name: query })
  }
}

export default memoize(getPage, getMemoizeKey)

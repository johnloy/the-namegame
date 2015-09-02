import { Component } from 'react'
import urlMatch from './url-match'
import { pages } from '../constants/pages'
import memoize from 'lodash.memoize'
import isString from 'lodash.isstring'
import find from 'lodash.find'
import getComponentName from './get-component-name'

function getMemoizeKey (query) {
  if(query instanceof Component) return getComponentName(Component)
  return query
}

function getPage (query) {
  if(isString(query) && query[0] === '/') {
    // query is /play page.route is /play; the page where query match against page.route
    const page = find(pages, (page) => {
      return urlMatch(query, page.route)
    })
    return page
    // returned object is the page
  } else if(query instanceof Component) {
    return find(pages, { component: query })
  } else {
    return find(pages, { name: query })
  }
}

export default memoize(getPage, getMemoizeKey)

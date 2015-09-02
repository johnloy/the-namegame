import getPage from './get-page'
import urlMatch from './url-match'
import memoize from 'lodash.memoize'

const initialTriggeringEvent = { type: 'initialize' }

function getInitialRouteData () {
  const nextPath = window.location.pathname
  const nextPage = getPage(nextPath)
  return {
    current: null,
    next: {
      name: nextPage.name,
      path: nextPath,
      params: urlMatch(nextPath, nextPage.route).params,
      triggeringEvent: initialTriggeringEvent
    }
  }
}

function getMemoizeKey (currentPath = '', nextPath = '', event = 'initialize') {
  return `${currentPath}${nextPath}${event.toString()}`
}

function getRouteData (pathData, triggeringEvent) {
  if (!pathData) return getInitialRouteData()

  let currentPath, nextPath
  if (typeof pathData === 'string') {
    nextPath = pathData
    currentPath = window.location.pathname
  } else {
    currentPath = pathData.currentPath
    nextPath = pathData.nextPath
  }

  const currentPage = getPage(currentPath)
  const nextPage = getPage(nextPath)

  return {
    current: {
      name: currentPage.name,
      path: currentPath,
      params: urlMatch(currentPath, currentPage.route).params,
      triggeringEvent
    },
    next: {
      name: nextPage.name,
      path: nextPath,
      params: urlMatch(nextPath, nextPage.route).params,
      triggeringEvent
    }
  }
}

export default memoize(getRouteData, getMemoizeKey)

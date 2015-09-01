import getPage from './get-page'
import urlMatch from './url-match'

const initialTriggeringEvent = { type: 'initialize' }

function getInitialRouteData () {
  const path = window.location.pathname
  const params
  return {
    current: null,
    next: {
      name: getPage(path).name,
      path: path,
      params: urlMatch(path).params,
      triggeringEvent: initialTriggeringEvent
    }
  }
}

function getMemoizeKey (currentPath, nextPath, event) {
  return `${currentPath}${nextPath}${event.toString()}`
}

function getRouteData (currentPath, nextPath, event) {
  if(!currentPath) return getInitialRouteData()

  return {
    current: {
      name: getPage(currentPath).name,
      path: currentPath,
      params: urlMatch(currentPath).params,
      triggeringEvent: event
    },
    next: {
      name: getPage(nextPath).name,
      path: nextPath,
      params: urlMatch(nextPath).params,
      triggeringEvent: event
    }
  }
}

export default memoize(getRouteData, getMemoizeKey)

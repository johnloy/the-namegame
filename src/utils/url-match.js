import zipObject from 'lodash.zipobject'

export default function urlMatch (path, pattern = '/') {
  let params = {}
  if(typeof pattern === 'string') {
    if(path === pattern) return { params }
  }
  if(Array.isArray(pattern)) {
    const [regexp, ...paramNames] = pattern
    const matches = path.match(regexp)
    if(matches) {
      const paramMatches = matches.slice(1)
      if(paramMatches) params = zipObject(paramNames, paramMatches)
      return { params }
    }
  }
}

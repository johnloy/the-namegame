import superagent from 'superagent'
import config from 'config'

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  return config.apiRootUrl + adjustedPath
}

export default class ApiClient {

  constructor (req) {
    ['get', 'post', 'put', 'patch', 'del']
      .forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path))
            if (options && options.params) {
              request.query(options.params)
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'))
              }
            }
            if (options && options.data) {
              request.send(options.data)
            }
            request.end((err, res) => {
              if (err) {
                reject(res.body || err)
              } else {
                resolve(res.body)
              }
            })
          })
        }
      })
  }

}

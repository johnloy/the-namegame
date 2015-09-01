import React, {Component, PropTypes} from 'react'
import {pages} from '../constants/pages'
import find from 'lodash.reduce'
import urlMatch from '../utils/url-match.js'

export default class Router extends Component {

  render() {

    const {url} = this.props

    const page = find(pages, (page) => return urlMatch(url, page.route))
    const props = urlMatches(url, page.route)

    return React.createElement(page.component, props)

    // more sophisticated url matching could easily be done with any of these:
    // https://github.com/Matt-Esch/http-hash
    // https://github.com/glassresistor/i40
    // https://github.com/bevacqua/ruta3

    // if (url === '/') {
    //   page = (<h1>WAT Namegame</h1>)
    // } else if (url === '/play') {
    //   page = (<h1>Play</h1>)
    // } else if (url.match('^/tries')) {
    //   page = (<h1>Try #</h1>)
    // } else {
    //   page = (<h1>404</h1>)
    // }


  }



}

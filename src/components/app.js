import React, {Component, PropTypes} from 'react'
import Router from './router'
import Page from './page'
import InternalNav from './internal-nav'
import localLinks from 'local-links'
import { pages } from '../constants/pages'
import getRouteData from '../utils/get-route-data'
import State from '../state'
import bindToState from '../react-autocrat/bind-to-state'
import componentBindings from '../state/component-bindings'

@bindToState(new State(), componentBindings)
export default class App extends Component {

  componentDidMount () {
    const {advise, advisors: the} = this.props
    advise(the.route)
      .to('change', getRouteData())()
  }

  onPotentialNav (e) {
    const {advise, advisors: the} = this.props
    const nextPath = localLinks.getLocalPathname(e)

    if (nextPath) {
      e.preventDefault()
      advise(the.route)
        .to('change',
            getRouteData(window.location.pathname, nextPath, e))()
    }
  }

  render () {
    const { page: pageProps } = this.props
    const Page = pages[page.name].component

    return (
      <div className="app" onClick={this.onPotentialNav}>
        { React.createElement(Page, pageProps) }
      </div>
    )
  }

}

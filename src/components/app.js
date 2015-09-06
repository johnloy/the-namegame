import React, {Component, PropTypes} from 'react'
import localLinks from 'local-links'
import { pages } from '../constants/pages'
import State from '../state'
import bindToState from './decorators/bind-to-state'
import componentBindings from '../state/component-bindings'
import getPage from '../../lib/get-page'
import Page from './page'

const state = new State()
global.$tate = state

@bindToState(state, componentBindings)
export default class App extends Component {

  componentDidMount () {
    const {advise, advisors: the} = this.props
    advise(the.app).to('mount')()
    advise(the.route).to('initialize')()
  }

  onPotentialNav (e) {
    const nextPath = localLinks.getLocalPathname(e)

    if (nextPath) {
      const {advise, advisors: the} = this.props
      e.preventDefault()
      advise(the.route).to('change', nextPath, e)()
    }
  }

  render () {
    require('./app.css')
    const { page } = this.props

    if(page) {
      const pageProps = { ...page.toObject(), isDeepLink: this.props.route.get('isDeepLink') }
      return (
        <section className="app" onClick={ this.onPotentialNav.bind(this) }>
          <Page { ...pageProps } />
        </section>
      )
    } else {
      return <div />
    }

  }

}

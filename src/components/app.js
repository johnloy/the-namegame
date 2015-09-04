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
    const { page } = this.props
    const pageConf = page && getPage(page.get('name'))
    // const Page = pageConf && pageConf.component
    require('./app.css')
    // const styles = require('./app.css')

    if(page) {
      return (
        <section class="app" onClick={ this.onPotentialNav.bind(this) }>
          <Page {...page.toObject()} />
        </section>
      )
    } else {
      return <div />
    }

  }

}

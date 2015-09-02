import React, {Component, PropTypes} from 'react'
import localLinks from 'local-links'
import { pages } from '../constants/pages'
import State from '../state'
import bindToState from '../react-autocrat/bind-to-state'
import componentBindings from '../state/component-bindings'
import getPage from '../utils/get-page'

const state = new State()
global.$tate = state

@bindToState(state, componentBindings)
export default class App extends Component {

  componentDidMount () {
    const {advise, advisors: the} = this.props
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
    const Page = pageConf && pageConf.component

    if(Page) {
      return (
        <section class="app" onClick={ this.onPotentialNav.bind(this) }>
          { React.createElement(Page, page.toObject()) }
        </section>
      )
    } else {
      return <div />
    }

  }

}

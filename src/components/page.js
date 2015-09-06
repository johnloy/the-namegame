import React, {Component, PropTypes, addons} from 'react/addons'
import { pages } from '../constants/pages'
import getPage from '../../lib/get-page'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'
import TimeoutTransitionGroup from './timeout-transition-group'

const ReactTransitionGroup = addons.TransitionGroup;

class NoPage extends Component {
  render () {
    return (
      <div></div>
    )
  }
}

@reactMixin.decorate(reactKeybinding)
export default class App extends Component {

  static contextTypes = {
    advisors: PropTypes.object.isRequired,
    advise: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    const {advise, advisors: the} = this.context

    this.keybindings = {
      'enter': advise(the.app).to('play'),
      'esc': advise(the.app).to('quitPlaying')
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.name !== this.pageName
  }

  getPage () {
    const { name: pageName } = this.props
    const pageConf = getPage(pageName)
    const Page = pageConf && pageConf.component
    this.pageName = pageName

    if(pageName === 'Play') {
      return (
        <Page key="play-page" className="play-page" />
      )
    } else {
      return React.createElement('div', {key: 'foo'})
    }
  }

  render () {
    const { name: pageName } = this.props
    const pageConf = getPage(pageName)
    const Page = pageConf && pageConf.component
    this.pageName = pageName

    const pageClassName = `page-${pageName.toLowerCase()}`

    return (
      <div key="foo">
        <ReactTransitionGroup component="div" transitionAppear={true}>
          <Page key={pageName} isDeepLink={ this.props.isDeepLink } />
        </ReactTransitionGroup>
      </div>
    )
  }

}

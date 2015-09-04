import React, {Component, PropTypes} from 'react'
import { pages } from '../constants/pages'
import getPage from '../../lib/get-page'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'

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

  render () {
    // const { page } = this.props
    // const pageConf = page && getPage(page.get('name'))
    // const Page = pageConf && pageConf.component
    // require('./app.css')
    // const styles = require('./app.css')

    const { name: pageName } = this.props

    return (
      <div className="container" key="container">
        <header className="codrops-header">
          <h1>WillowTree Namegame</h1>
          <p className="codrops-links"><a className="codrops-icon codrops-icon-prev" href="http://tympanus.net/Development/CreativeLoadingEffects/"><span>Previous Demo</span></a>
          <span className="right"><a className="codrops-icon codrops-icon-drop" href="http://tympanus.net/codrops/?p=16556"><span>Back to the Codrops Article</span></a></span></p>
          <a href="#" id="bt-menu-trigger-out" className="bt-menu-trigger-out">Play <span className="bt-icon-alt icon-play"></span></a>
          <nav className="codrops-demos">
            <a href="index.html">Demo 1</a>
            <a href="index2.html">Demo 2</a>
            <a href="index3.html">Demo 3</a>
            <a href="index4.html">Demo 4</a>
            <a href="index5.html">Demo 5</a>
            <a className="current-demo" href="index6.html">Demo 6</a>
          </nav>
          <div className="codrops-related">
            If you enjoyed this menu, you might also like:<br />
            <a href="http://tympanus.net/Development/MultiLevelPushMenu/">Multi-Level Push Menu</a><br/>
            <a href="http://tympanus.net/Development/SidebarTransitions/">Transitions for Off-canvas Navigations</a>
          </div>
        </header>

        <nav id="bt-menu" className={ pageName === 'Play' ? 'bt-menu bt-menu-open' : 'bt-menu bt-menu-closed' }>
          <a href="#" className="bt-menu-trigger"><span>Menu</span></a>
          <ul className="bt-menu-side">
            <li><a href="#">Search</a></li>
            <li><a href="#">Compose</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Download</a></li>
          </ul>
          <ul className="bt-menu-bottom">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

        </nav>
      </div>
    )


  }

}

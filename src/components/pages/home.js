import React, {Component, PropTypes} from 'react'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'

@reactMixin.decorate(reactKeybinding)
export default class HomePage extends Component {

  static contextTypes = {
    advisors: PropTypes.object.isRequired,
    advise: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    const {advise, advisors: the} = this.context

    this.keybindings = {
      'enter': advise(the.app).to('play')
    }
  }

  render () {
    return (
      <header>
        <nav role='navigation'>
          <a href='/'>Stop</a>
          <span>
            <a href="/play">Play</a>
            <a href="/tries/3">Tries</a>
          </span>
        </nav>
        <h1>WAT Namegame</h1>
      </header>
    )
  }
}

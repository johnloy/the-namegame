import React, {Component, PropTypes} from 'react'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'

@reactMixin.decorate(reactKeybinding)
export default class StartPage extends Component {

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

  componentWillEnter (done) {
    done()
  }

  componentWillLeave (done) {
    setTimeout((() => done()), 400)
  }

  render () {
    require('./start.css')
    const logo = require('../../../static/wt-logo.png')

    return (
      <section className="start-page flex flex-center">
        <header className="start-page--header">
          <img src={ logo } />
          <h1>Namegame</h1>
          <a className="play-btn btn btn-outline">Play <span className="icon icon-play"></span></a>
          <span className="alt-play-msg">(or just type Enter)</span>
        </header>
      </section>
    )
  }
}

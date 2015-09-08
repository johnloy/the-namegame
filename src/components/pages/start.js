import React, {Component, PropTypes} from 'react'
import reactMixin from 'react-mixin'
import reactKeybinding from 'react-keybinding'

export default class StartPage extends Component {

  componentWillEnter (done) {
    done()
  }

  componentWillLeave (done) {
    setTimeout((() => done()), 400)
  }

  render () {
    require('./start.css')

    const iconStyles = {width: '40px'}

    return (
      <section className="start-page">
        <header className="start-page--header">
          <h1>WillowTree Namegame</h1>
          <a href="#" id="bt-menu-trigger-out" className="bt-menu-trigger-out">Play <span className="bt-icon-alt icon-play"></span></a>
        </header>
      </section>
    )
  }
}

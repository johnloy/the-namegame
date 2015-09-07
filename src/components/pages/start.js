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
          <svg className="icon icon-user-check" viewBox="0 0 1024 1024">
            <title>user-check</title>
            <path className="path1" d="M960 608l-288 288-96-96-64 64 160 160 352-352z"></path>
            <path className="path2" d="M448 768h320v-115.128c-67.22-39.2-156.308-66.11-256-74.26v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h448v-64z"></path>
          </svg>
          <a href="#" id="bt-menu-trigger-out" className="bt-menu-trigger-out">Play <span className="bt-icon-alt icon-play"></span></a>
        </header>
      </section>
    )
  }
}

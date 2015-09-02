import React, {Component, PropTypes} from 'react'

export default class HomePage extends Component {

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

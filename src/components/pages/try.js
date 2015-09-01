import React, {Component, PropTypes} from 'react'

export default class TryPage extends Component {

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
      </header>
      <h1>Try #</h1>
    )
  }

}

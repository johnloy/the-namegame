import React, { Component, PropTypes } from 'react'
import People from '../people'

function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = element.className + ' ' + className;
  }
  return element;
}

function removeClass(element, className) {
  if (hasClass(className)) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = (' ' + element.className + ' ')
      .replace(' ' + className + ' ', ' ').trim();
    }
  }
  return element;
}

function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

export default class PlayPage extends Component {

  static contextTypes = {
    advisors: PropTypes.object.isRequired,
    advise: PropTypes.func.isRequired
  }

  componentWillEnter (done) {
    const el = React.findDOMNode(this)
    setTimeout((() => {
      addClass(el, 'play-page--active')
    }), 17)
    done()
  }

  componentDidMount () {
    if(this.props.isDeepLink) {
      const el = React.findDOMNode(this)
      addClass(el, 'play-page--active')
      addClass(el, 'play-page--deeplink')
    }
  }

  componentWillLeave (done) {
    const el = React.findDOMNode(this)
    setTimeout(() => {
      addClass(el, 'play-page--leaving')
      removeClass(el, 'play-page--active')
      addClass(el, 'play-page--leave')
      setTimeout((() => done()), 400)
    } , 17)
  }

  render () {
    require('./play.css')
    require('../people.css')

    return (
      <section className="play-page">
        <a key="quit-btn" href="#" className="quit-btn fixed block"><span>Menu</span></a>
        <ul key="scoreboard" className="scoreboard">
          <li><a href="#">Search</a></li>
          <li><a href="#">Compose</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Calendar</a></li>
          <li><a href="#">Download</a></li>
        </ul>
        <People />
      </section>
    )
  }

}

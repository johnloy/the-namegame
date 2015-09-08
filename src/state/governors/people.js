import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import omit from 'lodash.omit'
import createDb from '../../../lib/create-db'
import find from 'lodash.find'

export default class PeopleGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      fetching: prop('fetching', {}),
      currentSet: prop('currentSet', []),
      showLoading: prop('showLoading', false),
      currentlyFocused: prop('currentlyFocused'),
      currentSubject: prop('currentSubject')
    }},

    db: (prop) => { return {
      collection: prop('people', [])
    }},

    ui: (prop) => { return {
      showLoading: prop('uiShowLoading', false)
    }}

  }}

  laws (when, the) {

    when(the.app.mounts)
      .advise(the.people).to('fetch')

    when(the.people.areFetching)
      .updateProp('fetching')

    when(the.people.haveFetched)
      .updateProp('people')

    when(the.page.changesTo('Play'))
      .advise(the.people).to('selectNewSet')

    when(the.page.changesFrom('Play'))
      .advise(the.people).to('clearSet')

    // Deep-linking to /play
    when.all(the.people.haveFetched, the.page.changesTo('Play'))
      .advise(the.people).to('selectNewSet')
      .updateProp('people')

    when.any(the.people.getsNewSet)
      .advise(the.timer).to('start')
      .updateProps('currentSet', 'showLoading', 'currentSubject')

    when(the.people.clearsItsSet)
      .updateProps('currentSet', 'showLoading', 'currentlyFocused')
      .advise(the.timer).to('reset')

    when(the.app.focusesPerson)
      .updateProps('currentlyFocused')

  }

  updateFetching (currVal, e) {
    if(e.type === 'people:areFetching' && e.data === true) {
      return { ...currVal, collection: true }
    } else {
      return omit(currVal, 'collection')
    }
  }

  updatePeople (currVal, e) {
    if(!currVal.length && e.data.collection) {
      return createDb(e.data.collection)
    } else if(currVal)  {
      return currVal
    }
  }

  updateCurrentSet (currVal, e) {
    if(e.type === 'people:clearSet') return []
    return e.data
  }

  updateShowLoading (currVal, e) {
    let nextVal
    if(e && Array.isArray(e.data) && !currVal) {
      nextVal = true
    } else {
      nextVal = false
    }
    this.props.uiShowLoading = nextVal
    if(!e) this.props.showLoading = nextVal
    return nextVal
  }

  updateCurrentlyFocused (currVal, e) {
    if(e.type === 'app:focusPerson') return e.data
    return null
  }

  updateCurrentSubject (currVal, e) {
    if(e.type === 'people:clearSet') return null
    return find(e.data, { isSubject: true })
  }

}

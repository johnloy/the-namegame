import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import omit from 'lodash.omit'
import initializePeople from '../../../lib/initialize-people'
import { updateSeenCount, updateScore } from '../../../lib/update-people'
import find from 'lodash.find'

export default class PeopleGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      fetching: prop('fetching', {}),
      currentSet: prop('currentSet', []),
      showLoading: prop('showLoading'),
      currentlyFocused: prop('currentlyFocused'),
      currentSubject: prop('currentSubject')
    }},

    db: (prop) => { return {
      collection: prop('people', [])
    }}

    // ui: (prop) => { return {
    //   showLoading: prop('uiShowLoading', false)
    // }}

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

    when(the.people.getsNewSet)
      .advise(the.people).to('startLoading')
      .updateProps('currentSet', 'people', 'currentSubject', 'currentlyFocused')

    when(the.people.startsLoading)
      .updateProp('showLoading')

    when(the.people.stopsLoading)
      .updateProp('showLoading')
      .advise(the.timer).to('start')

    // Deep-linking to /play
    when.all(the.people.haveFetched, the.page.changesTo('Play'))
      .updateProp('people')
      .advise(the.people).to('selectNewSet')

    when(the.people.clearsItsSet)
      .updateProps('currentSet', 'currentlyFocused')
      .advise(the.timer).to('reset')

    when(the.app.focusesPerson)
      .updateProps('currentlyFocused')

    when(the.app.calculatesScore)
      .updateProps('people')

    when(the.app.finishesGivingPostAnswerFeedback)
      .advise(the.timer).to('reset')
      .advise(the.people).to('selectNewSet')

  }

  updateFetching (currVal, e) {
    if(e.type === 'people:areFetching' && e.data === true) {
      return { ...currVal, collection: true }
    } else {
      return omit(currVal, 'collection')
    }
  }

  // Oh... my... god... This should not be this hard.
  // TODO: Fix the bug where an updater can potentially be called
  // with a currVal that isn't the return value of the previous call
  updatePeople (currVal, e) {
    if(e.type === 'people:fetched') {
      const people = initializePeople(e.data.collection)
      return people
    } else if(e.type === 'people:selectNewSet') {
      const currentSet = e.data
      if(currVal && currentSet && currentSet.length) {
        let people
        const currPageName = this.autocrat.get('view.route.current.name').value()
        const isDeepLink = this.autocrat.get('view.route.isDeepLink').value()
        if(currPageName === 'Start' && isDeepLink) {
          if(!this.updatedSeenCount) {
            people = updateSeenCount(currVal, currentSet)
            this.seenCount = people
            this.updatedSeenCount = true
            return people
          } else {
            people = this.seenCount
            this.updatedSeenCount = false
            this.seenCount = null
            return people
          }
        } else {
          let upToDatePeople = this.autocrat.get('db.people.collection').value()
          if(!upToDatePeople.length) upToDatePeople = currVal
          people = updateSeenCount(upToDatePeople, currentSet)
          return people
        }
      } else {
        return currVal
      }
    } else if(e.type === 'app:calculateScore') {
      const [ subject ] = e.data
      const updated = updateScore(currVal, subject)
      return updated
    } else {
      return currVal
    }
  }

  updateCurrentSet (currVal, e) {
    if(e.type === 'people:clearSet') return []
    return (e.data || currVal)
  }

  updateShowLoading (currVal, e) {
    return e.type === 'people:startLoading' ? true : false
    // let nextVal
    // if(e && e.type === 'people:selectNewSet') {
    //   nextVal = true
    // } else {
    //   nextVal = false
    // }
    // this.props.uiShowLoading = nextVal
    // if(!e) this.props.showLoading = nextVal
    // return nextVal
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

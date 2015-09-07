import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import omit from 'lodash.omit'
import createDb from '../../../lib/create-db'

export default class PeopleGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      fetching: prop('fetching', {}),
      currentSet: prop('currentSet', [])
    }},

    db: (prop) => { return {
      collection: prop('people', [])
    }}

  }}

  laws (when, the) {

    when(the.app.mounts)
      .advise(the.people).to('fetch')

    when(the.people.areFetching)
      .updateProp('fetching')

    when(the.people.haveFetched)
      .updateProp('people')

    when.all(the.page.changesTo('Play'))
      .advise(the.people).to('selectNewSet')

    // Deep-linking to /play
    when.all(the.people.haveFetched, the.page.changesTo('Play'))
      .advise(the.people).to('selectNewSet')
      .updateProp('people')

    when(the.people.getsNewSet)
      .updateProp('currentSet')
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
    return e.data
  }

}

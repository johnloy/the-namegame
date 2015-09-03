import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import omit from 'lodash.omit'

export default class PeopleGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      fetching: prop('fetching', {})
    }},

    db: (prop) => { return {
      collection: prop('people', [])
    }}

  }}

  laws (when, the) {

    when(the.app.mounts)
      .advise(the.people).to('fetch')

    when.any(the.people.areFetching)
      .updateProp('fetching')

    when(the.people.haveFetched)
      .updateProp('people')
  }

  updateFetching (currVal, e) {
    if(e.type === 'people:areFetching' && e.data === true) {
      return { ...currVal, collection: true }
    } else {
      return omit(currVal, 'collection')
    }
  }

  updatePeople (currVal, e) {
    return e.data.collection
  }

}

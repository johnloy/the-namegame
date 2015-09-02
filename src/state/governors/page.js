import Governor from 'autocrat-governor'
import constant from 'lodash.constant'

export default class PageGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      name: prop('name')
    }},

    document: (prop) => { return {
      title: prop('title'),
      scrollTop: 0
    }}

  }}

  laws (when, a) {

    when(a.route.changes)
      .updateProps()

  }

  updateName (currVal, e) {
    return e.data.next.name
  }

  updateTitle (currVal, e) {
    return e.data.next.name
  }

}

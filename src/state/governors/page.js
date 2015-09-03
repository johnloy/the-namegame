import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import isFunction from 'lodash.isfunction'

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

  laws (when, the) {

    when(the.page.changes).updateProps()

    // when(the.page.is('Play'))
    //   .advise(the.people).to('selectNewSet')
  }

  updateName (currVal, e) {
    return e.data.name
  }

  updateTitle (currVal, e) {
    const titleDef = e.data.htmlTitle
    if(isFunction(titleDef)) return titleDef(e.data.params)
    return e.data.htmlTitle
  }

}

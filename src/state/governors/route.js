import Governor from 'autocrat-governor'
import constant from 'lodash.constant'
import isUndefined from 'lodash.isundefined'

class RouteGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      current: prop('current'),
      previous: prop('previous'),
      isDeepLink: prop('isDeepLink')
    }},

    navigate: (prop) => { return {
      path: prop('navigate')
    }}

  }}

  laws (when, a) {
    const the = a

    when(a.route.changes)
      .updateProps('isDeepLink', 'previous', 'current', 'navigate')

    when(a.route.changes)
      .advise(the.page).to('updateWithRoute')

  }

  updatePrevious (currVal, e) {
    return e.data.current
  }

  updateCurrent (currVal, e) {
    return e.data.next
  }

  updateIsDeepLink (currVal, e) {
    const ret = isUndefined(currVal) ? true : false
    return ret
  }

  updateNavigate (currVal, e) {
    return e.data.next.path
  }

}

export default RouteGovernor

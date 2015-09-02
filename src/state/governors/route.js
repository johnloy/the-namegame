import Governor from 'autocrat-governor'
import constant from 'lodash.constant'

class RouteGovernor extends Governor {

  state () { return {

    view: (prop) => { return {
      current: prop('current'),
      previous: prop('previous'),
      isDeepLink: prop(false)
    }},

    navigate: (prop) => { return {
      path: prop('navigate')
    }}

  }}

  laws (when, a) {

    when(a.route.changes)
      .updateProps('previous', 'current', 'navigate')

    // when(a.federation.isCurrently('*'))
    //   .updateProp('isDeepLink')

  }

  updatePrevious (currVal, e) {
    return e.data.current
  }

  updateCurrent (currVal, e) {
    return e.data.next
  }

  updateIsDeepLink (currVal, e) {
    this.updateIsDeepLink = constant(false)
    return e.data.isInitialState
  }

  updateNavigate (currVal, e) {
    return e.data.next.path
  }

}

export default RouteGovernor

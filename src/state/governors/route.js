import Governor from 'autocrat-governor'
import constant from 'lodash.constant'

class RouteGovernor extends Governor {

  state (prop) {
    return {

      view: {
        current: prop(),
        previous: prop(),
        isDeepLink: prop(false)
      },

      navigate: prop()

    }
  }

  laws (when, a) {

    when(a.route.changes)
      .updateProps('previous', 'current', 'navigate')

    when(a.federation.isCurrently('*'))
      .updateProp('isDeepLink')

  }

  updatePrevious (e) {
    return e.data.current
  }

  updateCurrent (e) {
    return e.data.next
  }

  updateIsDeepLink (e) {
    this.updateIsDeepLink = constant(false)
    return e.data.isInitialState
  }

  updateNavigate (e) {
    return e.data.current.path
  }

}

export default RouteGovernor

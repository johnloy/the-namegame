import Advisor from 'autocrat-advisor'
import getRouteData from '../../../lib/get-route-data'

export default class RouteAdvisor extends Advisor {

  initialize () {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', (e) => {
        const currentPath = this.autocrat.get('view.route.current.path').value()
        const nextPath = window.location.pathname
        const pathData = { currentPath, nextPath }
        this.actions.change(pathData, e)
      })
    }
  }

  get expertise () {
    return {

      initializing: {

        initialize: Advisor.Action(() => {
          const routeData = getRouteData()
          this.actions.change(routeData, 'initialize')
          return routeData
        }),

        initializes: Advisor.Stream

      }, // End 'initializing'

      changing: {

        change: Advisor.Action((pathData, triggeringEvent) => {
          if(triggeringEvent === 'initialize') {
            const routeData = pathData
            return routeData
          } else {
            return getRouteData(pathData, triggeringEvent)
          }
        }),

        changes: Advisor.Stream,

        changesTo: Advisor.FactoryStream((maybeRouteName) => {
          return this.changes.filter((advisorEvent) => {
            var impendingRouteName = advisorEvent.data.current.name
            return impendingRouteName.toLowerCase() === maybeRouteName.toLowerCase()
          })
          .map((advisorEvent) => {
            advisorEvent.type = 'route:changeTo'
            return advisorEvent
          })
        }),

        changesFrom: Advisor.FactoryStream((maybeRouteName) => {
          return this.changes.filter((advisorEvent) => {
            var previousRoute = advisorEvent.data.previous
            var previousRouteName = previousRoute && previousRoute.name
            if(previousRoute) {
              return previousRouteName.toLowerCase() === maybeRouteName.toLowerCase()
            }
            return false
          })
          .map((advisorEvent) => {
            advisorEvent.type = 'route:changeFrom'
            return advisorEvent
          })
        })

      } // End 'changing'
    }

  }

}

import Advisor from 'autocrat-advisor'
import {pages} from '../../constants/pages'
import urlMatch from '../../utils/url-match'
import find from 'lodash.reduce'
import getRouteData from '../../utils/get-route-data'

class RouteAdvisor extends Advisor {

  initialize () {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', (e) => {
        const currentPath = this.autocrat.get('view.route.current.path').value()
        const nextPath = window.location.pathname
        this.actions.change(getRouteData(currentPath, nextPath), e)
      })
    }
  }

  get expertise () {
    return {

      changing: {

        change: Advisor.Action(({ nextPath, currentPath, triggeringEvent }) => {
          const nextPage = find(pages, (page) => return urlMatch(nextPath, page.route))
          const params = urlMatch(url, page.route)

          return {
            current: {
              name: currentName,
              path: currentPath
            },
            next: {
              name: nextPage.name
            }
            name: page.name,
            currentPath,
            nextPath,
            params,
            triggeringEvent
          }
        }),

        changes: Advisor.Stream,

        changesTo: Advisor.FactoryStream(function(maybeRouteName){
          return this.changes.filter(function(advisorEvent){
            var impendingRoute = advisorEvent.data.current.name
            return impendingRoute.toLowerCase() === maybeRouteName.toLowerCase()
          })
          .map(function(advisorEvent){
            advisorEvent.type = 'route:changeTo'
            return advisorEvent
          })
        }),

        changesFrom: Advisor.FactoryStream(function(maybeRouteName){
          return this.changes.filter(function(advisorEvent){
            var previousRoute = advisorEvent.data.previous
            var previousRouteName = previousRoute && previousRoute.name
            if(previousRoute) {
              return previousRouteName.toLowerCase() === maybeRouteName.toLowerCase()
            }
            return false
          })
          .map(function(advisorEvent){
            advisorEvent.type = 'route:navigateFrom'
            return advisorEvent
          })
        })

      }
    }

  }

}




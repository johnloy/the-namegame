import Advisor from 'autocrat-advisor'
import getPage from '../../../lib/get-page'
import omit from 'lodash.omit'

export default class PageAdvisor extends Advisor {

  get expertise () {
    return {

      changing: {

        change: Advisor.Action((nextName, routeParams, currName) => {
          const nextPage = omit(getPage(nextName), 'component')
          const currPage = currName ? omit(getPage(currName), 'component') : null
          nextPage.params = routeParams
          nextPage.previous = currPage
          return nextPage
        }),

        changes: Advisor.Stream,

        changesTo: Advisor.FactoryStream((maybePageName) => {
          return this.changes.filter((e) => {
            var nextPageName = e.data.name
            return nextPageName.toLowerCase() === maybePageName.toLowerCase()
          })
          .map((e) => {
            e.type = 'page:changeTo'
            return e
          })
        }),

        changesFrom: Advisor.FactoryStream((maybePageName) => {
          return this.changes.filter((e) => {
            if(e.data.previous) {
              var prevPageName = e.data.previous.name
              return prevPageName.toLowerCase() === maybePageName.toLowerCase()
            }
          })
          .map((e) => {
            e.type = 'page:changeFrom'
            return e
          })
        })

      },

      updating: {

        updateWithRoute: Advisor.Action((data) => {
          const routeData =  data.triggeringEvents.advisor.data
          if(!routeData.current || routeData.current.name !== routeData.next.name) {
            const currentName = routeData.current && routeData.current.name
            this.actions.change(routeData.next.name, routeData.next.params, currentName)
            return true
          }
        })
      }

    }

  }

}

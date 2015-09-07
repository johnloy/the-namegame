import Advisor from 'autocrat-advisor'
import ApiClient from '../../../lib/api-client'
import Bacon from 'baconjs'
import selectPeople from '../../../lib/select-people'
import createDb from '../../../lib/create-db'

const requests = {}

function onFetchSuccess (requestId, data) {
  requests[requestId].successHandler(data)
}

function onFetchResponse (requestId) {
  requests[requestId] = {}
  const req = requests[requestId]

  return {
    then: (successHandler) => req.successHandler = successHandler
  }
}

export default class PeopleAdvisor extends Advisor {

  initialize () {
    this.endpoint = new ApiClient()
  }

  get expertise () {
    return {

      fetching: {

        fetch: Advisor.Action((triggeringEvent) => {
          const promise = this.endpoint.get('/')
          promise.then(onFetchSuccess.bind(this, 'collection'))
          // this.requests['allPeople'] registerRequest('collection', promise)
          // return this.requests['allPeople'] = this.endpoint.get('/')
          return promise
        }),

        fetches: Advisor.Stream,

        haveFetched: Advisor.Stream(() => {
          var stream = new Bacon.Bus(),
              advisorName = this.name

          onFetchResponse('collection').then((data, e) => {
            delete requests['collection']
            var eventData = {
              collection: data,
              triggeringEvent: e
            }
            stream.push(new Advisor.Event(advisorName, 'fetched', eventData))
          })

          return stream
        }),

        areFetching: Advisor.Stream((baseStream) => {
          const advisorName = this.name
          return (
            this.streams.fetches.awaiting(this.streams.haveFetched)
              .map((stillWaiting) => {
                return new Advisor.Event(advisorName, 'areFetching', stillWaiting)
              })
          )
        })

      },

      newSetSelecting: {

        selectNewSet: Advisor.Action((...args) => {
          let people
          if('triggeringEvents' in args[0]) {
            if(Array.isArray(args[0].triggeringEvents.advisor)) {
              people = createDb(args[0].triggeringEvents.advisor[0].data.collection)
            } else if(args[0].triggeringEvents.advisor.type === 'page:changeTo') {
              people = this.autocrat.get('db.people.collection').value()
            }
          } else {
            people = args
          }

          if(people) return selectPeople(people)
        }),

        getsNewSet: Advisor.Stream

      },

      setClearing: {
        clearSet: Advisor.Action,
        clearsItsSet: Advisor.Stream
      }
    }

  }

}

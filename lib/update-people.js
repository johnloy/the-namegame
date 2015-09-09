import map from 'lodash.map'
import pluck from 'lodash.pluck'
import contains from 'lodash.contains'

export function updateSeenCount (people, currentSet) {
  const currentSetIds = pluck(currentSet, 'id')
  const updated = map(people, (p) => {
    if(!currentSet || (currentSet && contains(currentSetIds, p.id))) {
      p.seenCount += 1
    }
    return p
  })
  return updated
}

export function updateScore (people, subject) {
  const updated = people.map((p) => {
    if(p.id === subject.id) return subject
    return p
  })
  return updated
}

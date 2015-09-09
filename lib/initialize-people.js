import map from 'lodash.map'
import contains from 'lodash.contains'
import { KNOWN_FEMALES } from '../src/constants/people'

function guessGender (name) {
  const isKnownFemale = contains(KNOWN_FEMALES, name)
  return isKnownFemale ? 'female' : 'male'
}

function decoratePerson (person, i) {
  return {
    id: i + 1,
    name: person.name,
    photo: person.url,
    gender: guessGender(person.name),
    seenCount: 0,
    score: 0,
    worstTime: null,
    bestTime: null
  }
}

export default function initializePeople (people) {
  const peopleDb = map(people, decoratePerson)
  return peopleDb
}

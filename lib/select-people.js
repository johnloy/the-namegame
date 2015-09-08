import contains from 'lodash.contains'
import filter from 'lodash.filter'
import first from 'lodash.first'
import map from 'lodash.map'
import partial from 'lodash.partial'
import pluck from 'lodash.pluck'
import range from 'lodash.range'
import reject from 'lodash.reject'
import shuffle from 'lodash.shuffle'
import sortBy from 'lodash.sortby'
import without from 'lodash.without'

import { NUM_TO_SHOW } from '../src/constants/people'

function leastSeen(people) {
  return sortBy(people, (p) => 1 / p.seenCount)
}

function females(people) {
  return filter(people, 'gender', 'female')
}

function needsReview(people) {
  return filter(people, (p) => p.score < 3)
}

function uniqueRandomIdPicks(pool, count) {
  const pick = () => {
    const index = Math.floor(pool.length * Math.random());
    const drawn = pool.splice(index, 1);
    return drawn[0];
  }
  const picks = map(range(count), pick)
  return picks
}

function findByIds(people, ids) {
  const result = filter(people, (p) => contains(ids, p.id))
  return result
}

function pickRandom(excludes, quantity, people) {
  const excludesIds = pluck(excludes, 'id')
  const peopleIds = without.apply(null, [pluck(people, 'id')].concat(excludesIds))
  const upperBound = Math.min(quantity, people.length - 1)
  const pickedIds = uniqueRandomIdPicks(peopleIds, upperBound)
  const picks = findByIds(people, pickedIds)
  return picks
}

function annotateSubject (people, subject) {
  let annotationReady = false
  let i = 0;
  while(!annotationReady) {
    if(people[i].id === subject.id) {
      people[i].isSubject = true
      annotationReady = true
    }
    i++;
  }
  return people;
}

function annotateNeighbors (people) {
  const rowLength = NUM_TO_SHOW/2
  const rowBreakIndex = rowLength - 1
  const annotated = map(people, (person, i) => {
    if(i < rowLength) {
      person.neighbors = { below: people[i + rowLength].id }
      person.neighbors.after = people[i + 1].id
      person.neighbors.before = people[i === 0 ? NUM_TO_SHOW - 1 : i - 1].id
    } else {
      person.neighbors = { above: people[i - rowLength].id }
      person.neighbors.after = people[i + 1 === NUM_TO_SHOW ? 0 : i + 1].id
      person.neighbors.before = people[i - 1].id
    }
    return person;
  })
  return annotated
}

export default function selectPeople(people) {
  const leastSeenPeople = leastSeen(people)
  const subject = first(leastSeenPeople);
  let selected = [subject]

  const allFemales = females(people)
  if(subject.gender === 'female' && allFemales.length > 1) {
    const extraFemale = first(reject(allFemales, {id: subject.id}))
    selected = selected.concat(extraFemale)
  }

  let selectedIds

  selectedIds = pluck(selected, 'id')
  const remainingEmptySlots = NUM_TO_SHOW - selected.length
  const peopleNeedsReview = reject(needsReview(people), (p) => contains(selectedIds, p.id))

  if (peopleNeedsReview.length >= remainingEmptySlots) {
    var pickAnyRandom = partial(pickRandom, null )
    selected = selected.concat(pickAnyRandom(remainingEmptySlots, peopleNeedsReview))
  } else {
    selected = selected.concat(peopleNeedsReview)
    selectedIds = pluck(selected, 'id')
    var recycled = reject(leastSeenPeople, (p) => contains(selectedIds, p.id))
    selected = selected.concat(first(shuffle(recycled)))
  }

  const shuffled = shuffle(annotateSubject(selected, subject));

  selected = annotateNeighbors(shuffled)
  return selected
}

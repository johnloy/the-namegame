export default function calculateScore (subject, chosenId, time) {
  const isCorrectAnswer = subject.id === chosenId
  let score
  if(isCorrectAnswer) {
    if(time < 7) {
      score = 3
    } else {
      // Needs review
      score = .9 + (2 * (1/subject.seenCount))
    }
  } else {
    // Degrees of failure
    score = 1/subject.seenCount
  }
  subject.score = score
  return [subject, score]
}

export default function calculateScore (subject, chosenId, time) {
  const isCorrectAnswer = subject.id === chosenId
  let score
  if(isCorrectAnswer) {
    if(time < 7) {
      score = 3
    } else {
      // Needs review
      score = 2 * (1/(subject.seenCount || 1))
    }
  } else {
    // Degrees of failure
    score = 1 * (1/(subject.seenCount || 1))
  }

  return [subject, score]
}
// When the user has made a choice:
// if it's correct
//   if the time is <5s
//   score is 3
//   else score is 2 * (1/seencount)
// else
//   else score is 1 * (1/seencount)

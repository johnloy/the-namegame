
// Briefly the algorithm works like this:
// EF (easiness factor) is a rating for how difficult the card is.
// Grade: (0-2) Set reps and interval to 0, keep current EF (repeat card today)
//        (3)   Set interval to 0, lower the EF, reps + 1 (repeat card today)
//        (4-5) Reps + 1, interval is calculated using EF, increasing in time.
function calcIntervalEF (item, grade) {
  const oldEF = item.EF
  const nextDate = new Date(today)
  let newEF = 0,

  if (grade < 3) {
    item.reps = 0
    item.interval = 0
  } else {

    newEF = oldEF + (0.1 - (5-grade)*(0.08+(5-grade)*0.02))
    if (newEF < 1.3) { // 1.3 is the minimum EF
      item.EF = 1.3
    } else {
      item.EF = newEF
    }

    item.reps = item.reps + 1

    switch (item.reps) {
      case 1:
        item.interval = 1
        break
      case 2:
        item.interval = 6
        break
      default:
        item.interval = Math.ceil((item.reps - 1) * item.EF)
        break
    }
  }

  if (grade === 3) {
    item.interval = 0
  }

  nextDate.setDate(today.getDate() + item.interval)
  item.nextDate = nextDate
}

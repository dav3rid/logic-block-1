const fs = require('fs');

const originalSchedule = fs.readFileSync('input.txt', 'utf-8').split('\n');

originalSchedule.sort();

const guardSleepTimes = {};
let currentGuard = 0;

const minutesReg = /00:(\d{2})\]/;

// gather total sleep times per guard
for (let i = 0; i < originalSchedule.length; i++) {
  const currentEntry = originalSchedule[i];
  // guard begins shift
  if (currentEntry.includes('#')) {
    currentGuard = currentEntry.match(/#(\d+)/)[1];
    if (!guardSleepTimes.hasOwnProperty(currentGuard)) {
      guardSleepTimes[currentGuard] = 0;
    }
  }
  // falls asleep
  else if (currentEntry.includes('falls asleep')) {
    const sleepTime = +currentEntry.match(minutesReg)[1];
    const wakeTime = +originalSchedule[i + 1].match(minutesReg)[1];
    guardSleepTimes[currentGuard] += wakeTime - sleepTime;
    i++;
  }
}

// sleepiest guard id with sleep time
const sleepiestGuard = Object.entries(guardSleepTimes).reduce(
  (sleepiestGuard, [guard, sleepTime]) => {
    if (sleepTime > sleepiestGuard[1]) return [+guard, sleepTime];
    return sleepiestGuard;
  },
  [0, 0]
)[0];

// array detailing times slept during each minute - minute represented by index
const minutesSleptDuring = Array(59).fill(0);
currentGuard = 0;

for (let i = 0; i < originalSchedule.length; i++) {
  const currentEntry = originalSchedule[i];
  if (currentEntry.includes('#')) {
    currentGuard = +currentEntry.match(/#(\d+)/)[1];
  } else if (
    currentGuard === sleepiestGuard &&
    currentEntry.includes('falls asleep')
  ) {
    const sleepTime = +currentEntry.match(minutesReg)[1];
    const wakeTime = +originalSchedule[i + 1].match(minutesReg)[1];
    for (let j = sleepTime; j < wakeTime; j++) {
      minutesSleptDuring[j]++;
    }
    i++;
  }
}

const sleepiestMinute = minutesSleptDuring.indexOf(
  Math.max(...minutesSleptDuring)
);

console.log(sleepiestMinute * sleepiestGuard); // answer

const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

const schedule = data.split('\n');

data.sort((a, b) => {
  const dateReg = /^\[(.+)\]/;
  const [aDate, bDate] = [a, b].map((entry) => {
    const [_, dateStr] = entry.match(dateReg);
    return new Date(dateStr);
  });
  return aDate - bDate;
});

fs.writeFileSync('input.js', JSON.stringify(data));

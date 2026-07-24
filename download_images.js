const fs = require('fs');
const https = require('https');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve(true));
        });
      } else {
        response.resume();
        resolve(false);
      }
    }).on('error', (err) => {
      resolve(false);
    });
  });
}

async function run() {
  const years = [2018, 2019, 2020];
  for (const year of years) {
    console.log(`Downloading images for ${year}...`);
    let consecutiveFails = 0;
    for (let i = 1; i <= 50; i++) {
      const url = `https://www.srstrust.com/assets/images/${year}/${i}.jpg`;
      const dest = `public/images/events/${year}/${i}.jpg`;
      const success = await downloadImage(url, dest);
      if (success) {
        console.log(`Downloaded ${year}/${i}.jpg`);
        consecutiveFails = 0;
      } else {
        consecutiveFails++;
        if (consecutiveFails >= 3) {
          console.log(`Stopping at ${i} for ${year} after 3 consecutive failures.`);
          break;
        }
      }
    }
  }
}

run();

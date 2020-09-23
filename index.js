//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
//const { fecthISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {
//     console.log('It worked! Returned IP:' , ip);
//   }
  
// });

// const ip = '174.112.132.25p';
// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {
//     console.log('It worked! Returned:' , data);
//   }
// });

// const coords = { latitude: '49.27670', longitude: '-123.13000' };
// fecthISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {
//     console.log('It worked! Returned flyover times:\n' ,data);
//   }
// });

const printPassTimes = function(passTimes) {
  for (const p of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(p.risetime);
    const duration = p.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

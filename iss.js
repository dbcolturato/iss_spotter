const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
     
  });
};

const fecthISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const passes = JSON.parse(body).response;
    callback(null, passes);
     
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
  
    fetchCoordsByIP(ip, (error, passes) => {
      if (error) {
        return callback(error, null);
      }
      
      fecthISSFlyOverTimes(passes, (error, nextTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) { 
  const ipUrl = 'https://api.ipify.org?format=json';

  request(ipUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    try {
      const ipData = JSON.parse(body);
      const ip = ipData.ip;
      callback(null, ip);
    } catch (parseError) {
      callback('Error parsing JSON data', null);
    }
  });
  };


module.exports = { fetchMyIP };
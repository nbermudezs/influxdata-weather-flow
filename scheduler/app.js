var schedule = require('node-schedule')
var request = require('request')

var BACKEND = process.env.BACKEND;

var cities = [
  { city: 'London', country: 'UK', lon: -0.13, lat: 51.51 },
  { city: 'San Jose', country: 'CR', lon: -84.08, lat: 9.93 },
  { city: 'San Francisco', country: 'US', lon: -122.42, lat: 37.77 },
  { city: 'Los Angeles', country: 'US', lon: -118.24, lat: 34.05 }
]

var randomTemp = function() {
  var sign = Math.random() > 0.5 ? 1 : -1;
  return 68 + Math.random() * 8 * sign
}

var randomTempDelta = function() {
  var sign = Math.random() > 0.5 ? 1 : -1;
  return sign * Math.random();
}

var j = schedule.scheduleJob('*/5 * * * * *', function() {
  for (var i = 0; i < cities.length; i++) {
    var data = cities[i]
    var measure = data.measurements || {}
    var newTemp = measure.temp ? (measure.temp + randomTempDelta()) : randomTemp()
    if (newTemp >= 80) newTemp = newTemp - Math.random() * 2
    data.measurements = { temp: newTemp }

    request({
      url: BACKEND + '/api/weather',
      method: 'POST',
      json: true,
      body: data
    })
  }
})

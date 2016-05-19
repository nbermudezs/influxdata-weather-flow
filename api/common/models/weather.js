module.exports = function(Weather) {

  Weather.beforeCreate = function(next, model) {
    model.timestamp = new Date();
    next();
  }

  Weather.getStats = function(cb) {
    Weather.find({ limit: 4, order: 'timestamp DESC' }, function(err, items) {
      var result = {};
      items.forEach(function(item) {
        result[item.city] = item.measurements.temp
        result.metric = 'temp'
      });
      cb(null, result);
    })
  }

  Weather.remoteMethod(
    'getStats',
    {
      http: { path: '/getStats', verb: 'get' },
      returns: { arg: 'items', type: 'array', root: true },
      description: 'Get the weather stats'
    }
  );
};

var mongoUri = process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/influx-weather';

module.exports = {
  mongodb: {
    defaultForType: 'mongodb',
    connector: 'mongodb',
    url: mongoUri
  }
};

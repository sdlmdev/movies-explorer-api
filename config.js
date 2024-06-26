const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
} = process.env;

const config = {
  MONGODB_URI: NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3004,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};

module.exports = config;

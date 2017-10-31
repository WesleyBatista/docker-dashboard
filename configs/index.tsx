let env = process.env.NODE_ENV || 'development'
  , cfg = require('./'+env);

export = cfg;


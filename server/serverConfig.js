// Settings that should be the same for prod and dev
const universal = {
  port: 8080,
  host: '0.0.0.0'
};

// Stage-specific configuration
const config = {
  development: {
    mediaApiPath: 'http://localhost:9000'
  },
  production: {
    mediaApiPath: 'https://databass.io'
  }
};

const stageConfig = config[
  process.env.NODE_ENV
] || config['development'];

const combinedConfig = Object.assign(
  universal,
  stageConfig
);

module.exports = Object.freeze(combinedConfig);

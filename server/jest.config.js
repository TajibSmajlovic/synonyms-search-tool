const aliases = require('module-alias-jest/register');

module.exports = {
  moduleNameMapper: aliases.jest,
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', 'api/config', 'api/app.js'],
};

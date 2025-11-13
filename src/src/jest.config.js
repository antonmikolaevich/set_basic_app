module.exports = {
  testMatch: ['**/tests/**/*_unit_tests.[jt]s?(x)'],
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    '../controllers/**/*.js',
    '../models/**/*.js'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/coverage/'
  ],
  moduleNameMapper: {
    '^../controllers/(.*)$': '<rootDir>/../controllers/$1',
    '^../models/(.*)$': '<rootDir>/../models/$1'
  }
};

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  globals: {
    "ts-jest": {
      useESM: true
    }
  }
};
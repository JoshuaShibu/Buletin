module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transpile JS/JSX files
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    "node_modules/(?!@babel/runtime|@babel/preset-env|@babel/preset-react|other-es-modules)"
  ],
};
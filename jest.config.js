module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^container/(.*)$': '<rootDir>/src/mocks/container/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/mocks/',
    '<rootDir>/src/utils',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.(css|sass|scss)$'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
